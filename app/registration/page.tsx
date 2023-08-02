"use client";

import { Heading, Button, Text, Box,Card, CardHeader, CardBody, CardFooter, Flex, useColorMode, useColorModeValue } from "@chakra-ui/react";
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
  } from '@chakra-ui/react';
import { Input, InputLeftAddon, InputGroup, Stack, InputLeftElement } from '@chakra-ui/react';
import { Textarea } from '@chakra-ui/react';
import React, { useState } from "react";
import { mode } from '@chakra-ui/theme-tools'
import { ChakraProvider } from '@chakra-ui/react'
import {IoSunny, IoMoon } from 'react-icons/io5'
import Navbar from "@/components/Navbar";
import { Radio, RadioGroup } from '@chakra-ui/react';
import { Select } from '@chakra-ui/react';
import { ButtonGroup } from '@chakra-ui/react'



export default function Registration() {
    const { toggleColorMode } = useColorMode();
    const [toggle, setToggle] = useState(false);
    const formBackGround = useColorModeValue("purple.200", "purple.200");


    return (
        <Box>
            <Navbar/>
            <Flex textColor={"green.900"} height={"110vh"} alignItems={"center"} justifyContent={"center"}>
                <Flex textColor={"green.900"} direction={"column"} background={formBackGround} p={150} rounded={6} position={'relative'}>
                    <Heading mb="2" textColor={"blackAlpha.600"}>Register</Heading>

                    <Stack spacing={4} pt="2">
                        <Input boxShadow='lg' bg='tomato' borderColor='tomato' color='white' bgColor="blackAlpha.500" placeholder='Name' size='md' variant='Outline' type='text' />
                </Stack>
                <Stack spacing={1} pt="15">
                    <InputGroup>
                        <InputLeftAddon children='+91' />
                        <Input boxShadow='lg' bg='tomato' borderColor='tomato' color='white' bgColor="blackAlpha.500" placeholder='  Phone Number' size='md' variant='Outline' type='tel' />
                    </InputGroup>
                </Stack>
                <Stack spacing={4} pt="15">
                    <Textarea boxShadow='lg' bg='tomato' borderColor='tomato' color='white' bgColor="blackAlpha.500" placeholder='Address' variant={"Outline"} />
                </Stack>
                <Box position={"absolute"} top={2} right={2} cursor={"pointer"} onClick={() => {
                    toggleColorMode();
                    setToggle(!toggle);
                }}>
                        {toggle ? <IoSunny /> : <IoMoon />}
                    </Box>
                    <Select pt="15" boxShadow='lg' variant="Outline" bg='tomato' borderColor='tomato' color='white' bgColor="blackAlpha.500" placeholder='Type'>
                      <option value='option1'>Consumer</option>
                        <option value='option2'>Domestic</option>
                    </Select>
                    <Select pt="15" boxShadow='lg' variant="Outline" bg='tomato' borderColor='tomato' color='white' bgColor="blackAlpha.500" placeholder='Phase'>
                      <option value='option1'>Single</option>
                      <option value='option2'>Multi-Phase(3)</option>
                    </Select>
                    <Stack direction='row' spacing={4} align='center' paddingLeft={"20"}pt="15">
                        <Button colorScheme='blue' variant='solid'>
                            Submit
                        </Button>
                    </Stack>
            </Flex>
        </Flex>
        </Box>
    );
}