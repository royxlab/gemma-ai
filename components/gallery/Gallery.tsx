"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  ImageIcon, 
  Download, 
  Pencil, 
  Trash2, 
  Plus, 
  Search,
  LayoutGrid,
  List
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface GalleryImage {
  id: string;
  url: string;
  name: string;
  createdAt: number;
  tags: string[];
}

export function Gallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const router = useRouter();

  // Load images from localStorage on component mount
  useEffect(() => {
    const storedImages = localStorage.getItem("gallery-images");
    if (storedImages) {
      try {
        setImages(JSON.parse(storedImages));
      } catch (error) {
        console.error("Failed to parse stored images:", error);
      }
    }
  }, []);

  // Demo images for initial gallery
  useEffect(() => {
    if (images.length === 0) {
      const demoImages = [
        {
          id: "demo-1",
          url: "https://source.unsplash.com/random/800x600/?nature",
          name: "Beautiful Nature Scene",
          createdAt: Date.now() - 1000 * 60 * 60 * 24 * 2, // 2 days ago
          tags: ["nature", "landscape"]
        },
        {
          id: "demo-2",
          url: "https://source.unsplash.com/random/800x600/?cityscape",
          name: "Urban Cityscape",
          createdAt: Date.now() - 1000 * 60 * 60 * 24, // 1 day ago
          tags: ["city", "urban", "architecture"]
        },
        {
          id: "demo-3",
          url: "https://source.unsplash.com/random/800x600/?portrait",
          name: "Portrait Study",
          createdAt: Date.now() - 1000 * 60 * 60 * 2, // 2 hours ago
          tags: ["portrait", "person"]
        }
      ];
      setImages(demoImages);
      localStorage.setItem("gallery-images", JSON.stringify(demoImages));
    }
  }, [images.length]);

  const filteredImages = images.filter(image => 
    image.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    image.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const sortedImages = [...filteredImages].sort((a, b) => b.createdAt - a.createdAt);

  const handleDeleteImage = (id: string) => {
    if (window.confirm("Are you sure you want to delete this image?")) {
      const updatedImages = images.filter(image => image.id !== id);
      setImages(updatedImages);
      localStorage.setItem("gallery-images", JSON.stringify(updatedImages));
      toast.success("Image deleted", {
        description: "The image has been removed from your gallery."
      });
    }
  };

  const handleDownloadImage = (image: GalleryImage) => {
    const link = document.createElement("a");
    link.href = image.url;
    link.download = `${image.name.replace(/\s+/g, "-").toLowerCase()}-${image.id}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success("Download started", {
      description: "Your image is being downloaded."
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search images by name or tag..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-4 w-full sm:w-auto">
          <Tabs 
            defaultValue="grid"
            value={viewMode}
            onValueChange={(value) => setViewMode(value as "grid" | "list")}
            className="hidden sm:block"
          >
            <TabsList>
              <TabsTrigger value="grid">
                <LayoutGrid className="h-4 w-4 mr-1" /> Grid
              </TabsTrigger>
              <TabsTrigger value="list">
                <List className="h-4 w-4 mr-1" /> List
              </TabsTrigger>
            </TabsList>
          </Tabs>
          
          <Link href="/generate" className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto">
              <Plus className="h-4 w-4 mr-2" /> Create New
            </Button>
          </Link>
        </div>
      </div>
      
      {sortedImages.length > 0 ? (
        <div className={viewMode === "grid" 
          ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" 
          : "space-y-4"
        }>
          {sortedImages.map(image => (
            <Card 
              key={image.id}
              className={`overflow-hidden ${viewMode === "list" ? "flex" : ""}`}
            >
              <div className={viewMode === "list" ? "w-32 h-32 relative shrink-0" : "aspect-square relative"}>
                <img
                  src={image.url}
                  alt={image.name}
                  className={`object-cover ${viewMode === "list" ? "h-full" : "w-full h-full"}`}
                />
              </div>
              
              <div className={`p-4 ${viewMode === "list" ? "flex-1" : ""}`}>
                <h3 className="font-medium truncate">{image.name}</h3>
                
                <div className="flex flex-wrap gap-1 mt-2 mb-3">
                  {image.tags.map(tag => (
                    <div key={tag} className="bg-muted text-xs px-2 py-1 rounded-full">
                      {tag}
                    </div>
                  ))}
                </div>
                
                <div className="text-xs text-muted-foreground mb-4">
                  {new Date(image.createdAt).toLocaleDateString()}
                </div>
                
                <div className="flex space-x-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleDownloadImage(image)}
                    className="flex-1"
                  >
                    <Download className="h-4 w-4 mr-1" /> 
                    {viewMode === "list" ? "Download" : ""}
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="w-full flex-1"
                    onClick={() => {
                      localStorage.setItem("temp-edit-image", image.url);
                      router.push(`/edit?source=gallery`);
                    }}
                  >
                    <Pencil className="h-4 w-4 mr-1" /> 
                    {viewMode === "list" ? "Edit" : ""}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDeleteImage(image.id)}
                    className="flex-1 text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    {viewMode === "list" ? "Delete" : ""}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
          <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
            <ImageIcon className="h-10 w-10 text-muted-foreground" />
          </div>
          <div className="max-w-[350px]">
            <h3 className="text-xl font-medium">Your gallery is empty</h3>
            <p className="text-muted-foreground mt-1">
              Start by generating some AI images or uploading your own photos to edit.
            </p>
            <Link href="/generate">
              <Button className="mt-4">
                <Plus className="h-4 w-4 mr-2" /> Create Your First Image
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
} 