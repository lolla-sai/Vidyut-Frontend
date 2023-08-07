'use client'

import {
    Button,
    Flex,
    Heading,
    Image,
    Stack,
    Text,
    useBreakpointValue,
} from '@chakra-ui/react'

import { VStack } from '@chakra-ui/react'
import Link from 'next/link';


export default function SplitScreen() {
    return (
        <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>

            <Flex p={8} flex={1} align={'center'} justify={'center'}>
                <Stack spacing={6} w={'full'} maxW={'lg'}>
                    <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
                        <Text
                            as={'span'}
                            position={'relative'}
                            _after={{
                                content: "''",
                                width: 'full',
                                height: useBreakpointValue({ base: '20%', md: '30%' }),
                                position: 'absolute',
                                bottom: 1,
                                left: 0,
                                bg: 'orange.400',
                                zIndex: -1,
                            }}>
                            Vidyut
                        </Text>
                        <br />{' '}
                        <Text color={'orange.400'} as={'span'}>
                            Electricity Billing System
                        </Text>{' '}
                    </Heading>
                    <Text fontSize={{ base: 'md', lg: 'lg' }} color={'gray.500'}>
                        Simplify your electricity bill management with our user-friendly platform.
                    </Text>
                    <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
                        <Link href="/applications">
                        <Button
                            rounded={'full'}
                            bg={'orange.400'}
                            color={'white'}
                            _hover={{
                                bg: 'orange.500',
                            }}>
                            Admin
                        </Button>
                        </Link>
                        <Link href="/registration">
                        <Button rounded={'full'}>Register</Button>
                        </Link>
                        <Link href="/complaints">
                        <Button rounded={'full'}>Complaints</Button>
                        </Link>
                    </Stack>
                </Stack>
            </Flex>
            <Flex
                w={'full'}
                h={'100vh'}
                backgroundImage={
                    'url(https://img.nsdcdn.com/playlists/18446/12724504095c9904101c4f5.jpg)'
                }
                backgroundSize={'cover'}
                backgroundPosition={'center center'}>
                <VStack
                    w={'full'}
                    justify={'center'}
                    px={useBreakpointValue({ base: 90, md: 6 })}
                    bgGradient={'linear(to-r, blackAlpha.600, transparent)'}>
                </VStack>
            </Flex>
        </Stack>
    )
}