import React from 'react';
import ItemSpesa from './ItemSpesa'; // Importa il componente per la singola riga

const ListaSpese = ({ spese, onDeleteSpesa, onEditSpesa }) => {
  return (
    <div className="list-items">
      {spese.map((spesa) => (
        <ItemSpesa 
          key={spesa.id} 
          spesa={spesa} 
          onDelete={onDeleteSpesa}
          onEdit={onEditSpesa}
        />
      ))}
    </div>
  );
};

// ERRORE: Qui stavi usando "ListaSpesa" (mancava la 'e').
// CORREZIONE: Usa il nome definito sopra: ListaSpese
export default ListaSpese;