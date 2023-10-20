import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export type Planet = {
  name: string;
  climate: string;
  terrain: string;
  population: string;
  residents?: string[];
};

export type NumericFilter = {
  column: string;
  comparison: string;
  value: string;
};

export type PlanetContextProps = {
  planets: Planet[];
  setPlanets: React.Dispatch<React.SetStateAction<Planet[]>>;
  filterText: string;
  setFilterText: React.Dispatch<React.SetStateAction<string>>;
  numericFilters: NumericFilter[];
  addNumericFilter: (filter: NumericFilter) => void;
  removeNumericFilter: (index: number) => void;
  removeAllNumericFilters: () => void;
  resetPlanets: () => void;
};

export const PlanetContext = createContext<PlanetContextProps | undefined>(undefined);
export function usePlanetContext() {
  const context = useContext(PlanetContext);
  if (!context) {
    throw new Error('usePlanetContext must be used within a PlanetProvider');
  }
  return context;
}

export type PlanetProviderProps = {
  children: ReactNode;
};

async function fetchStarWarsPlanets(setPlanets: (planets: any) => void) {
  try {
    const response = await fetch('https://swapi.dev/api/planets/');
    const data = await response.json();
    const planetsData = data.results.map((planet: any) => {
      const { residents, ...rest } = planet;
      return rest;
    });
    setPlanets(planetsData);
  } catch (error) {
    console.error('Erro ao buscar dados da API:', error);
  }
}

const applyFilters = (
  planets: Planet[],
  filterText: string,
  numericFilters: NumericFilter[],
) => {
  return planets.filter((planeta) => {
    if (!planeta.name.includes(filterText)) return false;

    return numericFilters.every((filtro) => {
      const valorPlaneta = parseFloat(planeta[filtro.column as keyof Planet] as string);
      const valorFiltro = parseFloat(filtro.value);

      switch (filtro.comparison) {
        case 'maior que':
          return valorPlaneta > valorFiltro;
        case 'menor que':
          return valorPlaneta < valorFiltro;
        case 'igual a':
          return valorPlaneta === valorFiltro;
        default:
          return true;
      }
    });
  });
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

  useEffect(() => {
    const planetasFiltrados = applyFilters(originalPlanets, filterText, numericFilters);
    setPlanets(planetasFiltrados);
  }, [filterText, numericFilters, originalPlanets]);

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
