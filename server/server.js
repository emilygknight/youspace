import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import express from 'express';
import path from 'path';
import { authMiddleware } from './utils/auth.js';
import { typeDefs, resolvers } from './schemas/index.js';
import db from './config/connection.js';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

console.log("🔧 Starting server setup...");

const PORT = process.env.PORT || 3001;
const app = express();
const httpServer = createServer(app);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log("📦 Loading .env variables...");
dotenv.config({ path: path.join(__dirname, '.env') });
console.log("✅ .env loaded.");


const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log('a user connected', socket.id);

  socket.on('joinRoom', (room) => {
    socket.join(room);
    console.log(`User ${socket.id} joined room ${room}`);
  });

  socket.on('send_message', (data) => {
    console.log(data);
    socket.to(data.room).emit('receive_message', data);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected', socket.id);
  });
});

console.log("⚙️ Initializing Apollo Server...");
const server = new ApolloServer({
  typeDefs,
  resolvers,
  formatError: (err) => {
    console.error('🚨 GraphQL Error:', err);
    return err;
  },
});

const startApolloServer = async () => {
  try {
    await server.start();
    console.log("🚀 Apollo Server started.");

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    console.log("📨 JSON middleware registered.");

    app.use('/images', express.static(path.join(__dirname, '../client/images')));

    app.use((req, res, next) => {
      console.log(`Request received: ${req.method} ${req.url}`);
      next();
    });

    if (process.env.NODE_ENV === 'production') {
      app.use(express.static(path.join(__dirname, '../client/dist')));

      app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/dist/index.html'));
      });
    }

    console.log("🔌 Applying GraphQL middleware...");
    app.use(cors());
    app.use(express.json());
    app.use('/graphql', (req, res, next) => {
      console.log('📩 Incoming GraphQL request:', req.body);
      next();
    });
    app.use(
        '/graphql',
        expressMiddleware(server, {
          context: authMiddleware,
        })
    );

    console.log("✅ GraphQL middleware applied at /graphql");

    db.on('error', (err) => {
      console.error("❌ Database connection error:", err);
    });

    db.once('open', () => {
      console.log("✅ MongoDB connected.");
    });

    httpServer.listen(PORT, '0.0.0.0', () => {
      console.log(`🌐 API server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Server startup error:", error);
  }
};

startApolloServer();
