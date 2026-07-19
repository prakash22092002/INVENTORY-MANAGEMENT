import dotenv from 'dotenv';
// Load environment variables before any other imports
dotenv.config();

import app from './app';
import connectDB from './config/database';

const PORT = process.env.PORT || 5000;

// Connect to Database
connectDB();

// Start the HTTP server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
