import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ApolloProvider } from '@apollo/client';

import App from './app';

import { client } from './graphql/client';

let defaultRedirectUri = 'http://localhost:9000';

if (typeof window !== 'undefined') {
  defaultRedirectUri =
    window.location.origin +
    (window.location.pathname.startsWith('/ro') ? '/ro' : '') +
    '/profile';
}

hydrate(
  <ApolloProvider client={client}>
    <HelmetProvider>
      <Router>
        <App />
      </Router>
    </HelmetProvider>
  </ApolloProvider>,
  document.getElementById('root')
);
