import { createContext, useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export type Person = {
  id: string;
  name: string;
  birthYear: number;
  deathYear?: number;
  x: number;
  y: number;
};

export type Relationship = {
  id: string;
  fromId: string;
  toId: string;
  type: "parent" | "spouse";
};

type FamilyTreeState = {
  persons: Person[];
  relationships: Relationship[];
};

type FamilyTreeContextType = FamilyTreeState & {
  addPerson: (p: Omit<Person, "id">) => void;
  movePerson: (id: string, x: number, y: number) => void;
  addRelationship: (r: Omit<Relationship, "id">) => void;
};

const FamilyTreeContext = createContext<FamilyTreeContextType | undefined>(
  undefined
);

export const useFamilyTree = () => {
  const ctx = useContext(FamilyTreeContext);
  if (!ctx) throw new Error("useFamilyTree must be inside provider");
  return ctx;
};

export const FamilyTreeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, setState] = useState<FamilyTreeState>({
    persons: [
      {
        id: uuidv4(),
        name: "Juan Pérez",
        birthYear: 1950,
        deathYear: 2020,
        x: 600,
        y: 400,
      },
      {
        id: uuidv4(),
        name: "María López",
        birthYear: 1955,
        x: 320,
        y: 200,
      },
      {
        id: uuidv4(),
        name: "Ana Pérez",
        birthYear: 1980,
        x: 100,
        y: 600,
      },
    ],
    relationships: [],
  });

  const addPerson = (p: Omit<Person, "id">) => {
    setState((prev) => ({
      ...prev,
      persons: [...prev.persons, { ...p, id: uuidv4() }],
    }));
  };

  const movePerson = (id: string, x: number, y: number) => {
    setState((prev) => ({
      ...prev,
      persons: prev.persons.map((per) =>
        per.id === id ? { ...per, x, y } : per
      ),
    }));
  };

  const addRelationship = (r: Omit<Relationship, "id">) => {
    setState((prev) => ({
      ...prev,
      relationships: [...prev.relationships, { ...r, id: uuidv4() }],
    }));
  };

  return (
    <FamilyTreeContext.Provider
      value={{ ...state, addPerson, movePerson, addRelationship }}
    >
      {children}
    </FamilyTreeContext.Provider>
  );
};