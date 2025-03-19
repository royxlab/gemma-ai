"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { 
  RefreshCw, 
  RotateCw, 
  RotateCcw, 
  Crop,
  Check,
  X 
} from "lucide-react";
import { toast } from "sonner";

interface CropRotateToolProps {
  image: string;
  editedImage: string | null;
  setEditedImage: (image: string | null) => void;
  isProcessing: boolean;
  setIsProcessing: (isProcessing: boolean) => void;
}

export function CropRotateTool({
  image,
  editedImage,
  setEditedImage,
  isProcessing,
  setIsProcessing,
}: CropRotateToolProps) {
  const [rotation, setRotation] = useState(0);
  const [isCropping, setIsCropping] = useState(false);
  const [cropArea, setCropArea] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const [startPoint, setStartPoint] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cropAreaRef = useRef<HTMLDivElement>(null);
  
  // Load the image to canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !editedImage) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    const img = new Image();
    img.onload = () => {
      // Adjust canvas size to match image
      canvas.width = img.width;
      canvas.height = img.height;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // If we have rotation, apply it
      if (rotation !== 0) {
        // Calculate dimensions for rotated image
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate((rotation * Math.PI) / 180);
        ctx.drawImage(img, -img.width / 2, -img.height / 2);
        ctx.restore();
      } else {
        // Draw image normally if no rotation
        ctx.drawImage(img, 0, 0);
      }
    };
    img.src = editedImage;
  }, [editedImage, rotation]);
  
  // Reset cropping mode when toggled off
  useEffect(() => {
    if (!isCropping) {
      setCropArea({ x: 0, y: 0, width: 0, height: 0 });
    }
  }, [isCropping]);
  
  const rotate = (degrees: number) => {
    setRotation((prev) => {
      const newRotation = (prev + degrees) % 360;
      return newRotation < 0 ? newRotation + 360 : newRotation;
    });
  };
  
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isCropping || !canvasRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setStartPoint({ x, y });
    setCropArea({ x, y, width: 0, height: 0 });
    setIsDragging(true);
  };
  
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging || !canvasRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const width = x - startPoint.x;
    const height = y - startPoint.y;
    
    setCropArea({
      x: width > 0 ? startPoint.x : x,
      y: height > 0 ? startPoint.y : y,
      width: Math.abs(width),
      height: Math.abs(height)
    });
  };
  
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  
  const applyCrop = () => {
    if (!canvasRef.current || cropArea.width === 0 || cropArea.height === 0) return;
    
    setIsProcessing(true);
    
    try {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      
      // Create temporary canvas for the cropped image
      const tempCanvas = document.createElement("canvas");
      tempCanvas.width = cropArea.width;
      tempCanvas.height = cropArea.height;
      const tempCtx = tempCanvas.getContext("2d");
      if (!tempCtx) return;
      
      // Copy the selected portion to the temp canvas
      tempCtx.drawImage(
        canvas,
        cropArea.x, cropArea.y, cropArea.width, cropArea.height,
        0, 0, cropArea.width, cropArea.height
      );
      
      // Update main canvas with the cropped image
      canvas.width = cropArea.width;
      canvas.height = cropArea.height;
      ctx.drawImage(tempCanvas, 0, 0);
      
      // Convert to data URL and update the edited image
      const dataUrl = canvas.toDataURL("image/png");
      setEditedImage(dataUrl);
      
      // Reset crop area and mode
      setCropArea({ x: 0, y: 0, width: 0, height: 0 });
      setIsCropping(false);
      
      toast.success("Image cropped successfully");
    } catch (error) {
      console.error("Error cropping image:", error);
      toast.error("Failed to crop image");
    } finally {
      setIsProcessing(false);
    }
  };
  
  const cancelCrop = () => {
    setIsCropping(false);
    setCropArea({ x: 0, y: 0, width: 0, height: 0 });
  };
  
  const applyRotation = () => {
    if (!canvasRef.current || !rotation) return;
    
    setIsProcessing(true);
    
    try {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      
      // Convert to data URL and update the edited image
      const dataUrl = canvas.toDataURL("image/png");
      setEditedImage(dataUrl);
      
      // Reset rotation since it's now applied
      setRotation(0);
      
      toast.success("Rotation applied successfully");
    } catch (error) {
      console.error("Error applying rotation:", error);
      toast.error("Failed to apply rotation");
    } finally {
      setIsProcessing(false);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="text-sm text-muted-foreground mb-2">
        Adjust the position and orientation of your image
      </div>
      
      <div className="relative border rounded-md overflow-hidden">
        <canvas
          ref={canvasRef}
          className="w-full h-auto"
          style={{ maxHeight: "300px", objectFit: "contain" }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        />
        
        {isCropping && cropArea.width > 0 && (
          <div
            ref={cropAreaRef}
            className="absolute border-2 border-primary"
            style={{
              left: cropArea.x,
              top: cropArea.y,
              width: cropArea.width,
              height: cropArea.height,
              pointerEvents: "none"
            }}
          />
        )}
        
        {isProcessing && (
          <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
            <RefreshCw className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}
      </div>
      
      <div className="space-y-4">
        {!isCropping ? (
          <>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="rotation">Rotation: {rotation}°</Label>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => rotate(-90)}
                    disabled={isProcessing}
                  >
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => rotate(90)}
                    disabled={isProcessing}
                  >
                    <RotateCw className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <Slider
                id="rotation"
                min={0}
                max={359}
                step={1}
                value={[rotation]}
                onValueChange={(value: number[]) => setRotation(value[0])}
                disabled={isProcessing}
              />
            </div>
            
            <div className="flex justify-between mt-4">
              <Button
                variant="outline"
                onClick={() => setIsCropping(true)}
                disabled={isProcessing}
              >
                <Crop className="mr-2 h-4 w-4" /> Crop Image
              </Button>
              
              {rotation !== 0 && (
                <Button
                  onClick={applyRotation}
                  disabled={isProcessing}
                >
                  Apply Rotation
                </Button>
              )}
            </div>
          </>
        ) : (
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={cancelCrop}
              disabled={isProcessing}
            >
              <X className="mr-2 h-4 w-4" /> Cancel
            </Button>
            
            <Button
              onClick={applyCrop}
              disabled={isProcessing || cropArea.width === 0}
            >
              <Check className="mr-2 h-4 w-4" /> Apply Crop
            </Button>
          </div>
        )}
      </div>
      
      <div className="text-xs text-muted-foreground">
        Tip: For cropping, click and drag on the image to select the area you want to keep.
      </div>
    </div>
  );
} 