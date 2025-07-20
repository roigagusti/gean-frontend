"use client";
import { Button, Input, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { useFamilyTree } from "@app/_contexts/FamilyTreeContext";

export const AddPerson = () => {
  const { addPerson } = useFamilyTree();
  const [name, setName] = useState("");
  const [birthYear, setBirthYear] = useState("");

  const handleAdd = () => {
    if (!name || !birthYear) return;
    addPerson({
      name,
      birthYear: parseInt(birthYear, 10),
      x: 50,
      y: 50,
    });
    setName("");
    setBirthYear("");
  };

  return (
    <VStack align="stretch">
      <Input
        placeholder="Nombre"
        size="sm"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        placeholder="Año de nacimiento"
        size="sm"
        value={birthYear}
        onChange={(e) => setBirthYear(e.target.value)}
      />
      <Button size="sm" colorScheme="teal" onClick={handleAdd}>
        Agregar persona
      </Button>
    </VStack>
  );
};