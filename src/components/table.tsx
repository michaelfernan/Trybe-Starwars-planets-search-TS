import React from 'react';

interface Planet {
  name: string;
  climate: string;
  terrain: string;
  population: number;
  // Adicione outras propriedades dos planetas conforme necessário
}

interface TableProps {
  data: Planet[];
}

const Table: React.FC<TableProps> = ({ data }) => {
  if (data.length === 0) {
    return <p>Não há planetas para exibir.</p>;
  }

  const headers = Object.keys(data[0]).filter((header) => header !== 'residents');

  return (
    <table>
      <thead>
        <tr>
          {headers.map((header) => (
            <th key={ header }>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((planet) => (
          <tr key={ planet.name }>
            {headers.map((header) => (
              <td key={ header }>{planet[header]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
