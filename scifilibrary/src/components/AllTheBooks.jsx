import React from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import scifiBooks from '../librarydata/scifi.json';

function AllTheBooks() {
  // Funzione che gestisce il click sul bottone di un libro
  const handleBookClick = (book) => {
    console.log('Libro selezionato:', book);
  };

  return (
    // my-4: margine verticale
    <Container className="my-4">
      {/* Grid responsive: 1 colonna su mobile, 2 su tablet, 3 su desktop, 4 su schermi grandi */}
      {/* g-4: gap tra le colonne */}
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {/* Mappa attraverso l'array di libri */}
        {scifiBooks.map((book) => (
          <Col key={book.asin}>
            {/* h-100: tutte le card hanno la stessa altezza */}
            <Card className="h-100">
              {/* Immagine copertina con altezza fissa */
               /*chiamo dal file json l'immagine*/}
              <Card.Img 
                variant="top" 
                src={book.img} 
                alt={book.title}
                style={{ height: '300px', objectFit: 'cover' }}
              />
              {/* Corpo della card con layout flessibile */}
              <Card.Body className="d-flex flex-column">
                {/* Titolo troncato se troppo lungo */}
                <Card.Title className="text-truncate">{book.title}</Card.Title>
                {/* Prezzo spinto in basso */}
                <Card.Text className="mt-auto">
                  {/* chiamo dal file json il prezzo */}
                  {/*toFixed(2): arrotonda il prezzo a 2 decimali*/}
                  Prezzo: €{book.price.toFixed(2)}
                </Card.Text>
                <Button 
                  variant="primary"
                  onClick={() => handleBookClick(book)}
                >
                  Aggiungi al carrello
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default AllTheBooks;
