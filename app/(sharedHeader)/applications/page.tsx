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
import {
  chakra,
  Flex,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
} from '@chakra-ui/react'
import { ReactNode } from 'react'
import { BsPerson } from 'react-icons/bs'
import { FiServer } from 'react-icons/fi'
import { GoLocation } from 'react-icons/go'
import {AiOutlineIssuesClose} from 'react-icons/ai'
import { MdMargin } from "react-icons/md";

interface StatsCardProps {
  title: string
  stat: string
  icon: ReactNode
}

function StatsCard(props: StatsCardProps) {
  const { title, stat, icon } = props
  return (
    <Stat
      px={{ base: 2, md: 4 }}
      py={'5'}
      border={'1px solid'}
      borderColor={useColorModeValue('orange.800', 'orange.500')}
      rounded={'lg'}
      bg={'orange.100'}>
      <Flex justifyContent={'space-between'}>
        <Box pl={{ base: 2, md: 4 }}>
          <StatLabel fontWeight={'medium'} isTruncated>
            {title}
          </StatLabel>
          <StatNumber fontSize={'2xl'} fontWeight={'medium'}>
            {stat}
          </StatNumber>
        </Box>
        <Box
          my={'auto'}
          color={useColorModeValue('orange.800', 'orange.200')}
          alignContent={'center'}
          bg={'orange.100'}>
          {icon}
        </Box>
      </Flex>
    </Stat>
  )
}

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
      <Box maxW="7xl" mx={'auto'} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
          <StatsCard title={'Approved Applications'} stat={applications.data?.stats.totalApplications} icon={<BsPerson size={'3em'} />} />
          <StatsCard title={'Pending Applications'} stat={applications.data?.stats.totalPendingApplications} icon={<FiServer size={'3em'} />} />
          <StatsCard title={'Complaints'} stat={applications.data?.stats.totalComplaints} icon={<AiOutlineIssuesClose size={'3em'} />} />
        </SimpleGrid>
      </Box>
      

      {/* Applications List */}
      <Box my="8">
      <Heading mb="4">Applications</Heading>
      <Text mb="8" fontFamily="custom">
        Here, you can find all new applications
      </Text>
      </Box>

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
                applications.data?.fetchedConsumers.map(
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