// Importazione delle dipendenze necessarie
import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap'; // Componenti per il layout
import { helix } from 'ldrs'; // Libreria per l'animazione di caricamento

// Registra l'animazione helix per poterla utilizzare
helix.register();

// Componente che mostra uno stato di caricamento con skeleton cards
const Loading = () => {
  // Array di 8 elementi nulli per generare le skeleton cards
  const skeletonCards = Array(8).fill(null);

  return (
    <Container>
      {/* Animazione helix centrale principale che indica il caricamento */}
      <div className="text-center mb-4">
        <l-helix
          size="60" // Dimensione dell'animazione
          speed="2.5" // Velocità di rotazione
          color="white" // Colore dell'animazione
          style={{ margin: '20px auto' }} // Centraggio dell'animazione
        ></l-helix>
      </div>

      {/* Grid responsive di skeleton cards che simulano il contenuto in caricamento */}
      <Row>
        {skeletonCards.map((_, index) => (
          // Colonne responsive che si adattano alle diverse dimensioni dello schermo
          <Col xs={12} sm={6} md={4} lg={3} key={index} className="mb-4">
            {/* Card con sfondo scuro e ombreggiatura */}
            <Card className="h-100 shadow bg-dark">
              {/* Contenitore per l'animazione di caricamento dell'immagine */}
              <div 
                className="d-flex justify-content-center align-items-center"
                style={{
                  height: '350px',
                  background: '#2c2c2c' // Sfondo leggermente più chiaro per contrasto
                }}
              >
                <l-helix
                  size="40"
                  speed="2.5"
                  color="white"
                ></l-helix>
              </div>
              
              {/* Corpo della card con animazioni per titolo e prezzo */}
              <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                {/* Animazione per il placeholder del titolo */}
                <div className="mb-3">
                  <l-helix
                    size="25"
                    speed="2.5"
                    color="white"
                  ></l-helix>
                </div>
                
                {/* Animazione per il placeholder del prezzo */}
                <div>
                  <l-helix
                    size="20"
                    speed="2.5"
                    color="white"
                  ></l-helix>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

// Esporta il componente per utilizzarlo nell'app
export default Loading;
