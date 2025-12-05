import { useState } from 'react';

// Componente form per aggiungere una nuova spesa
const FormSpesa = ({ onAddSpesa }) => {
  // Stato per memorizzare descrizione, importo e data della spesa
  const [descrizione, setDescrizione] = useState('');
  const [importo, setImporto] = useState('');
  // Data di default: oggi in formato ISO (YYYY-MM-DD)
  const [data, setData] = useState(new Date().toISOString().split('T')[0]); 

  // Gestisce l'invio del form
  const handleSubmit = (e) => {
    // Previene il ricaricamento della pagina
    e.preventDefault();

    // Validazione: descrizione non vuota e importo positivo
    if (!descrizione.trim() || !importo || importo <= 0) {
      alert('Per favore, inserisci una descrizione e un importo valido (> 0).');
      return;
    }

    // Crea oggetto con i dati della spesa
    const nuovaSpesa = {
      descrizione: descrizione,
      importo: Number(importo),
      data: data, 
    };
    
    // Invia i dati al componente padre (App.jsx)
    onAddSpesa(nuovaSpesa); 

    // Resetta il form dopo l'invio
    setDescrizione('');
    setImporto('');
    setData(new Date().toISOString().split('T')[0]);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Input Titolo */}
      <div className="form-group">
        <label htmlFor="desc" className="form-label">Titolo</label>
        <input
          id="desc"
          type="text"
          className="form-input"
          value={descrizione}
          onChange={(e) => setDescrizione(e.target.value)}
          required
        />
      </div>

      {/* Input Importo */}
      <div className="form-group">
        <label htmlFor="amount" className="form-label">Importo (€)</label>
        <input
          id="amount"
          type="number"
          step="0.01"
          min="0.01"
          placeholder="0.00"
          className="form-input"
          value={importo}
          onChange={(e) => setImporto(e.target.value)}
          required
        />
      </div>

      {/* Input Data */}
      <div className="form-group">
        <label htmlFor="date" className="form-label">Data</label>
        <input
          id="date"
          type="date"
          className="form-input"
          value={data}
          onChange={(e) => setData(e.target.value)}
          required
        />
      </div>

      {/* Bottone per inviare il form */}
      <button type="submit" className="form-button">
        Aggiungi Spesa
      </button>
    </form>
  );
};

export default FormSpesa;