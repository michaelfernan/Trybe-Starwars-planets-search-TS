import React from 'react';
import { usePlanetContext } from './PlanetContext';

const Table: React.FC = () => {
  const { planets, filterText, setFilterText } = usePlanetContext();

  if (planets.length === 0) {
    return <p>Não há planetas para exibir.</p>;
  }

  const filteredPlanets = planets.filter((planet) => planet.name.toLowerCase().includes(filterText.toLowerCase()));

  const headers = Object.keys(filteredPlanets[0]).filter((header) => header !== 'residents');

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
};

export default Table;
