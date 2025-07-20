"use client";
import { Button, Input, VStack, Select, createListCollection, Portal } from "@chakra-ui/react";
import { useState } from "react";
import { useFamilyTree } from "@app/_contexts/FamilyTreeContext";

export const AddPerson = () => {
  const { addPerson } = useFamilyTree();
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [birthYear, setBirthYear] = useState("");

  const handleAdd = () => {
    if (!name || !birthYear) return;
    addPerson({
      name,
      gender,
      birthYear: parseInt(birthYear, 10),
      x: 50,
      y: 50,
    });
    setName("");
    setGender("");
    setBirthYear("");
  };
  const genderCollection = createListCollection({
    items: [
      { label: "Masculino", value: "M" },
      { label: "Femenino", value: "F" },
    ],
  });

  return (
    <VStack align="stretch">
      <Input
        placeholder="Nombre"
        size="sm"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Select.Root
        collection={genderCollection}
        size="sm"
      >
        <Select.HiddenSelect />
        <Select.Label>Género</Select.Label>
        <Select.Control>
          <Select.Trigger value={gender}>
            <Select.ValueText placeholder="Género" />
          </Select.Trigger>
          <Select.IndicatorGroup>
            <Select.Indicator />
          </Select.IndicatorGroup>
        </Select.Control>
        <Portal>
          <Select.Positioner>
            <Select.Content>
              {genderCollection.items.map((gender) => (
                <Select.Item item={gender} key={gender.value}>
                  {gender.label}
                  <Select.ItemIndicator />
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Positioner>
        </Portal>
      </Select.Root>
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