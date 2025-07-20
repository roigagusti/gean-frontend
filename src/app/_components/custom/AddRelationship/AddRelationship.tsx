"use client";
import { Button, Select, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { useFamilyTree } from "@app/_contexts/FamilyTreeContext";

export const AddRelationship = () => {
  const { persons, addRelationship } = useFamilyTree();
  const [fromId, setFromId] = useState("");
  const [toId, setToId] = useState("");

  const handleAdd = () => {
    if (!fromId || !toId || fromId === toId) return;
    addRelationship({ fromId, toId, type: "parent" });
    setFromId("");
    setToId("");
  };
  

  return (
    <VStack align="stretch">
      <Select
        placeholder="Persona origen"
        size="sm"
        value={fromId}
        onChange={(e) => setFromId(e.target.value)}
      >
        {persons.map((p) => (
          <option key={p.id} value={p.id}>
            {p.name}
          </option>
        ))}
      </Select>
      <Select
        placeholder="Persona destino"
        size="sm"
        value={toId}
        onChange={(e) => setToId(e.target.value)}
      >
        {persons.map((p) => (
          <option key={p.id} value={p.id}>
            {p.name}
          </option>
        ))}
      </Select>
      <Button size="sm" colorScheme="purple" onClick={handleAdd}>
        Vincular (padre-hijo)
      </Button>
    </VStack>
  );
};