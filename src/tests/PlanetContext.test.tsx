import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { usePlanetContext, PlanetProvider } from '../components/PlanetContext';

describe('PlanetContext', () => {
  it('should provide its values', async () => {
    let contextValues: any;

    function TestComponent() {
      contextValues = usePlanetContext();
      return null;
    }

    render(
      <PlanetProvider>
        <TestComponent />
      </PlanetProvider>
    );

    // Aguarde até que a atualização do estado assíncrono seja concluída
    await act(async () => {
      // Adicione asserções para verificar se os valores do contexto são fornecidos corretamente
    });
  });
});
