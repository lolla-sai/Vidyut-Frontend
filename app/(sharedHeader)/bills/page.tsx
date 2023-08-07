"use client";

import Dropfile from "@/components/DropFile";
import { bills } from "@/data/dummy";
import { csvToJson } from "@/services/bills.services";
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
} from "@chakra-ui/react";
import React, { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import moment from "moment";
import Loader from "@/components/Loader";

function Bills() {
  const router = useRouter();
  const [flatFiles, setFlatFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const onDrop = useCallback((acceptedFiles: any) => {
    let file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onabort = () => console.log("file reading was aborted");
    reader.onerror = () => console.log("file reading has failed");
    reader.onload = async () => {
      const res = await csvToJson(reader.result);
      setFlatFiles(res);
      console.log(res);
    };
    reader.readAsText(file);
  }, []);

  return (
    <Box>
      <Flex align="center">
        {flatFiles.length === 0 ? (
          <Dropfile onDrop={onDrop} />
        ) : (
          <>
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
                  {flatFiles.map((row) => (
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
          </>
        )}

        <Box>
          <VStack>
            <Button w="full" colorScheme="green">
              Generate Bills
            </Button>
            <Button
              w="full"
              colorScheme="red"
              onClick={() => {
                setFlatFiles([]);
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
              {isLoading && (
                <Tr>
                  <Td colSpan={6}>
                    <Loader text="Fetching Bills..." />
                  </Td>
                </Tr>
              )}
              {bills.length === 1 && (
                <Tr>
                  <Td colSpan={6}>
                    <Text textAlign="center">No bills to show</Text>
                  </Td>
                </Tr>
              )}
              {bills &&
                bills.map((bill) => (
                  <Tr
                    _hover={{
                      bg: "gray.100",
                      cursor: "pointer",
                    }}
                    color="gray.800"
                    key={bill.billId}
                    onClick={() => router.push(`./bills/${bill.billId}`)}
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
