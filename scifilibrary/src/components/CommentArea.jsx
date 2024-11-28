// Importazione delle dipendenze necessarie
import React from 'react';
import { Alert } from 'react-bootstrap'; // Per mostrare messaggi di errore
import CommentsList from './CommentsList'; // Componente per visualizzare la lista dei commenti
import AddComment from './AddComment'; // Componente per aggiungere nuovi commenti
import { helix } from 'ldrs'; // Libreria per l'animazione di caricamento

// Registra l'animazione helix per il loading
helix.register();
    
// Componente classe che gestisce l'area commenti di un libro
class CommentArea extends React.Component {
  // Stato iniziale del componente
  state = {
    comments: [], // Array che conterrà i commenti
    error: null, // Gestione degli errori
    loading: true // Stato di caricamento
  };

  // Metodo per recuperare i commenti dal server
  fetchComments = async () => {
    try {
      // Imposta lo stato di caricamento
      this.setState({ loading: true });

      // Effettua la chiamata API per ottenere i commenti
      const response = await fetch(
        `https://striveschool-api.herokuapp.com/api/comments/${this.props.asin}`,
        {
          headers: {
            // Token di autorizzazione necessario per l'API
            Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzQ4Njk5NjA2ZmM4YzAwMTU2Yjg2ZWIiLCJpYXQiOjE3MzI3OTg4NzAsImV4cCI6MTczNDAwODQ3MH0.cMoFL5VdMuduVlORWJQDnb_nhdUhz00n1BSK3Jh7sAk"
          }
        }
      );

      // Se la richiesta ha successo, aggiorna lo stato con i commenti
      if (response.ok) {
        const comments = await response.json();
        this.setState({
          comments,
          error: null,
          loading: false
        });
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      // In caso di errore, aggiorna lo stato con il messaggio di errore
      this.setState({
        error: `Errore nel caricamento dei commenti: ${error.message}`,
        loading: false
      });
    }
  };

  // Lifecycle method che viene chiamato quando il componente viene montato
  componentDidMount() {
    this.fetchComments(); // Carica i commenti iniziali
  }

  render() {
    // Destrutturazione dello stato
    const { comments, error, loading } = this.state;

    // Se sta caricando, mostra l'animazione di loading
    if (loading) return (
      <div className="text-center p-3">
        <l-helix
          size="40"
          speed="2.5"
          color="white"
        ></l-helix>
        <p className="text-light mt-2">Caricamento commenti...</p>
      </div>
    );

    // Se c'è un errore, mostra il messaggio di errore
    if (error) return (
      <Alert variant="danger" className="mt-3">
        {error}
      </Alert>
    );

    // Rendering normale con lista commenti e form per aggiungere commenti
    return (
      <div className="mt-4">
        <h4>Commenti</h4>
        <CommentsList 
          comments={comments} 
          onCommentDeleted={this.fetchComments} // Callback per aggiornare dopo eliminazione
        />
        <AddComment 
          asin={this.props.asin} 
          onCommentAdded={this.fetchComments} // Callback per aggiornare dopo aggiunta
        />
      </div>
    );
  }
}

// Esporta il componente per utilizzarlo nell'app
export default CommentArea;