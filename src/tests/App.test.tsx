import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';
import { PlanetProvider } from '../components/PlanetContext';

test('Renders the table header', () => {
  const { getByText } = render(
    <PlanetProvider>
      <App />
    </PlanetProvider>
  );

  const tableTitle = getByText('Tabela de Planetas de Star Wars');
  expect(tableTitle).toBeInTheDocument();
});
