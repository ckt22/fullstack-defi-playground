import React from 'react';
import './App.css';
import { DAppProvider, Kovan } from '@usedapp/core';
import { Header } from './components/Header';
import { Main } from './components/Main';
import Container from '@mui/material/Container';
import { Provider } from 'wagmi'

function App() {
  return (
    <Provider>
      <Header />
      <Container maxWidth="md">
        <Main />
      </Container>
    </Provider>
  );
}

export default App;
