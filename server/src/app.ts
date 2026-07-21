import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

// Route Imports
import userRoutes from './routes/userRoutes';

const app = express();

// Global Middlewares
app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

app.use(cors({ origin: process.env.CLIENT_DEV_URL, credentials: true }));

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

import { sendSuccessResponse } from './utils/responseHelper';

// Base Route
app.get("/", (req, res) => {
    sendSuccessResponse(res, 200, "Server Running");
});

// API Routes Mounting
app.use('/api/users', userRoutes);

export default app;


