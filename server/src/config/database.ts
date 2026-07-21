import mongoose from 'mongoose';
import dns from 'dns';

// Force DNS resolution to Google Public DNS to prevent querySrv ECONNREFUSED errors on local networks
dns.setServers(['8.8.8.8', '8.8.4.4']);

const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGODB_URI;
        if (!mongoURI) {
            console.error('MONGODB_URI is not defined in environment variables!');
            process.exit(1);
        }
        await mongoose.connect(mongoURI);
        console.log('MongoDB Connected!');
    } catch (err) {
        const message = err instanceof Error ? err.message : 'An unknown error occurred';
        console.error(message);
        process.exit(1);
    }
};

export default connectDB;