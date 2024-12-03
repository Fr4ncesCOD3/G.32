// Importazione delle dipendenze necessarie
import React from 'react';
import { ListGroup, Button } from 'react-bootstrap'; // Componenti UI di Bootstrap

// Componente SingleComment che mostra un singolo commento
// Props:
// - comment: oggetto contenente i dati del commento 
// - onCommentDeleted: callback chiamata quando un commento viene eliminato
const SingleComment = ({ comment, onCommentDeleted }) => {
  // Funzione per eliminare il commento
  const deleteComment = async () => {
    try {
      // Chiamata API per eliminare il commento
      const response = await fetch(
        `https://striveschool-api.herokuapp.com/api/comments/${comment._id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzQ4Njk5NjA2ZmM4YzAwMTU2Yjg2ZWIiLCJpYXQiOjE3MzI3OTg4NzAsImV4cCI6MTczNDAwODQ3MH0.cMoFL5VdMuduVlORWJQDnb_nhdUhz00n1BSK3Jh7sAk"
          }
        }
      );
      // Se l'eliminazione ha successo, notifica il componente padre
      if (response.ok) {
        onCommentDeleted();
      }
    } catch (error) {
      console.error('Errore nella cancellazione del commento:', error);
    }
  };

  // Rendering del commento con layout flessibile
  return (
    <ListGroup.Item className="d-flex justify-content-between align-items-start">
      {/* Contenitore del testo del commento con gestione overflow */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {/* Testo del commento con word-break per gestire testi lunghi */}
        <p className="mb-1" style={{ wordBreak: 'break-word' }}>{comment.comment}</p>
        {/* Visualizzazione della valutazione con stelle */}
        <small className="text-muted">
          Valutazione: {'⭐'.repeat(comment.rate)}
        </small>
      </div>
      {/* Pulsante per eliminare il commento */}
      <Button 
        variant="outline-danger" 
        size="sm"
        onClick={deleteComment}
      >
        Elimina
      </Button>
    </ListGroup.Item>
  );
};

// Esportazione del componente
export default SingleComment;
