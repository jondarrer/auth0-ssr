import React from 'react';
import fs from 'fs';
import path from 'path';
import express from 'express';
import { auth, requiresAuth } from 'express-openid-connect';
import { renderToString } from 'react-dom/server';
import { StaticRouter as Router } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ApolloProvider } from '@apollo/client';

import App from './app';

import { client } from './graphql/client';

// const defaultRedirectUri = 'http://localhost:3000';

const config = {
  authRequired: true,
  auth0Logout: true,
  secret: 'A1JplTTaBZnbB76FkpTeKTgN8DoNAzFbF7_FLHuhQBb0IOu82WyxLGxpYmA5Ckyk',
  baseURL: 'http://localhost:3000',
  clientID: 'QYj4KSxzudvsCkDLa2lwAvPLbBdVB6TS',
  issuerBaseURL: 'https://dev-fmp-jd.eu.auth0.com',
};

const app = express();

app.use(express.static('dist'));

app.use(auth(config));

app.get('/api/user-info', requiresAuth(), (req, res) => {
  console.log('/api/user-info', {
    user: req?.oidc?.user,
    stringify: JSON.stringify(req.oidc.user),
  });
  res.json(req.oidc.user);
});

app.use('/', (req, res) => {
  console.log('/', req.url);
  // res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
  // eslint-disable-next-line no-sync
  const html = fs.readFileSync(
    path.join(__dirname, '../dist/default.html'),
    'utf-8'
  );

  const component = renderToString(
    <ApolloProvider client={client}>
      <HelmetProvider>
        <Router location={req.url} context={{}}>
          <App />
        </Router>
      </HelmetProvider>
    </ApolloProvider>
  );

  const page = html.replace(
    '<div id="root"></div>',
    `<div id="root">${component}</div>`
  );
  res.send(page);
});

app.listen(3000, () => console.log('Listening on port 3000'));
