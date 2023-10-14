import React, { useEffect } from 'react';
import { usePlanetContext } from './PlanetContext';

import Table from './table';
import NumericFilter from './NumericFilter';

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

function StarWarsTable() {
  const { setPlanets } = usePlanetContext();

  useEffect(() => {
    fetchStarWarsPlanets(setPlanets);
  }, [setPlanets]);

  return (
    <div>
      <h1>Tabela de Planetas de Star Wars</h1>
      <NumericFilter />
      <Table />

    </div>
  );
}

export default StarWarsTable;
