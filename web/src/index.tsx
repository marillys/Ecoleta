import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

//renderise o App para o elemento html root
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);