// Importazione delle dipendenze necessarie da React
import React, { useState, useEffect } from 'react';
// Importazione degli stili CSS
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Importazione dei componenti personalizzati
import MyNavbar from './components/MyNavbar';
import MyFooter from './components/MyFooter';
import Welcome from './components/Welcome';
import BookList from './components/BookList';
import Loading from './components/Loading';
import OfflinePage from './components/OfflinePage';

// Importazione dei dati dei libri dal file JSON
import scifiBooks from './librarydata/scifi.json';

// Componente principale dell'applicazione
const App = () => {
  // Stato per gestire il caricamento iniziale dell'app
  // isLoading: true durante il caricamento, false quando è completato
  const [isLoading, setIsLoading] = useState(true);
  
  // Stato per monitorare la connessione internet
  // isOnline: true quando c'è connessione, false quando offline
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    // Funzione che viene chiamata quando la connessione viene ripristinata
    const handleOnline = () => setIsOnline(true);
    // Funzione che viene chiamata quando la connessione viene persa
    const handleOffline = () => setIsOnline(false);

    // Registrazione degli event listener per monitorare lo stato della connessione
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Simula un tempo di caricamento di 1.5 secondi per migliorare UX
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    // Cleanup function che viene eseguita quando il componente viene smontato
    // Rimuove gli event listener e cancella il timer per evitare memory leak
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      clearTimeout(timer);
    };
  }, []); // Le dipendenze vuote indicano che l'effect viene eseguito solo al mount

  // Se l'app è offline, mostra il componente OfflinePage
  if (!isOnline) {
    return <OfflinePage />;
  }

  // Struttura principale dell'app con layout flex e sfondo scuro
  return (
    <div className="App d-flex flex-column min-vh-100 bg-dark">
      <MyNavbar /> {/* Barra di navigazione in alto */}
      <Welcome /> {/* Sezione di benvenuto con titolo e descrizione */}
      <div className="container my-4">
        {/* Rendering condizionale: mostra Loading durante il caricamento,
            altrimenti mostra la lista dei libri */}
        {isLoading ? (
          <Loading />
        ) : (
          <BookList books={scifiBooks} />
        )}
      </div>
      <MyFooter /> {/* Footer con informazioni aggiuntive */}
    </div>
  );
};

// Esporta il componente App per utilizzarlo come root dell'applicazione
export default App;
