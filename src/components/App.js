import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ArtworkList from './ArtworkList';
import ArtworkDetail from './ArtworkDetail';
import '../styles/App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ArtworkList />} />
        <Route path="/artwork/:id" element={<ArtworkDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;