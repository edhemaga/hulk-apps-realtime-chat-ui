import "./App.css";

import { useEffect, useState } from "react";

//Router
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoutes from "./shared/util/privateRoutes";


//Components
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";

const App = () => {
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
