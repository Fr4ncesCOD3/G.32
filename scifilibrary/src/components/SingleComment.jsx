// Importazione delle dipendenze necessarie da React e React Bootstrap
import React from 'react';
import { ListGroup, Button } from 'react-bootstrap';

/**
 * SingleComment - Componente classe che gestisce la visualizzazione e cancellazione di un singolo commento
 * Props:
 * - comment: oggetto contenente i dati del commento (testo, valutazione, id)
 * - onCommentDeleted: callback da chiamare quando un commento viene eliminato con successo
 */
class SingleComment extends React.Component {
  /**
   * deleteComment - Metodo asincrono per eliminare un commento dal server
   * Effettua una richiesta DELETE all'API utilizzando l'ID del commento
   * In caso di successo, notifica il componente padre attraverso la callback onCommentDeleted
   */
  deleteComment = async () => {
    try {
      // Effettua una richiesta DELETE all'API con l'ID del commento
      const response = await fetch(
        `https://striveschool-api.herokuapp.com/api/comments/${this.props.comment._id}`,
        {
          method: 'DELETE',
          headers: {
            // Token di autorizzazione necessario per l'autenticazione con l'API
            Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzQ4Njk5NjA2ZmM4YzAwMTU2Yjg2ZWIiLCJpYXQiOjE3MzI3OTg4NzAsImV4cCI6MTczNDAwODQ3MH0.cMoFL5VdMuduVlORWJQDnb_nhdUhz00n1BSK3Jh7sAk"
          }
        }
      );
      // Se la richiesta ha successo, notifica il componente padre per aggiornare la lista
      if (response.ok) {
        this.props.onCommentDeleted();
      }
    } catch (error) {
      // Log degli errori durante la cancellazione per il debugging
      console.error('Errore nella cancellazione del commento:', error);
    }
  };

  render() {
    // Destrutturazione delle props per accedere facilmente ai dati del commento
    const { comment } = this.props;
    
    return (
      // ListGroup.Item con layout flessibile per allineare contenuto e pulsante
      <ListGroup.Item className="d-flex justify-content-between align-items-start">
        {/* Contenitore del testo del commento e della valutazione */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Testo del commento con gestione del word-break per testi lunghi */}
          <p className="mb-1" style={{ wordBreak: 'break-word' }}>{comment.comment}</p>
          {/* Valutazione visualizzata con stelle, ripetute in base al valore numerico */}
          <small className="text-muted">
            Valutazione: {'⭐'.repeat(comment.rate)}
          </small>
        </div>
        {/* Pulsante per eliminare il commento */}
        <Button 
          variant="outline-danger" 
          size="sm"
          onClick={this.deleteComment}
        >
          Elimina
        </Button>
      </ListGroup.Item>
    );
  }
}

// Esporta il componente per permetterne l'utilizzo in altri componenti dell'applicazione
export default SingleComment;
