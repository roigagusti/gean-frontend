"use client";
import {
  Button,
  Portal,
  Select,
  VStack,
  createListCollection,
} from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { useFamilyTree } from "@app/_contexts/FamilyTreeContext";

export const AddRelationship = () => {
  const { persons, addRelationship } = useFamilyTree();
  const [fromId, setFromId] = useState("");
  const [toId, setToId] = useState("");

  const peopleCollection = useMemo(
    () =>
      createListCollection({
        items: persons.map((p) => ({ label: p.name, value: p.id })),
      }),
    [persons]
  );

  const handleAdd = () => {
    if (!fromId || !toId || fromId === toId) return;
    addRelationship({ fromId, toId, type: "parent" });
    setFromId("");
    setToId("");
  };
  

  return (
    <VStack align="stretch">
      <Select.Root
        collection={peopleCollection}
        size="sm"
      >
        <Select.HiddenSelect />
        <Select.Label>Persona origen</Select.Label>
        <Select.Control>
          <Select.Trigger value={fromId}>
            <Select.ValueText placeholder="Persona origen" />
          </Select.Trigger>
          <Select.IndicatorGroup>
            <Select.Indicator />
          </Select.IndicatorGroup>
        </Select.Control>
        <Portal>
          <Select.Positioner>
            <Select.Content>
              {peopleCollection.items.map((person) => (
                <Select.Item item={person} key={person.value}>
                  {person.label}
                  <Select.ItemIndicator />
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Positioner>
        </Portal>
      </Select.Root>
      <Select.Root
        collection={peopleCollection}
        size="sm"
      >
        <Select.HiddenSelect />
        <Select.Label>Persona destino</Select.Label>
        <Select.Control>
          <Select.Trigger value={toId}>
            <Select.ValueText placeholder="Persona destino" />
          </Select.Trigger>
          <Select.IndicatorGroup>
            <Select.Indicator />
          </Select.IndicatorGroup>
        </Select.Control>
        <Portal>
          <Select.Positioner>
            <Select.Content>
              {peopleCollection.items.map((person) => (
                <Select.Item item={person} key={person.value}>
                  {person.label}
                  <Select.ItemIndicator />
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Positioner>
        </Portal>
      </Select.Root>
      <Button size="sm" colorScheme="purple" onClick={handleAdd}>
        Vincular (padre-hijo)
      </Button>
    </VStack>
  );
};