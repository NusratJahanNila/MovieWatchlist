// src/server.js
import express from "express"; // Uncommented this!
import { config } from 'dotenv';
import { connectDB, disconnectDB } from './config/db.js';

// Import routes
import movieRoutes from './routes/movieRoutes.js';
import authRoutes from './routes/authRoutes.js';

config(); // Load environment variables
connectDB(); // Connect to the database

const app = express();

//body parsing middleware
app.use (express.json());
app.use(express.urlencoded({extended:true}));

// API routes
app.use('/movies', movieRoutes);
app.use("/auth", authRoutes);

const port = 5001;

// Assign this to a variable so your error-handlers can close it!
const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection:', err);
    server.close(async () => {
        await disconnectDB();
        process.exit(1);
    });
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    disconnectDB();
    process.exit(1);
});

// Graceful shutdown
process.on('SIGINT', async () => {
    console.log('SIGINT received. Shutting down gracefully...');
    server.close(async () => {
        await disconnectDB();
        process.exit(0);
    });
});