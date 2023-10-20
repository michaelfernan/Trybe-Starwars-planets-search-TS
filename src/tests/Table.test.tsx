import { render, screen } from '@testing-library/react';
import { PlanetContext } from '../components/PlanetContext';
import Table from '../components/Table';


describe('<Table />', () => {
  test('Deve mostrar uma mensagem quando não há planetas', () => {
    render(
      <PlanetContext.Provider value={{ planets: [], filterText: '' }}>
        <Table />
      </PlanetContext.Provider>
    );

    expect(screen.getByText('Não há planetas para exibir.')).toBeInTheDocument();
  });

  test('Deve filtrar a chave "residents" dos cabeçalhos', () => {
    const planets = [{ name: 'Terra', type: 'Rocky', residents: [] }];
    render(
      <PlanetContext.Provider value={{ planets, filterText: '' }}>
        <Table />
      </PlanetContext.Provider>
    );

    expect(screen.queryByText('residents')).not.toBeInTheDocument();
  });

  test('Deve filtrar planetas com base no texto do filtro', () => {
    const planets = [
      { name: 'Terra', type: 'Rocky' },
      { name: 'Marte', type: 'Rocky' },
    ];
    render(
      <PlanetContext.Provider value={{ planets, filterText: 'terra' }}>
        <Table />
      </PlanetContext.Provider>
    );

    expect(screen.getByTestId('planet-name')).toHaveTextContent('Terra');
    expect(screen.queryByText('Marte')).not.toBeInTheDocument();
  });

  test('Deve renderizar o cabeçalho da tabela', () => {
    const planets = [{ name: 'Terra', type: 'Rocky' }];
    render(
      <PlanetContext.Provider value={{ planets, filterText: '' }}>
        <Table />
      </PlanetContext.Provider>
    );

    expect(screen.getByText('name')).toBeInTheDocument();
    expect(screen.getByText('type')).toBeInTheDocument();
  });

  test('Deve renderizar as linhas dos planetas', () => {
    const planets = [{ name: 'Terra', type: 'Rocky' }];
    render(
      <PlanetContext.Provider value={{ planets, filterText: '' }}>
        <Table />
      </PlanetContext.Provider>
    );

    expect(screen.getByTestId('planet-name')).toHaveTextContent('Terra');
    expect(screen.getByText('Rocky')).toBeInTheDocument();
  });
});
