import React from 'react';
import { usePlanetContext } from './PlanetContext';
import NumericFilter from './NumericFilter';

interface PlanetData {
  name: string;
  residents: string[];
}

function Table() {
  const { planets, filterText } = usePlanetContext();

  if (planets.length === 0) {
    return <p>Não há planetas para exibir.</p>;
  }

  const headers = Object.keys(planets[0]).filter((header) => header !== 'residents');

  const filteredPlanets = planets.filter(
    (planet: PlanetData) => planet.name.toLowerCase().includes(filterText.toLowerCase()),
  );

  return (
    <div>
      <table>
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={ header }>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredPlanets.map((planet: PlanetData) => (
            <tr key={ planet.name }>
              {headers.map((header) => (
                <td key={ header } data-testid={ header === 'name' ? 'planet-name' : '' }>
                  {header === 'name'
                    ? planet[header]
                    : planet[header as keyof PlanetData] || ''}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
