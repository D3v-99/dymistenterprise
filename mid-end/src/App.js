import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import NotesHolding from './screens/NotesHolding';
import CoinsHolding from './screens/CoinsHolding';
import CounterfeitHolding from './screens/CounterfeitHolding';

function App() {
  return (
    <div className="App">
      <NavBar />
      <div
        style={{
          paddingTop: '50px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '80vh',
        }}
      >
        <Routes>
          <Route path="/" element={<NotesHolding />} />
          <Route path="/cash-holding" element={<NotesHolding />} />
          <Route path="/coins-holding" element={<CoinsHolding />} />
          <Route path="/counterfeit-holding" element={<CounterfeitHolding />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
