// Importazione delle dipendenze necessarie
import React from 'react';
import { Container } from 'react-bootstrap'; // Per il layout responsive
import { helix } from 'ldrs'; // Libreria per l'animazione di caricamento

// Registra l'animazione helix per poterla utilizzare
helix.register();

// Componente che viene mostrato quando l'app è offline
const OfflinePage = () => (
  // Container principale con flex per centrare il contenuto
  <Container 
    className="d-flex flex-column justify-content-center align-items-center min-vh-100 bg-dark text-white"
  >
    {/* Animazione di caricamento helix */}
    <l-helix
      size="80" // Dimensione dell'animazione in pixel
      speed="2.5" // Velocità di rotazione
      color="white" // Colore dell'animazione
    ></l-helix>
    
    {/* Messaggio principale per l'utente */}
    <h2 className="mt-4 mb-2 text-center">Reconnect your network :)</h2>
    {/* Sottotitolo che indica lo stato di attesa */}
    <p className="text-muted">Waiting for connection...</p>
  </Container>
);

// Esporta il componente per utilizzarlo nell'app
export default OfflinePage;
