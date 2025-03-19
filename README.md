# Gemma AI - Premium Image Editing Application

A powerful AI-powered image editing application built with Next.js 14, featuring Gemini Flash AI integration for advanced image manipulation.

## Features

- **AI-Powered Image Editing**

  - Basic adjustments (brightness, contrast, saturation)
  - Image cropping and rotation
  - AI filters (daytime, night, seasonal, infrastructure aging)
  - Generative Fill for removing or replacing objects

- **AI Image Generation**

  - Create images from text prompts using Gemini Flash AI

- **Multi-resolution Export**

  - Save images at various resolutions (original, HD, Full HD, 4K, etc.)

- **User Accounts**

  - Secure authentication with Clerk
  - Save edited images to your account
  - View and manage saved images in your gallery

- **Modern UI/UX**
  - Clean, responsive interface
  - Dark mode support
  - Mobile-friendly design

## Tech Stack

- **Frontend**

  - Next.js 14 (App Router)
  - React 18
  - TypeScript
  - Tailwind CSS
  - shadcn/ui components

- **Backend**

  - Next.js API Routes
  - Prisma ORM
  - PostgreSQL (Supabase)

- **Authentication**

  - Clerk

- **AI Services**
  - Google's Gemini Flash AI

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Gemini API key
- Supabase PostgreSQL database
- Clerk account for authentication

### Environment Setup

Create a `.env` file in the root directory with the following variables:

```
# Gemini API
GEMINI_API_KEY=your_gemini_api_key

# Database
DATABASE_URL=your_supabase_connection_string
DIRECT_URL=your_supabase_direct_connection_string

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
```

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/gemma-ai.git
cd gemma-ai
```

2. Install dependencies:

```bash
npm install
```

3. Generate Prisma client:

```bash
npx prisma generate
```

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the app.

## Project Structure

```
/app                     # Next.js App Router pages
  /account               # User account page
  /api                   # API routes
    /images              # Image API endpoints
  /edit                  # Image editor page
  /gallery               # Image gallery page
  /generate              # AI image generation page
  /sign-in               # Authentication pages
  /sign-up

/components              # React components
  /editor                # Image editing components
    /tools               # Editing tools (filters, adjustments, etc.)
  /gallery               # Gallery components
  /generator             # Image generation components
  /theme                 # Theme components
  /ui                    # UI components (buttons, inputs, etc.)

/lib                     # Utility functions and services
  db.ts                  # Database connection
  gemini.ts              # Gemini AI integration
  image-service.ts        # Image handling services
  user-service.ts         # User data services
  utils.ts                # General utilities
```

## Features in Detail

### Image Editor

The editor interface allows users to:

- Apply basic adjustments like brightness, contrast, and saturation
- Crop and rotate images
- Apply AI-powered filters including time-of-day effects, seasonal changes, and infrastructure aging
- Use generative fill to remove or replace objects in images

### Image Generator

Create original images from text prompts using Gemini's AI:

- Enter detailed descriptions
- Generate high-quality images
- Edit generated images directly

### User Gallery

- View all saved images
- Filter and sort images
- Edit or delete saved images
- Share images with others

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Google's Gemini AI for image processing capabilities
- shadcn/ui for the beautiful component system
- Clerk for authentication services
- Supabase for database hosting
