import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Guide from './pages/Guide';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/guide" element={<Guide />} />
    </Routes>
  );
}

export default App;