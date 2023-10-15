import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import { PlanetProvider } from '../components/PlanetContext';

test('I am your test', () => {
  render(<PlanetProvider>
    <App />
  </PlanetProvider>);
  const linkElement = screen.getByText('Tabela de Planetas de Star Wars');
  expect(linkElement).toBeInTheDocument();
});