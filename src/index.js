// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; // Ensure this is importing the default export

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
