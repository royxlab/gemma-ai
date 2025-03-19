"use client";

import Image from "next/image";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface ImagePreviewProps {
  src: string;
  alt: string;
  className?: string;
}

export function ImagePreview({ src, alt, className = "" }: ImagePreviewProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={`relative aspect-square overflow-hidden rounded-md ${className}`}>
      {isLoading && (
        <Skeleton className="absolute inset-0 h-full w-full rounded-md" />
      )}
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-contain"
        onLoadingComplete={() => setIsLoading(false)}
      />
    </div>
  );
} 