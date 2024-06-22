import { Server } from 'http';
import app from './app';
import config from './app/config';
import mongoose from 'mongoose';

let server: Server;
const port = config.port ?? 3000;

const bootstrap = async () => {
  try {
    await mongoose.connect(config.db_uri as string, {
      dbName: 'car-washing-system',
    });
    console.log('Database connected successfully.');

    server = app.listen(port, () => {
      console.log(`Server running on port: ${port}`);
    });
  } catch (error) {
    console.error('Failed to connect to the database:', error);
    process.exit(1);
  }
};

bootstrap();

// Handle Unhandled Promise Rejections
process.on('unhandledRejection', (reason: any, promise: Promise<any>) => {
  console.log('😈 Shutting down the server due to unhandled rejection....');
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});

// Handle Uncaught Exceptions
process.on('uncaughtException', (err: any) => {
  console.log('😈 Shutting down the server due to uncaught exception....');
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});
