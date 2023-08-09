"use client";

import { Box, Button, Container, Heading, Text } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <>
      {/* https://agentestudio.com/uploads/post/image/69/main_how_to_design_404_page.png */}
      <Image
        src="https://agentestudio.com/uploads/post/image/69/main_how_to_design_404_page.png"
        alt="404 image"
        width={1740}
        height={960}
        style={{
          width: "100vw",
          height: "100vh",
        }}
      />

      <Box
        position="absolute"
        bottom="0"
        left="50%"
        transform={"translateX(-50%)"}
        p="4"
      >
        <Button as={Link} href="/" size="lg">
          Go Back Home
        </Button>
      </Box>
    </>
  );
}

// <Container maxW="5xl">
//   <Heading size="4xl" fontWeight="extrabold" textAlign="center">
//     404
//   </Heading>
//   <Text textAlign="center">Could not find requested resource</Text>
//   <Image
//     src="https://seranking.com/blog/wp-content/uploads/2021/01/404_01-min.jpg"
//     alt="404 image"
//     width={625}
//     height={416}
//     style={{
//       margin: "auto",
//     }}
//   />
//   <Link href="/">Return Home</Link>
// </Container>
