// src/config/db.js
import { PrismaClient } from '../generated/prisma/index.js'; // Point to your custom output folder

const prisma = new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error']
});

// Connect to the database
const connectDB = async () => {
    try {
        await prisma.$connect();
        console.log('Connected to the database');
    } catch (error) {
        console.error('Error connecting to the database:', error);
        process.exit(1);
    }
};

// Disconnect from the database
const disconnectDB = async () => {
   await prisma.$disconnect();
};

export { connectDB, disconnectDB, prisma };