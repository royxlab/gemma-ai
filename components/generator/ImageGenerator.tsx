"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { RefreshCw, ImageIcon, Download, Sparkles, Save } from "lucide-react";
import { generateImage } from "@/lib/gemini";
import { toast } from "sonner";
import { ImagePreview } from "@/components/editor/ImagePreview";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";

export function ImageGenerator() {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const promptRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();

  // Sample prompts for inspiration
  const samplePrompts = [
    "A serene sunset over a mountain lake with reflections of pink and orange clouds",
    "A futuristic cityscape with flying vehicles and holographic billboards",
    "A magical forest with bioluminescent plants and mystical creatures",
    "An astronaut standing on an alien planet with two moons in the sky",
    "A cozy coffee shop interior with rain falling outside the windows"
  ];

  const generateRandomPrompt = () => {
    const randomPrompt = samplePrompts[Math.floor(Math.random() * samplePrompts.length)];
    setPrompt(randomPrompt);
    if (promptRef.current) {
      promptRef.current.focus();
    }
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt", {
        description: "Describe what kind of image you want to generate"
      });
      return;
    }

    setIsGenerating(true);

    try {
      const image = await generateImage(prompt);
      setGeneratedImage(image);
      toast.success("Image generated successfully", {
        description: "Your AI-generated image is ready"
      });
    } catch (error) {
      console.error("Error generating image:", error);
      toast.error("Failed to generate image", {
        description: "Please try a different prompt or try again later"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (!generatedImage) return;
    
    const link = document.createElement("a");
    link.href = generatedImage;
    link.download = `gemma-ai-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  const saveToGallery = () => {
    if (!generatedImage) return;
    
    try {
      // Get existing gallery images
      const storedImages = localStorage.getItem("gallery-images");
      let galleryImages = storedImages ? JSON.parse(storedImages) : [];
      
      // Format the prompt for the image name
      const imageTitle = prompt.length > 40 
        ? prompt.substring(0, 40) + "..."
        : prompt;
      
      // Create a new gallery image object
      const newImage = {
        id: uuidv4(),
        url: generatedImage,
        name: imageTitle,
        createdAt: Date.now(),
        tags: ["generated", "gemini-ai"]
      };
      
      // Add to gallery
      galleryImages = [newImage, ...galleryImages];
      localStorage.setItem("gallery-images", JSON.stringify(galleryImages));
      
      toast.success("Saved to gallery", {
        description: "Your generated image has been saved to your gallery."
      });
      
      // Optionally navigate to gallery
      if (confirm("Image saved to gallery. View your gallery now?")) {
        router.push("/gallery");
      }
    } catch (error) {
      console.error("Error saving to gallery:", error);
      toast.error("Failed to save to gallery", {
        description: "An error occurred while saving your image."
      });
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="space-y-6">
        <Card className="p-6">
          <div className="space-y-5">
            <div>
              <h2 className="text-xl font-semibold mb-2">Create with AI</h2>
              <p className="text-sm text-muted-foreground">
                Describe the image you want to generate in detail for best results.
              </p>
            </div>
            
            <Textarea
              ref={promptRef}
              placeholder="A serene sunset over a mountain lake with reflections of pink and orange clouds..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="min-h-[150px] resize-none"
              disabled={isGenerating}
            />
            
            <div className="flex items-center space-x-2">
              <Button
                onClick={generateRandomPrompt}
                variant="outline"
                size="sm"
                disabled={isGenerating}
              >
                <Sparkles className="mr-2 h-4 w-4" /> Inspire Me
              </Button>
              <span className="text-xs text-muted-foreground">
                Get a random prompt idea
              </span>
            </div>
            
            <Button 
              onClick={handleGenerate} 
              disabled={isGenerating || !prompt.trim()}
              className="w-full"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> Generating Image...
                </>
              ) : (
                <>
                  <ImageIcon className="mr-2 h-4 w-4" /> Generate Image
                </>
              )}
            </Button>
          </div>
        </Card>
        
        <div className="text-sm text-muted-foreground">
          <p>Tips for better results:</p>
          <ul className="list-disc pl-5 text-xs space-y-1 mt-1">
            <li>Be specific about what you want to see</li>
            <li>Include details about style, lighting, and setting</li>
            <li>Specify any artistic styles you'd like (e.g., "impressionist", "cyberpunk")</li>
            <li>Mention colors, materials, and textures for more control</li>
          </ul>
        </div>
      </div>
      
      <div className="space-y-4">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Generated Image</h2>
          {generatedImage ? (
            <div className="space-y-4">
              <div className="border rounded-md overflow-hidden">
                <ImagePreview src={generatedImage} alt="Generated image" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Button 
                  variant="outline" 
                  onClick={handleDownload}
                >
                  <Download className="mr-2 h-4 w-4" /> Download
                </Button>
                <Button
                  onClick={saveToGallery}
                >
                  <Save className="mr-2 h-4 w-4" /> Save to Gallery
                </Button>
                <Button 
                  className="col-span-2 w-full"
                  onClick={() => {
                    if (generatedImage) {
                      // Store the generated image in localStorage instead of the URL
                      localStorage.setItem("temp-edit-image", generatedImage);
                      // Navigate to the edit page with a simple indicator parameter
                      router.push(`/edit?source=generator`);
                    }
                  }}
                >
                  Edit Image
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-10 text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                <ImageIcon className="h-8 w-8 text-muted-foreground" />
              </div>
              <div className="max-w-[250px]">
                <p className="font-medium">No image generated yet</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Enter a prompt and click "Generate Image" to create your AI masterpiece.
                </p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
} 