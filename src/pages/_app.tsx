import { InjectedConnector, StarknetConfig } from '@starknet-react/core';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import store from '../store';

import '../styles/globals.css';

function App({ Component, pageProps }: AppProps) {
  const connectors = [
    new InjectedConnector({ options: { id: 'braavos' } }),
    new InjectedConnector({ options: { id: 'argentX' } }),
  ];

  return (
    <StarknetConfig connectors={connectors}>
      <Provider store={store}>
        <Component {...pageProps} />;
      </Provider>
    </StarknetConfig>
  );
}

export default App;
