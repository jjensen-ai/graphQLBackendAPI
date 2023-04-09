// Imports for node modules
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';

// Imports for API

import { typeDefs } from './graphql/typeDefs';
import { resolvers } from './graphql/resolvers';

// Important stuff for making the app work

dotenv.config({ path: './config.env' });
const DB = process.env.DATABASE;
const SERVER_PORT = process.env.PORT;

//Start my Server
async function serverStart() {
  const app = express();

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  app.use('/graphql');

  await mongoose.connect(`${DB}`).then(() => {
    console.log('DB CONNECTED');
  });

  app.listen(SERVER_PORT, () => {
    console.log(`Server running at port ${SERVER_PORT}`);
  });
}
serverStart();
