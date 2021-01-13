import React from 'react';
import Head from 'next/head';
import { Provider } from 'react-redux';
import Home from './home';
import store from '../store/store';

import '../styles/globals.css'


function App() {
  return (
    <>
      <Head>
        <title>Random API Consummer</title>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500&display=swap" rel="stylesheet" />
        <link href='https://api.mapbox.com/mapbox-gl-js/v2.0.1/mapbox-gl.css' rel='stylesheet' />

      </Head>

      <Provider store={store}>
        <Home />
      </Provider>

    </>

  )
}

export default App
