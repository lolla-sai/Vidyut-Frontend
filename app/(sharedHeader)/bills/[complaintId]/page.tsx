"use client";

import CustomInput from "@/components/CustomInput";
import Loader from "@/components/Loader";
import { ConsumerType, ECSlab, IndustrialSlab } from "@/data/custom";
import { bills } from "@/data/dummy";
import { getBill, getComplaint } from "@/services/bills.services";
import {
  Box,
  Button,
  ButtonGroup,
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
  useToast,
} from "@chakra-ui/react";
import axios, { AxiosResponse } from "axios";
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

function ComplaintDetail({ params }: { complaintId: string }) {
  const toast = useToast();
  const complaint = useQuery(
    ["billDetails", { complaintId: params.complaintId }],
    getComplaint,
    {
      onError({ response, code }: { code: string; response: AxiosResponse }) {
        if (response && response.status === 400) {
          toast({
            title: "Your session is expired",
            status: "error",
            isClosable: true,
          });
          router.push("/auth/login");
        } else if (response.status === 404) {
          toast({
            title: response.data.message,
            status: "error",
            isClosable: true,
          });
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
    }
  );

  const formik = useFormik({
    initialValues: {
      currentReading: complaint.data?.currentReading,
      slabs: [],
    },
    validationSchema: Yup.object({
      currentReading: Yup.number()
        .min(1, "Reading Can't be negative")
        .max(1000000, "Reading Too Huge")
        .required("Current Reading is required field"),
      slabs: Yup.array().of(
        Yup.object().shape({
          range: Yup.string(),
          pricePerUnit: Yup.number(),
        })
      ),
    }),
    onSubmit(values) {
      console.log(values, "VALUES");
      switch (
        complaint.data.complaint.complaintType as "meterReading" | "slabRate"
      ) {
        case "meterReading":
          handleMeterReadingUpdate();
          break;
        case "slabRate":
          handleSlabRateUpdate();
          break;
      }
    },
  });

  const handleMeterReadingUpdate = () => {
    console.log(
      {
        billId: complaint.data.complaint.billDocId,
        newReading: Number(formik.values.currentReading),
      },
      "Meter Reading"
    );
    axios
      .post(
        "http://localhost:8080/api/billing/billCorrectionMeterReading",
        {
          billId: complaint.data.complaint.billDocId,
          newReading: formik.values.currentReading,
        } as {
          billId: string;
          newReading: number;
        },
        { withCredentials: true }
      )
      .then(({ data }) => {
        console.log(data);
        if (data.success) {
          toast({
            title: data.message,
            status: "success",
            isClosable: true,
          });
        }
      })
      .catch(({ response }) => {
        console.log(response);
        if (response.status == 400) {
          toast({
            title: `Session Expired`,
            status: "error",
            isClosable: true,
          });
          router.push("/auth/login");
        } else {
          toast({
            title: response.data.message,
            status: "error",
            isClosable: true,
          });
        }
      });
  };
  const handleSlabRateUpdate = () => {
    console.log(
      {
        rateType: complaint.data.consumerType,
        complaintId: params.complaintId,
        slabs: formik.values.slabs,
      },
      "SLAB"
    );
    axios
      .post(
        "http://localhost:8080/api/billing/billCorrectionSlabRate",
        {
          rateType: complaint.data.consumerType,
          complaintId: params.complaintId,
          slabs: formik.values.slabs,
        } as {
          rateType: ConsumerType;
          slabs: Array<ECSlab | IndustrialSlab>;
          complaintId: string;
        },
        { withCredentials: true }
      )
      .then(({ data }) => {
        console.log(data.message);
        if (data.success) {
          toast({
            title: data.message,
            status: "success",
            isClosable: true,
          });
        }
      })
      .catch(({ response }) => {
        console.log(response);
        if (response.status == 400) {
          toast({
            title: `Session Expired`,
            status: "error",
            isClosable: true,
          });
          router.push("/auth/login");
        } else {
          toast({
            title: response.data.message,
            status: "error",
            isClosable: true,
          });
        }
      });
  };

  const changeComplaintStatus = (type: "Resolved" | "Rejected") => {
    axios
      .put(
        "http://localhost:8080/api/admin/updateComplaintStatus",
        {
          status: type,
          complaintId: params.complaintId,
        } as { status: "Resolve" | "Rejected"; complaintId: string },
        { withCredentials: true }
      )
      .then(({ data }) => {
        if (data.success) {
          toast({
            title: data.message,
            status: "success",
            isClosable: true,
          });
        }
      })
      .catch(({ response }) => {
        console.log(response);
        if (response.status == 400) {
          toast({
            title: `Session Expired`,
            status: "error",
            isClosable: true,
          });
          router.push("/auth/login");
        } else {
          toast({
            title: response.data.error,
            status: "error",
            isClosable: true,
          });
        }
      });
  };

  useEffect(() => {
    if (complaint.data?.currentReading) {
      console.log(complaint.data);
      formik.setValues({
        currentReading: complaint.data.currentReading,
        slabs: complaint.data.rateDoc.slabs,
      });
    }

    console.log(complaint.data);
  }, [complaint.data]);

  if (complaint.isLoading || complaint.isError) {
    return <Loader text="Loading Bill" />;
  }

  return (
    <Box>
      <title>{"Bill - " + complaint.data.billDocId}</title>

      <Text fontSize="xl" fontFamily="custom">
        You can view/edit bills here. Any corrections will send a mail to the
        consumer with the latest details
      </Text>

      <Box my="4">
        {/* Bill ID the consumer type */}
        <Box>
          <HStack justify="space-between" my="6">
            <HStack>
              <Text fontSize="2xl">
                Complaint ID:{" "}
                <Text as="span" fontWeight="bold" ml="2">
                  {params.complaintId}
                </Text>
              </Text>
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
                {complaint.data.complaint.status.toUpperCase()}
              </Text>
            </HStack>
            <ButtonGroup variant="outline" spacing="6">
              <Button
                colorScheme="green"
                onClick={() => {
                  changeComplaintStatus("Resolved");
                }}
              >
                Resolve
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  changeComplaintStatus("Rejected");
                }}
              >
                Reject
              </Button>
            </ButtonGroup>
          </HStack>
        </Box>

        <HStack align="center" spacing="4" mb="4">
          <Text fontSize="2xl">
            Bill ID:
            <Text as="span" fontWeight="bold" ml="2">
              {complaint.data.complaint.billDocId}
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
            {complaint.data.consumerType.toUpperCase()}
          </Text>
        </HStack>

        {/* Payment status */}
        <Box mb="8">
          {complaint.data.paid ? (
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
              moment(complaint.data.dueDate).format("MM-DD-YYYY")
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
              value={complaint.data.meterNumber.toString()}
            />

            <CustomInputSimple label="Name" value={complaint.data.fullName} />
            <CustomInputSimple
              label="Consumer ID: "
              value={complaint.data.consumerDocId}
            />
            <CustomInputSimple
              label="Subsidy Discount"
              value={complaint.data.subsidyDiscount || 0}
            />
            {complaint.data.complaint.complaintType == "meterReading" ? (
              <CustomInput
                label="Meter Reading"
                fieldName="currentReading"
                type="number"
                formik={formik}
                legacy={true}
              />
            ) : (
              <></>
            )}

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

          <Box
            flexGrow="2"
            mr="4"
            visibility={
              complaint.data.complaint.complaintType == "slabRate"
                ? "visible"
                : "hidden"
            }
          >
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
                  {formik.values.slabs.map((slabRate, index) => (
                    <Tr key={slabRate.range}>
                      <Td isNumeric>{slabRate.range}</Td>
                      <Td isNumeric>
                        <Input
                          maxW="20ch"
                          value={slabRate.pricePerUnit.toString()}
                          // value={formik.values.rates[index]}
                          onChange={(e) => {
                            formik.setFieldValue(
                              "slabs",
                              formik.values.slabs.map((s) => {
                                if (s.range === slabRate.range) {
                                  return {
                                    ...s,
                                    pricePerUnit: parseFloat(e.target.value),
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

export default ComplaintDetail;
function toast(arg0: { title: string; status: string; isClosable: boolean }) {
  throw new Error("Function not implemented.");
}
