"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ImageDropzone } from "./ImageDropzone";
import { ImageEditor } from "./ImageEditor";
import { ImagePreview } from "./ImagePreview";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter, useSearchParams } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";

export function EditorInterface() {
  const [image, setImage] = useState<string | null>(null);
  const [editedImage, setEditedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Replace with enhanced version that checks both URL params and localStorage
  useEffect(() => {
    // Check for source=generator, which indicates we should load from localStorage
    const source = searchParams.get("source");
    if (source === "generator") {
      // Get image from localStorage
      const storedImage = localStorage.getItem("temp-edit-image");
      if (storedImage) {
        setImage(storedImage);
        setEditedImage(storedImage);
        console.log("Successfully loaded image from localStorage");
        
        // Optionally clear the temporary storage
        // localStorage.removeItem("temp-edit-image"); // Uncomment to clear after loading
      } else {
        console.error("No image found in localStorage");
        toast.error("Image not found", {
          description: "Failed to find the image to edit. Please try again."
        });
      }
      return;
    }
    
    // Traditional URL parameter approach as fallback for gallery or direct links
    const imageParam = searchParams.get("image");
    if (imageParam) {
      try {
        // Safely decode the URI component
        const decodedImage = decodeURIComponent(imageParam);
        
        // Validate if it's a valid data URL or regular URL
        if (decodedImage.startsWith('data:image/') || 
            decodedImage.startsWith('http://') || 
            decodedImage.startsWith('https://')) {
          
          // For data URLs, use them directly
          setImage(decodedImage);
          setEditedImage(decodedImage);
          
          console.log("Successfully loaded image from URL parameter");
        } else {
          console.error("Invalid image format in URL parameter");
          toast.error("Invalid image format", {
            description: "The image couldn't be loaded from the URL parameter."
          });
        }
      } catch (error) {
        console.error("Error processing image URL parameter:", error);
        toast.error("Error loading image", {
          description: "Failed to process the image from URL. Please try uploading directly."
        });
      }
    }
  }, [searchParams]);

  const handleImageUpload = (imageDataUrl: string) => {
    setImage(imageDataUrl);
    setEditedImage(imageDataUrl);
  };
  
  const saveToGallery = () => {
    if (!editedImage) return;
    
    try {
      // Get existing gallery images
      const storedImages = localStorage.getItem("gallery-images");
      let galleryImages = storedImages ? JSON.parse(storedImages) : [];
      
      // Create a new gallery image object
      const newImage = {
        id: uuidv4(),
        url: editedImage,
        name: `Edited Image ${new Date().toLocaleDateString()}`,
        createdAt: Date.now(),
        tags: ["edited", "gemini-ai"]
      };
      
      // Add to gallery
      galleryImages = [newImage, ...galleryImages];
      localStorage.setItem("gallery-images", JSON.stringify(galleryImages));
      
      toast.success("Saved to gallery", {
        description: "Your edited image has been saved to your gallery."
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
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="col-span-1 p-4 h-fit">
        {!image ? (
          <ImageDropzone onImageUpload={handleImageUpload} />
        ) : (
          <div className="space-y-4">
            <ImagePreview src={image} alt="Original image" />
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => setImage(null)}
            >
              Upload New Image
            </Button>
          </div>
        )}
      </Card>

      <div className="col-span-1 lg:col-span-2">
        {image ? (
          <div className="space-y-4">
            <ImageEditor
              image={image}
              editedImage={editedImage}
              setEditedImage={setEditedImage}
              isProcessing={isProcessing}
              setIsProcessing={setIsProcessing}
            />
            
            {editedImage && editedImage !== image && (
              <div className="flex gap-3">
                <Button 
                  className="flex-1"
                  onClick={saveToGallery}
                  disabled={isProcessing}
                >
                  Save to Gallery
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <div className="space-y-4">
              <Skeleton className="h-[300px] w-full rounded-md" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
              <Skeleton className="h-10 w-[150px]" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 