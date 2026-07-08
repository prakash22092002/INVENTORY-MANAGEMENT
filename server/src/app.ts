import dotenv from 'dotenv';
import express from 'express'
import connectDB from './config/database';

dotenv.config();

const app = express();

app.use(express.json());

// this si to start the server
connectDB()

app.get("/", (req, res) => {
    res.send("Server Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});
