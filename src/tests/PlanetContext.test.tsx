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

    await act(async () => {
     
    });
  });
});