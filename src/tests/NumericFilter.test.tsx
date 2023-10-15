import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import NumericFilter from '../components/NumericFilter';
import { PlanetProvider } from '../components/PlanetContext';


test('renders NumericFilter component correctly', () => {
  const { getByTestId } = render(
    <PlanetProvider>
      <NumericFilter />
    </PlanetProvider>
  );

  const nameFilterInput = getByTestId('name-filter');
  const columnFilterSelect = getByTestId('column-filter');
  const comparisonFilterSelect = getByTestId('comparison-filter');
  const valueFilterInput = getByTestId('value-filter');
  const buttonFilter = getByTestId('button-filter');

  expect(nameFilterInput).toBeInTheDocument();
  expect(columnFilterSelect).toBeInTheDocument();
  expect(comparisonFilterSelect).toBeInTheDocument();
  expect(valueFilterInput).toBeInTheDocument();
  expect(buttonFilter).toBeInTheDocument();
});

test('allows user to type a filter name', () => {
  const { getByTestId } = render(
    <PlanetProvider>
      <NumericFilter />
    </PlanetProvider>
  );

  const nameFilterInput = getByTestId('name-filter');

  fireEvent.change(nameFilterInput, { target: { value: 'Tatooine' } });

  expect(nameFilterInput).toHaveValue('Tatooine');
});

test('allows user to select a column for filtering', () => {
  const { getByTestId } = render(
    <PlanetProvider>
      <NumericFilter />
    </PlanetProvider>
  );

  const columnFilterSelect = getByTestId('column-filter');

  fireEvent.change(columnFilterSelect, { target: { value: 'diameter' } });

  expect(columnFilterSelect).toHaveValue('diameter');
});

test('allows user to select a comparison type', () => {
  const { getByTestId } = render(
    <PlanetProvider>
      <NumericFilter />
    </PlanetProvider>
  );

  const comparisonFilterSelect = getByTestId('comparison-filter');

  fireEvent.change(comparisonFilterSelect, { target: { value: 'menor que' } });

  expect(comparisonFilterSelect).toHaveValue('menor que');
});



test('allows user to click the "Filtrar" button to apply a filter', () => {
  const { getByTestId } = render(
    <PlanetProvider>
      <NumericFilter />
    </PlanetProvider>
  );

  const buttonFilter = getByTestId('button-filter');

  fireEvent.click(buttonFilter);

 
});



test('allows user to remove all numeric filters', () => {
  const { getByTestId } = render(
    <PlanetProvider>
      <NumericFilter />
    </PlanetProvider>
  );

  const buttonRemoveAllFilters = getByTestId('button-remove-filters');

  fireEvent.click(buttonRemoveAllFilters);

 
});
