"use client";

import { ConsumerType } from "@/data/custom";
import { commercialSlab, domesticSlabs, industrialSlabs } from "@/data/dummy";
import { CommercialRate, DomesticRate, IndustrialRate } from "@/data/models";
import {
  Box,
  Flex,
  HStack,
  Input,
  Select,
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
  VStack,
} from "@chakra-ui/react";

import React, { useEffect, useState } from "react";

function page({
  searchParams: { type },
}: {
  searchParams: { type: ConsumerType | null };
}) {
  const [loading, setLoading] = useState<boolean>(false);
  const [consumerType, setConsumerType] = useState<ConsumerType | string>(
    type || ""
  );
  const [rateCard, setRateCard] = useState<
    DomesticRate | IndustrialRate | CommercialRate | null
  >(null);

  useEffect(() => {
    if (consumerType !== "") {
      setLoading(true);

      setTimeout(() => {
        switch (consumerType) {
          case "domestic":
            setRateCard(domesticSlabs);
            break;

          case "commercial":
            setRateCard(commercialSlab);
            break;

          case "industrial":
            setRateCard(industrialSlabs);
            break;

          default:
            break;
        }
        setLoading(false);
      }, 2000);
    }
  }, [consumerType]);

  return (
    <Box>
      {/* Consumer Type selection */}
      <VStack align="start">
        <Text>
          Select a consumer type to view/edit rates. Click on the rates, and
          edit them.
        </Text>
        <Select
          value={consumerType}
          onChange={(e) => {
            setConsumerType(
              ["domestic", "commercial", "industrial"].indexOf(
                e.target.value
              ) !== -1
                ? e.target.value
                : ""
            );
          }}
          placeholder="Select option"
          size="lg"
          w="300px"
        >
          <option value="domestic">Domestic</option>
          <option value="commercial">Commercial</option>
          <option value="industrial">Industrial</option>
        </Select>
      </VStack>

      {/* If consumer type is not selected, show a message */}
      {/* Else show the slabs relevant to the selected consumer type */}
      {consumerType === "" ? (
        <Text textAlign="center" my="10vh">
          Select a consumer type to get started.
        </Text>
      ) : (
        <>
          {loading ? (
            <>
              {/* Loading Spinner */}
              <Flex align="center" justify="center" p="4" my="12">
                <HStack spacing="4">
                  <Spinner size="lg" />
                  <Text>Fetching Slabs</Text>
                </HStack>
              </Flex>
            </>
          ) : (
            <>
              {/* Fixed Charges Display */}
              <Box my="8">
                {consumerType === "commercial" ? (
                  <TableContainer
                    my="8"
                    border="1px"
                    borderColor="gray.300"
                    p="4"
                    rounded="xl"
                  >
                    <Table variant="simple">
                      <TableCaption>
                        Slab Wise Per Fixed Charges (All prices per KW of
                        santioned load)
                      </TableCaption>
                      <Thead>
                        <Tr>
                          <Th fontSize="lg">Slab</Th>
                          <Th fontSize="lg" isNumeric>
                            Price Per KW
                          </Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {rateCard?.fixedChargeRate.map((slabRate) => (
                          <Tr>
                            <Td>{slabRate.range}</Td>
                            <Td isNumeric>
                              <Input
                                textAlign="right"
                                maxW="20ch"
                                value={slabRate.pricePerUnit}
                              />
                            </Td>
                          </Tr>
                        ))}
                      </Tbody>
                    </Table>
                  </TableContainer>
                ) : (
                  <HStack spacing="4" mb="4">
                    <Text minW="15ch" fontWeight="semibold">
                      Fixed Charges (Rate per unit):
                    </Text>
                    <Input
                      value={(rateCard?.fixedChargeRate || "").toString()}
                      maxW="40ch"
                      size="sm"
                    />
                  </HStack>
                )}
              </Box>

              {/* Displaying slabs of energy charges starts */}
              <TableContainer
                my="8"
                border="1px"
                borderColor="gray.300"
                p="4"
                rounded="xl"
              >
                <Table variant="simple">
                  <TableCaption>
                    Slab Wise Per Unit Price (All prices in Rupees)
                  </TableCaption>
                  <Thead>
                    <Tr>
                      <Th fontSize="lg">Slab</Th>
                      <Th fontSize="lg" isNumeric>
                        Price Per Unit
                      </Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {rateCard?.slabs.map((slabRate) => (
                      <Tr key={consumerType + slabRate.range}>
                        <Td>{slabRate.range}</Td>
                        <Td isNumeric>
                          <Input
                            maxW="20ch"
                            textAlign="right"
                            value={slabRate.pricePerUnit}
                          />
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
            </>
          )}
        </>
      )}
    </Box>
  );
}

export default page;
