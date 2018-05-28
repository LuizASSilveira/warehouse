import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import './componentes/css/login.css'
import App from './App';
import { BrowserRouter } from 'react-router-dom'

ReactDOM.render(
(
  <BrowserRouter>
        <App />
  </BrowserRouter>
)
,document.getElementById('root'));

registerServiceWorker();
