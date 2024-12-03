// Importazione delle dipendenze necessarie
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

// Componente per aggiungere nuovi commenti
// asin: identificativo del libro
// onCommentAdded: callback chiamata quando un commento viene aggiunto con successo
const AddComment = ({ asin, onCommentAdded }) => {
  // Stato del form con commento e valutazione
  const [formData, setFormData] = useState({
    comment: '', // Testo del commento
    rate: '1'    // Valutazione da 1 a 5
  });

  // Gestisce l'invio del form
  const handleSubmit = async (e) => {
    e.preventDefault(); // Previene il comportamento di default del form

    try {
      // Chiamata API per salvare il nuovo commento
      const response = await fetch(
        'https://striveschool-api.herokuapp.com/api/comments/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzQ4Njk5NjA2ZmM4YzAwMTU2Yjg2ZWIiLCJpYXQiOjE3MzI3OTg4NzAsImV4cCI6MTczNDAwODQ3MH0.cMoFL5VdMuduVlORWJQDnb_nhdUhz00n1BSK3Jh7sAk"
          },
          body: JSON.stringify({
            comment: formData.comment,
            rate: formData.rate,
            elementId: asin
          })
        }
      );

      if (response.ok) {
        // Reset del form dopo il successo
        setFormData({ comment: '', rate: '1' });
        // Notifica il componente padre del nuovo commento
        onCommentAdded();
      }
    } catch (error) {
      console.error('Errore nell\'aggiunta del commento:', error);
    }
  };

  // Rendering del form
  return (
    <Form onSubmit={handleSubmit}>
      {/* Campo per il testo del commento */}
      <Form.Group className="mb-3">
        <Form.Control
          as="textarea"
          rows={3}
          id="comment-text"
          name="comment-text"
          placeholder="Aggiungi un commento..."
          value={formData.comment}
          onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
        />
      </Form.Group>
      {/* Selettore per la valutazione */}
      <Form.Group className="mb-3">
        <Form.Select
          id="rating-select"
          name="rating"
          value={formData.rate}
          onChange={(e) => setFormData({ ...formData, rate: e.target.value })}
        >
          {/* Genera le opzioni da 1 a 5 stelle */}
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
      {/* Pulsante per inviare il commento */}
      <Button variant="primary" type="submit">
        Invia commento
      </Button>
    </Form>
  );
};

export default AddComment;