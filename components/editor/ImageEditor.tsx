"use client";

import { useState, useEffect } from "react";
import { SaveIcon, RefreshCw, Download, ChevronDown, Database } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImagePreview } from "./ImagePreview";
import { BasicAdjustments } from "./tools/BasicAdjustments";
import { AiFilters } from "./tools/AiFilters";
import { GenerativeFill } from "./tools/GenerativeFill";
import { CropRotateTool } from "./tools/CropRotateTool";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";

interface ImageEditorProps {
  image: string;
  editedImage: string | null;
  setEditedImage: (image: string | null) => void;
  isProcessing: boolean;
  setIsProcessing: (isProcessing: boolean) => void;
}

export function ImageEditor({ 
  image, 
  editedImage, 
  setEditedImage, 
  isProcessing, 
  setIsProcessing 
}: ImageEditorProps) {
  const { user, isSignedIn } = useUser();
  const [activeTab, setActiveTab] = useState("basic");
  const [selectedResolution, setSelectedResolution] = useState<string>("original");
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    email: "",
  });

  // Update email from Clerk user when available
  useEffect(() => {
    if (isSignedIn && user) {
      const email = user.primaryEmailAddress?.emailAddress;
      if (email) {
        setFormData(prev => ({
          ...prev,
          email
        }));
      }
    }
  }, [isSignedIn, user]);

  // Resolution options
  const resolutionOptions = [
    { id: "original", label: "Original Size" },
    { id: "hd", label: "HD (1280×720)" },
    { id: "fhd", label: "Full HD (1920×1080)" },
    { id: "4k", label: "4K (3840×2160)" },
    { id: "thumbnail", label: "Thumbnail (400×300)" },
    { id: "square", label: "Square (1080×1080)" },
  ];

  // Reset to original image
  const handleReset = () => {
    setEditedImage(image);
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Save image to account
  const handleSaveToAccount = async () => {
    if (!editedImage || !formData.email) return;
    
    try {
      setIsSaving(true);
      
      // Create a new image to get dimensions for thumbnail
      const img = new Image();
      img.onload = async () => {
        // Create a thumbnail
        const canvas = document.createElement("canvas");
        canvas.width = 200;
        canvas.height = 200 * (img.height / img.width);
        
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          const thumbnailUrl = canvas.toDataURL("image/jpeg");
          
          // Save to database via API
          const response = await fetch('/api/images', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: formData.email,
              title: formData.title || 'Untitled Image',
              description: formData.description,
              imageUrl: editedImage,
              thumbnailUrl,
              resolution: selectedResolution,
            }),
          });
          
          const data = await response.json();
          
          if (data.success) {
            toast.success("Image saved successfully", {
              description: "Your image has been saved to your account."
            });
            setSaveDialogOpen(false);
          } else {
            toast.error("Failed to save image", {
              description: data.error || "Please try again."
            });
          }
        }
        
        setIsSaving(false);
      };
      
      img.onerror = () => {
        toast.error("Failed to process image");
        setIsSaving(false);
      };
      
      img.src = editedImage;
    } catch (error) {
      console.error("Error saving image to account:", error);
      toast.error("Failed to save image to account");
      setIsSaving(false);
    }
  };

  // Download the edited image with selected resolution
  const handleDownload = () => {
    if (!editedImage) return;
    
    try {
      setIsProcessing(true);
      
      // Create a new image to get dimensions
      const img = new Image();
      img.onload = () => {
        // Create a canvas with the target dimensions
        const canvas = document.createElement("canvas");
        let targetWidth = img.width;
        let targetHeight = img.height;
        
        // Set dimensions based on selected resolution
        switch (selectedResolution) {
          case "hd":
            targetWidth = 1280;
            targetHeight = 720;
            break;
          case "fhd":
            targetWidth = 1920;
            targetHeight = 1080;
            break;
          case "4k":
            targetWidth = 3840;
            targetHeight = 2160;
            break;
          case "thumbnail":
            targetWidth = 400;
            targetHeight = 300;
            break;
          case "square":
            targetWidth = 1080;
            targetHeight = 1080;
            break;
          default:
            // Original size - keep dimensions
            break;
        }
        
        // Set canvas dimensions
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        
        // Draw image to canvas with new dimensions
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
          
          // Get the resized image as data URL
          const resizedImage = canvas.toDataURL("image/png");
          
          // Create download link
          const link = document.createElement("a");
          link.href = resizedImage;
          link.download = `gemma-ai-edited-${selectedResolution}-${Date.now()}.png`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          
          toast.success("Image downloaded successfully", {
            description: `Saved at ${targetWidth}×${targetHeight} resolution`
          });
        }
        
        setIsProcessing(false);
      };
      
      img.onerror = () => {
        toast.error("Failed to process image");
        setIsProcessing(false);
      };
      
      img.src = editedImage;
    } catch (error) {
      console.error("Error downloading image:", error);
      toast.error("Failed to download image");
      setIsProcessing(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle>Image Editor</CardTitle>
        <CardDescription>
          Apply AI-powered edits to your image
        </CardDescription>
      </CardHeader>
      
      <Tabs 
        defaultValue="basic" 
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <div className="px-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="basic">Basic Adjustments</TabsTrigger>
            <TabsTrigger value="transform">Transform</TabsTrigger>
            <TabsTrigger value="ai-filters">AI Filters</TabsTrigger>
            <TabsTrigger value="generative">Generative Fill</TabsTrigger>
          </TabsList>
        </div>
        
        <CardContent className="pt-6 pb-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col space-y-1.5">
              <p className="text-sm text-muted-foreground">Preview</p>
              <div className="relative">
                {isProcessing && (
                  <div className="absolute inset-0 bg-background/80 flex items-center justify-center z-10 rounded-md">
                    <RefreshCw className="h-6 w-6 animate-spin text-primary" />
                  </div>
                )}
                {editedImage && (
                  <ImagePreview 
                    src={editedImage} 
                    alt="Edited image" 
                  />
                )}
              </div>
            </div>
            
            <div className="flex flex-col">
              <TabsContent value="basic" className="mt-0">
                <BasicAdjustments 
                  image={image}
                  editedImage={editedImage}
                  setEditedImage={setEditedImage}
                  isProcessing={isProcessing}
                  setIsProcessing={setIsProcessing}
                />
              </TabsContent>
              
              <TabsContent value="transform" className="mt-0">
                <CropRotateTool
                  image={image}
                  editedImage={editedImage}
                  setEditedImage={setEditedImage}
                  isProcessing={isProcessing}
                  setIsProcessing={setIsProcessing}
                />
              </TabsContent>
              
              <TabsContent value="ai-filters" className="mt-0">
                <AiFilters
                  image={image}
                  editedImage={editedImage}
                  setEditedImage={setEditedImage}
                  isProcessing={isProcessing}
                  setIsProcessing={setIsProcessing}
                />
              </TabsContent>
              
              <TabsContent value="generative" className="mt-0">
                <GenerativeFill
                  image={image}
                  editedImage={editedImage}
                  setEditedImage={setEditedImage}
                  isProcessing={isProcessing}
                  setIsProcessing={setIsProcessing}
                />
              </TabsContent>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-between mt-6">
          <Button 
            variant="outline" 
            onClick={handleReset}
            disabled={isProcessing}
          >
            Reset
          </Button>
          
          <div className="flex space-x-2">
            <Dialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" disabled={isProcessing || !editedImage}>
                  <Database className="mr-2 h-4 w-4" /> Save to Account
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Save Image to Account</DialogTitle>
                  <DialogDescription>
                    {isSignedIn 
                      ? "Enter details to save this image to your account." 
                      : "Enter your details to save this image to your account."}
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-right">
                      Email
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="col-span-3"
                      placeholder="your@email.com"
                      required
                      disabled={isSignedIn}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="title" className="text-right">
                      Title
                    </Label>
                    <Input
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="col-span-3"
                      placeholder="My Awesome Image"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="description" className="text-right">
                      Description
                    </Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      className="col-span-3"
                      placeholder="A short description of your image..."
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    type="submit"
                    onClick={handleSaveToAccount}
                    disabled={isSaving || !formData.email}
                    className="w-full"
                  >
                    {isSaving ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      "Save Image"
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" disabled={isProcessing}>
                  {resolutionOptions.find(option => option.id === selectedResolution)?.label}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {resolutionOptions.map((option) => (
                  <DropdownMenuItem
                    key={option.id}
                    onClick={() => setSelectedResolution(option.id)}
                  >
                    {option.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button 
              onClick={handleDownload} 
              disabled={isProcessing || !editedImage}
            >
              <Download className="mr-2 h-4 w-4" /> Download
            </Button>
          </div>
        </CardFooter>
      </Tabs>
    </Card>
  );
} 