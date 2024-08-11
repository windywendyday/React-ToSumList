import './App.css';
import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Register from "./pages/register/index.js";
import Home from "./pages/home/index.js";
import Login from "./pages/login/index.js";

function App() {
  return (
    <div className="App">
      <BrowserRouter initialEntries={['/home']}>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path='/home/*' element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
