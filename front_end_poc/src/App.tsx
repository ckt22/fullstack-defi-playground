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
      <DAppProvider config={{
        networks: [Kovan],
        notifications: {
          expirationPeriod: 1000,
          checkInterval: 1000
        }
      }}>
        <Header />
        <Container maxWidth="md">
          <Main />
        </Container>
      </DAppProvider>
    </Provider>
  );
}

export default App;
