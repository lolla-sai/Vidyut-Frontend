"use client";

import {
  CommercialFCSlab,
  ConsumerType,
  ECSlab,
  IndustrialSlab,
} from "@/data/custom";
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
  useToast,
} from "@chakra-ui/react";

import React, { useEffect, useState } from "react";
import { UseQueryResult, useQuery } from "react-query";
import { getCurrentRates } from "@/services/admin.service";
import axios from "axios";
import {
  CreateOrUpdateCommercialRate,
  CreateOrUpdateDomesticRate,
  CreateOrUpdateIndustrialRate,
} from "@/types/requestBody.types";
import moment from "moment";
import { useRouter } from "next/navigation";

function page({
  searchParams: { type },
}: {
  searchParams: { type: ConsumerType | null };
}) {
  const [consumerType, setConsumerType] = useState<ConsumerType | null>(
    type || "Commercial"
  );
  const [rateCard, setRateCard] = useState<
    DomesticRate | IndustrialRate | CommercialRate | null
  >(null);
  const rates: UseQueryResult<{
    domesticRate: DomesticRate;
    commercialRate: CommercialRate;
    industrialRate: IndustrialRate;
  }> = useQuery({ queryKey: "rates", queryFn: getCurrentRates });
  const [fixedChargeRate, setFixedChargeRate] = useState<
    number | Array<CommercialFCSlab> | undefined
  >(rateCard?.fixedChargeRate);
  const [slabs, setSlabs] = useState<
    Array<ECSlab> | Array<IndustrialSlab> | undefined
  >(rateCard?.slabs);
  const [validTill, setValidTill] = useState<string>(
    moment().format("MM-DD-YYYY").toString()
  );
  const toast = useToast();
  const router = useRouter();

  useEffect(() => {
    if (rates.data) {
      switch (consumerType) {
        case "Domestic":
          setRateCard(rates.data?.domesticRate);
          break;
        case "Commercial":
          setRateCard(rates.data?.commercialRate);
          break;
        case "Industrial":
          setRateCard(rates.data?.industrialRate);
          break;
      }
    }
  }, [consumerType, rates.data]);

  const handleAddNewRateOrUpdate = async (type: string) => {
    axios
      .post(
        `http://localhost:8080/api/billing/${type}`,
        {
          fixedChargeRate: fixedChargeRate,
          slabs: slabs,
          rateType: consumerType,
          validTill: validTill,
        } as
          | CreateOrUpdateDomesticRate
          | CreateOrUpdateCommercialRate
          | CreateOrUpdateIndustrialRate,
        { withCredentials: true }
      )
      .then(({ data }) => {
        console.log(data.message);
        if (data.success) {
          toast({
            title: `${
              type == "createRate" ? "Created" : "Updated"
            } rates successfully`,
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

  useEffect(() => {
    console.log(fixedChargeRate, "Fixed Charge");
  }, [fixedChargeRate]);

  useEffect(() => {
    console.log(slabs, "Slabs");
  }, [slabs]);

  useEffect(() => {
    console.log(validTill, "Valid Till");
  }, [validTill]);

  useEffect(() => {
    setFixedChargeRate(rateCard?.fixedChargeRate);
    setSlabs(rateCard?.slabs);
  }, [rateCard]);

  return (
    <Box>
      {/* Consumer Type selection */}
      <VStack align="start">
        <Text>
          Select a consumer type to view/edit rates. Click on the rates, and
          edit them.
        </Text>
        <HStack justifyContent={"space-between"} w={"100%"}>
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

          <HStack spacing={"2"} alignItems={"center"}>
            <Button
              colorScheme="orange"
              variant="solid"
              onClick={() => {
                handleAddNewRateOrUpdate("createRate");
              }}
            >
              Add new
            </Button>
            <Button
              colorScheme="orange"
              variant="outline"
              onClick={() => {
                handleAddNewRateOrUpdate("updateRate");
              }}
            >
              Save
            </Button>
          </HStack>
        </HStack>
      </VStack>

      {/* If consumer type is not selected, show a message */}
      {/* Else show the slabs relevant to the selected consumer type */}
      {!consumerType ? (
        <Text textAlign="center" my="10vh">
          Select a consumer type to get started.
        </Text>
      ) : (
        <>
          {rates.isLoading ? (
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
                  <>
                    <HStack alignSelf={"flex-end"}>
                      <Text fontWeight="semibold" whiteSpace={"nowrap"}>
                        Valid Till:
                      </Text>
                      <Input
                        key={rateCard?.id}
                        type="date"
                        maxW="17ch"
                        defaultValue={moment(rateCard?.validTill)
                          .toISOString()
                          .substring(0, 10)}
                        onChange={(e) => {
                          setValidTill(
                            moment(e.target.value)
                              .format("MM-DD-YYYY")
                              .toString()
                          );
                        }}
                      />
                    </HStack>

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
                                  type="number"
                                  textAlign="right"
                                  maxW="20ch"
                                  value={slabRate.pricePerUnit}
                                  onChange={(e) => {
                                    setFixedChargeRate(
                                      (prev: CommercialFCSlab[]) => {
                                        var updatedFixedCharge = prev.map(
                                          (slab) => {
                                            if (slab.range == slabRate.range) {
                                              slab.pricePerUnit = Number(
                                                e.target.value
                                              );
                                            }

                                            return slab;
                                          }
                                        );
                                        console.log({
                                          updatedFixedCharge,
                                          ...prev,
                                        });
                                        return updatedFixedCharge;
                                      }
                                    );
                                  }}
                                />
                              </Td>
                            </Tr>
                          ))}
                        </Tbody>
                      </Table>
                    </TableContainer>
                  </>
                ) : (
                  <VStack alignItems={"start"}>
                    <HStack
                      spacing="4"
                      w={"100%"}
                      justifyContent={"space-between"}
                      alignItems={"center"}
                    >
                      <HStack>
                        <Text minW="15ch" fontWeight="semibold">
                          Fixed Charges (Rate per unit):
                        </Text>
                        {rateCard?.type == "Commercial" ? (
                          <></>
                        ) : (
                          <Input
                            key={rateCard?.id}
                            type="number"
                            defaultValue={(
                              rateCard?.fixedChargeRate || ""
                            ).toString()}
                            maxW="10ch"
                            size="sm"
                            onChange={(e) => {
                              setFixedChargeRate(Number(e.target.value));
                            }}
                          />
                        )}
                      </HStack>
                      <HStack alignSelf={"flex-end"}>
                        <Text fontWeight="semibold" whiteSpace={"nowrap"}>
                          Valid Till:
                        </Text>
                        {rateCard?.type == "Commercial" ? (
                          <></>
                        ) : (
                          <Input
                            key={rateCard?.id}
                            type="date"
                            defaultValue={moment(rateCard?.validTill)
                              .toISOString()
                              .substring(0, 10)}
                            onChange={(e) => {
                              setValidTill(
                                moment(e.target.value)
                                  .format("MM-DD-YYYY")
                                  .toString()
                              );
                            }}
                          />
                        )}
                      </HStack>
                    </HStack>
                  </VStack>
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
                            type="number"
                            onChange={(e) => {
                              setSlabs((prev: ECSlab[] | IndustrialSlab[]) => {
                                var updatedUnitCharge = prev.map((slab) => {
                                  if (slab.range == slabRate.range) {
                                    slab.pricePerUnit = Number(e.target.value);
                                  }

                                  return slab;
                                });

                                return updatedUnitCharge;
                              });
                            }}
                          />
                        </Td>
                      </Tr>
                    ))}
                    {/* <Tr key={`${consumerType} rate valid till`}>
                      <Td>Valid Till</Td>
                      <Td isNumeric>
                        <Input
                          maxW="20ch"
                          textAlign="right"
                          type="date"
                        />
                      </Td>
                    </Tr> */}
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
