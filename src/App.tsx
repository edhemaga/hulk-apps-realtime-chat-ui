import "./App.css";

import { useEffect, useState } from "react";

//Router
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoutes from "./shared/util/privateRoutes";

import io from "socket.io-client";

//Components
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";

const App = () => {
  useEffect(() => {
    const socket = io("http://localhost:3001");
    socket.connect();

    return () => {};
  });

  return (
    <Router>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Home></Home>}></Route>
        </Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </Router>
  );
};

export default App;
