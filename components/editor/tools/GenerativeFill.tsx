"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RefreshCw, Eraser, Undo, Wand2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { applyGenerativeFill } from "@/lib/gemini";
import { toast } from "sonner";

interface GenerativeFillProps {
  image: string;
  editedImage: string | null;
  setEditedImage: (image: string | null) => void;
  isProcessing: boolean;
  setIsProcessing: (isProcessing: boolean) => void;
}

export function GenerativeFill({
  image,
  editedImage,
  setEditedImage,
  isProcessing,
  setIsProcessing,
}: GenerativeFillProps) {
  const [prompt, setPrompt] = useState("");
  const [isErasing, setIsErasing] = useState(false);
  const [brushSize, setBrushSize] = useState(20);
  const [showMask, setShowMask] = useState(true);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const maskCanvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawingRef = useRef(false);
  
  // Initialize canvas with the image
  useEffect(() => {
    if (!image) return;
    
    const canvas = canvasRef.current;
    const maskCanvas = maskCanvasRef.current;
    if (!canvas || !maskCanvas) return;
    
    const ctx = canvas.getContext("2d");
    const maskCtx = maskCanvas.getContext("2d");
    if (!ctx || !maskCtx) return;
    
    const img = new Image();
    img.src = image;
    
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      
      maskCanvas.width = img.width;
      maskCanvas.height = img.height;
      maskCtx.fillStyle = "rgba(0, 0, 0, 0)";
      maskCtx.fillRect(0, 0, maskCanvas.width, maskCanvas.height);
    };
  }, [image]);
  
  // Update the canvas when editedImage changes
  useEffect(() => {
    if (!editedImage) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    const img = new Image();
    img.src = editedImage;
    
    img.onload = () => {
      ctx.drawImage(img, 0, 0);
    };
  }, [editedImage]);
  
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    isDrawingRef.current = true;
    draw(e);
  };
  
  const stopDrawing = () => {
    isDrawingRef.current = false;
  };
  
  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current) return;
    
    const maskCanvas = maskCanvasRef.current;
    if (!maskCanvas) return;
    
    const maskCtx = maskCanvas.getContext("2d");
    if (!maskCtx) return;
    
    const rect = maskCanvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (maskCanvas.width / rect.width);
    const y = (e.clientY - rect.top) * (maskCanvas.height / rect.height);
    
    maskCtx.globalCompositeOperation = isErasing ? "destination-out" : "source-over";
    maskCtx.fillStyle = "rgba(255, 0, 0, 0.5)";
    maskCtx.beginPath();
    maskCtx.arc(x, y, brushSize, 0, Math.PI * 2);
    maskCtx.fill();
  };
  
  const clearMask = () => {
    const maskCanvas = maskCanvasRef.current;
    if (!maskCanvas) return;
    
    const maskCtx = maskCanvas.getContext("2d");
    if (!maskCtx) return;
    
    maskCtx.clearRect(0, 0, maskCanvas.width, maskCanvas.height);
  };
  
  const applyGenerativeFillHandler = async () => {
    if (isProcessing) return;
    
    const maskCanvas = maskCanvasRef.current;
    const canvas = canvasRef.current;
    if (!maskCanvas || !canvas) return;
    
    const maskCtx = maskCanvas.getContext("2d");
    if (!maskCtx) return;
    
    // Check if mask has been drawn
    const maskData = maskCtx.getImageData(0, 0, maskCanvas.width, maskCanvas.height).data;
    const hasMask = Array.from(maskData).some(pixel => pixel !== 0);
    
    if (!hasMask) {
      toast.error("No mask drawn", {
        description: "Please draw a mask on the areas you want to edit."
      });
      return;
    }
    
    setIsProcessing(true);
    
    try {
      // Get the mask as base64 data
      const maskDataUrl = maskCanvas.toDataURL("image/png");
      
      // Call the Gemini API to apply generative fill
      const processedImage = await applyGenerativeFill(image, maskDataUrl, prompt);
      setEditedImage(processedImage);
      
      toast.success("Generative fill applied", {
        description: prompt 
          ? `Filled with "${prompt.substring(0, 30)}${prompt.length > 30 ? '...' : ''}"`
          : "Image has been edited with AI-generated content."
      });
      
      // Clear the mask after processing
      clearMask();
    } catch (error) {
      console.error("Error applying generative fill:", error);
      toast.error("Failed to apply generative fill", {
        description: "Please try again with a different mask or prompt."
      });
    } finally {
      setIsProcessing(false);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="text-sm text-muted-foreground">
          Draw on areas you want to remove or replace with AI generation
        </div>
        
        <div className="flex space-x-4">
          <Button
            variant={isErasing ? "outline" : "secondary"}
            size="sm"
            onClick={() => setIsErasing(false)}
            disabled={isProcessing}
          >
            <Wand2 className="mr-1 h-4 w-4" /> Draw
          </Button>
          
          <Button
            variant={isErasing ? "secondary" : "outline"}
            size="sm"
            onClick={() => setIsErasing(true)}
            disabled={isProcessing}
          >
            <Eraser className="mr-1 h-4 w-4" /> Erase
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={clearMask}
            disabled={isProcessing}
          >
            <Undo className="mr-1 h-4 w-4" /> Clear
          </Button>
        </div>
        
        <div className="flex items-center space-x-2">
          <Switch
            id="show-mask"
            checked={showMask}
            onCheckedChange={setShowMask}
            disabled={isProcessing}
          />
          <Label htmlFor="show-mask">Show Mask</Label>
        </div>
        
        <div className="relative border rounded-md overflow-hidden">
          <canvas
            ref={canvasRef}
            className="w-full h-auto"
            style={{ maxHeight: "300px", objectFit: "contain" }}
            onMouseDown={startDrawing}
            onMouseUp={stopDrawing}
            onMouseMove={draw}
            onMouseLeave={stopDrawing}
          />
          
          {showMask && (
            <canvas
              ref={maskCanvasRef}
              className="absolute top-0 left-0 w-full h-full pointer-events-none"
              style={{ maxHeight: "300px", objectFit: "contain" }}
            />
          )}
          
          {isProcessing && (
            <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
              <RefreshCw className="h-8 w-8 animate-spin text-primary" />
            </div>
          )}
        </div>
        
        <Textarea
          placeholder="Describe what should replace the masked area (optional)..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="resize-none"
          disabled={isProcessing}
        />
        
        <Button
          className="w-full"
          onClick={applyGenerativeFillHandler}
          disabled={isProcessing}
        >
          {isProcessing ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> Processing...
            </>
          ) : (
            "Apply Generative Fill"
          )}
        </Button>
      </div>
      
      <div className="text-xs text-muted-foreground">
        Powered by Google's Gemini Flash API for realistic image inpainting and generation.
      </div>
    </div>
  );
} 