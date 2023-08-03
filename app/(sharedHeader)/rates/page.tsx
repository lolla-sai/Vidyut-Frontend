"use client";

import { ConsumerType } from "@/data/custom";
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
  Tfoot,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function page({
  searchParams: { type },
}: {
  searchParams: { type: ConsumerType | null };
}) {
  const [loading, setLoading] = useState<boolean>(false);
  const [consumerType, setConsumerType] = useState(type || "");

  // useEffect(() => {
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 4000);
  // }, [consumerType]);

  return (
    <Box>
      {/* Consumer Type selection */}
      <VStack align="start">
        <Text>Select a consumer type to view/edit rates</Text>
        <Select
          value={consumerType}
          onChange={(e) => {
            setConsumerType(e.target.value);
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

      {/* Loading On Input */}
      {loading && (
        <Flex align="center" justify="center" p="4" my="12">
          <HStack spacing="4">
            <Spinner size="lg" />
            <Text>Fetching Slabs</Text>
          </HStack>
        </Flex>
      )}

      {/* Slab Display Starts */}
      <TableContainer
        my="8"
        boxShadow="md"
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
              <Th>Slab</Th>
              <Th isNumeric>Price Per Unit</Th>
              {/* <Th isNumeric>multiply by</Th> */}
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>0 - 100</Td>
              <Td isNumeric>
                <Input maxW="20ch" textAlign="right" value="1.61" />
              </Td>
            </Tr>
            <Tr>
              <Td>100-200</Td>
              <Td isNumeric>
                <Input maxW="20ch" textAlign="right" value="2.31" />
              </Td>
            </Tr>
            <Tr>
              <Td>200-300</Td>
              <Td isNumeric>
                <Input maxW="20ch" value="2.97" textAlign="right" />
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default page;
