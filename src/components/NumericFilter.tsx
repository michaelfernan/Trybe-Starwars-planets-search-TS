import React, { useState } from 'react';
import { usePlanetContext } from './PlanetContext';

function NumericFilter() {
  const { planets, setPlanets, filterText, setFilterText } = usePlanetContext();

  const [filterColumn, setFilterColumn] = useState<string>('population');
  const [filterComparison, setFilterComparison] = useState<string>('maior que');
  const [filterValue, setFilterValue] = useState<string>('0');

  function filterPlanets() {
    const filteredPlanets = planets.filter((planet) => {
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

    setPlanets(filteredPlanets);
  }

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
        data-testid="column-filter"
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

    </div>
  );
}

export default NumericFilter;
