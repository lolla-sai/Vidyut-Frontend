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
  Button,
  Spacer,
} from "@chakra-ui/react";

import React, { useEffect, useState } from "react";
import { UseQueryResult, useQuery } from "react-query";
import { getCurrentRates } from "@/services/admin.service";
import axios from "axios";

function page({
  searchParams: { type },
}: {
  searchParams: { type: ConsumerType | null };
}) {
  const [loading, setLoading] = useState<boolean>(false);
  const [consumerType, setConsumerType] = useState<ConsumerType | null>(
    type || null
  );
  const [rateCard, setRateCard] = useState<
    DomesticRate | IndustrialRate | CommercialRate | null
  >(null);
  const rates: UseQueryResult<{
    domesticRate: DomesticRate;
    commercialRate: CommercialRate;
    industrialRate: IndustrialRate;
  }> = useQuery("rates", getCurrentRates);

  useEffect(() => {
    console.log("Value Changed");
    setLoading(true);
    if (rates.data) {
      switch (consumerType) {
        case "Domestic":
          console.log(rates.data);
          setRateCard(rates.data?.domesticRate);
          break;
        case "Commercial":
          setRateCard(rates.data?.commercialRate);
          break;
        case "Industrial":
          setRateCard(rates.data?.industrialRate);
          break;
      }
      setLoading(false);
    }
  }, [consumerType, rates.data]);

  const handleAddNewRate = async () => {
    const res = (await axios.post("http://localhost:8080/api/admin/createRate", {

    }, { withCredentials: true })).data;
  }

  useEffect(() => {
    console.log(rateCard);
  }, [rateCard]);

  return (
    <Box>
      {/* Consumer Type selection */}
      <VStack align="start">
        <Text>
          Select a consumer type to view/edit rates. Click on the rates, and
          edit them.
        </Text>
        <Select
          value={consumerType ? (consumerType as string) : ""}
          onChange={(e) => {
            switch (e.target.value as ConsumerType) {
              case "Commercial":
                setConsumerType("Commercial");
                break;
              case "Domestic":
                setConsumerType("Domestic");
                break;
              case "Industrial":
                setConsumerType("Industrial");
                break;
              default:
                setConsumerType(null);
                break;
            }
          }}
          placeholder="Select option"
          size="lg"
          w="300px"
        >
          <option value="Domestic">Domestic</option>
          <option value="Commercial">Commercial</option>
          <option value="Industrial">Industrial</option>
        </Select>
      </VStack>

      {/* If consumer type is not selected, show a message */}
      {/* Else show the slabs relevant to the selected consumer type */}
      {!consumerType ? (
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
                {consumerType === "Commercial" &&
                rateCard?.type == "Commercial" ? (
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
                          <Tr key={slabRate.range}>
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
                  <Flex>
                    <HStack spacing="4" mb="4" w={"2xl"}>
                      <Text minW="15ch" fontWeight="semibold">
                        Fixed Charges (Rate per unit):
                      </Text>
                      {rateCard?.type == "Commercial" ? (
                        <></>
                      ) : (
                        <Input
                          key={rateCard?.id}
                          defaultValue={(
                            rateCard?.fixedChargeRate || ""
                          ).toString()}
                          maxW="40ch"
                          size="sm"
                        />
                      )}
                    </HStack>
                    <Spacer />
                    <HStack spacing={"2"}>
                      <Button
                        colorScheme="orange"
                        variant="solid"
                        onClick={() => {
                          handleAddNewRate();
                        }}
                      >
                        Add new
                      </Button>
                      <Button colorScheme="orange" variant="outline">
                        Save
                      </Button>
                    </HStack>
                  </Flex>
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
                            key={slabRate.range}
                            maxW="20ch"
                            textAlign="right"
                            defaultValue={slabRate.pricePerUnit}
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
