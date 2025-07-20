"use client";

import { Box, Heading } from "@chakra-ui/react";
import styled from "styled-components";
import { useState } from "react";
import { useFamilyTree } from "@app/_contexts/FamilyTreeContext";

interface PersonCardProps {
  id: string;
  name: string;
  gender?: string;
  birthYear: number;
  deathYear?: number;
  x: number;
  y: number;
  onSelect?: (id: string) => void;
}

export const PersonCard = ({ id, name, gender, birthYear, deathYear, x, y, onSelect }: PersonCardProps) => {
  const { movePerson } = useFamilyTree();
  const [dragging, setDragging] = useState(false);
  const [lastPos, setLastPos] = useState({ x: 0, y: 0 });

  const startDrag = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDragging(true);
    setLastPos({ x: e.clientX, y: e.clientY });
  };

  const onDrag = (e: React.MouseEvent) => {
    if (!dragging) return;
    const dx = e.clientX - lastPos.x;
    const dy = e.clientY - lastPos.y;
    movePerson(id, x + dx, y + dy);
    setLastPos({ x: e.clientX, y: e.clientY });
  };

  const stopDrag = () => setDragging(false);

  return (
    <StyledPersonCard
      position="absolute"
      left={x}
      top={y}
      onMouseDown={startDrag}
      onMouseMove={onDrag}
      onMouseUp={stopDrag}
      onMouseLeave={stopDrag}
      onClick={() => onSelect && onSelect(id)}
    >
      <Heading as="h3" size="sm" mb={2}>
        {name}
      </Heading>
      <Box fontSize="sm">
        {birthYear} - {deathYear}
      </Box>
    </StyledPersonCard>
  );
};


const StyledPersonCard = styled(Box)`
  width: 180px;
  padding: 12px;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  border: 1px solid #ddd;
`;
