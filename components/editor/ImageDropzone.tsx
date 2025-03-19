"use client";

import { useState, useCallback } from "react";
import { Upload, ImagePlus } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageDropzoneProps {
  onImageUpload: (imageDataUrl: string) => void;
}

export function ImageDropzone({ onImageUpload }: ImageDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);
      setError(null);
      
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        const file = e.dataTransfer.files[0];
        processFile(file);
      }
    },
    [onImageUpload]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setError(null);
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        processFile(file);
      }
    },
    [onImageUpload]
  );

  const processFile = (file: File) => {
    if (!file.type.match(/image\/(jpeg|jpg|png|webp|gif)/)) {
      setError("Please upload a valid image file (JPEG, PNG, WEBP, GIF)");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target && typeof event.target.result === "string") {
        onImageUpload(event.target.result);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg transition-colors",
        isDragging
          ? "border-primary bg-primary/5"
          : "border-muted-foreground/25 hover:border-primary/50",
        error ? "border-destructive bg-destructive/5" : ""
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-4">
        {error ? (
          <>
            <div className="text-destructive mb-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <p className="text-sm text-destructive font-medium">{error}</p>
          </>
        ) : (
          <>
            <div className="text-primary/60 mb-2">
              <ImagePlus className="h-8 w-8" />
            </div>
            <p className="mb-2 text-sm text-muted-foreground">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-muted-foreground/70">
              JPEG, PNG, WEBP or GIF (max. 10MB)
            </p>
          </>
        )}
      </div>
      <input
        id="dropzone-file"
        type="file"
        className="hidden"
        accept="image/jpeg,image/png,image/webp,image/gif"
        onChange={handleFileInput}
      />
      <label
        htmlFor="dropzone-file"
        className="w-full h-full absolute top-0 left-0 cursor-pointer"
      ></label>
    </div>
  );
} 