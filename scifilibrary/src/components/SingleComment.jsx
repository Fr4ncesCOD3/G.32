// Importazione delle dipendenze necessarie
import React from 'react';
import { ListGroup, Button } from 'react-bootstrap';

// Componente classe che gestisce la visualizzazione e cancellazione di un singolo commento
class SingleComment extends React.Component {
  // Metodo asincrono per eliminare un commento dal server
  deleteComment = async () => {
    try {
      // Effettua una richiesta DELETE all'API con l'ID del commento
      const response = await fetch(
        `https://striveschool-api.herokuapp.com/api/comments/${this.props.comment._id}`,
        {
          method: 'DELETE',
          headers: {
            // Token di autorizzazione necessario per l'API
            Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzQ4Njk5NjA2ZmM4YzAwMTU2Yjg2ZWIiLCJpYXQiOjE3MzI3OTg4NzAsImV4cCI6MTczNDAwODQ3MH0.cMoFL5VdMuduVlORWJQDnb_nhdUhz00n1BSK3Jh7sAk"
          }
        }
      );
      // Se la richiesta ha successo, notifica il componente padre
      if (response.ok) {
        this.props.onCommentDeleted();
      }
    } catch (error) {
      // Gestione degli errori durante la cancellazione
      console.error('Errore nella cancellazione del commento:', error);
    }
  };

  render() {
    // Estrae il commento dalle props
    const { comment } = this.props;
    
    // Renderizza il commento con il testo, la valutazione e il pulsante di eliminazione
    return (
      <ListGroup.Item className="d-flex justify-content-between align-items-start">
        <div>
          {/* Testo del commento */}
          <p className="mb-1">{comment.comment}</p>
          {/* Valutazione mostrata con stelle */}
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

// Esporta il componente per utilizzarlo nell'app
export default SingleComment;
