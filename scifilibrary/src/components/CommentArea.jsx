// Importazione delle dipendenze necessarie
import React, { useState, useEffect, useCallback } from 'react';
import { Alert } from 'react-bootstrap'; // Per mostrare messaggi di errore
import CommentsList from './CommentsList'; // Componente per visualizzare la lista dei commenti
import AddComment from './AddComment'; // Componente per aggiungere nuovi commenti
import { helix } from 'ldrs'; // Loader animato per il caricamento

// Registrazione del componente loader helix
helix.register();

// Componente principale per l'area commenti
// asin: identificativo del libro
// show: booleano per controllare la visibilità
const CommentArea = ({ asin, show }) => {
  // Stati per gestire i commenti, errori e loading
  const [comments, setComments] = useState([]); // Array dei commenti
  const [error, setError] = useState(null); // Messaggi di errore
  const [loading, setLoading] = useState(true); // Stato di caricamento

  // Funzione per recuperare i commenti dal server
  // Usa useCallback per memorizzare la funzione e evitare render inutili
  const fetchComments = useCallback(async () => {
    try {
      setLoading(true); // Attiva loading durante la richiesta
      const response = await fetch(
        `https://striveschool-api.herokuapp.com/api/comments/${asin}`,
        {
          headers: {
            Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzQ4Njk5NjA2ZmM4YzAwMTU2Yjg2ZWIiLCJpYXQiOjE3MzI3OTg4NzAsImV4cCI6MTczNDAwODQ3MH0.cMoFL5VdMuduVlORWJQDnb_nhdUhz00n1BSK3Jh7sAk"
          }
        }
      );

      if (response.ok) {
        const comments = await response.json();
        setComments(comments); // Aggiorna lo stato con i commenti ricevuti
        setError(null); // Resetta eventuali errori precedenti
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      setError(`Errore nel caricamento dei commenti: ${error.message}`);
    } finally {
      setLoading(false); // Disattiva loading a fine richiesta
    }
  }, [asin]); // Dipendenza da asin per ricreare la funzione quando cambia

  // Effetto per caricare i commenti all'avvio e quando cambia asin
  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  // Rendering del componente
  return (
    <div className={`comments-container bg-dark p-3 rounded ${show ? 'show' : ''}`}>
      <div className="comments-header pt-4">
        <h4 className="text-light mb-4">Commenti</h4>
      </div>
      
      {/* Gestione dei diversi stati: loading, error, o visualizzazione commenti */}
      {loading ? (
        // Mostra loader durante il caricamento
        <div className="text-center">
          <l-helix size="40" speed="2.5" color="white"></l-helix>
          <p className="text-light mt-2">Caricamento commenti...</p>
        </div>
      ) : error ? (
        // Mostra messaggio di errore se presente
        <Alert variant="danger">{error}</Alert>
      ) : (
        // Mostra lista commenti e form per aggiungerne di nuovi
        <div className="comments-scroll">
          <CommentsList 
            comments={comments} 
            onCommentDeleted={fetchComments} // Callback per aggiornare dopo eliminazione
          />
          <AddComment 
            asin={asin} 
            onCommentAdded={fetchComments} // Callback per aggiornare dopo aggiunta
          />
        </div>
      )}
    </div>
  );
};

export default CommentArea;