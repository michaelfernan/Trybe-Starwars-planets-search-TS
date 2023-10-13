import React, { useEffect, useState } from 'react';
import Table from './table';

interface Planet {
  name: string;
  climate: string;
  terrain: string;
  population: number;
  residents: string[];
  // Adicione outras propriedades dos planetas conforme necessário
}

const StarWarsTable: React.FC = () => {
  const [planets, setPlanets] = useState<Planet[]>([]);

  useEffect(() => {
    async function fetchStarWarsPlanets() {
      try {
        const response = await fetch('https://swapi.dev/api/planets/');
        const data = await response.json();
        const planetsData: Planet[] = data.results.map((planet: any) => {
          const { residents, ...rest } = planet;
          return rest;
        });
        setPlanets(planetsData);
      } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
      }
    }

    fetchStarWarsPlanets();
  }, []);

  return (
    <div>
      <h1>Tabela de Planetas de Star Wars</h1>
      <Table data={ planets } />
    </div>
  );
};

export default StarWarsTable;
