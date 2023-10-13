import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Planet {
  name: string;
  climate: string;
  terrain: string;
  population: string;
}

interface PlanetContextProps {
  planets: Planet[];
  setPlanets: React.Dispatch<React.SetStateAction<Planet[]>>;
  filterText: string;
  setFilterText: React.Dispatch<React.SetStateAction<string>>;
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

  return (
    <PlanetContext.Provider value={ { planets, setPlanets, filterText, setFilterText } }>
      {children}
    </PlanetContext.Provider>
  );
}
