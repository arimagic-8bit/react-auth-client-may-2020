import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './lib/Auth'; // to wrap app inside the Provider

ReactDOM.render(
  <Router>
    <AuthProvider> 
      <App />
    </AuthProvider>
  </Router>
  , document.getElementById('root'));
