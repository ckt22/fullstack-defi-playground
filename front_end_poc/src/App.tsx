import React from 'react';
import './App.css';
import { DAppProvider, Kovan } from '@usedapp/core';
import { Header } from './features/Header';
import { Main } from './features/Main';
import Container from '@mui/material/Container';

function App() {
  return (
    <>
      <Header />
      <Container maxWidth="md">
        <Main />
      </Container>
    </>

  );
}

export default App;
