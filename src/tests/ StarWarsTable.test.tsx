import React from 'react';
import { render } from '@testing-library/react';
import { PlanetProvider } from '../components/PlanetContext';
import StarWarsTable from '../components/StarWarsTable';


test('renders StarWarsTable component correctly', () => {
  const { getByText } = render(
    <PlanetProvider>
      <StarWarsTable />
    </PlanetProvider>
  );

  const tableTitle = getByText('Tabela de Planetas de Star Wars');
  expect(tableTitle).toBeInTheDocument();
});
