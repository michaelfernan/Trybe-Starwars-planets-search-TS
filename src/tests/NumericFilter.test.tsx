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