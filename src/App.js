import React, { useState } from 'react';
import './App.css';
import FooterBody from './components/FooterBody';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import LogContext from './contexts/logContext';
import Profile from './components/Profile';
import AboutPage from './components/AboutPage';
function App() {
  const Token = localStorage.getItem('Token');
  const [log, setLog] = useState(Token !== null && Token !== "");
  const [isSeller, setIsSeller] = useState(false);

  return (
    <div>
      <Router>
        <LogContext.Provider value={{log, setLog, isSeller, setIsSeller}}>
          <Navbar log={log}/>
          <Routes>
            <Route exact path="/" element={<LandingPage/>}></Route>
            <Route exact path="/login" element={<LoginPage/>}></Route>
            <Route exact path="/signUp" element={<SignUpPage/>}></Route>
            <Route exact path="/profile" element={<Profile/>}></Route>
            <Route exact path="/about" element={<AboutPage/>}></Route>
          </Routes>
          <FooterBody />
        </LogContext.Provider>
      </Router>
    </div>
  );
}

export default App;
