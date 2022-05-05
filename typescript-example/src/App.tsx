import React from 'react';
import './App.css';
import { Profile } from './components/Profile';

function App() {
  return (
    <div className="App">
      <Profile name='name' job='job'></Profile>
    </div>
  );
}

export default App;