import React from 'react';
import './App.css';
import StarWarsTable from './components/StarWarsTable';
import { PlanetProvider } from './components/PlanetContext';

function App() {
  return (

    <PlanetProvider>
      <StarWarsTable />
    </PlanetProvider>

  );
}

export default App;
