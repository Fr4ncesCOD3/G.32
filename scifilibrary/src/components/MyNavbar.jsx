// Importazione delle dipendenze necessarie da React e React Bootstrap
import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';

/**
 * MyNavbar - Componente funzionale che implementa la barra di navigazione dell'applicazione
 * Utilizza i componenti di React Bootstrap per creare una navbar responsive
 * con logo, menu hamburger per dispositivi mobili e link di navigazione
 */
function MyNavbar() {
  return (
    // Navbar principale con configurazione per posizionamento e stile
    // fixed="top": assicura che il navbar sia fisso in alto
    // bg="dark": imposta il colore di sfondo del navbar
    // variant="dark": imposta il colore del testo e dei link
    // expand="lg": imposta il layout del navbar per dispositivi grandi
    // zIndex: 1030 assicura che la navbar sia sempre sopra altri elementi
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top" className="border-bottom border-secondary" style={{ zIndex: 1030 }}>
      {/* Container per centrare e limitare la larghezza del contenuto */}
      <Container>
        {/* Logo/Brand dell'applicazione */}
        <Navbar.Brand href="#home">SciFi Library</Navbar.Brand>
        
        {/* Pulsante hamburger che appare su schermi piccoli */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        {/* Contenitore dei link che collassa su mobile */}
        <Navbar.Collapse id="basic-navbar-nav">
          {/* Nav.Link per la navigazione, ms-auto spinge i link a destra */}
          <Nav className="ms-auto">
            <Nav.Link href="#">Home</Nav.Link>
            <Nav.Link href="#">About</Nav.Link>
            <Nav.Link href="#">Browse</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

// Esporta il componente per utilizzarlo in altre parti dell'applicazione
export default MyNavbar;
