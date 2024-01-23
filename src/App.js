import './App.css';
import FooterBody from './components/FooterBody';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

function App() {
  return (
    <div>
    <Router>
          <Navbar />
            <Routes>
            <Route exact path="/" element={<LandingPage/>}></Route>
            </Routes>
            <FooterBody />
        </Router>
    </div>
  );
}

export default App;
