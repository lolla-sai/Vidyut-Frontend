import { Box, Button, Flex, Text, VStack } from "@chakra-ui/react";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
// import Papa from "papaparse";

function DropzoneComponent({ onDrop }) {
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept: {
      "text/csv": [".csv"],
    },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024, // max 5mb of file
  });

  return (
    <Box flexGrow={1}>
      <VStack
        {...getRootProps()}
        align="center"
        p={{ base: "12", md: "20" }}
        fontSize="sm"
        borderWidth="3px"
        rounded="sm"
        borderStyle="dashed"
        bg={
          isDragActive ? (isDragAccept ? "green.100" : "red.100") : "orange.100"
        }
        color={
          isDragActive ? (isDragAccept ? "green.600" : "red.600") : "orange.600"
        }
        w="90%"
        mx="auto"
        my="4"
        cursor="pointer"
        borderColor={
          isDragActive ? (isDragAccept ? "green.400" : "red.400") : "orange.400"
        }
      >
        <input {...getInputProps()} />
        {isDragActive && isDragAccept ? (
          <Text textAlign="center">Release to Upload</Text>
        ) : isDragReject ? (
          <Text textAlign="center">File Type is not supported</Text>
        ) : (
          <Text textAlign="center">
            Drag and drop the flat file here, to generate bills
          </Text>
        )}
      </VStack>
    </Box>
  );
}

export default DropzoneComponent;
