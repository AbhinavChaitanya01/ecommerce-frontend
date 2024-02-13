import './App.css';
import FooterBody from './components/FooterBody';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';

function App() {
  return (
    <div>
    <Router>
          <Navbar />
            <Routes>
            <Route exact path="/" element={<LandingPage/>}></Route>
            <Route exact path="/login" element={<LoginPage/>}></Route>
            <Route exact path="/signUp" element={<SignUpPage/>}></Route>
            </Routes>
            <FooterBody />
        </Router>
    </div>
  );
}

export default App;
