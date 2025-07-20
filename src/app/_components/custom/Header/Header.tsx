"use client";

import { Flex, Heading } from "@chakra-ui/react";


export const Header = () => {
    return (
        <Flex
            position="absolute"
            top={0}
            left={0}
            right={0}
            py={2}
            px={4}
            bg="teal.500"
            color="white"
            zIndex={1}
            align="center"
        >
            <Heading size="md">Árbol Genealógico</Heading>
        </Flex>
    );
}
