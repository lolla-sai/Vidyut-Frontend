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
  TagLabel,
  TagCloseButton,
} from "@chakra-ui/react";

import { AiFillShop, AiFillHome } from "react-icons/ai";
import { BiSolidFactory } from "react-icons/bi";
import { useRouter } from "next-nprogress-bar";
import { useQuery } from "react-query";
import { getCurrentApplicationList } from "@/services/admin.service";
import { useEffect, useState } from "react";
import { User } from "@/data/models";
import { AxiosResponse } from "axios";
import {
  chakra,
  Flex,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import { BsPerson } from "react-icons/bs";
import { FiServer } from "react-icons/fi";
import { AiOutlineIssuesClose } from "react-icons/ai";
import FiltersList from "@/components/FiltersList";
import THwithFilter from "@/components/THwithFilter";
import StatsCard from "@/components/StatCard";
import { filterApplications } from "@/services/applications.service";

type filterType = {
  consumerId: string;
  phoneNumber: string;
};

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
  const [filters, setFilter] = useState<filterType>({
    consumerId: "",
    phoneNumber: "",
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
      <Box maxW="7xl" mx={"auto"} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
          <StatsCard
            title={"Approved Applications"}
            stat={applications.data?.stats.totalApplications}
            icon={<BsPerson size={"3em"} />}
          />
          <StatsCard
            title={"Pending Applications"}
            stat={applications.data?.stats.totalPendingApplications}
            icon={<FiServer size={"3em"} />}
          />
          <StatsCard
            title={"Complaints"}
            stat={applications.data?.stats.totalComplaints}
            icon={<AiOutlineIssuesClose size={"3em"} />}
          />
        </SimpleGrid>
      </Box>

      {/* Applications List */}
      <Box my="8">
        <Heading mb="4">Applications</Heading>
        <Text mb="8" fontFamily="custom">
          Here, you can find all new applications
        </Text>
      </Box>

      {/* Filters */}
      <FiltersList filters={filters} setFilter={setFilter} />

      {/* Applications */}
      <TableContainer rounded="xl" border="1px" borderColor="orange.100">
        <Box overflowY="auto" maxHeight="400px">
          <Table variant="simple" minH="100px">
            <Thead bg="orange.400" position="sticky" top={0}>
              <Tr>
                <Th color="gray.100" isNumeric position="relative">
                  Consumer Type
                </Th>
                <Th color="gray.100" isNumeric>
                  Meter Number
                </Th>
                <Th color="gray.100">Full Name</Th>
                <THwithFilter
                  label="C.A. Number"
                  filters={filters}
                  setFilter={setFilter}
                  fieldName="consumerId"
                ></THwithFilter>

                <THwithFilter
                  label="Phone Number"
                  filters={filters}
                  setFilter={setFilter}
                  fieldName="phoneNumber"
                  isNumeric
                ></THwithFilter>
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
                filterApplications(applications, filters).map(
                  (application: User & { consumerId: string }) => (
                    <Tr
                      _hover={{
                        bg: useColorModeValue("gray.100", "gray.800"),
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
                      <Td>{application.consumerId}</Td>
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
