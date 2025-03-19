import { Metadata } from "next";
import { Gallery } from "@/components/gallery/Gallery";
import { Container } from "@/components/Container";

export const metadata: Metadata = {
  title: "Image Gallery | Gemma AI",
  description: "View and manage your AI-generated images",
};

export default function GalleryPage() {
  return (
    <Container>
      <div className="py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Image Gallery</h1>
          <p className="text-muted-foreground mt-1">View, organize, and edit your collection of AI images</p>
        </div>
        <Gallery />
      </div>
    </Container>
  );
} 