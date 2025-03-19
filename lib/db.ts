import { PrismaClient } from '@prisma/client';

// Create a singleton instance of the PrismaClient
const prismaClientSingleton = () => {
  return new PrismaClient();
};

// Define a global type for PrismaClient in the Node.js global namespace
declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

// Use the existing client in development to avoid multiple instances
const prisma = globalThis.prisma ?? prismaClientSingleton();

// In development, save the client to the global object to avoid multiple connections
if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma;

export default prisma; 