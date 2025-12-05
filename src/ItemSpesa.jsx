import React from 'react';

const ItemSpesa = ({ spesa, onDelete, onEdit }) => {
  // Formatta la data per una migliore visualizzazione
  const data = new Date(spesa.data).toLocaleDateString('it-IT', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
  
  return (
    <div 
      className="list-item"
      onClick={() => onEdit(spesa)}
      style={{ cursor: 'pointer' }}
    >
      <div className="item-info">
        <h3>{spesa.descrizione}</h3>
        <p>{data}</p>
      </div>
      
      <div className="item-actions">
        <span className="item-amount">€{Number(spesa.importo).toFixed(2)}</span>
        
        <button 
          className="delete-button"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(spesa.id);
          }} 
          title="Elimina"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            <line x1="10" y1="11" x2="10" y2="17"></line>
            <line x1="14" y1="11" x2="14" y2="17"></line>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ItemSpesa;