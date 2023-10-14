import React from 'react';
import { usePlanetContext, Planet } from './PlanetContext';

function Table() {
  const { planets, filterText } = usePlanetContext();

  if (planets.length === 0) {
    return <p>Não há planetas para exibir.</p>;
  }

  function filterHeaders(header: string) {
    return header !== 'residents';
  }

  const headers = Object.keys(planets[0]).filter(filterHeaders);

  function filterPlanets(planet: Planet): boolean {
    return planet.name.toLowerCase().includes(filterText.toLowerCase());
  }

  const filteredPlanets = planets.filter(filterPlanets);

  function renderHeaders(header: string) {
    return <th key={ header }>{header}</th>;
  }

  function renderPlanetRows(planet: Planet) {
    function renderPlanetData(header: string) {
      return (
        <td key={ header } data-testid={ header === 'name' ? 'planet-name' : '' }>
          {header === 'name'
            ? planet[header]
            : planet[header as keyof Planet] || ''}
        </td>
      );
    }

    return (
      <tr key={ planet.name }>
        {headers.map(renderPlanetData)}
      </tr>
    );
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            {headers.map(renderHeaders)}
          </tr>
        </thead>
        <tbody>
          {filteredPlanets.map(renderPlanetRows)}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
