"use client";

import { Box, Flex } from "@chakra-ui/react";
import styled from "styled-components";
import { useState } from "react";

import { Header } from "./_components/custom/Header/Header";
import { PersonCard } from "./_components/custom/PersonCard/PersonCard";
import { AddPerson } from "./_components/custom/AddPerson/AddPerson";
import { AddRelationship } from "./_components/custom/AddRelationship/AddRelationship";
import { PersonDrawer } from "./_components/custom/PersonDrawer/PersonDrawer";
import { FamilyTreeProvider, useFamilyTree } from "@app/_contexts/FamilyTreeContext";

import "./layout.css";

const Canvas = styled(Box)`
  position: absolute;
  inset: 0;
  overflow: hidden;
  cursor: grab;
`;

function Workspace() {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [lastPos, setLastPos] = useState({ x: 0, y: 0 });
  const [selectedPerson, setSelectedPerson] = useState<string | undefined>();

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

  const { persons, relationships } = useFamilyTree();

  return (
    <Box position="relative" w="100vw" h="100vh" overflow="hidden">
      <Header />

      <Canvas onMouseDown={startDrag} onMouseUp={stopDrag} onMouseLeave={stopDrag} onMouseMove={onDrag}>
        <svg
          width="100%"
          height="100%"
          style={{ position: "absolute", inset: 0 }}
        >
          {relationships.map((rel) => {
            const from = persons.find((p) => p.id === rel.fromId);
            const to = persons.find((p) => p.id === rel.toId);
            if (!from || !to) return null;
            return (
              <line
                key={rel.id}
                x1={from.x + 90 + offset.x}
                y1={from.y + 40 + offset.y}
                x2={to.x + 90 + offset.x}
                y2={to.y + 40 + offset.y}
                stroke="black"
              />
            );
          })}
        </svg>
        <Box
          position="absolute"
          style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
          minW="100%"
          minH="100%"
        >
          {persons.map((p) => (
            <PersonCard
            key={p.id}
            {...p}
            onSelect={(id) => setSelectedPerson(id)}
          />
        ))}
      </Box>
    </Canvas>

    <Flex position="absolute" top={4} right={4} bg="white" p={2} borderRadius="md" direction="column" gap={4} zIndex={10}>
      <AddPerson />
      <AddRelationship />
    </Flex>
    <PersonDrawer personId={selectedPerson} onClose={() => setSelectedPerson(undefined)} />
  </Box>
);
}

export default function FamilyTreeApp() {
return (
  <FamilyTreeProvider>
    <Workspace />
  </FamilyTreeProvider>
);
}