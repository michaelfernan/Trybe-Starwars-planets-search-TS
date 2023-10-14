import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Planet {
  name: string;
  climate: string;
  terrain: string;
  population: string;
  residents?: string[]; // tornando residents opcional
}

interface NumericFilter {
  column: string;
  comparison: string;
  value: string;
}

interface PlanetContextProps {
  planets: Planet[];
  setPlanets: React.Dispatch<React.SetStateAction<Planet[]>>;
  filterText: string;
  setFilterText: React.Dispatch<React.SetStateAction<string>>;
  numericFilters: NumericFilter[];
  addNumericFilter: (filter: NumericFilter) => void;
}

const PlanetContext = createContext<PlanetContextProps | undefined>(undefined);

export function usePlanetContext() {
  const context = useContext(PlanetContext);
  if (!context) {
    throw new Error('usePlanetContext must be used within a PlanetProvider');
  }
  return context;
}

interface PlanetProviderProps {
  children: ReactNode;
}

export function PlanetProvider({ children }: PlanetProviderProps) {
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [filterText, setFilterText] = useState('');
  const [numericFilters, setNumericFilters] = useState<NumericFilter[]>([]);

  const addNumericFilter = (filter: NumericFilter) => {
    setNumericFilters((prevFilters) => [...prevFilters, filter]);
  };

  return (
    <PlanetContext.Provider
      value={
      { planets,
        setPlanets,
        filterText,
        setFilterText,
        numericFilters,
        addNumericFilter }
}
    >
      {children}
    </PlanetContext.Provider>
  );
}
