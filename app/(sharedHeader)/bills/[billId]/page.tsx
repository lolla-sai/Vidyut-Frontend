"use client";

import CustomInput from "@/components/CustomInput";
import { bills } from "@/data/dummy";
import {
  Box,
  Button,
  HStack,
  Input,
  SimpleGrid,
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
import { useFormik } from "formik";
import moment from "moment";
import React from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import { FiSave } from "react-icons/fi";
import { MdDangerous } from "react-icons/md";
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
  const bill = bills[0];

  return (
    <Box>
      <title>{"Bill - " + params.billId}</title>

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
              {bill.billId}
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
          {bill.paid ? (
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
          ) : moment().isBefore(moment(bill.dueDate).format("MM-DD-YYYY")) ? (
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
              value={bill.meterNumber.toString()}
            />

            {/* Meter Reading */}
            <CustomInputSimple
              label="Meter Reading: "
              value={bill.currentReading.toString()}
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
                  {bill.breakage.map((slabRate) => (
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
                        Rs. {bill.totalCharge}
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
            <CustomInputSimple label="Name" value={bill.fullName} />
            <CustomInputSimple
              label="Consumer ID: "
              value={bill.consumerDocId}
            />
            <CustomInputSimple
              label="Subsidy Discount"
              value={bill.subsidyDiscount}
            />
          </Box>
        </SimpleGrid>
      </Box>
    </Box>
  );
}

export default BillDetail;
