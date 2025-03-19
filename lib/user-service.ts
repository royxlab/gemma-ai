import prisma from './db';
import { User } from '@prisma/client';

interface CreateUserParams {
  email: string;
  name?: string;
}

interface UserResult {
  success: boolean;
  user?: User;
  error?: string;
}

/**
 * Creates a new user or returns existing user with the same email
 */
export async function createOrGetUser({ email, name }: CreateUserParams): Promise<UserResult> {
  try {
    // Check if user already exists
    let user = await prisma.user.findUnique({
      where: { email },
    });

    // If user doesn't exist, create a new one
    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          name: name || email.split('@')[0], // Use part of email as name if not provided
        },
      });
    }

    return { success: true, user };
  } catch (error) {
    console.error('Error creating/getting user:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error occurred' 
    };
  }
}

/**
 * Gets a user by ID
 */
export async function getUserById(id: string): Promise<User | null> {
  try {
    return await prisma.user.findUnique({
      where: { id },
    });
  } catch (error) {
    console.error('Error getting user by ID:', error);
    return null;
  }
}

/**
 * Gets a user by email
 */
export async function getUserByEmail(email: string): Promise<User | null> {
  try {
    return await prisma.user.findUnique({
      where: { email },
    });
  } catch (error) {
    console.error('Error getting user by email:', error);
    return null;
  }
}

/**
 * Updates a user's profile
 */
export async function updateUser(
  id: string,
  data: { name?: string }
): Promise<User | null> {
  try {
    return await prisma.user.update({
      where: { id },
      data,
    });
  } catch (error) {
    console.error('Error updating user:', error);
    return null;
  }
} 