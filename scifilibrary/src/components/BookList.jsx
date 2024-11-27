// Importo i componenti necessari da React e React Bootstrap
import React, { useState } from 'react';
import SingleBook from './SingleBook';
import { Row, Col, Form } from 'react-bootstrap';

// Componente funzionale che riceve la lista dei libri come prop
const BookList = ({ books }) => {
  // Stato per gestire il termine di ricerca
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filtro i libri in base al titolo
  const filteredBooks = books.filter(book =>
    // Converto il titolo in minuscolo e controllo se contiene il termine di ricerca
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {/* Form per la ricerca dei libri */}
      <Form className="mb-3">
        <Form.Group controlId="searchBook">
          {/* Input di ricerca che aggiorna lo stato searchTerm */}
          <Form.Control
            type="text"
            placeholder="Cerca un libro per titolo"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Form.Group>
      </Form>

      {/* Grid responsive per visualizzare i libri */}
      <Row>
        {/* Mappo i libri filtrati e creo una colonna per ciascuno */}
        {filteredBooks.map((book) => (
          // xs={12}: 1 libro per riga su mobile
          // sm={6}: 2 libri per riga su tablet
          // md={4}: 3 libri per riga su desktop
          // lg={3}: 4 libri per riga su schermi grandi
          <Col xs={12} sm={6} md={4} lg={3} key={book.asin} className="mb-3">
            {/* Renderizza il componente SingleBook per ogni libro */}
            <SingleBook book={book} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default BookList;
