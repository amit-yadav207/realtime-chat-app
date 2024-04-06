import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from "react-router-dom"
import './index.css';
import App from './App';

import { AuthContextProvider } from './context/authContext';
import { SocketContextProvider } from './context/socketContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <Router>
      <AuthContextProvider>
        <SocketContextProvider>
          <App />
        </SocketContextProvider>
      </AuthContextProvider>
    </Router>

  </>
);


