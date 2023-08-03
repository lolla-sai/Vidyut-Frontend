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
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import NextLink from "next/link";
import { HiDocumentDuplicate } from "react-icons/hi";
import { AiFillCheckCircle } from "react-icons/ai";
import { MdDangerous } from "react-icons/md";
import { applications } from "@/data/dummy";
import { FiSave } from "react-icons/fi";

function ApplicationDetails({ params }: { params: { consumerId: string } }) {
  const [consumerDetail, setConsumerDetail] = useState<User | null>(null);

  useEffect(() => {
    let applicationDetail = applications.filter(
      (val) => val.consumerId === parseInt(params.consumerId)
    )[0];

    setTimeout(() => setConsumerDetail(applicationDetail), 2000);
  }, []);

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
              <Button colorScheme="green">Accept</Button>
              <Button colorScheme="red">Reject</Button>
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
                value={consumerDetail.consumerId}
                maxW="40ch"
                fontWeight="semibold"
                placeholder="Here is a sample placeholder"
                size="sm"
              />
            </HStack>

            {/* Meter Number */}
            <HStack spacing="4" mb="4">
              <Text minW="15ch" fontWeight="semibold">
                Meter Number:
              </Text>
              <Input
                value={consumerDetail.meterNumber}
                maxW="40ch"
                fontWeight="semibold"
                size="sm"
              />
            </HStack>

            {/* Phone Number */}
            <HStack spacing="4" mb="4">
              <Text minW="15ch" fontWeight="semibold">
                Phone Number:{" "}
              </Text>
              <Input value={consumerDetail.phoneNumber} maxW="40ch" size="sm" />
            </HStack>

            {/* Address */}
            <HStack spacing="4" mb="4">
              <Text minW="15ch" fontWeight="semibold">
                Address:
              </Text>
              <Input value={consumerDetail.address} maxW="40ch" size="sm" />
            </HStack>

            {/* Phase */}
            <HStack spacing="4" mb="4">
              <Text minW="15ch" fontWeight="semibold">
                Phase:
              </Text>
              <Select variant="outline" maxW="30ch" size="sm">
                <option value="single" selected>
                  Single
                </option>
                <option value="three">Multi-Phase(3)</option>
              </Select>
            </HStack>

            {/* Sanctioned Load */}
            <HStack spacing="4" mb="4">
              <Text minW="15ch" fontWeight="semibold">
                Sanctioned Load:{" "}
              </Text>
              <Input
                value={consumerDetail.sactionedLoad}
                maxW="40ch"
                size="sm"
              />
            </HStack>

            {/* Save Changes Button */}
            <Button
              leftIcon={<FiSave size="20" />}
              colorScheme="green"
              variant="solid"
              size="lg"
              my="4"
            >
              Save
            </Button>
          </Box>

          <Box>
            {consumerDetail.subsidyRate !== 0 && (
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
                    value={consumerDetail.subsidyRate}
                    maxW="40ch"
                    size="sm"
                  />
                </HStack>
                {/* Supporting Docs */}
                <Box mb="8">
                  {consumerDetail.supportingDocs.map((doc) => (
                    <Box
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
                    Rejection Reason:
                  </Text>
                  <Textarea
                    value={consumerDetail.rejectionReason || ""}
                    maxW="500px"
                    resize="none"
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
