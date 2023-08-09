'use client'

import { Button, Box, Center, Text, Link, VStack, Image } from '@chakra-ui/react';
import { FaGrinBeamSweat } from 'react-icons/fa';
import NextLink from 'next/link';

const NotFound = () => {
    return (
        <Center h="100vh">
            <VStack spacing={4}>
                <Image src="https://media.istockphoto.com/id/1179516796/vector/error-404-page-vector-internet-problem-or-web-warning-message-webpage-not-found-erroneously.jpg?s=612x612&w=0&k=20&c=krtb4WScyhvHjGvw-_oJFynHy-sdV8GBf5z2xI8k-RM=" alt="Electricity Icon" width={1740}
        height={960}
        style={{
          width: "100vw",
          height: "100vh",
        }} />
                <Text fontSize="2xl" fontWeight="bold">
                    Oops! Could Not Find Your Bill
                </Text>
            </VStack>
        </Center>
    );
};

export default NotFound;