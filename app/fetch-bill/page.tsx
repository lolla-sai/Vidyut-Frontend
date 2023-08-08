"use client";

import {
  Button,
  Checkbox,
  Flex,
  Text,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Image,
} from "@chakra-ui/react";
import axios from "axios";
import { useState, useEffect } from "react";
import { redirect } from "next-nprogress-bar";
import { useRouter } from "next-nprogress-bar";

export default function SplitScreen() {
  const [uname, setUname] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [billId, setBillId] = useState<string | null>(null);
  const [fetchedBill, setFetchedBill] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    console.log(uname, password);
  }, [uname, password]);

  const signIn = async () => {
    // router.push("/applications");
    if (uname && password) {
      const res = await axios.post(
        "http://localhost:8080/api/auth/login",
        { userName: uname, password: password },
        { withCredentials: true }
      );

      if (res.data.success) {
        router.push("/applications");
      }
    }
  };

  return (
    <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <Stack spacing={4} w={"full"} maxW={"md"}>
          <Heading fontSize={"2xl"}>Fetch Bill</Heading>
          <FormControl id="email">
            <FormLabel>Bill Id</FormLabel>
            <Input
              placeholder={"Enter bill Id"}
              onChange={(event) => setBillId(event?.target.value)}
            />
          </FormControl>
          <Stack spacing={6}>
            <Button
              colorScheme={"blue"}
              variant={"solid"}
              onClick={() => {
                setFetchedBill(true);
              }}
            >
              Fetch Bill
            </Button>
          </Stack>
        </Stack>
      </Flex>
      <Flex flex={1}>
        {!fetchedBill || billId == "" ? (
          <Image
            alt={"Login Image"}
            objectFit={"fill"}
            maxH={"100vh"}
            src={"/assets/sample_bill.png"}
          />
        ) : (
          <iframe
            width={"100%"}
            style={{ maxHeight: "100vh" }}
            src={`http://localhost:8080/api/consumer/render-bill/${billId}`}
          />
        )}
      </Flex>
    </Stack>
  );
}
