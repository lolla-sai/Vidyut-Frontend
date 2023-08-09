"use client";

import { ConsumerType } from "@/data/custom";
import {
  Heading,
  Text,
  Box,
  HStack,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  useToast,
  Spinner,
  Input,
  Tag,
  TagCloseButton,
  TagLabel,
} from "@chakra-ui/react";

import { AiFillShop, AiFillHome } from "react-icons/ai";
import { BiSolidFactory } from "react-icons/bi";
import { useRouter } from "next-nprogress-bar";
import { useQuery } from "react-query";
import { getCurrentApplicationList } from "@/services/admin.service";
import { useEffect, useState } from "react";
import { User } from "@/data/models";
import { AxiosResponse } from "axios";

function getIconFromConsumerType(consumerType: ConsumerType): React.ReactNode {
  if (consumerType === "Domestic") {
    return <AiFillHome size="21" />;
  } else if (consumerType === "Commercial") {
    return <AiFillShop size="21" />;
  } else {
    return <BiSolidFactory size="21" />;
  }
}

type filterType = {
  consumerId: string;
  phoneNumber: string;
};

export default function Home() {
  const [filters, setFilter] = useState<filterType>({
    consumerId: "Sai",
    phoneNumber: "9404",
  });

  const router = useRouter();
  const toast = useToast();
  const applications = useQuery({
    queryKey: "applications",
    queryFn: getCurrentApplicationList,
    onError({
      response,
      code,
    }: {
      code: string;
      status: number;
      response: AxiosResponse;
    }) {
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

  useEffect(() => {
    console.log(applications);
  }, [applications]);

  return (
    <>
      <HStack
        spacing="6"
        my="5"
        pb="4"
        maxW="full"
        maxH={"250px"}
        overflowX="auto"
      >
        {Array(2)
          .fill(0)
          .map((item, index) => (
            <Box key={index}>
              <Box
                h="12vw"
                key={index}
                w="20vw"
                border="1px"
                borderColor="gray.300"
                bg="gray.100"
                rounded="3xl"
              ></Box>
            </Box>
          ))}
      </HStack>

      {/* Applications List */}
      <Heading mb="4">Applications</Heading>
      <Text mb="8" fontFamily="custom">
        Here, you can find all new applications
      </Text>

      {/* Filters */}
      <HStack>
        <HStack spacing={4}>
          {filters.consumerId !== "" && (
            <Tag
              size="lg"
              borderRadius="full"
              mb="8"
              variant="solid"
              colorScheme="teal"
              onClick={() => {
                setFilter((prevFilter) => ({ ...prevFilter, consumerId: "" }));
              }}
            >
              <TagLabel>C.A. Number: {filters.consumerId}</TagLabel>
              <TagCloseButton />
            </Tag>
          )}
        </HStack>
      </HStack>

      {/* Applications */}
      <TableContainer rounded="xl" border="1px" borderColor="orange.100">
        <Box overflowY="auto">
          <Table variant="simple" minH={"280px"}>
            <Thead bg="orange.400" position="sticky" top={0}>
              <Tr>
                <Th color="gray.100" isNumeric position="relative">
                  Consumer Type
                </Th>
                <Th color="gray.100" isNumeric>
                  Meter Number
                </Th>
                <Th color="gray.100">Full Name</Th>
                <Th
                  color="gray.100"
                  data-filtername="consumerId"
                  isNumeric
                  onClick={(e) => console.log(e.target.dataset["filtername"])}
                >
                  C.A. Number
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
                      value={filters.consumerId}
                      onChange={(e) => {
                        setFilter((prevFilter: filterType) => ({
                          ...prevFilter,
                          consumerId: e.target.value,
                        }));
                        // filters["consumerId"] = e.target.value;
                      }}
                    />
                  </Box>
                </Th>
                <Th color="gray.100" isNumeric>
                  Phone Number
                </Th>
                <Th color="gray.100">Application Status</Th>
              </Tr>
            </Thead>
            <Tbody>
              {applications.isLoading ? (
                <Tr>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td>
                    <HStack>
                      <Spinner size={"lg"} />
                      <Text>Fetching Applications</Text>
                    </HStack>
                  </Td>
                </Tr>
              ) : (
                applications.data?.map(
                  (application: User & { consumerId: string }) => (
                    <Tr
                      _hover={{
                        bg: "gray.100",
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        router.push(`applications/${application.consumerId}`)
                      }
                      key={application.consumerId}
                    >
                      <Td isNumeric>
                        <HStack>
                          <Box>
                            {getIconFromConsumerType(application.consumerType)}
                          </Box>
                          <Text>{application.consumerType.toUpperCase()}</Text>
                        </HStack>
                      </Td>
                      <Td isNumeric>#{application.meterNumber}</Td>
                      <Td>{application.fullName}</Td>
                      <Td isNumeric>{application.consumerId}</Td>
                      <Td isNumeric>{application.phoneNumber}</Td>
                      <Td>{application.status}</Td>
                    </Tr>
                  )
                )
              )}
            </Tbody>
          </Table>
        </Box>
      </TableContainer>
    </>
  );
}
