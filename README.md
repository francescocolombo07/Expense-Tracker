# Expense Tracker – React & PocketBase

Questo progetto è una Single Page Application sviluppata in React per tracciare le spese personali.
Integra un backend PocketBase per la gestione dei dati e offre un’interfaccia moderna, pulita e intuitiva.
L’app permette la gestione completa delle spese (creazione, visualizzazione, modifica, eliminazione) e include una dashboard grafica che mostra la distribuzione degli importi tramite un grafico a torta.

---

# Funzionalità Principali

## Gestione Spese (CRUD)

* Aggiunta di una nuova spesa tramite un form dedicato.
* Visualizzazione delle spese con titolo, data e importo.
* Modifica di una spesa tramite finestra modale.
* Eliminazione con conferma dalla modale.
* Aggiornamento immediato dell’interfaccia senza ricaricare la pagina.

## Dashboard Grafica

* Grafico a torta che mostra la distribuzione delle spese.
* Basato su Recharts.
* Aggiornamento dinamico in seguito ad aggiunta, modifica o eliminazione.
* Legenda automatica con colori distinti per ogni spesa.

## Calcolo Totale Spese

* Visualizzazione del totale delle spese registrate.
* Aggiornamento in tempo reale ogni volta che i dati cambiano.

## Interfaccia Utente

* Layout chiaro e leggibile ispirato alle applicazioni professionali.
* Sezioni principali:

  * Totale spese
  * Aggiunta nuova spesa
  * Lista delle spese registrate
  * Dashboard grafica
* Componenti modulari per una gestione pulita del codice.

---

# Tecnologie Utilizzate

## Frontend

* React
* Hooks: useState, useEffect
* Fetch API per la comunicazione HTTP
* Recharts per la dashboard (PieChart)

## Backend

* PocketBase avviato localmente

---

# Struttura del Progetto

```
src/
 ├── App.js
 ├── components/
 │    ├── FormSpesa.js
 │    ├── ListaSpese.js
 │    ├── ItemSpesa.js
 │    ├── GraficoSpese.js
 ├── styles/
 └── ...
```

---

# Configurazione Backend (PocketBase)

1. Scaricare PocketBase dal sito ufficiale:
   [https://pocketbase.io](https://pocketbase.io)

2. Avviare il server:

   ```
   ./pocketbase serve
   ```

3. Accedere all’admin UI:

   ```
   http://127.0.0.1:8090/_/
   ```

4. Creare la collezione **spese** con i campi:

   * titolo (text)
   * importo (number)
   * data (date)

5. Impostare i permessi API della collezione:

   * List: Anyone
   * View: Anyone
   * Create: Anyone
   * Update: Anyone
   * Delete: Anyone

---

# Installazione e Avvio Frontend

1. Installare le dipendenze:

   ```
   npm install
   ```

2. Avviare l’app:

   ```
   npm run dev
   ```

3. Accertarsi che PocketBase sia avviato prima dell’apertura dell'interfaccia.

---

# API Utilizzate (PocketBase)

### Recupero delle spese

```
GET /api/collections/spese/records
```

### Creazione nuova spesa

```
POST /api/collections/spese/records
```

### Modifica spesa

```
PATCH /api/collections/spese/records/:id
```

### Eliminazione spesa

```
DELETE /api/collections/spese/records/:id
```

---

# Componenti Principali

## App.js

* Contiene lo stato globale delle spese.
* Gestisce tutte le operazioni CRUD.
* Coordina la comunicazione tra i componenti.

## FormSpesa.js

* Form dedicato all’inserimento di una nuova spesa.
* Gestisce titolo, importo e data.

## ListaSpese.js

* Contiene l’elenco completo delle spese registrate.
* Invia a ItemSpesa i dati necessari.

## ItemSpesa.js

* Rappresenta una singola spesa nella lista.
* Gestisce apertura della modale di modifica.

## GraficoSpese.js

* Genera il grafico a torta con Recharts utilizzando gli importi aggiornati.
* Si aggiorna automaticamente ad ogni modifica dei dati.

---

# Note Finali

Il progetto è pensato come soluzione didattica ma presenta una struttura solida e facilmente estendibile.
È possibile aggiungere ulteriori funzionalità come categorie, filtri, autenticazione o esportazione dei dati.
