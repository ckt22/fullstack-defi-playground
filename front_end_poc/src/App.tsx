import React from 'react';
import './App.css';
import { DAppProvider, ChainId } from '@usedapp/core';
import { Header } from './components/Header';
import { Main } from './components/Main';
import Container from '@mui/material/Container';

function App() {
  return (
    <DAppProvider config={{
      supportedChains: [ChainId.Kovan]
    }}>
      <Header />
      <Container maxWidth="md">
        <Main />
      </Container>
    </DAppProvider>
  );
}

export default App;
