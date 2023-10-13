import React from 'react';
import './App.css';
import { PlanetProvider } from './components/PlanetContext';
import StarWarsTable from './components/StarWarsTable';

function App() {
  return (
    <PlanetProvider>
      <StarWarsTable />
    </PlanetProvider>
  );
}

export default App;
