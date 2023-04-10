// Imports for node modules
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

// Imports for API

import { typeDefs } from './graphql/typeDefs';
import { resolvers } from './graphql/resolvers';

// Important stuff for making the app work

dotenv.config({ path: './config.env' });
const DB = process.env.DATABASE;
const SERVER_PORT = process.env.PORT;

//Start my Server
async function serverStart() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 3030 },
  });

  await mongoose.connect(`${DB}`).then(() => {
    console.log('DB CONNECTED');
  });

  console.log(`Sever is ready at ${url}`)
}
serverStart();
