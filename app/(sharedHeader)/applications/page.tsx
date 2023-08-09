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
} from "@chakra-ui/react";

import { AiFillShop, AiFillHome } from "react-icons/ai";
import { BiSolidFactory } from "react-icons/bi";
import { useRouter } from "next-nprogress-bar";
import { useQuery } from "react-query";
import { getCurrentApplicationList } from "@/services/admin.service";
import { useEffect } from "react";
import { User } from "@/data/models";
import { AxiosError, AxiosResponse } from "axios";

function getIconFromConsumerType(consumerType: ConsumerType): React.ReactNode {
  if (consumerType === "Domestic") {
    return <AiFillHome size="21" />;
  } else if (consumerType === "Commercial") {
    return <AiFillShop size="21" />;
  } else {
    return <BiSolidFactory size="21" />;
  }
}

export default function Home() {
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
        {Array(5)
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

      {/* Applications */}
      <TableContainer rounded="xl" border="1px" borderColor="orange.100">
        <Box overflowY="auto" maxHeight="400px">
          <Table variant="simple" minH={"280px"}>
            <Thead bg="orange.400" position="sticky" top={0}>
              <Tr>
                <Th color="gray.100" isNumeric position="relative">
                  Consumer Type
                  {/* <Box
                    position="absolute"
                    bg="orange.100"
                    top="100%"
                    color="black"
                    p="2"
                  >
                    <Input placeholder="Enter Search Key" size="sm" />
                  </Box> */}
                </Th>
                <Th color="gray.100" isNumeric>
                  Meter Number
                </Th>
                <Th color="gray.100">Full Name</Th>
                <Th color="gray.100" isNumeric>
                  C.A. Number
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
