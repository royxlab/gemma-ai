"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { applyAiFilter } from "@/lib/gemini";
import { toast } from "sonner";

interface AiFiltersProps {
  image: string;
  editedImage: string | null;
  setEditedImage: (image: string | null) => void;
  isProcessing: boolean;
  setIsProcessing: (isProcessing: boolean) => void;
}

type FilterType = "daytime" | "night" | "autumn" | "winter" | "summer" | "vintage" | "noir" | "hdr" | "infrastructure-aging";

interface FilterOption {
  id: FilterType;
  name: string;
  description: string;
}

export function AiFilters({
  image,
  editedImage,
  setEditedImage,
  isProcessing,
  setIsProcessing,
}: AiFiltersProps) {
  const [selectedFilter, setSelectedFilter] = useState<FilterType | null>(null);

  const filterOptions: FilterOption[] = [
    { id: "daytime", name: "Daylight", description: "Bright, clear daylight effect" },
    { id: "night", name: "Night", description: "Night time ambiance" },
    { id: "autumn", name: "Autumn", description: "Warm autumn colors" },
    { id: "winter", name: "Winter", description: "Cold winter atmosphere" },
    { id: "summer", name: "Summer", description: "Vibrant summer feel" },
    { id: "vintage", name: "Vintage", description: "Classic retro film look" },
    { id: "noir", name: "Film Noir", description: "High contrast black & white" },
    { id: "hdr", name: "HDR", description: "Enhanced dynamic range" },
    { id: "infrastructure-aging", name: "Infrastructure Aging", description: "Simulates aging and weathering of infrastructure" },
  ];

  const applyFilter = async (filterId: FilterType) => {
    if (isProcessing) return;
    
    setSelectedFilter(filterId);
    setIsProcessing(true);
    
    try {
      // Using the Gemini API to apply the filter
      const processedImage = await applyAiFilter(image, filterId);
      setEditedImage(processedImage);
      
      toast.success(`The ${filterId} filter has been applied to your image.`, {
        description: "Your image has been transformed using Gemini AI."
      });
    } catch (error) {
      console.error("Error applying filter:", error);
      toast.error("Failed to apply filter", {
        description: "Please try again or choose a different filter."
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-sm text-muted-foreground mb-2">
        Select a filter to apply AI-generated effects to your image
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        {filterOptions.map((filter) => (
          <Card 
            key={filter.id}
            className={`cursor-pointer transition-all overflow-hidden ${
              selectedFilter === filter.id 
                ? "ring-2 ring-primary" 
                : "hover:bg-accent"
            }`}
            onClick={() => applyFilter(filter.id)}
          >
            <CardContent className="p-3">
              <div className="font-medium">{filter.name}</div>
              <div className="text-xs text-muted-foreground">{filter.description}</div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {isProcessing && (
        <div className="flex items-center justify-center py-2">
          <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> 
          <span>Applying filter with Gemini AI...</span>
        </div>
      )}
      
      <div className="text-xs text-muted-foreground mt-2">
        Powered by Google's Gemini Flash AI for sophisticated and realistic effects.
      </div>
    </div>
  );
} 