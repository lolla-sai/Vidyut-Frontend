"use client";

import { User } from "@/data/models";
import {
  Box,
  Button,
  ButtonGroup,
  HStack,
  Input,
  Select,
  SimpleGrid,
  Spinner,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import NextLink from "next/link";
import { HiDocumentDuplicate } from "react-icons/hi";
import { AiFillCheckCircle } from "react-icons/ai";
import { MdDangerous } from "react-icons/md";
import { FiSave } from "react-icons/fi";
import { useQuery } from "react-query";
import { getConsumerApplication } from "@/services/admin.service";
import axios, { AxiosResponse } from "axios";
import { useRouter } from "next/navigation";

function ApplicationDetails({ params }: { params: { consumerId: string } }) {
  const [consumerDetail, setConsumerDetail] = useState<User | null>(null);
  const toast = useToast();
  const router = useRouter();
  const consumer = useQuery(
    ["application", { consumerId: params.consumerId }],
    getConsumerApplication,
    {
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
    }
  );

  useEffect(() => {
    setConsumerDetail(consumer.data);
  }, [consumer]);

  useEffect(() => {
    console.log(consumerDetail);
  }, [consumerDetail]);

  const handleApplicationAccept = async () => {
    if (
      consumerDetail?.sanctionedLoad !== 0 ||
      consumerDetail?.subsidyRate !== 0
    ) {
      axios
        .post(
          "http://localhost:8080/api/admin/approveConsumer",
          {
            consumerId: params.consumerId,
            sanctionedLoad: consumerDetail?.sanctionedLoad,
            subsidy: consumerDetail?.subsidyRate,
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
              title: response.message,
              status: "error",
              isClosable: true,
            });
          }
        });
    } else {
      toast({
        title: "Sanctioned Load or Subsidy cannot be 0",
        status: "error",
        isClosable: true,
      });
    }
  };

  const handleApplicationReject = () => {
    if (
      consumerDetail?.rejectionReason != null &&
      consumerDetail?.rejectionReason.trim().length != 0
    ) {
      axios
        .post(
          "http://localhost:8080/api/admin/rejectConsumer",
          {
            consumerId: params.consumerId,
            rejectionReason: consumerDetail.rejectionReason,
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
              title: response.message,
              status: "error",
              isClosable: true,
            });
          }
        });
    } else {
      toast({
        title: "Rejection reason cannot be empty",
        status: "error",
        isClosable: true,
      });
    }
  };

  const updateConsumerDetails = () => {
    axios
      .put(
        "http://localhost:8080/api/admin/updateConsumers",
        {
          consumerId: params.consumerId,
          address: consumerDetail?.address,
          phoneNumber: Number(consumerDetail?.phoneNumber),
          subsidyRate: Number(consumerDetail?.subsidyRate),
          sanctionedLoad: Number(consumerDetail?.sanctionedLoad),
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
            title: response.message,
            status: "error",
            isClosable: true,
          });
        }
      });
  };

  if (!consumerDetail) {
    return (
      <HStack p="4" mx="auto" w="fit-content" spacing="4">
        <Spinner size="lg" />
        <Text fontSize="lg">Fetching Application Details...</Text>
      </HStack>
    );
  }

  return (
    <Box>
      <title>{"Application - " + params.consumerId}</title>
      {/* Consumer Details Appear Here */}

      <Box my="4">
        {/* Name with the consumer type */}
        <HStack align="center" spacing="4" mb="4">
          <Text fontSize="2xl">
            Application from{" "}
            <Text as="span" fontWeight="bold">
              {consumerDetail.fullName}
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
            {consumerDetail.consumerType.toUpperCase()}
          </Text>
        </HStack>

        <Box mb="8">
          {consumerDetail.status === "Pending" ? (
            <ButtonGroup variant="outline" spacing="6">
              <Button
                colorScheme="green"
                onClick={() => handleApplicationAccept()}
              >
                Accept
              </Button>
              <Button
                colorScheme="red"
                onClick={() => handleApplicationReject()}
              >
                Reject
              </Button>
            </ButtonGroup>
          ) : consumerDetail.status === "Rejected" ? (
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
                Application Rejected
              </Text>
            </HStack>
          ) : (
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
                Application Accepted
              </Text>
            </HStack>
          )}
        </Box>

        <SimpleGrid columns={[1, null, null, 2]} spacing="4">
          <Box>
            {/* Consumer Id */}
            <HStack spacing="4" mb="4">
              <Text minW="15ch" fontWeight="semibold">
                Consumer ID:{" "}
              </Text>
              <Input
                defaultValue={params.consumerId}
                maxW="40ch"
                fontWeight="semibold"
                placeholder="Here is a sample placeholder"
                size="sm"
                readOnly
              />
            </HStack>

            {/* Meter Number */}
            <HStack spacing="4" mb="4">
              <Text minW="15ch" fontWeight="semibold">
                Meter Number:
              </Text>
              <Input
                defaultValue={consumerDetail.meterNumber}
                maxW="40ch"
                fontWeight="semibold"
                size="sm"
                readOnly
              />
            </HStack>

            {/* Phone Number */}
            <HStack spacing="4" mb="4">
              <Text minW="15ch" fontWeight="semibold">
                Phone Number:{" "}
              </Text>
              <Input
                defaultValue={consumerDetail.phoneNumber}
                type="number"
                maxW="40ch"
                size="sm"
                onChange={(e) => {
                  setConsumerDetail((prev) => {
                    if (prev) {
                      prev.phoneNumber = Number(e.target.value);
                    }
                    return prev;
                  });
                }}
              />
            </HStack>

            {/* Address */}
            <HStack spacing="4" mb="4">
              <Text minW="15ch" fontWeight="semibold">
                Address:
              </Text>
              <Input
                defaultValue={consumerDetail.address}
                maxW="40ch"
                size="sm"
                onChange={(e) => {
                  setConsumerDetail((prev) => {
                    if (prev) {
                      prev.address = e.target.value;
                    }
                    return prev;
                  });
                }}
              />
            </HStack>

            {/* Phase */}
            <HStack spacing="4" mb="4">
              <Text minW="15ch" fontWeight="semibold">
                Phase:
              </Text>
              <Input
                defaultValue={
                  consumerDetail.phase == 1 ? "Single phase" : "Three phase"
                }
                maxW="40ch"
                size="sm"
                readOnly
              />
            </HStack>

            {/* Sanctioned Load */}
            <HStack spacing="4" mb="4">
              <Text minW="15ch" fontWeight="semibold">
                Sanctioned Load:{" "}
              </Text>
              <Input
                defaultValue={consumerDetail.sanctionedLoad}
                maxW="40ch"
                size="sm"
                type="number"
                onChange={(e) => {
                  setConsumerDetail((prev) => {
                    if (prev) {
                      prev.sanctionedLoad = Number(e.target.value);
                    }
                    return prev;
                  });
                }}
              />
            </HStack>

            {/* Save Changes Button */}
            <Button
              leftIcon={<FiSave size="20" />}
              colorScheme="green"
              variant="solid"
              size="lg"
              my="4"
              onClick={() => updateConsumerDetails()}
            >
              Save
            </Button>
          </Box>

          <Box>
            {consumerDetail.supportingDocs.length !== 0 && (
              <>
                <Text mb="4" maxW="prose" fontFamily="custom">
                  This application is subsidized in nature. You can view the
                  supporting documents, and either accept or reject it.
                </Text>
                {/* Subsidy */}
                <HStack spacing="4" mb="4">
                  <Text minW="15ch" fontWeight="semibold">
                    Subsidy:{" "}
                  </Text>
                  <Input
                    defaultValue={consumerDetail.subsidyRate}
                    maxW="40ch"
                    size="sm"
                    type="number"
                    onChange={(e) => {
                      setConsumerDetail((prev) => {
                        if (prev) {
                          prev.subsidyRate = Number(e.target.value);
                        }
                        return prev;
                      });
                    }}
                  />
                </HStack>
                {/* Supporting Docs */}
                <Box mb="8">
                  {consumerDetail.supportingDocs.map((doc) => (
                    <Box
                      key={doc.fileName}
                      bg="gray.50"
                      boxShadow="lg"
                      border="1px"
                      borderColor="gray.400"
                      rounded="xl"
                      p="4"
                      w="64"
                      as={NextLink}
                      href={doc.url}
                      display="block"
                      mb="4"
                      target="_blank"
                    >
                      <HStack>
                        <HiDocumentDuplicate size="24" />
                        <Text>{doc.fileName}</Text>
                      </HStack>
                    </Box>
                  ))}
                </Box>

                {/* Rejection Reason */}
                <Box>
                  <Text minW="15ch" fontWeight="semibold" mb="2">
                    Rejection Reason{" "}
                    <span
                      style={{
                        color: "red",
                      }}
                    >
                      *
                    </span>
                    :
                  </Text>
                  <Textarea
                    defaultValue={consumerDetail.rejectionReason || ""}
                    maxW="500px"
                    resize="none"
                    onChange={(e) => {
                      setConsumerDetail((prev) => {
                        if (prev) {
                          prev.rejectionReason = e.target.value;
                        }
                        return prev;
                      });
                    }}
                  ></Textarea>
                </Box>
              </>
            )}
          </Box>
        </SimpleGrid>
      </Box>
    </Box>
  );
}

export default ApplicationDetails;
