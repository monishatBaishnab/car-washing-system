import express from "express";
import cors from 'cors';
import pathErrorHandler from "./app/middlewares/pathErrorHandler";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res, next) => {
    throw new Error('Error occured')
})

// Handle 404 errors
app.use('*', pathErrorHandler);

// Global Error Handler Middleware
app.use(globalErrorHandler);

export default app;