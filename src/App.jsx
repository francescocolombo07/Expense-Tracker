import { useState, useEffect, useCallback } from 'react';
import ListaSpese from './ListaSpese.jsx';
import FormSpesa from './FormSpesa';
import GraficoSpese from './GraficoSpese';

// URL base di PocketBase
const POCKETBASE_URL = 'http://127.0.0.1:8090/api/collections/spese/records'; 

const Header = () => (
  <header>
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '24px' }}>
      <h1>Expense Tracker</h1>
      <p>Traccia le tue spese personali</p>
    </div>
  </header>
);

function App() {
  const [spese, setSpese] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSpesa, setSelectedSpesa] = useState(null);
  const [editFormData, setEditFormData] = useState({ descrizione: '', importo: '', data: '' });

  // 1. Visualizzazione delle Spese (Read)
  // Esegui il fetch dei dati solo al mount (useEffect con [])
  const fetchSpese = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(POCKETBASE_URL);
      if (!response.ok) {
        throw new Error('Errore nel caricamento delle spese.');
      }
      const data = await response.json();
      // PocketBase restituisce i record dentro la chiave 'items' [cite: 28]
      setSpese(data.items);
    } catch (err) {
      console.error("Errore di rete:", err);
      setError(err.message || "Impossibile connettersi al backend.");
      setSpese([]);
    } finally {
      setLoading(false);
    }
  }, []); // Dipendenze vuote per creare la funzione una sola volta

  useEffect(() => {
    fetchSpese();
  }, [fetchSpese]);

  // 2. Creazione di una Nuova Spesa (Create)
  // Gestita dal genitore (App.jsx) [cite: 41]
  const handleAddSpesa = async (nuovaSpesa) => {
    try {
      const response = await fetch(POCKETBASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Il body deve essere un JSON con i dati della spesa
        body: JSON.stringify(nuovaSpesa), 
      });

      if (!response.ok) {
        throw new Error('Errore nella creazione della spesa.');
      }
      
      const newRecord = await response.json();
      // Aggiorna lo stato globale con il nuovo record [cite: 37]
      setSpese((prevSpese) => [newRecord, ...prevSpese]); 
    } catch (err) {
      console.error("Errore POST:", err);
      alert('Errore durante l\'aggiunta della spesa.');
    }
  };

  // 3. Eliminazione di una Spesa (Delete)
  const handleDeleteSpesa = async (id) => {
    if (!window.confirm("Sei sicuro di voler eliminare questa spesa?")) return;

    try {
      const response = await fetch(`${POCKETBASE_URL}/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Errore nell\'eliminazione della spesa.');
      }

      setSpese((prevSpese) => prevSpese.filter(spesa => spesa.id !== id));
      setSelectedSpesa(null);
    } catch (err) {
      console.error("Errore DELETE:", err);
      alert('Errore durante l\'eliminazione della spesa.');
    }
  };

  // 4. Modifica di una Spesa (Update)
  const handleUpdateSpesa = async (id) => {
    if (!editFormData.descrizione.trim() || !editFormData.importo || editFormData.importo <= 0) {
      alert('Per favore, inserisci una descrizione e un importo valido (> 0).');
      return;
    }

    try {
      const dataToSend = {
        descrizione: editFormData.descrizione,
        importo: Number(editFormData.importo),
        data: editFormData.data,
      };

      console.log('Invio dati:', dataToSend);

      const response = await fetch(`${POCKETBASE_URL}/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      console.log('Response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Errore response:', errorText);
        throw new Error('Errore nella modifica della spesa.');
      }

      const updatedRecord = await response.json();
      console.log('Record aggiornato:', updatedRecord);

      setSpese((prevSpese) =>
        prevSpese.map((spesa) => (spesa.id === id ? updatedRecord : spesa))
      );
      setSelectedSpesa(null);
      alert('Spesa modificata con successo!');
    } catch (err) {
      console.error("Errore PATCH:", err);
      alert('Errore   durante la modifica della spesa: ' + err.message);
    }
  };

  const openEditModal = (spesa) => {
    setSelectedSpesa(spesa);
    setEditFormData({
      descrizione: spesa.descrizione,
      importo: spesa.importo,
      data: spesa.data,
    });
  };
  
  // Task Bonus: Calcolo del totale delle spese [cite: 54]
  const totalSpese = spese.reduce((sum, spesa) => sum + Number(spesa.importo), 0).toFixed(2);

  // Ordinare spese per data decrescente (dalla più recente alla più vecchia)
  const speseOrdinate = [...spese].sort((a, b) => new Date(b.data) - new Date(a.data));

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      <Header />
      
      <main>
        <div className="grid-layout">
          {/* Sidebar */}
          <div className="sidebar">
            {/* Total Card */}
            <div className="card total-card">
              <div className="total-label">Totale Spese</div>
              <div className="total-amount">
                <span className="total-currency">€</span>
                <span className="total-value">{totalSpese}</span>
              </div>
            </div>

            {/* Form Card */}
            <div className="card">
              <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#111827', marginBottom: '32px' }}>Aggiungi Spesa</h2>
              <FormSpesa onAddSpesa={handleAddSpesa} />
            </div>
          </div>

          {/* Main Content */}
          <div className="list-container">
            {/* Header */}
            <div className="list-header">
              <h2 className="list-title">Spese Registrate</h2>
              {!loading && !error && spese.length > 0 && (
                <span className="list-count">{spese.length} {spese.length === 1 ? 'spesa' : 'spese'}</span>
              )}
            </div>

            {/* Content */}
            <div className="list-content">
              {loading && (
                <div className="loading-spinner">
                  <div className="spinner"></div>
                  <p className="loading-text">Caricamento spese...</p>
                </div>
              )}
              
              {error && (
                <div className="error-box">
                  <p className="error-text"><strong>Errore:</strong> {error}</p>
                </div>
              )}
              
              {!loading && !error && spese.length === 0 && (
                <div className="empty-state">
                  <div className="empty-icon">📭</div>
                  <p className="empty-title">Nessuna spesa registrata</p>
                  <p className="empty-text">Aggiungi una spesa dal modulo a sinistra</p>
                </div>
              )}
              
              {!loading && !error && spese.length > 0 && (
                <ListaSpese spese={speseOrdinate} onDeleteSpesa={handleDeleteSpesa} onEditSpesa={openEditModal} />
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Dashboard Grafici */}
      {!loading && !error && spese.length > 0 && (
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px 48px' }}>
          <GraficoSpese spese={speseOrdinate} />
        </div>
      )}

      {/* Modal Edit/Delete */}
      {selectedSpesa && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '32px',
            maxWidth: '500px',
            width: '90%',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
          }}>
            <div style={{ marginBottom: '24px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#111827', marginBottom: '24px' }}>Modifica Spesa</h2>
              
              <div className="form-group">
                <label className="form-label">Titolo</label>
                <input
                  type="text"
                  className="form-input"
                  value={editFormData.descrizione}
                  onChange={(e) => setEditFormData({ ...editFormData, descrizione: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Importo (€)</label>
                <input
                  type="number"
                  step="0.01"
                  min="0.01"
                  className="form-input"
                  value={editFormData.importo}
                  onChange={(e) => setEditFormData({ ...editFormData, importo: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Data</label>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '14px', color: '#6b7280', fontWeight: '500' }}>
                    {editFormData.data ? new Date(editFormData.data).toLocaleDateString('it-IT') : new Date(selectedSpesa?.data).toLocaleDateString('it-IT')}
                  </span>
                </div>
                <input
                  type="date"
                  className="form-input"
                  value={editFormData.data}
                  placeholder={selectedSpesa?.data ? new Date(selectedSpesa.data).toLocaleDateString('it-IT') : 'gg/mm/aaaa'}
                  onChange={(e) => setEditFormData({ ...editFormData, data: e.target.value })}
                  title={selectedSpesa?.data ? `Data originale: ${new Date(selectedSpesa.data).toLocaleDateString('it-IT')}` : ''}
                />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setSelectedSpesa(null)}
                style={{
                  padding: '10px 20px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  backgroundColor: '#f3f4f6',
                  color: '#374151',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#e5e7eb'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#f3f4f6'}
              >
                Annulla
              </button>
              
              <button
                onClick={() => handleDeleteSpesa(selectedSpesa.id)}
                style={{
                  padding: '10px 20px',
                  border: 'none',
                  borderRadius: '6px',
                  backgroundColor: '#ef4444',
                  color: 'white',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#dc2626'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#ef4444'}
              >
                Elimina
              </button>

              <button
                onClick={() => handleUpdateSpesa(selectedSpesa.id)}
                style={{
                  padding: '10px 20px',
                  border: 'none',
                  borderRadius: '6px',
                  backgroundColor: '#2563eb',
                  color: 'white',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#1d4ed8'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#2563eb'}
              >
                Salva Modifiche
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App; 