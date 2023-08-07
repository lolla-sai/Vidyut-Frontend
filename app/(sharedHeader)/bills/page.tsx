"use client";

import Dropfile from "@/components/DropFile";
import {
  Box,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

function Bills() {
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    console.log(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Box>
      <Dropfile />

      <Box my="4">
        <Heading size="xl" mb="4">
          All Bills
        </Heading>
        <Text mb="6" fontFamily="custom">
          Here, you can find all the bills generated
        </Text>

        {/* Applications */}
        <TableContainer rounded="xl" border="1px" borderColor="orange.100">
          <Table variant="simple">
            <Thead bg="orange.400">
              <Tr>
                <Th color="gray.100" isNumeric>
                  Consumer Type
                </Th>
                <Th color="gray.100" isNumeric>
                  C.A. Number
                </Th>
                {/* <Th color="gray.100" isNumeric>
                  Meter Number
                </Th> */}
                <Th color="gray.100">Full Name</Th>
                <Th color="gray.100">Consumption</Th>
                <Th color="gray.100">Bill Date</Th>
                <Th color="gray.100">Total Charge</Th>
                {/* <Th color="gray.100">Payment Status</Th> */}
              </Tr>
            </Thead>
            <Tbody>
              {[].map((application) => (
                <Tr
                  _hover={{
                    bg: "gray.100",
                    cursor: "pointer",
                  }}
                ></Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}

export default Bills;
