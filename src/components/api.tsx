import React, { useEffect, useState } from 'react';

const StarWarsTable: React.FC = () => {
  const [planets, setPlanets] = useState<any[]>([]);

  useEffect(() => {
    async function fetchStarWarsPlanets() {
      try {
        const response = await fetch('https://swapi.dev/api/planets/');
        const data = await response.json();
        setPlanets(data.results);
      } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
      }
    }

    fetchStarWarsPlanets();
  }, []);

  // Função para renderizar a tabela
  function renderTable() {
    if (planets.length === 0) {
      return <p>Não há planetas para exibir.</p>;
    }

    // Obtém os cabeçalhos da tabela (exceto "residents")
    const headers = Object.keys(planets[0]).filter((header) => header !== 'residents');

    return (
      <table>
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={ header }>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {planets.map((planet) => (
            <tr key={ planet.name }>
              {headers.map((header) => (
                <td key={ header }>{planet[header]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  return (
    <div>
      <h1>Tabela de Planetas de Star Wars</h1>
      {renderTable()}
    </div>
  );
};

export default StarWarsTable;
