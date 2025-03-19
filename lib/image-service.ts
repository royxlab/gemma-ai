import prisma from './db';
import { Image, User } from '@prisma/client';

interface CreateImageParams {
  title?: string;
  description?: string;
  url: string;
  thumbnailUrl?: string;
  resolution?: string;
  userId: string;
}

interface SaveImageResult {
  success: boolean;
  image?: Image;
  error?: string;
}

/**
 * Creates a new image record in the database
 */
export async function saveImage(params: CreateImageParams): Promise<SaveImageResult> {
  try {
    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: params.userId },
    });

    if (!user) {
      return { 
        success: false, 
        error: `User with ID ${params.userId} not found` 
      };
    }

    // Create the image
    const image = await prisma.image.create({
      data: {
        title: params.title || 'Untitled Image',
        description: params.description,
        url: params.url,
        thumbnailUrl: params.thumbnailUrl,
        resolution: params.resolution,
        userId: params.userId,
      },
    });

    return { 
      success: true, 
      image 
    };
  } catch (error) {
    console.error('Error saving image:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error occurred' 
    };
  }
}

/**
 * Retrieves all images for a specific user
 */
export async function getUserImages(userId: string): Promise<Image[]> {
  try {
    return await prisma.image.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  } catch (error) {
    console.error('Error retrieving user images:', error);
    throw error;
  }
}

/**
 * Gets a single image by ID
 */
export async function getImageById(imageId: string): Promise<Image | null> {
  try {
    return await prisma.image.findUnique({
      where: { id: imageId },
    });
  } catch (error) {
    console.error('Error retrieving image:', error);
    throw error;
  }
}

/**
 * Deletes an image by ID
 */
export async function deleteImage(imageId: string): Promise<boolean> {
  try {
    await prisma.image.delete({
      where: { id: imageId },
    });
    return true;
  } catch (error) {
    console.error('Error deleting image:', error);
    return false;
  }
}

/**
 * Updates an image's metadata
 */
export async function updateImage(
  imageId: string, 
  data: { title?: string; description?: string }
): Promise<Image | null> {
  try {
    return await prisma.image.update({
      where: { id: imageId },
      data,
    });
  } catch (error) {
    console.error('Error updating image:', error);
    return null;
  }
} 