import './App.css';

import { useEffect, useState } from 'react';

import io from "socket.io-client";

import Login from './components/Login/Login';

import axiosInstance from './shared/network/axios';

function App() {
  useEffect(() => {
    const socket = io("http://localhost:3001");
    socket.connect();

    return () => {

    };
  })

  const handleLogin = async (email: string, password: string) => {
    const response = await axiosInstance.post('/user/login', {
      username: email,
      password
    });
    if (response.data) localStorage.setItem("access_token", response.data)
  };

  return (
    <div className="App">
      <Login onLogin={handleLogin} />
    </div>
  );
}

export default App;
