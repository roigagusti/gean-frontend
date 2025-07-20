"use client";

import { Box } from "@chakra-ui/react";
import styled from "styled-components";
import { useState } from "react";

import { Header } from "./_components/custom/Header/Header";
import { PersonCard } from "./_components/custom/PersonCard/PersonCard";

import "./layout.css";

const Canvas = styled(Box)`
  position: absolute;
  inset: 0;
  overflow: hidden;
  cursor: grab;
`;

export default function FamilyTreeApp() {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [lastPos, setLastPos] = useState({ x: 0, y: 0 });

  const startDrag = (e: React.MouseEvent) => {
    setDragging(true);
    setLastPos({ x: e.clientX, y: e.clientY });
  };

  const stopDrag = () => {
    setDragging(false);
  };

  const onDrag = (e: React.MouseEvent) => {
    if (!dragging) return;
    const dx = e.clientX - lastPos.x;
    const dy = e.clientY - lastPos.y;
    setOffset((prev) => ({ x: prev.x + dx, y: prev.y + dy }));
    setLastPos({ x: e.clientX, y: e.clientY });
  };

  return (
    <Box position="relative" w="100vw" h="100vh" overflow="hidden">
      <Header />

      <Canvas onMouseDown={startDrag} onMouseUp={stopDrag} onMouseLeave={stopDrag} onMouseMove={onDrag}>
        <Box
          position="absolute"
          style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
          minW="100%"
          minH="100%"
        >
          <PersonCard name="Juan Pérez" birthYear={1950} deathYear={2020} left={600} top={400} />
          <PersonCard name="María López" birthYear={1955} left={320} top={200} />
          <PersonCard name="Ana Pérez" birthYear={1980} left={100} top={600} />
        </Box>
      </Canvas>
    </Box>
  );
}