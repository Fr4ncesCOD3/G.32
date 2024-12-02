// Importazione delle dipendenze necessarie
import React from 'react';
import { Alert } from 'react-bootstrap'; // Per mostrare messaggi di errore
import CommentsList from './CommentsList'; // Componente per visualizzare la lista dei commenti
import AddComment from './AddComment'; // Componente per aggiungere nuovi commenti
import { helix } from 'ldrs'; // Libreria per l'animazione di caricamento

// Registra l'animazione helix per il loading spinner
helix.register();
    
/**
 * CommentArea - Componente classe che gestisce l'area commenti di un libro
 * Gestisce il caricamento, la visualizzazione e l'aggiunta di commenti per un libro specifico
 * Riceve come prop l'ASIN del libro per cui mostrare i commenti
 */
class CommentArea extends React.Component {
  // Stato iniziale del componente che tiene traccia dei commenti, errori e stato di caricamento
  state = {
    comments: [], // Array che conterrà i commenti caricati dal server
    error: null, // Memorizza eventuali errori durante le operazioni
    loading: true // Flag per indicare se è in corso un caricamento
  };

  /**
   * fetchComments - Metodo asincrono che recupera i commenti dal server
   * Effettua una chiamata API per ottenere i commenti associati all'ASIN del libro
   * Aggiorna lo stato del componente con i commenti ricevuti o eventuali errori
   */
  fetchComments = async () => {
    try {
      // Imposta il loading a true prima di iniziare il fetch
      this.setState({ loading: true });

      // Chiamata API per recuperare i commenti usando l'ASIN nelle props
      const response = await fetch(
        `https://striveschool-api.herokuapp.com/api/comments/${this.props.asin}`,
        {
          headers: {
            // Token di autorizzazione richiesto dall'API
            Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzQ4Njk5NjA2ZmM4YzAwMTU2Yjg2ZWIiLCJpYXQiOjE3MzI3OTg4NzAsImV4cCI6MTczNDAwODQ3MH0.cMoFL5VdMuduVlORWJQDnb_nhdUhz00n1BSK3Jh7sAk"
          }
        }
      );

      // Gestione della risposta
      if (response.ok) {
        const comments = await response.json();
        // Aggiorna lo stato con i commenti ricevuti e resetta errori/loading
        this.setState({
          comments,
          error: null,
          loading: false
        });
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      // In caso di errore, aggiorna lo stato con il messaggio appropriato
      this.setState({
        error: `Errore nel caricamento dei commenti: ${error.message}`,
        loading: false
      });
    }
  };

  // Lifecycle method: carica i commenti quando il componente viene montato
  componentDidMount() {
    this.fetchComments();
  }

  // Lifecycle method: ricarica i commenti quando cambia l'ASIN del libro
  componentDidUpdate(prevProps) {
    if (prevProps.asin !== this.props.asin) {
      this.fetchComments();
    }
  }

  /**
   * Render del componente
   * Mostra:
   * - Spinner di caricamento durante il fetch
   * - Messaggi di errore se presenti
   * - Lista dei commenti e form per aggiungerne di nuovi
   */
  render() {
    const { comments, error, loading } = this.state;

    return (
      // Container principale con classi condizionali per la visualizzazione
      <div className={`comments-container bg-dark p-3 rounded ${this.props.show ? 'show' : ''}`}>
        <div className="comments-header pt-4">
          <h4 className="text-light mb-4">Commenti</h4>
        </div>
        
        {/* Rendering condizionale basato sullo stato */}
        {loading ? (
          // Mostra lo spinner durante il caricamento
          <div className="text-center">
            <l-helix size="40" speed="2.5" color="white"></l-helix>
            <p className="text-light mt-2">Caricamento commenti...</p>
          </div>
        ) : error ? (
          // Mostra l'alert in caso di errore
          <Alert variant="danger">{error}</Alert>
        ) : (
          // Mostra la lista dei commenti e il form per aggiungerne
          <div className="comments-scroll">
            <CommentsList 
              comments={comments} 
              onCommentDeleted={this.fetchComments}
            />
            <AddComment 
              asin={this.props.asin} 
              onCommentAdded={this.fetchComments}
            />
          </div>
        )}
      </div>
    );
  }
}

// Esporta il componente per l'utilizzo in altri file
export default CommentArea;