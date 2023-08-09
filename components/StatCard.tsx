import {
  Box,
  Flex,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
} from "@chakra-ui/react";
import { ReactNode } from "react";

interface StatsCardProps {
  title: string;
  stat: string;
  icon: ReactNode;
}

export default function StatsCard(props: StatsCardProps) {
  const { title, stat, icon } = props;
  return (
    <Stat
      px={{ base: 2, md: 4 }}
      py={"5"}
      border={"1px solid"}
      borderColor={useColorModeValue("orange.800", "orange.500")}
      rounded={"lg"}
      bg={"orange.100"}
    >
      <Flex justifyContent={"space-between"}>
        <Box pl={{ base: 2, md: 4 }}>
          <StatNumber color="black" fontSize={"4xl"} fontWeight={"extrabold"}>
            {stat}
          </StatNumber>
          <StatLabel color={"black"} fontWeight={"medium"} isTruncated>
            {title}
          </StatLabel>
        </Box>
        <Box
          my={"auto"}
          color={useColorModeValue("orange.800", "orange.400")}
          alignContent={"center"}
          bg={"orange.100"}
        >
          {icon}
        </Box>
      </Flex>
    </Stat>
  );
}
