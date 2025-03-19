import { Metadata } from "next";
import { ImageGenerator } from "@/components/generator/ImageGenerator";

export const metadata: Metadata = {
  title: "AI Image Generator | Gemma AI",
  description: "Generate beautiful images with the power of AI",
};

export default function GeneratePage() {
  return (
    <div className="container mx-auto py-6 max-w-7xl px-4">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Image Generator</h1>
        <p className="text-muted-foreground mt-1">Create stunning visuals with AI-powered text prompts</p>
      </div>
      <ImageGenerator />
    </div>
  );
} 