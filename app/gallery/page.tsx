import { Metadata } from "next";
import { Gallery } from "@/components/gallery/Gallery";

export const metadata: Metadata = {
  title: "Image Gallery | Gemma AI",
  description: "View and manage your AI-generated images",
};

export default function GalleryPage() {
  return (
    <div className="container mx-auto py-6 max-w-7xl px-4">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Image Gallery</h1>
        <p className="text-muted-foreground mt-1">View, organize, and edit your collection of AI images</p>
      </div>
      <Gallery />
    </div>
  );
} 