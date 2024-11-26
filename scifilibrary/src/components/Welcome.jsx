import React from 'react';
import { Container } from 'react-bootstrap';
import './Welcome.css';

function Welcome() {
  return (
    //d-flex justify-content-center: centra il contenuto orizzontalmente
    //welcome-section: classe CSS definita in Welcome.css per controllo del gradiente
    <div className="welcome-section">
      <Container className="d-flex justify-content-center align-items-center">
        <h1 className="welcome-title text-white text-center display-1 fw-bold">
          THE BEST SCI-FI BOOKS LIBRARY
        </h1>
      </Container>
    </div>
  );
}

export default Welcome;
