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
import axios, { AxiosResponse } from "axios";
import {
  CreateOrUpdateCommercialRate,
  CreateOrUpdateDomesticRate,
  CreateOrUpdateIndustrialRate,
} from "@/types/requestBody.types";
import moment from "moment";
import { useRouter } from "next-nprogress-bar";

function page({
  searchParams: { type },
}: {
  searchParams: { type: ConsumerType | null };
}) {
  const [consumerType, setConsumerType] = useState<ConsumerType | null>(
    type || ""
  );
  const [rateCard, setRateCard] = useState<
    DomesticRate | IndustrialRate | CommercialRate | null
  >(null);
  const rates: UseQueryResult<{
    domesticRate: DomesticRate;
    commercialRate: CommercialRate;
    industrialRate: IndustrialRate;
  }> = useQuery({
    queryKey: "rates",
    queryFn: getCurrentRates,
    onError({ response, code }: { code: string; response: AxiosResponse }) {
      console.log(response);
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
  const [fixedChargeRate, setFixedChargeRate] = useState<
    number | Array<CommercialFCSlab> | undefined
  >(rateCard?.fixedChargeRate);
  const [slabs, setSlabs] = useState<
    Array<ECSlab> | Array<IndustrialSlab> | undefined
  >(rateCard?.slabs);
  const [validTill, setValidTill] = useState<null | string>(null);
  const toast = useToast();
  const router = useRouter();

  useEffect(() => {
    if (rates.data) {
      switch (consumerType) {
        case "Domestic":
          setRateCard(rates.data.domesticRate);
          console.log("Setting Domestic");
          break;
        case "Commercial":
          setRateCard(rates.data.commercialRate);
          console.log("Setting Commercial");
          break;
        case "Industrial":
          setRateCard(rates.data.industrialRate);
          console.log("Setting Industrial");
          break;
      }
    }
  }, [consumerType]);

  const handleAddNewRateOrUpdate = async (type: string) => {
    if (moment().isAfter(moment(validTill))) {
      toast({
        title: "Validity cannot be in the past",
        status: "error",
        isClosable: true,
      });
      return;
    }

    axios
      .post(
        `http://localhost:8080/api/billing/${type}`,
        {
          fixedChargeRate: fixedChargeRate,
          slabs: rateCard?.slabs,
          rateType: consumerType,
          validTill: validTill == null ? rateCard?.validTill : validTill,
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
          rates.refetch();
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
    console.log(rates, "RATES");
  }, [rates]);

  useEffect(() => {
    console.log(validTill, "Valid Till");
  }, [validTill]);

  useEffect(() => {
    setFixedChargeRate(rateCard?.fixedChargeRate);
    setSlabs(rateCard?.slabs);
    console.log(rateCard, "RATE CARD CHANGED");
    console.log(
      moment(rateCard?.validTill).format("MM-DD-YYYY"),
      rateCard?.validTill,
      "VALID TILL"
    );
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
                  rates.refetch();
                  break;
                case "Domestic":
                  setConsumerType("Domestic");
                  rates.refetch();
                  break;
                case "Industrial":
                  setConsumerType("Industrial");
                  rates.refetch();
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
                        key={rateCard?.validTill}
                        type="date"
                        maxW="17ch"
                        defaultValue={moment(rateCard?.validTill)
                          .format("YYYY-MM-DD")
                          .toString()}
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
                            defaultValue={rateCard?.fixedChargeRate}
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
                            key={rateCard?.validTill}
                            type="date"
                            defaultValue={moment(rateCard?.validTill)
                              .format("YYYY-MM-DD")
                              .toString()}
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
                    {consumerType &&
                      rateCard &&
                      rateCard.slabs.map((slabRate) => (
                        <Tr
                          key={
                            consumerType +
                            slabRate.range +
                            slabRate.pricePerUnit
                          }
                        >
                          <Td>{slabRate.range}</Td>
                          <Td isNumeric>
                            <Input
                              key={slabRate.range}
                              maxW="20ch"
                              textAlign="right"
                              defaultValue={slabRate.pricePerUnit}
                              type="number"
                              onChange={(e) => {
                                setRateCard((prev) => {
                                  prev?.slabs.map((slab) => {
                                    if (slab.range == slabRate.range) {
                                      slab.pricePerUnit = Number(
                                        e.target.value
                                      );
                                    }
                                  });
                                  return prev;
                                });
                                return;
                              }}
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
