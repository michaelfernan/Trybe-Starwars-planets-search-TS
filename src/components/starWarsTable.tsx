import React, { useEffect } from 'react';
import Table from './Table';
import { PlanetProvider, usePlanetContext } from './PlanetContext';

const StarWarsTable: React.FC = () => {
  const { setPlanets } = usePlanetContext();

  useEffect(() => {
    async function fetchStarWarsPlanets() {
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

    fetchStarWarsPlanets();
  }, [setPlanets]);

  return (
    <div>
      <h1>Tabela de Planetas de Star Wars</h1>
      <Table />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <PlanetProvider>
      <StarWarsTable />
    </PlanetProvider>
  );
};

export default App;
