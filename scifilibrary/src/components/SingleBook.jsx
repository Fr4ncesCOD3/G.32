// Importo i componenti necessari da React e React Bootstrap
import React from 'react';
import { Card, Button, Modal } from 'react-bootstrap';
import CommentArea from './CommentArea';

/**
 * SingleBook - Componente classe che rappresenta un singolo libro nella libreria
 * Gestisce la visualizzazione di una card con le informazioni base del libro
 * e un modal con dettagli aggiuntivi e area commenti
 */
class SingleBook extends React.Component {
  // Stato iniziale del componente:
  // - showModal: controlla la visibilità del modal (true = visibile, false = nascosto)
  state = {
    showModal: false
  };

  /**
   * toggleModal - Inverte lo stato del modal tra visibile e nascosto
   * Viene chiamato quando l'utente clicca sulla card del libro o sui pulsanti di chiusura
   */
  toggleModal = () => {
    this.setState(prevState => ({
      showModal: !prevState.showModal
    }));
  };

  render() {
    // Destrutturazione delle props necessarie per il rendering
    const { book, selected, onClick } = this.props;
    const { showModal } = this.state;

    return (
      <>
        {/* Card principale che mostra le informazioni base del libro */}
        {/* La classe border-danger viene aggiunta quando il libro è selezionato */}
        <Card 
          className={`h-100 ${selected ? 'border-danger' : ''}`}
          onClick={onClick} // Gestisce la selezione del libro
          style={{ cursor: 'pointer' }} // Cambia il cursore per indicare che è cliccabile
        >
          {/* Container per l'immagine di copertina con altezza fissa */}
          <div className="position-relative" style={{ height: '350px' }}>
            <Card.Img 
              variant="top" 
              src={book.img} 
              alt={book.title}
              style={{ 
                width: '100%',
                height: '100%',
                objectFit: 'cover' // Mantiene le proporzioni dell'immagine riempiendo lo spazio
              }}
            />
          </div>
          {/* Corpo della card con titolo e prezzo */}
          <Card.Body className="d-flex flex-column">
            {/* Titolo del libro troncato se troppo lungo */}
            <Card.Title 
              className="text-truncate mb-3 fw-bold text-dark"
              style={{ fontSize: '1rem' }}
            >
              {book.title}
            </Card.Title>
            {/* Contenitore del prezzo allineato in basso */}
            <div className="mt-auto">
              <Card.Text className="mb-3">
                {/* Prezzo formattato con due decimali */}
                <span className="fs-5 fw-bold text-primary">
                  €{book.price.toFixed(2)}
                </span>
              </Card.Text>
            </div>
          </Card.Body>
        </Card>

        {/* Modal con dettagli del libro - renderizzato solo quando showModal è true */}
        {showModal && (
          <Modal 
            show={showModal} 
            onHide={this.toggleModal} 
            size="lg" 
            centered
            contentClassName="bg-dark text-light"
          >
            {/* Header del modal con titolo del libro e pulsante di chiusura */}
            <Modal.Header closeButton className="border-secondary">
              <Modal.Title className="text-light">{book.title}</Modal.Title>
            </Modal.Header>
            {/* Corpo del modal con layout a due colonne */}
            <Modal.Body className="py-4">
              <div className="row">
                {/* Colonna sinistra (4/12) con immagine di copertina */}
                <div className="col-md-4">
                  <img 
                    src={book.img} 
                    alt={book.title} 
                    className="img-fluid rounded shadow"
                    style={{ width: '100%', objectFit: 'cover' }}
                  />
                </div>
                {/* Colonna destra (8/12) con dettagli e area commenti */}
                <div className="col-md-8">
                  {/* Card con prezzo e dettagli del libro */}
                  <div className="card bg-dark text-light border-secondary p-3">
                    <h4 className="text-primary mb-3">
                      Prezzo: €{book.price.toFixed(2)}
                    </h4>
                    {/* Informazioni aggiuntive: ASIN e categoria */}
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
                  
                  {/* Area commenti - visibile solo quando il libro è selezionato */}
                  {selected && (
                    <div className="mt-4">
                      <CommentArea asin={book.asin} />
                    </div>
                  )}
                </div>
              </div>
            </Modal.Body>
            {/* Footer del modal con pulsanti di azione */}
            <Modal.Footer className="border-secondary">
              <Button variant="outline-light" onClick={this.toggleModal}>
                Chiudi
              </Button>
              <Button variant="primary" onClick={this.toggleModal}>
                Aggiungi al carrello
              </Button>
            </Modal.Footer>
          </Modal>
        )}
      </>
    );
  }
}

// Esporta il componente per utilizzarlo in altre parti dell'applicazione
export default SingleBook;