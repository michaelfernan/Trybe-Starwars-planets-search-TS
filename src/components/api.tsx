import React, { useEffect, useState } from 'react';

const StarWarsTable: React.FC = () => {
  const [planets, setPlanets] = useState<any[]>([]);
  const [filterText, setFilterText] = useState<string>(''); // Estado para o filtro

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

  // Função para renderizar a tabela com base no filtro
  function renderTable() {
    if (planets.length === 0) {
      return <p>Não há planetas para exibir.</p>;
    }

    // Filtra os planetas com base no filtro de texto
    const filteredPlanets = planets.filter((planet) => planet.name.toLowerCase().includes(filterText.toLowerCase()));

    // Obtém os cabeçalhos da tabela (exceto "residents")
    const headers = Object.keys(planets[0]).filter((header) => header !== 'residents');

    return (
      <div>
        <input
          data-testid="name-filter"
          type="text"
          placeholder="Filtrar por nome"
          value={ filterText }
          onChange={ (e) => setFilterText(e.target.value) }
        />
        <table>
          <thead>
            <tr>
              {headers.map((header) => (
                <th key={ header }>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredPlanets.map((planet) => (
              <tr key={ planet.name }>
                {headers.map((header) => (
                  <td key={ header }>{planet[header]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
