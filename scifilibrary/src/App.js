import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyNavbar from './components/MyNavbar';
import MyFooter from './components/MyFooter';

function App() {
  return (
    <div className="App d-flex flex-column min-vh-100">
      <MyNavbar />
      <MyFooter />
    </div>
  );
}

export default App;
