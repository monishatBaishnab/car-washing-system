import express from 'express';
import cors from 'cors';
import pathErrorHandler from './app/middlewares/pathErrorHandler';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import { appRouter } from './app/routes';

const app = express();

app.use(cors({ origin: ['http://localhost:5173'], credentials: true }));
app.use(express.json());

// Connects version 1 API routes
app.use('/api/', appRouter);

// Handle 404 errors
app.use('*', pathErrorHandler);

// Global Error Handler Middleware
app.use(globalErrorHandler);

export default app;
