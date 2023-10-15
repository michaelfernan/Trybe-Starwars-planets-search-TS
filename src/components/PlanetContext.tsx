import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export interface Planet {
  name: string;
  climate: string;
  terrain: string;
  population: string;
  residents?: string[];
}

interface NumericFilter {
  column: string;
  comparison: string;
  value: string;
}

export interface PlanetContextProps {
  planets: Planet[];
  setPlanets: React.Dispatch<React.SetStateAction<Planet[]>>;
  filterText: string;
  setFilterText: React.Dispatch<React.SetStateAction<string>>;
  numericFilters: NumericFilter[];
  addNumericFilter: (filter: NumericFilter) => void;
  removeNumericFilter: (index: number) => void;
  removeAllNumericFilters: () => void;
  resetPlanets: () => void; // Adicionado aqui
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

const fetchStarWarsPlanets = async (
  setOriginalPlanets: React.Dispatch<React.SetStateAction<Planet[]>>,
) => {
  try {
    const response = await fetch('https://swapi.dev/api/planets/');
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();

    setOriginalPlanets(data.results.map((planet: any) => ({
      name: planet.name,
      climate: planet.climate,
      terrain: planet.terrain,
      population: planet.population,
      residents: planet.residents,
    })));
  } catch (error:any) {
    console.error(`Houve um problema com a operação fetch: ${error.message}`);
  }
};

export function PlanetProvider({ children }: PlanetProviderProps) {
  const [originalPlanets, setOriginalPlanets] = useState<Planet[]>([]);
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [filterText, setFilterText] = useState('');
  const [numericFilters, setNumericFilters] = useState<NumericFilter[]>([]);

  const addNumericFilter = (filter: NumericFilter) => {
    setNumericFilters((prevFilters: NumericFilter[]) => [...prevFilters, filter]);
  };

  const removeNumericFilter = (index: number) => {
    setNumericFilters((prevFilters) => {
      const updatedFilters = [...prevFilters];
      updatedFilters.splice(index, 1);
      return updatedFilters;
    });
  };

  const removeAllNumericFilters = () => {
    setNumericFilters([]);
  };

  useEffect(() => {
    fetchStarWarsPlanets(setOriginalPlanets);
  }, []);

  const resetPlanets = () => {
    setPlanets([...originalPlanets]);
  };

  return (
    <PlanetContext.Provider
      value={ {
        planets,
        setPlanets,
        filterText,
        setFilterText,
        numericFilters,
        addNumericFilter,
        removeNumericFilter,
        removeAllNumericFilters,
        resetPlanets,
      } }
    >
      {children}
    </PlanetContext.Provider>
  );
}
