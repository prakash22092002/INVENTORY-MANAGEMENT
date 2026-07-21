import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

// Route Imports
import userRoutes from './routes/userRoutes';
import productRoutes from './routes/productRoutes/productsRoutes'

const app = express();

// Global Middlewares
app.use(helmet());
const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:3000',
    process.env.CLIENT_URL,
    process.env.CLIENT_DEV_URL
].filter((url): url is string => Boolean(url));

app.use(cors({
    origin: allowedOrigins,
    credentials: true
}));

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
app.use('/api/product', productRoutes);

// 404 Handler
app.use((req, res) => {
    res.status(404).json({
        es: 1,
        statusCode: 404,
        message: `Route ${req.method} ${req.originalUrl} not found`
    });
});

export default app;


