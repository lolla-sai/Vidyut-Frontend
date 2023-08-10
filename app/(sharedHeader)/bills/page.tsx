"use client";

import Dropfile from "@/components/DropFile";
import { bills } from "@/data/dummy";
import { csvToJson, getBills } from "@/services/bills.services";
import {
  Badge,
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
  VStack,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import React, { useCallback, useState, useEffect } from "react";
import { useRouter } from "next-nprogress-bar";
import moment from "moment";
import Loader from "@/components/Loader";
import axios, { AxiosResponse } from "axios";
import { useQuery } from "react-query";

function Bills() {
  const router = useRouter();
  const [flatFile, setFlatFile] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [failedBills, setFailedBills] = useState([]);
  const toast = useToast();
  const onDrop = useCallback((acceptedFiles: any) => {
    let file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onabort = () => console.log("file reading was aborted");
    reader.onerror = () => console.log("file reading has failed");
    reader.onload = async () => {
      const res = await csvToJson(reader.result);
      setFlatFile(res);
      console.log(res);
    };

    reader.readAsText(file);
  }, []);

  const bills = useQuery("Bills", getBills, {
    refetchOnWindowFocus: true,
    onError({ response, code }: { code: string; response: AxiosResponse }) {
      if (response && response.status === 400) {
        toast({
          title: "Your session is expired",
          status: "error",
          isClosable: true,
        });
        router.push("/auth/login");
      } else if (code == "ERR_NETWORK") {
        toast({
          title: "Network error, cannot connect",
          status: "error",
          isClosable: true,
        });
      } else {
        toast({
          title: response.data.message,
          status: "error",
          isClosable: true,
        });
      }
    },
  });

  useEffect(() => {
    console.log(bills, "Bills");
  }, [bills]);

  const handleBillGeneration = async () => {
    var invalidFlatFile = false;

    console.log("Checking invalid");

    await Promise.all(
      flatFile.map(async (reading) => {
        var validKeys = [
          "consumerId",
          "meterNumber",
          "currentReading",
          "dateOfReading",
          "dueDate",
        ];

        await Promise.all(
          Object.keys(reading).map((readingKey) => {
            if (!validKeys.includes(readingKey) && invalidFlatFile == false) {
              console.log("Invalid");
              invalidFlatFile = true;
              return;
            }
          })
        );
      })
    );

    if (!invalidFlatFile && flatFile.length !== 0) {
      axios
        .post(
          "http://localhost:8080/api/billing/createBill",
          {
            billReadings: flatFile,
          } as {
            billReadings: Array<{
              consumerId: string;
              meterNumber: number;
              currentReading: number;
              dateOfReading: string;
              dueDate: string;
            }>;
          },
          { withCredentials: true }
        )
        .then(({ data }) => {
          console.log(data);
          setFailedBills(data.failedBills);
          setFlatFile([]);
          toast({
            title: data.message,
            status: "success",
            isClosable: true,
          });
          bills.refetch();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      if (invalidFlatFile) {
        toast({
          title: "Invalid flat file structure",
          status: "error",
          isClosable: true,
        });
      } else {
        toast({
          title: "Flat file not added",
          status: "error",
          isClosable: true,
        });
      }
    }
  };

  return (
    <Box>
      <Flex align="center">
        {flatFile.length === 0 && failedBills.length == 0 ? (
          <Dropfile onDrop={onDrop} />
        ) : failedBills.length > 0 ? (
          <>
            <TableContainer flexGrow="1" px="8" maxH="64" overflowY="auto">
              <Table variant="simple">
                <TableCaption>Failed bills</TableCaption>
                <Thead>
                  <Tr>
                    <Th>Consumer ID</Th>
                    <Th>Failure Reason</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {failedBills.map((row) => (
                    <Tr key={row["consumerId"]}>
                      <Td>{row["consumerId"]}</Td>
                      <Td>{row["reason"]}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </>
        ) : flatFile.length > 0 ? (
          <TableContainer flexGrow="1" px="8" maxH="64" overflowY="auto">
            <Table variant="simple">
              <TableCaption>Data Readed from File</TableCaption>
              <Thead>
                <Tr>
                  <Th>Consumer ID</Th>
                  <Th>Date Of Reading</Th>
                  <Th isNumeric>Meter Reading</Th>
                  <Th isNumeric>Current Reading</Th>
                </Tr>
              </Thead>
              <Tbody>
                {flatFile.map((row) => (
                  <Tr key={row["consumerId"]}>
                    <Td>{row["consumerId"]}</Td>
                    <Td>{row["dateOfReading"]}</Td>
                    <Td isNumeric>{row["meterNumber"]}</Td>
                    <Td isNumeric>{row["currentReading"]}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        ) : (
          <></>
        )}

        <Box>
          <VStack>
            <Button
              w="full"
              colorScheme="green"
              onClick={() => handleBillGeneration()}
            >
              Generate Bills
            </Button>
            <Button
              w="full"
              colorScheme="red"
              onClick={() => {
                setFlatFile([]);
                setFailedBills([]);
              }}
            >
              Cancel
            </Button>
          </VStack>
        </Box>
      </Flex>

      <Box my="4">
        <Heading size="xl" mb="4">
          All Bills
        </Heading>
        <Text mb="6" fontFamily="custom">
          Here, you can find all the bills generated
        </Text>

        {/* Applications */}
        <TableContainer rounded="xl" border="1px" borderColor="orange.100">
          <Table variant="simple">
            <Thead bg="orange.400">
              <Tr>
                <Th color="gray.100" isNumeric>
                  Consumer Type
                </Th>
                <Th color="gray.100">C.A. Number</Th>
                <Th color="gray.100">Full Name</Th>
                <Th color="gray.100">Consumption</Th>
                <Th color="gray.100">Bill Date</Th>
                <Th color="gray.100">Total Charge</Th>
              </Tr>
            </Thead>
            <Tbody>
              {bills.isLoading && (
                <Tr>
                  <Td colSpan={6}>
                    <Loader text="Fetching Bills..." />
                  </Td>
                </Tr>
              )}
              {bills?.data?.length === 0 && (
                <Tr>
                  <Td colSpan={6}>
                    <Text textAlign="center">No bills to show</Text>
                  </Td>
                </Tr>
              )}
              {bills &&
                bills.data &&
                bills.data.map((bill) => (
                  <Tr
                    _hover={{
                      bg: useColorModeValue("gray.100", "gray.800"),
                      cursor: "pointer",
                    }}
                    color={useColorModeValue("gray.800", "gray.100")}
                    key={bill.billId}
                    // onClick={() => router.push(`./bills/${bill.billId}`)}
                    onClick={() =>
                      window.open(
                        `http://localhost:8080/api/consumer/render-bill/${bill.billId}`,
                        "_blank"
                      )
                    }
                  >
                    <Td isNumeric>{bill.consumerType}</Td>
                    <Td>{bill.consumerDocId}</Td>
                    <Td>{bill.fullName}</Td>
                    <Td>{bill.consumption}</Td>
                    <Td>{bill.currentDate}</Td>
                    <Td>
                      <HStack>
                        <Text>₹ {bill.totalCharge}</Text>
                        {bill.paid ? (
                          <Badge colorScheme="green">Paid</Badge>
                        ) : moment().isBefore(
                            moment(bill.dueDate).format("MM-DD-YYYY")
                          ) ? (
                          <Badge>Not Paid</Badge>
                        ) : (
                          <Badge colorScheme="red">Overdue and Unpaid</Badge>
                        )}
                      </HStack>
                    </Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}

export default Bills;
