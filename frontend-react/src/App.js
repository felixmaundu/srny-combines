import React from 'react';
import ContactPage from "./pages/ContactPage"
import {BrowserRouter, Routes, Route, useNavigate} from 'react-router-dom'
import './App.css';
import HomePage from './pages/HomePage';
import RegistrationForm from './pages/registration';
import LoginForm from './pages/login';

const App = () => {
  return (
    <BrowserRouter>
      <Routes> 
        <Route path="/" exact element={<HomePage/>} />
        <Route path="/login" exact element={<LoginForm/>} />
        <Route path="/registration" exact element={<RegistrationForm/>} />
        <Route path="/contact" element={<ContactPage/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;




