"use client";

import CustomInput from "@/components/CustomInput";
import { bills } from "@/data/dummy";
import { getBill } from "@/services/bills.services";
import {
  Box,
  Button,
  Flex,
  HStack,
  Input,
  SimpleGrid,
  Spinner,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { AxiosResponse } from "axios";
import { useFormik } from "formik";
import moment from "moment";
import router from "next/router";
import React, { useEffect } from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import { FiSave } from "react-icons/fi";
import { MdDangerous } from "react-icons/md";
import { useQuery } from "react-query";
import * as Yup from "yup";

function CustomInputSimple({
  label,
  value,
  ...props
}: {
  label: string;
  value: string;
}) {
  return (
    <HStack spacing="4" mb="4">
      <Text minW="15ch" fontWeight="semibold">
        {label}
      </Text>
      <Input
        maxW="40ch"
        fontWeight="semibold"
        placeholder="Bill ID"
        size="sm"
        value={value}
        readOnly={true}
        {...props}
      />
    </HStack>
  );
}

function BillDetail({ params }: { params: { billId: string } }) {
  const bill = useQuery(["billDetails", { billId: params.billId }], getBill, {
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
    console.log(bill);
  }, [bill]);

  if (bill.isLoading) {
    return (
      <>
        {/* Loading Spinner */}
        <Flex align="center" justify="center" p="4" my="12">
          <HStack spacing="4">
            <Spinner size="lg" />
            <Text>Loading Bill</Text>
          </HStack>
        </Flex>
      </>
    );
  }

  return (
    <Box>
      <title>{"Bill - " + bill.data.billDocId}</title>

      <Text fontSize="xl" fontFamily="custom">
        You can view/edit bills here. Any corrections will send a mail to the
        consumer with the latest details
      </Text>

      <Box my="4">
        {/* Bill ID the consumer type */}
        <HStack align="center" spacing="4" mb="4">
          <Text fontSize="2xl">
            Bill ID:
            <Text as="span" fontWeight="bold" ml="2">
              {bill.data.billDocId}
            </Text>
          </Text>

          {/* Consumer Type */}
          <Text
            px="4"
            py="2"
            bg="black"
            color="white"
            w="fit-content"
            rounded="3xl"
            fontSize="xs"
            fontWeight="bold"
          >
            {"Domestic".toUpperCase()}
            {/* {bill.consumerDetail.consumerType.toUpperCase()} */}
          </Text>
        </HStack>

        {/* Payment status */}
        <Box mb="8">
          {bill.data.paid ? (
            <HStack
              bg="green.400"
              mb="4"
              w="fit-content"
              rounded="3xl"
              px="4"
              py="2"
            >
              <AiFillCheckCircle size="20" color="white" />
              <Text color="white" fontSize="sm" fontWeight="semibold">
                Bill Paid
              </Text>
            </HStack>
          ) : moment().isBefore(
              moment(bill.data.dueDate).format("MM-DD-YYYY")
            ) ? (
            <HStack
              bg="yellow.600"
              mb="4"
              w="fit-content"
              rounded="3xl"
              px="4"
              py="2"
            >
              <MdDangerous size="20" color="white" />
              <Text color="white" fontSize="sm" fontWeight="semibold">
                Not Paid
              </Text>
            </HStack>
          ) : (
            <HStack
              bg="red.500"
              mb="4"
              w="fit-content"
              rounded="3xl"
              px="4"
              py="2"
            >
              <MdDangerous size="20" color="white" />
              <Text color="white" fontSize="sm" fontWeight="semibold">
                Overdue and Not Paid
              </Text>
            </HStack>
          )}
        </Box>

        <SimpleGrid columns={[1, null, null, 2]} spacing="4">
          <Box mr="8">
            {/* Meter Number */}
            <CustomInputSimple
              label="Meter Number: "
              value={bill.data.meterNumber.toString()}
            />

            {/* Meter Reading */}
            <CustomInputSimple
              label="Meter Reading: "
              value={bill.data.currentReading.toString()}
              readOnly={false}
            />

            {/* Table with breakages */}
            <TableContainer
              my="8"
              border="1px"
              borderColor="gray.300"
              p="4"
              rounded="xl"
            >
              <Table variant="simple">
                <TableCaption>Energy Charges in Bill Calculation</TableCaption>
                <Thead>
                  <Tr>
                    <Th fontSize="lg" isNumeric>
                      Quantity
                    </Th>
                    <Th fontSize="lg" isNumeric>
                      Rate
                    </Th>
                    <Th fontSize="lg" isNumeric>
                      Amount
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {bill.data.breakage.map((slabRate) => (
                    <Tr key={slabRate.rate}>
                      <Td isNumeric>{slabRate.quantity}</Td>
                      <Td isNumeric>
                        <Input
                          maxW="20ch"
                          textAlign="right"
                          defaultValue={slabRate.rate}
                          type="number"
                          onChange={(e) => {}}
                        />
                      </Td>
                      <Td isNumeric fontWeight="bold">
                        {slabRate.amount}
                      </Td>
                    </Tr>
                  ))}
                  <Tr>
                    <Td></Td>
                    <Td isNumeric colSpan={2}>
                      Total:{" "}
                      <Text as="span" fontWeight="bold">
                        Rs. {bill.data.totalCharge}
                      </Text>
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>

            {/* Save Changes Button */}
            <Button
              leftIcon={<FiSave size="20" />}
              colorScheme="green"
              variant="solid"
              size="lg"
              my="4"
              // onClick={() => updateConsumerDetails()}
            >
              Save
            </Button>
          </Box>

          <Box>
            <CustomInputSimple label="Name" value={bill.data.fullName} />
            <CustomInputSimple
              label="Consumer ID: "
              value={bill.data.consumerDocId}
            />
            <CustomInputSimple
              label="Subsidy Discount"
              value={bill.data.subsidyDiscount}
            />
          </Box>
        </SimpleGrid>
      </Box>
    </Box>
  );
}

export default BillDetail;
function toast(arg0: { title: string; status: string; isClosable: boolean }) {
  throw new Error("Function not implemented.");
}
