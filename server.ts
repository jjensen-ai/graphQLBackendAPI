// Imports for node modules
import express from 'express';
import mongoose from 'mongoose';
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
import { ApolloServer } from 'apollo-server-express';

// Imports for API

import { typeDefs } from './graphql/typeDefs';
import { resolvers } from './graphql/resolvers';

// Important stuff for making the app work

dotenv.config({ path: `${__dirname}/config.env` });

//Start my Server
const serverStart = async () => {
  const app = express();
  const DB = process.env.DATABASE;
  console.log(DB);

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  const server = new ApolloServer({ typeDefs, resolvers });

  await server.start();

  server.applyMiddleware({ app });

  await mongoose.connect(`${DB}`).then(() => {
    console.log('DB CONNECTED');
  });

  const SERVER_PORT = process.env.PORT;
  app.listen(SERVER_PORT, () => {
    console.log(`Server running at http://localhost:${SERVER_PORT}/`);
  });
};

serverStart();
