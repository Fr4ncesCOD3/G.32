// Importo i componenti necessari da React e React Bootstrap
import React, { useState } from 'react';
import SingleBook from './SingleBook';
import CommentArea from './CommentArea';
import { Row, Col, Form } from 'react-bootstrap';

// Componente funzionale che riceve la lista dei libri come prop
const BookList = ({ books }) => {
  // Stato per gestire il termine di ricerca inserito dall'utente
  const [searchTerm, setSearchTerm] = useState('');
  // Stato per tenere traccia del libro attualmente selezionato tramite ASIN
  const [selectedBookAsin, setSelectedBookAsin] = useState(null);
  
  // Filtro i libri in base al titolo inserito nella ricerca
  const filteredBooks = books.filter(book =>
    // Converto sia il titolo che il termine di ricerca in minuscolo per un confronto case-insensitive
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    // Layout principale con sistema a griglia di Bootstrap
    <Row className="g-3">
      {/* Colonna sinistra contenente la lista dei libri */}
      <Col xs={12} md={8}>
        {/* Form di ricerca fissato in alto durante lo scroll */}
        <Form className="mb-3 sticky-top bg-dark pt-3" style={{ top: '0', zIndex: 1020 }}>
          <Form.Group controlId="searchBook">
            <Form.Control
              type="text"
              placeholder="Cerca un libro per titolo"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Form.Group>
        </Form>

        {/* Griglia dei libri filtrati */}
        <Row className="g-3">
          {filteredBooks.map((book) => (
            // Fragment per ogni libro con chiave unica
            <React.Fragment key={book.asin}>
              {/* Colonna per ogni libro con responsive design */}
              <Col xs={12} sm={6} lg={4}>
                <SingleBook 
                  book={book}
                  // Il libro è selezionato se il suo ASIN corrisponde a quello selezionato
                  selected={selectedBookAsin === book.asin}
                  // Toggle della selezione al click
                  onClick={() => setSelectedBookAsin(selectedBookAsin === book.asin ? null : book.asin)}
                />
              </Col>
              {/* Area commenti per dispositivi mobili - visibile solo quando un libro è selezionato */}
              {selectedBookAsin === book.asin && (
                <Col xs={12} className="d-md-none">
                  <div className="comments-container bg-dark p-3 rounded">
                    <CommentArea asin={book.asin} />
                  </div>
                </Col>
              )}
            </React.Fragment>
          ))}
        </Row>
      </Col>

      {/* Colonna destra per i commenti - visibile solo su desktop */}
      <Col md={4} className="d-none d-md-block">
        {selectedBookAsin ? (
          // Mostra i commenti del libro selezionato
          <CommentArea asin={selectedBookAsin} />
        ) : (
          // Messaggio quando nessun libro è selezionato
          <div className="comments-container bg-dark p-3 rounded text-center">
            <h4 className="text-light mb-4">Commenti</h4>
            <p className="text-light">Seleziona un libro per visualizzare i commenti</p>
          </div>
        )}
      </Col>
    </Row>
  );
};

export default BookList;
