"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RefreshCw, Edit, Trash2, ExternalLink } from "lucide-react";
import { toast } from "sonner";

interface SavedImage {
  id: string;
  title: string;
  description: string | null;
  url: string;
  thumbnailUrl: string | null;
  resolution: string | null;
  createdAt: string;
}

interface MyImagesProps {
  userEmail?: string;
}

export function MyImages({ userEmail }: MyImagesProps) {
  const router = useRouter();
  const [email, setEmail] = useState(userEmail || "");
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [images, setImages] = useState<SavedImage[]>([]);

  // Automatically load images if userEmail is provided
  useEffect(() => {
    if (userEmail) {
      setEmail(userEmail);
      fetchImages();
    }
  }, [userEmail]);

  const fetchImages = async () => {
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`/api/images?email=${encodeURIComponent(email)}`);
      
      if (!response.ok) {
        // Handle HTTP error responses
        const errorText = await response.text();
        throw new Error(`API error (${response.status}): ${errorText}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        setImages(data.images);
        if (data.images.length === 0) {
          toast.info("No saved images found");
        } else {
          toast("Images loaded successfully", {
            description: `Found ${data.images.length} saved images`
          });
        }
      } else {
        console.error("API error response:", data);
        toast.error(data.error || "Error loading images");
      }
    } catch (error) {
      console.error("Error fetching images:", error);
      toast.error(error instanceof Error ? error.message : "Failed to fetch images");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteImage = async (id: string) => {
    setIsDeleting(id);
    try {
      const response = await fetch(`/api/images?id=${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      
      if (data.success) {
        setImages(prevImages => prevImages.filter(image => image.id !== id));
        toast.success("Image deleted successfully");
      } else {
        toast.error(data.error || "Error deleting image");
      }
    } catch (error) {
      console.error("Error deleting image:", error);
      toast.error("Failed to delete image");
    } finally {
      setIsDeleting(null);
    }
  };

  const editImage = (imageUrl: string) => {
    // Store image in localStorage for editor
    localStorage.setItem("temp-edit-image", imageUrl);
    router.push(`/edit?source=gallery`);
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(undefined, { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-8">
      {!userEmail && (
        <Card>
          <CardHeader>
            <CardTitle>My Saved Images</CardTitle>
            <CardDescription>
              View and manage images you've saved to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-2">
              <div className="grid flex-1 items-center">
                <Label htmlFor="email" className="sr-only">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email to view your images"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full"
                />
              </div>
              <Button onClick={fetchImages} disabled={isLoading || !email}>
                {isLoading ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Loading...
                  </>
                ) : (
                  "Load Images"
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {isLoading && (
        <div className="flex justify-center py-12">
          <RefreshCw className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}

      {images.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image) => (
            <Card key={image.id} className="overflow-hidden flex flex-col">
              <div className="aspect-video relative">
                <Image
                  src={image.thumbnailUrl || image.url}
                  alt={image.title}
                  fill
                  className="object-cover"
                />
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">{image.title}</CardTitle>
                <CardDescription>
                  {formatDate(image.createdAt)}
                  {image.resolution && ` • ${image.resolution} resolution`}
                </CardDescription>
              </CardHeader>
              {image.description && (
                <CardContent className="py-0">
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {image.description}
                  </p>
                </CardContent>
              )}
              <CardFooter className="flex justify-between mt-auto">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => deleteImage(image.id)}
                  disabled={isDeleting === image.id}
                >
                  {isDeleting === image.id ? (
                    <RefreshCw className="h-4 w-4 animate-spin" />
                  ) : (
                    <Trash2 className="h-4 w-4" />
                  )}
                </Button>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => editImage(image.url)}
                  >
                    <Edit className="mr-2 h-4 w-4" /> Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(image.url, "_blank")}
                  >
                    <ExternalLink className="mr-2 h-4 w-4" /> View Full Size
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {images.length === 0 && email && !isLoading && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No images found for this account</p>
        </div>
      )}
    </div>
  );
} 