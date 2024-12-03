// Importazione delle dipendenze necessarie
import React, { useState } from 'react';
import { Card, Button, Modal } from 'react-bootstrap'; // Componenti UI di Bootstrap
import CommentArea from './CommentArea'; // Componente per gestire i commenti

// Componente SingleBook che mostra un singolo libro
// Props:
// - book: oggetto contenente i dati del libro
// - selected: booleano che indica se il libro è selezionato
// - onClick: funzione chiamata quando si clicca sul libro
const SingleBook = ({ book, selected, onClick }) => {
  // Stato per gestire l'apertura/chiusura del modal
  const [showModal, setShowModal] = useState(false);

  // Funzione per invertire lo stato del modal
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      {/* Card del libro con bordo rosso se selezionato */}
      <Card 
        className={`h-100 ${selected ? 'border-danger' : ''}`}
        onClick={onClick}
        style={{ cursor: 'pointer' }}
      >
        {/* Contenitore dell'immagine con altezza fissa */}
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
        {/* Corpo della card con titolo e prezzo */}
        <Card.Body className="d-flex flex-column">
          <Card.Title 
            className="text-truncate mb-3 fw-bold text-dark"
            style={{ fontSize: '1rem' }}
          >
            {book.title}
          </Card.Title>
          <div className="mt-auto">
            <Card.Text className="mb-3">
              <span className="fs-5 fw-bold text-primary">
                €{book.price.toFixed(2)}
              </span>
            </Card.Text>
          </div>
        </Card.Body>
      </Card>

      {/* Modal con dettagli del libro - mostrato solo quando showModal è true */}
      {showModal && (
        <Modal 
          show={showModal} 
          onHide={toggleModal} 
          size="lg" 
          centered
          contentClassName="bg-dark text-light" // Tema scuro per il modal
        >
          <Modal.Header closeButton className="border-secondary">
            <Modal.Title className="text-light">{book.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body className="py-4">
            <div className="row">
              {/* Colonna sinistra con immagine */}
              <div className="col-md-4">
                <img 
                  src={book.img} 
                  alt={book.title} 
                  className="img-fluid rounded shadow"
                  style={{ width: '100%', objectFit: 'cover' }}
                />
              </div>
              {/* Colonna destra con dettagli e area commenti */}
              <div className="col-md-8">
                <div className="card bg-dark text-light border-secondary p-3">
                  <h4 className="text-primary mb-3">
                    Prezzo: €{book.price.toFixed(2)}
                  </h4>
                  <div className="mb-3">
                    <p className="mb-2">
                      <span className="text-secondary">ASIN: </span>
                      <span className="text-light">{book.asin}</span>
                    </p>
                    <p className="mb-0">
                      <span className="text-secondary">Categoria: </span>
                      <span className="text-light">{book.category}</span>
                    </p>
                  </div>
                </div>
                
                {/* Area commenti mostrata solo se il libro è selezionato */}
                {selected && (
                  <div className="mt-4">
                    <CommentArea asin={book.asin} />
                  </div>
                )}
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer className="border-secondary">
            <Button variant="outline-light" onClick={toggleModal}>
              Chiudi
            </Button>
            <Button variant="primary" onClick={toggleModal}>
              Aggiungi al carrello
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default SingleBook;