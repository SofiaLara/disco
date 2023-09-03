import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ArtworkList from './ArtworkList';
import ArtworkDetail from './ArtworkDetail';
import '../styles/App.css'

function App() {
  return (
    // GH pages dones't support historyAPI so we add a basename
    <BrowserRouter basename='/disco'>
      <Routes>
        <Route path="/" element={<ArtworkList />} />
        <Route path="/artwork/:id" element={<ArtworkDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;