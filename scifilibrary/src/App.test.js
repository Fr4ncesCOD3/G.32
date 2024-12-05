// Importiamo le funzioni necessarie per il testing da React Testing Library
import { render, screen, fireEvent } from '@testing-library/react';
// Importiamo i componenti che vogliamo testare
import App from './App';
import Welcome from './components/Welcome';
import BookList from './components/BookList';
import CommentArea from './components/CommentArea';
// Importiamo i dati dei libri dal nostro file JSON
import scifiBooks from './librarydata/scifi.json';

// Creiamo un mock (una versione fittizia) del modulo ldrs che contiene l'animazione di caricamento
jest.mock('ldrs', () => ({
  helix: {
    register: jest.fn() // Creiamo una funzione mock che non fa nulla
  }
}));

// Test per verificare che il componente Welcome venga renderizzato correttamente
test('renders Welcome component correctly', () => {
  render(<Welcome />); // Renderizziamo il componente
  const welcomeElement = screen.getByText(/THE BEST SCI-FI BOOKS LIBRARY/i); // Cerchiamo il testo del titolo
  expect(welcomeElement).toBeInTheDocument(); // Verifichiamo che sia presente nella pagina
});

// Test per verificare che vengano mostrate tutte le card dei libri
test('renders correct number of bootstrap cards', () => {
  render(<BookList books={scifiBooks} />); // Renderizziamo la lista dei libri
  const bookCards = screen.getAllByRole('img'); // Troviamo tutte le immagini (che rappresentano i libri)
  expect(bookCards.length).toBe(scifiBooks.length); // Verifichiamo che il numero di card sia uguale al numero di libri
});

// Test per verificare che l'area commenti venga renderizzata correttamente
test('renders CommentArea component correctly', () => {
  // Renderizziamo l'area commenti con un ASIN di esempio
  render(<CommentArea asin="some-asin" />);
  // commenti/i [0] per prendere il primo elemento
  const commentHeader = screen.getAllByText(/Commenti/i)[0];
  expect(commentHeader).toBeInTheDocument();
});

// Test per verificare che la funzione di ricerca dei libri funzioni
test('filters books correctly via search input', async () => {
  render(<BookList books={scifiBooks} />);
  
  // Prima verifichiamo che ci siano tutti i libri
  // getAllByRole('img') per prendere tutti gli elementi img
  const initialBooks = screen.getAllByRole('img');
  expect(initialBooks.length).toBe(91); // Il numero totale di libri
  
  // Cerchiamo l'input di ricerca
  const searchInput = screen.getByPlaceholderText(/Cerca un libro per titolo/i);
  
  // Simuliamo l'inserimento di un testo che sappiamo essere presente
  // Per esempio, usiamo "the" che è comune nei titoli in inglese
  fireEvent.change(searchInput, { target: { value: 'the' } });
  
  // Verifichiamo che il numero di libri sia diminuito ma non zero
  const filteredBooks = screen.getAllByRole('img');
  expect(filteredBooks.length).toBeLessThan(91);
  expect(filteredBooks.length).toBeGreaterThan(0);
});

// Test per verificare che il bordo del libro diventi rosso quando viene cliccato
test('changes book border color on click', () => {
  render(<BookList books={scifiBooks} />);
  // getAllByRole('img')[0] per prendere il primo elemento img
  // closest('.card') per prendere il padre più vicino che è la card
  const firstBook = screen.getAllByRole('img')[0].closest('.card');
  fireEvent.click(firstBook);
  expect(firstBook).toHaveClass('border-danger');
});

// Test per verificare che il bordo rosso si sposti correttamente tra i libri
test('resets first book border color when second book is clicked', () => {
  render(<BookList books={scifiBooks} />);
  const books = screen.getAllByRole('img').map(img => img.closest('.card'));
  const [firstBook, secondBook] = books;
  fireEvent.click(firstBook);
  fireEvent.click(secondBook);
  expect(firstBook).not.toHaveClass('border-danger');
  expect(secondBook).toHaveClass('border-danger');
});

// Test per verificare che non ci siano commenti all'avvio dell'app
test('no SingleComment instances in DOM on initial load', () => {
  render(<App />);
  const singleComment = screen.queryByText(/Nessun commento presente/i); // Cerchiamo il messaggio di "nessun commento"
  expect(singleComment).not.toBeInTheDocument(); // Verifichiamo che non sia presente
});

// Test per verificare che i commenti vengano caricati quando si clicca su un libro
test('loads comments correctly when a book with reviews is clicked', async () => {
  render(<BookList books={scifiBooks} />);
  const bookWithComments = screen.getAllByRole('img')[0]; // Prendiamo il primo libro
  fireEvent.click(bookWithComments); // Ci clicchiamo sopra
  const comments = await screen.findAllByText(/Valutazione:/i); // Aspettiamo che appaiano i commenti
  expect(comments.length).toBeGreaterThan(0); // Verifichiamo che ci sia almeno un commento
});
