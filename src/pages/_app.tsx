import React from 'react';
import { Provider } from 'react-redux';
import '../styles/globals.css'
import Home from './home';
import store from '../store/store';


function App() {
  return (
    <Provider store={store}>
      <Home />
    </Provider>

  )
}

export default App
