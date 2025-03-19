import { NextRequest, NextResponse } from 'next/server';
import { saveImage, getUserImages, deleteImage } from '@/lib/image-service';
import { createOrGetUser, getUserByEmail } from '@/lib/user-service';

// Save a new image
export async function POST(request: NextRequest) {
  try {
    const { email, title, description, imageUrl, thumbnailUrl, resolution } = await request.json();
    
    if (!email || !imageUrl) {
      return NextResponse.json(
        { error: 'Email and image URL are required' }, 
        { status: 400 }
      );
    }
    
    // Get or create the user
    const userResult = await createOrGetUser({ email });
    
    if (!userResult.success || !userResult.user) {
      return NextResponse.json(
        { error: userResult.error || 'Failed to create or get user' }, 
        { status: 500 }
      );
    }
    
    // Save the image
    const saveResult = await saveImage({
      userId: userResult.user.id,
      url: imageUrl,
      thumbnailUrl,
      title,
      description,
      resolution,
    });
    
    if (!saveResult.success) {
      return NextResponse.json(
        { error: saveResult.error || 'Failed to save image' }, 
        { status: 500 }
      );
    }
    
    return NextResponse.json({ 
      success: true, 
      image: saveResult.image 
    });
  } catch (error) {
    console.error('Error saving image:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' }, 
      { status: 500 }
    );
  }
}

// Get user images
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const email = searchParams.get('email');
    
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' }, 
        { status: 400 }
      );
    }
    
    // Get the user
    const user = await getUserByEmail(email);
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' }, 
        { status: 404 }
      );
    }
    
    // Get user's images
    const images = await getUserImages(user.id);
    
    return NextResponse.json({ 
      success: true, 
      images 
    });
  } catch (error) {
    console.error('Error getting images:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' }, 
      { status: 500 }
    );
  }
}

// Delete an image
export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const imageId = searchParams.get('id');
    
    if (!imageId) {
      return NextResponse.json(
        { error: 'Image ID is required' }, 
        { status: 400 }
      );
    }
    
    const result = await deleteImage(imageId);
    
    if (!result) {
      return NextResponse.json(
        { error: 'Failed to delete image' }, 
        { status: 500 }
      );
    }
    
    return NextResponse.json({ 
      success: true 
    });
  } catch (error) {
    console.error('Error deleting image:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' }, 
      { status: 500 }
    );
  }
} 