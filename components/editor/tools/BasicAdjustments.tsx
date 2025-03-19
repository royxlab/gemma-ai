"use client";

import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RefreshCw } from "lucide-react";

interface BasicAdjustmentsProps {
  image: string;
  editedImage: string | null;
  setEditedImage: (image: string | null) => void;
  isProcessing: boolean;
  setIsProcessing: (isProcessing: boolean) => void;
}

interface AdjustmentValues {
  brightness: number;
  contrast: number;
  saturation: number;
  blur: number;
}

export function BasicAdjustments({
  image,
  editedImage,
  setEditedImage,
  isProcessing,
  setIsProcessing,
}: BasicAdjustmentsProps) {
  const [adjustments, setAdjustments] = useState<AdjustmentValues>({
    brightness: 100,
    contrast: 100,
    saturation: 100,
    blur: 0,
  });

  const handleSliderChange = (name: keyof AdjustmentValues, value: number[]) => {
    setAdjustments((prev) => ({
      ...prev,
      [name]: value[0],
    }));
  };

  const applyAdjustments = async () => {
    if (!image || isProcessing) return;

    setIsProcessing(true);

    try {
      // Create a canvas to manipulate the image
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      
      if (!ctx) {
        throw new Error("Failed to get canvas context");
      }

      // Load the image onto the canvas
      const img = new Image();
      img.src = image;
      
      await new Promise((resolve) => {
        img.onload = () => {
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);
          resolve(null);
        };
      });

      // Apply CSS filters using canvas filter property
      ctx.filter = `brightness(${adjustments.brightness}%) contrast(${adjustments.contrast}%) saturate(${adjustments.saturation}%) blur(${adjustments.blur / 10}px)`;
      ctx.drawImage(img, 0, 0);

      // Convert canvas to data URL
      const dataUrl = canvas.toDataURL("image/png");
      setEditedImage(dataUrl);
    } catch (error) {
      console.error("Error applying adjustments:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="brightness">Brightness</Label>
            <span className="text-xs text-muted-foreground">{adjustments.brightness}%</span>
          </div>
          <Slider
            id="brightness"
            min={0}
            max={200}
            step={1}
            value={[adjustments.brightness]}
            onValueChange={(value: number[]) => handleSliderChange("brightness", value)}
            disabled={isProcessing}
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="contrast">Contrast</Label>
            <span className="text-xs text-muted-foreground">{adjustments.contrast}%</span>
          </div>
          <Slider
            id="contrast"
            min={0}
            max={200}
            step={1}
            value={[adjustments.contrast]}
            onValueChange={(value: number[]) => handleSliderChange("contrast", value)}
            disabled={isProcessing}
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="saturation">Saturation</Label>
            <span className="text-xs text-muted-foreground">{adjustments.saturation}%</span>
          </div>
          <Slider
            id="saturation"
            min={0}
            max={200}
            step={1}
            value={[adjustments.saturation]}
            onValueChange={(value: number[]) => handleSliderChange("saturation", value)}
            disabled={isProcessing}
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="blur">Blur</Label>
            <span className="text-xs text-muted-foreground">{adjustments.blur / 10}px</span>
          </div>
          <Slider
            id="blur"
            min={0}
            max={100}
            step={1}
            value={[adjustments.blur]}
            onValueChange={(value: number[]) => handleSliderChange("blur", value)}
            disabled={isProcessing}
          />
        </div>
      </div>

      <Button
        className="w-full"
        onClick={applyAdjustments}
        disabled={isProcessing}
      >
        {isProcessing ? (
          <>
            <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> Processing...
          </>
        ) : (
          "Apply Adjustments"
        )}
      </Button>
    </div>
  );
} 