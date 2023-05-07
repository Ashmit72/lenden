import React from 'react';
import "./App.css";
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/Pages/HomePage';
import AllPartiesPages from "./components/Pages/AllPartiesPages"
import AboutPage from './components/Pages/AboutPage';
import TransactionDetailsPage from './components/Pages/TransactionDetailsPage';

export default function App() {

 

  return (
    <div className='nav' >
    <Router>
    <Navbar/>
    <Routes>
      <Route path='/' element={<HomePage/>} />
      <Route path="/about" element={<AboutPage/>} />
      <Route path="/parties" element={<AllPartiesPages/>} />
      <Route path="/party" element={<TransactionDetailsPage/>}/>
    </Routes>
    </Router>
    </div>
  
  )
}

