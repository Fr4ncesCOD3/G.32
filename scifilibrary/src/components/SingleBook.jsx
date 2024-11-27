// Importo i componenti necessari da React e React Bootstrap
import React from 'react';
import { Card, Button, Modal } from 'react-bootstrap';

// Componente classe che rappresenta un singolo libro
class SingleBook extends React.Component {
  // Stato iniziale del componente - tiene traccia se il libro è selezionato
  state = {
    showModal: false
  };

  // Metodo per invertire lo stato di selezione del libro
  toggleModal = () => {
    this.setState(prevState => ({
      showModal: !prevState.showModal
    }));
  };

  render() {
    // Destrutturazione delle props e dello state
    const { book } = this.props;
    const { showModal } = this.state;

    // Renderizza il componente
    return (
      <>
        {/* Card principale che mostra il libro */}
        <Card 
          className="h-100 shadow"
          onClick={this.toggleModal} // Apre il modal al click
          style={{ cursor: 'pointer' }}
        >
          {/* Container per l'immagine di copertina */}
          <div className="position-relative" style={{ height: '350px' }}>
            <Card.Img 
              variant="top" 
              src={book.img} 
              alt={book.title}
              style={{ 
                width: '100%',
                height: '100%',
                objectFit: 'cover' // Mantiene le proporzioni dell'immagine
              }}
            />
          </div>
          {/* Corpo della card con sfondo scuro e testo bianco */}
          <Card.Body className="d-flex flex-column bg-dark text-white">
            <Card.Title 
              className="text-truncate mb-3 fw-bold"
              style={{ fontSize: '1rem' }}
            >
              {book.title} {/* Titolo del libro */}
            </Card.Title>
            <div className="mt-auto">
              <Card.Text className="mb-3">
                {/* Prezzo del libro in giallo */}
                <span className="fs-5 fw-bold text-warning">
                  €{book.price.toFixed(2)}
                </span>
              </Card.Text>
            </div>
          </Card.Body>
        </Card>

        {/* Modal che si apre al click sulla card */}
        {showModal && (
          <Modal show={showModal} onHide={this.toggleModal} size="lg" centered>
            <Modal.Header closeButton>
              <Modal.Title>{book.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {/* Layout flessibile per i dettagli del libro */}
              <div className="d-flex">
                {/* Immagine di copertina più grande */}
                <img 
                  src={book.img} 
                  alt={book.title} 
                  style={{ width: '200px', height: '300px', objectFit: 'cover' }}
                />
                {/* Dettagli del libro */}
                <div className="ms-3">
                  <h4>Prezzo: €{book.price.toFixed(2)}</h4>
                  <p>ASIN: {book.asin}</p>
                  <p>Categoria: {book.category}</p>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              {/* Pulsanti per aggiungere al carrello o chiudere */}
              <Button variant="primary" onClick={this.toggleModal}>
                Aggiungi al carrello
              </Button>
              <Button variant="outline-secondary" onClick={this.toggleModal}>
                Chiudi
              </Button>
            </Modal.Footer>
          </Modal>
        )}
      </>
    );
  }
}

export default SingleBook;