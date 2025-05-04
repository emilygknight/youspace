import dotenv from 'dotenv';
dotenv.config();

// Import required dependencies
import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import path from 'path';
import { authMiddleware } from './utils/auth.js';

// Import GraphQL type definitions and resolvers
import { typeDefs, resolvers } from './schemas/index.js';
import db from './config/connection.js';


// Define the port for the server
const PORT = process.env.PORT || 3001;
const app = express();


// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  await server.start();

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  app.use('/graphql', expressMiddleware(server, {
    context: authMiddleware
  }));

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));

    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  }

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};

// Call the async function to start the server
startApolloServer();
