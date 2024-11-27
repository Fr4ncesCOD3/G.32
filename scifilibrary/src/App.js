// Importo gli stili CSS necessari
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Importo i componenti personalizzati
import MyNavbar from './components/MyNavbar';
import MyFooter from './components/MyFooter';
import Welcome from './components/Welcome';
import BookList from './components/BookList';

// Importo i dati dei libri dal file JSON
import scifiBooks from './librarydata/scifi.json';

// Componente principale dell'applicazione
function App() {
  return (
    // Contenitore principale con layout flessibile e altezza minima viewport
    <div className="App d-flex flex-column min-vh-100">
      {/* Barra di navigazione */}
      <MyNavbar />
      {/* Componente di benvenuto */}
      <Welcome />
      {/* Contenitore principale con margini */}
      <div className="container my-4">
        {/* Lista dei libri con passaggio dei dati come props */}
        <BookList books={scifiBooks} />
      </div>
      {/* Footer dell'applicazione */}
      <MyFooter />
    </div>
  );
}

// Esporto il componente App
export default App;
