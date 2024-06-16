import { Server } from 'http';
import app from './app';
import config from './app/config';
import mongoose from 'mongoose';

let server: Server;
const bootstrap = async () => {
  app.listen(config.port, () => {
    console.log(`Server running on port: ${config.port}`);
  });
  try {
    await mongoose.connect(config.db_uri as string, {
      dbName: 'car-washing-system',
    });
    console.log('Database connected successfully.');
  } catch (error) {
    console.log(error);
  }
};

bootstrap();

// Handle Unhandled Promise Rejections
process.on('unhandledRejection', () => {
  console.log(
    '😈 unhandledRejection is detected, shutting down the server....',
  );
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

// Handle Uncaught Exceptions
process.on('uncaughtException', () => {
  console.log('😈 uncaughtException is detected, shutting down the server....');
  process.exit(1);
});
