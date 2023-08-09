import { Box, Input, Text, Th, useDisclosure } from "@chakra-ui/react";
import React from "react";

function THwithFilter({
  label,
  filters,
  setFilter,
  fieldName,
  ...props
}: {
  label: string;
  filters: any;
  setFilter: any;
  fieldName: string;
}) {
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();

  return (
    <Th color="gray.100" {...props}>
      <Text cursor="pointer" onClick={onToggle}>
        {label}
      </Text>

      {isOpen && (
        <Box
          position="absolute"
          bg="orange.200"
          top="100%"
          color="black"
          p="2"
          w="fit-content"
        >
          <Input
            placeholder="Enter Search Key"
            size="sm"
            value={filters[fieldName]}
            onChange={(e) => {
              setFilter((prevFilter) => ({
                ...prevFilter,
                [fieldName]: e.target.value,
              }));
            }}
            onBlur={() => onToggle()}
          />
        </Box>
      )}
    </Th>
  );
}

export default THwithFilter;
