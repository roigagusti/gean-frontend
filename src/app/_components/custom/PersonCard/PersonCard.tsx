"use client";

import { Box, Heading } from "@chakra-ui/react";
import styled from "styled-components";

interface PersonCardProps {
    name: string;
    birthYear: number;
    deathYear?: number;
    left?: number;
    top?: number;
}

export const PersonCard = ({ name, birthYear, deathYear, left, top }: PersonCardProps) => {
    return (
        <StyledPersonCard position="absolute" left={left} top={top}>
            <Heading as="h3" size="sm" mb={2}>
                {name}
            </Heading>
            <Box fontSize="sm">{birthYear} - {deathYear}</Box>
        </StyledPersonCard>
    );
}


const StyledPersonCard = styled(Box)`
  width: 180px;
  padding: 12px;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  border: 1px solid #ddd;
`;