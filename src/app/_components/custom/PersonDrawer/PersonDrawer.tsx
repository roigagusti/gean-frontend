"use client";

import {
  Drawer,
  Input,
  Select,
  VStack,
  Button,
  Text,
  createListCollection,
  Portal
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useFamilyTree, Person } from "@app/_contexts/FamilyTreeContext";

interface PersonDrawerProps {
  personId?: string;
  onClose: () => void;
}

export const PersonDrawer = ({ personId, onClose }: PersonDrawerProps) => {
  const { persons, relationships, updatePerson } = useFamilyTree();
  const [form, setForm] = useState<Partial<Person>>({});

  useEffect(() => {
    const p = persons.find((per) => per.id === personId);
    if (p) setForm(p);
  }, [personId, persons]);

  const parents = relationships
    .filter((r) => r.toId === personId && r.type === "parent")
    .map((r) => persons.find((p) => p.id === r.fromId)?.name)
    .filter(Boolean) as string[];

  const children = relationships
    .filter((r) => r.fromId === personId && r.type === "parent")
    .map((r) => persons.find((p) => p.id === r.toId)?.name)
    .filter(Boolean) as string[];

  const handleSave = () => {
    if (!personId) return;
    updatePerson(personId, {
      name: form.name ?? "",
      gender: form.gender,
      birthYear: form.birthYear ?? 0,
      deathYear: form.deathYear,
    });
    onClose();
  };

  const genderCollection = createListCollection({
    items: [
      { label: "Masculino", value: "M" },
      { label: "Femenino", value: "F" },
    ],
  });

  return (
    <Drawer.Root open={!!personId} placement="end" size="sm">
      <Drawer.Content>
        <Drawer.CloseTrigger />
        <Drawer.Header>Detalles</Drawer.Header>
        <Drawer.Body>
          <VStack align="stretch">
            <Input
              placeholder="Nombre"
              value={form.name || ""}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <Select.Root
              collection={genderCollection}
              size="sm"
            >
              <Select.HiddenSelect />
              <Select.Label>Género</Select.Label>
              <Select.Control>
                <Select.Trigger>
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
              type="number"
              value={form.birthYear ?? ""}
              onChange={(e) =>
                setForm({ ...form, birthYear: Number(e.target.value) })
              }
            />
            <Input
              placeholder="Año de fallecimiento"
              type="number"
              value={form.deathYear ?? ""}
              onChange={(e) =>
                setForm({ ...form, deathYear: Number(e.target.value) })
              }
            />
            <Text fontWeight="bold" pt={4}>
              Hijos
            </Text>
            {children.map((c) => (
              <Text key={c}>{c}</Text>
            ))}
            <Text fontWeight="bold" pt={4}>
              Padres
            </Text>
            {parents.map((p) => (
              <Text key={p}>{p}</Text>
            ))}
            <Button colorScheme="teal" onClick={handleSave} mt={4}>
              Guardar
            </Button>
          </VStack>
        </Drawer.Body>
      </Drawer.Content>
    </Drawer.Root>
  );
};