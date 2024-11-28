// Importazione delle dipendenze necessarie
import React from 'react';
import { ListGroup } from 'react-bootstrap'; // Per la lista di commenti
import SingleComment from './SingleComment'; // Componente per singolo commento

// Componente funzionale che mostra la lista dei commenti
// Props:
// - comments: array di commenti da visualizzare
// - onCommentDeleted: callback quando un commento viene eliminato
const CommentsList = ({ comments, onCommentDeleted }) => (
  // Container principale dei commenti con margine inferiore
  <ListGroup className="mb-3">
    {/* Operatore ternario per gestire la presenza/assenza di commenti */}
    {comments.length > 0 ? (
      // Se ci sono commenti, mappali in componenti SingleComment
      comments.map((comment) => (
        <SingleComment 
          key={comment._id} // Chiave univoca per React
          comment={comment} // Passa il commento corrente
          onCommentDeleted={onCommentDeleted} // Callback per eliminazione
        />
      ))
    ) : (
      // Se non ci sono commenti, mostra un messaggio
      <ListGroup.Item>Nessun commento presente</ListGroup.Item>
    )}
  </ListGroup>
);

// Esporta il componente per utilizzarlo nell'app
export default CommentsList;