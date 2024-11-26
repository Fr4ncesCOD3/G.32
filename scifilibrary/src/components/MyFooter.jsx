import React from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';

function MyFooter() {
  return (
    <footer className="bg-dark text-white py-4 mt-auto">
      <Container>
        <Row>
          <Col md={4} className="mb-3">
            <h5>SciFi Library</h5>
            <p className="text-light">La tua biblioteca di fantascienza preferita</p>
          </Col>
          <Col md={4} className="mb-3">
            <h5>Links Utili</h5>
            <Nav className="flex-column">
              <Nav.Link href="#" className="text-light p-0 mb-2">Home</Nav.Link>
              <Nav.Link href="#" className="text-light p-0 mb-2">About</Nav.Link>
              <Nav.Link href="#" className="text-light p-0 mb-2">Browse</Nav.Link>
            </Nav>
          </Col>
          <Col md={4} className="mb-3">
            <h5>Contatti</h5>
            <Nav className="flex-column">
              <Nav.Link href="#" className="text-light p-0 mb-2">Email</Nav.Link>
              <Nav.Link href="#" className="text-light p-0 mb-2">Facebook</Nav.Link>
              <Nav.Link href="#" className="text-light p-0 mb-2">Twitter</Nav.Link>
            </Nav>
          </Col>
        </Row>
        <Row>
          <Col className="text-center pt-3 border-top">
            <p className="mb-0">&copy; 2024 SciFi Library. Tutti i diritti riservati.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default MyFooter;
