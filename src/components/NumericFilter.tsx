import React, { useState } from 'react';
import { usePlanetContext } from './PlanetContext';

interface Planet {
  [key: string]: string | number | any;
}

interface NumericFilterType {
  column: string;
  comparison: string;
  value: string;
}

const availableColumns = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];

function NumericFilter() {
  const {
    planets,
    setPlanets,
    filterText,
    setFilterText,
    addNumericFilter,
    removeNumericFilter,
    numericFilters,
    removeAllNumericFilters,
    resetPlanets,
  } = usePlanetContext() as any;

  const [filterColumn, setFilterColumn] = useState<string>('population');
  const [filterComparison, setFilterComparison] = useState<string>('maior que');
  const [filterValue, setFilterValue] = useState<string>('0');
  const [sortColumn, setSortColumn] = useState<string>('population');
  const [sortDirection, setSortDirection] = useState<string>('ASC');

  const handleSort = () => {
    const sortedPlanets = [...planets];

    sortedPlanets.sort((a: Planet, b: Planet) => {
      if (a[sortColumn as keyof Planet] === 'unknown') return 1;
      if (b[sortColumn as keyof Planet] === 'unknown') return -1;

      const numA = parseFloat(a[sortColumn as keyof Planet].toString());
      const numB = parseFloat(b[sortColumn as keyof Planet].toString());

      return sortDirection === 'ASC' ? numA - numB : numB - numA;
    });

    setPlanets(sortedPlanets);
  };

  const handleFilter = (filter: NumericFilterType) => {
    addNumericFilter(filter);

    const updatedAvailableColumns = availableColumns
      .filter((col) => col !== filterColumn);
    setFilterColumn(updatedAvailableColumns[0]);
    setFilterValue('0');
  };

  function filterPlanets() {
    const filteredPlanets = planets.filter((planet: Planet) => {
      const numericValue = parseFloat(planet[filterColumn as keyof Planet].toString());
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
        {availableColumns
          .filter((col) => !numericFilters.some((filter: {
            column: string; }) => filter.column === col))
          .map((col) => (
            <option key={ col } value={ col }>
              {col}
            </option>
          ))}
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
        onClick={ () => {
          filterPlanets();
          handleFilter({
            column: filterColumn,
            comparison: filterComparison,
            value: filterValue,
          });
        } }
      >
        Filtrar
      </button>

      {numericFilters.map((filter: NumericFilterType, index: number) => (
        <div key={ index } data-testid="filter">
          <span>{filter.column}</span>
          <span>{filter.comparison}</span>
          <span>{filter.value}</span>
          <button
            data-testid={ `button-remove-filter-${index}` }
            onClick={ () => {
              removeNumericFilter(index);
              resetPlanets();
            } }
          >
            Remover
          </button>
        </div>
      ))}

      <button
        data-testid="button-remove-filters"
        onClick={ () => {
          removeAllNumericFilters();
          resetPlanets();
        } }
      >
        Remover todas filtragens
      </button>

      <select
        data-testid="column-sort"
        value={ sortColumn }
        onChange={ (e) => setSortColumn(e.target.value) }
      >
        {availableColumns.map((col) => (
          <option key={ col } value={ col }>
            {col}
          </option>
        ))}
      </select>

      <label>
        <input
          type="radio"
          data-testid="column-sort-input-asc"
          value="ASC"
          checked={ sortDirection === 'ASC' }
          onChange={ (e) => setSortDirection(e.target.value) }
        />
        Ascendente
      </label>

      <label>
        <input
          type="radio"
          data-testid="column-sort-input-desc"
          value="DESC"
          checked={ sortDirection === 'DESC' }
          onChange={ (e) => setSortDirection(e.target.value) }
        />
        Descendente
      </label>

      <button data-testid="column-sort-button" onClick={ handleSort }>
        Ordenar
      </button>
    </div>
  );
}

export default NumericFilter;
