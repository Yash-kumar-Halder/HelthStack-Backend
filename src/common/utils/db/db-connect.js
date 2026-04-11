import 'dotenv/config';
import mongoose from 'mongoose';

let isConnected = false;
export const connectToDB = async () => {
    if (isConnected) {
        console.log('Database already connected');
        return;
    }
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        isConnected = conn.connections[0].readyState === 1;
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
    }
};
