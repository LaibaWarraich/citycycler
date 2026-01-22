import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import "leaflet/dist/leaflet.css";
import "./theme.css";
import { applyTheme, loadTheme } from "./services/theme";
applyTheme(loadTheme());


ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
