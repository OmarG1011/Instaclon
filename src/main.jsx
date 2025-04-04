import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'  // Importa Bootstrap
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <BrowserRouter basename="/Instaclon">
    <App />
  </BrowserRouter>
</React.StrictMode>
)
