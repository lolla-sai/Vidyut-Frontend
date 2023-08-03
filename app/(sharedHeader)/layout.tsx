"use client";

import SidebarWithHeader from "@/components/Sidebar";
import {
  Avatar,
  Box,
  Button,
  HStack,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarWithHeader>
      <div>
        <title>All Applications</title>
        <Box>
          <HStack justify="space-between" align="start">
            <Heading size="3xl" my="4" fontWeight="extrabold">
              Hello,{" "}
              <Text as="span" color="orange.500">
                Admin
              </Text>
            </Heading>

            <HStack display={{ base: "none", md: "flex" }}>
              <Avatar name="Admin" />
              <VStack alignItems="flex-start" spacing="1px" ml="2">
                <Text>Admin</Text>
                <Button
                  href="/auth/login"
                  as={NextLink}
                  variant="outline"
                  textColor="red.400"
                  size="sm"
                >
                  Sign Out
                </Button>
              </VStack>
            </HStack>
          </HStack>

          {children}
        </Box>
      </div>
    </SidebarWithHeader>
  );
};

export default layout;
