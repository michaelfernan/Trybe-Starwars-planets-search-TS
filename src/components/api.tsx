import React, { useEffect, useState } from 'react';

const StarWarsTable: React.FC = () => {
  const [planets, setPlanets] = useState<any[]>([]);
  const [filterText, setFilterText] = useState<string>('');
  const [filterColumn, setFilterColumn] = useState<string>('population'); // Defina o valor inicial corretamente
  const [filterComparison, setFilterComparison] = useState<string>('maior que'); // Defina o valor inicial corretamente
  const [filterValue, setFilterValue] = useState<string>('0');

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

  function renderTable() {
    if (planets.length === 0) {
      return <p>Não há planetas para exibir.</p>;
    }

    const headers = Object.keys(planets[0]).filter((header) => header !== 'residents');

    function filterPlanets() {
      return planets.filter((planet) => {
        const numericValue = parseFloat(planet[filterColumn]);
        const filterNumericValue = parseFloat(filterValue);

        switch (filterComparison) {
          case 'maior que':
            return numericValue > filterNumericValue;
          case 'menor que':
            return numericValue < filterNumericValue;
          case 'igual a':
            return numericValue === filterNumericValue;
          default:
            return true;
        }
      });
    }

    const filteredPlanets = filterPlanets();

    return (
      <div>
        <input
          data-testid="name-filter"
          type="text"
          placeholder="Filtrar por nome"
          value={ filterText }
          onChange={ (e) => setFilterText(e.target.value) }
        />
        <select
          data-testid='column-filter'
          value={ filterColumn }
          onChange={ (e) => setFilterColumn(e.target.value) }
        >
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>
        <select
          data-testid="comparison-filter"
          value={ filterComparison }
          onChange={ (e) => setFilterComparison(e.target.value) }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
        
        <input
          data-testid="value-filter"
          type="number"
          value={ filterValue }
          onChange={ (e) => setFilterValue(e.target.value) }
        />
        <button
          data-testid="button-filter"
          onClick={ () => filterPlanets() }
        >
          Filtrar
        </button>
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
