import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyNavbar from './components/MyNavbar';
import MyFooter from './components/MyFooter';
import Welcome from './components/Welcome';
import AllTheBooks from './components/AllTheBooks';

function App() {
  return (
    //d-flex flex-column: crea un layout flessibile a colonna
    //min-vh-100: assicura che il layout occupi almeno l'intera altezza della finestra
    <div className="App d-flex flex-column min-vh-100">
      {/* componente navbar */}
      <MyNavbar />
      {/* componente welcome */}
      <Welcome />
      {/* componente allthebooks */}
      <AllTheBooks />
      {/* componente footer */}
      <MyFooter />
    </div>
  );
}

export default App;
