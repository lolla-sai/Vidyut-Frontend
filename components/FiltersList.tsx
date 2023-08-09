import { HStack, Tag, TagCloseButton, TagLabel } from "@chakra-ui/react";
import React from "react";

function FiltersList({ filters, setFilter }) {
  let filtersRender = [];
  for (const key in filters) {
    if (Object.prototype.hasOwnProperty.call(filters, key)) {
      const element = filters[key];
      if (element === "") continue;
      filtersRender.push(
        <Tag
          size="lg"
          key={key}
          borderRadius="full"
          mb="8"
          variant="solid"
          colorScheme="teal"
          cursor="pointer"
          onClick={() => {
            setFilter((prevFilter) => ({ ...prevFilter, [key]: "" }));
          }}
        >
          <TagLabel>{element}</TagLabel>
          <TagCloseButton />
        </Tag>
      );
    }
  }

  if (filtersRender.length === 0) {
    return;
  }
  return (
    <HStack spacing={4}>
      {filtersRender.map((item) => item)}
      <Tag
        size="lg"
        borderRadius="full"
        mb="8"
        variant="solid"
        colorScheme="red"
        cursor="pointer"
        onClick={() => {
          let clearFilters = {};
          for (const key in filters) {
            if (Object.prototype.hasOwnProperty.call(filters, key)) {
              clearFilters[key] = "";
            }
          }
          setFilter(clearFilters);
        }}
      >
        <TagLabel>Clear Filters</TagLabel>
        <TagCloseButton />
      </Tag>
    </HStack>
  );
}

export default FiltersList;
