"use client";

import CustomInput from "@/components/CustomInput";
import Loader from "@/components/Loader";
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

  const formik = useFormik({
    initialValues: {
      currentReading: bill.data?.currentReading,
      slabs: [],
    },
    onSubmit(values) {
      console.log(values);
    },
  });

  useEffect(() => {
    if (bill.data?.currentReading) {
      console.log(bill.data);
      formik.setValues({
        currentReading: bill.data.currentReading,
        slabs: bill.data.rateDoc.slabs,
      });
    }
  }, [bill.data]);

  if (bill.isLoading) {
    return <Loader text="Loading Bill" />;
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

        <Flex direction={{ base: "column", lg: "row" }} gap="4">
          <Box mr="8" flexGrow="1">
            {/* Meter Number */}
            <CustomInputSimple
              label="Meter Number: "
              value={bill.data.meterNumber.toString()}
            />

            <CustomInput
              label="Meter Reading"
              fieldName="currentReading"
              formik={formik}
              legacy={true}
            />

            <CustomInputSimple label="Name" value={bill.data.fullName} />
            <CustomInputSimple
              label="Consumer ID: "
              value={bill.data.consumerDocId}
            />
            <CustomInputSimple
              label="Subsidy Discount"
              value={bill.data.subsidyDiscount || 0}
            />

            {/* Save Changes Button */}
            <Button
              colorScheme="green"
              variant="solid"
              size="lg"
              my="4"
              w="full"
              onClick={formik.handleSubmit}
            >
              Update Bill
            </Button>
          </Box>

          <Box flexGrow="2" mr="4">
            {/* Table with breakages */}
            <TableContainer
              // my="8"
              border="1px"
              borderColor="gray.300"
              p="4"
              rounded="xl"
            >
              <Table variant="simple">
                <TableCaption>
                  Rate Chart used to calculate the bill
                </TableCaption>
                <Thead>
                  <Tr>
                    {/* <Th isNumeric>Quantity</Th> */}
                    <Th isNumeric>Range</Th>
                    <Th isNumeric>Rate (Price per unit)</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {bill.data.rateDoc.slabs.map((slabRate, index) => (
                    <Tr key={slabRate.range}>
                      <Td isNumeric>{slabRate.range}</Td>
                      <Td isNumeric>
                        <Input
                          maxW="20ch"
                          value={slabRate.pricePerUnit}
                          // value={formik.values.rates[index]}
                          onChange={(e) => {
                            console.log(formik.values.slabs);

                            formik.setFieldValue(
                              "slabs",
                              formik.values.slabs.map((s) => {
                                if (s.range === slabRate.range) {
                                  return {
                                    ...s,
                                    pricePerUnit: e.target.value,
                                  };
                                }
                                return s;
                              })
                            );
                          }}
                          textAlign="right"
                          type="number"
                        />
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}

export default BillDetail;
function toast(arg0: { title: string; status: string; isClosable: boolean }) {
  throw new Error("Function not implemented.");
}
