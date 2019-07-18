import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './store';
import Header from './header/Header';
import CustomRoutes from './navigation/routes';
import './app.css';

class App extends Component {
  render() {
    return (
      <Router>
        <Provider store={store}>
          <div className="app">
            <Header />
            <CustomRoutes />
          </div>
        </Provider>
      </Router>
    );
  }
}

export default App;
