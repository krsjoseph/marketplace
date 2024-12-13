'use client'

import React from 'react'
import { ApolloProvider } from '@apollo/client';
import { Marketplace } from './components/Marketplace';
import { apolloClient } from './config/apollo-client';

const Page = () => (
  <ApolloProvider client={apolloClient}>
    <Marketplace/>
  </ApolloProvider>
);

export default Page
