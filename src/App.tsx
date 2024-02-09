import './App.css';

import { useEffect, useState } from 'react';

import io from "socket.io-client";

function App() {
  useEffect(() => {
    const socket = io("http://localhost:3001");
    socket.connect();

    return () => {

    };
  })

  return (
    <div className="App">
      Chat
    </div>
  );
}

export default App;
