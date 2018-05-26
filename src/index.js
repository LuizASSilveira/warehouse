import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import './componentes/css/login.css'
import { Router } from 'react-router'
import createBrowserHistory from 'history/createBrowserHistory'

const history = createBrowserHistory()

ReactDOM.render(
    (
      <Router history={history}>
         <App/>
      </Router>
    ),
    document.getElementById('root')
  );
registerServiceWorker();
