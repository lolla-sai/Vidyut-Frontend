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
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";

export default function SplitScreen() {
  const [uname, setUname] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    console.log(uname, password);
  }, [uname, password]);

  const signIn = async () => {
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
          <Heading fontSize={"2xl"}>Sign in to your Admin Account</Heading>
          <FormControl id="email">
            <FormLabel>Username</FormLabel>
            <Input onChange={(event) => setUname(event?.target.value)} />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              onChange={(event) => setPassword(event?.target.value)}
            />
          </FormControl>
          <Stack spacing={6}>
            <Stack
              direction={{ base: "column", sm: "row" }}
              align={"start"}
              justify={"space-between"}
            >
              <Checkbox>Remember me</Checkbox>
              {/* <Text color={'blue.500'}>Forgot password?</Text> */}
            </Stack>
            <Button
              colorScheme={"blue"}
              variant={"solid"}
              onClick={() => signIn()}
            >
              Sign in
            </Button>
          </Stack>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image
          alt={"Login Image"}
          objectFit={"cover"}
          src={
            "https://images.wallpaperscraft.com/image/single/light_bulb_light_sparks_305727_3840x2400.jpg"
          }
        />
      </Flex>
    </Stack>
  );
}
