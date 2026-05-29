"use client";

import { useEffect, useRef, useState } from "react";
import { MotionValue, useMotionValueEvent } from "framer-motion";

interface RevueltoScrollCanvasProps {
  scrollYProgress: MotionValue<number>;
  totalFrames: number;
  imageFolderPath: string;
}

export default function RevueltoScrollCanvas({
  scrollYProgress,
  totalFrames,
  imageFolderPath,
}: RevueltoScrollCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(0);

  const startThreshold = Math.min(12, totalFrames);

  // 1. Preload all images
  useEffect(() => {
    let loadedCount = 0;
    const imgArray: HTMLImageElement[] = [];
    const isProd = process.env.NODE_ENV === 'production';
    const basePath = isProd ? '/lamborghini-revuelto' : '';

    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      img.src = `${basePath}${imageFolderPath}/${i}.jpg`;
      img.onload = () => {
        loadedCount++;
        setImagesLoaded(loadedCount);
      };
      imgArray.push(img);
    }
    setImages(imgArray);
  }, [totalFrames, imageFolderPath]);

  // 2. Setup High-DPI Canvas & Draw Logic
  const renderFrame = (frameIndex: number) => {
    if (!canvasRef.current || images.length === 0) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let img = images[frameIndex];
    if (!img || !img.complete) {
      // Find the closest loaded frame to prevent blank canvas or flashing
      let closestIndex = -1;
      let minDiff = Infinity;
      for (let j = 0; j < images.length; j++) {
        if (images[j] && images[j].complete) {
          const diff = Math.abs(j - frameIndex);
          if (diff < minDiff) {
            minDiff = diff;
            closestIndex = j;
          }
        }
      }
      if (closestIndex !== -1) {
        img = images[closestIndex];
      } else {
        return; // No images loaded at all yet
      }
    }

    // Handle High-DPI (Retina) Displays
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    // Set actual size in memory (scaled to account for extra pixel density)
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    // Normalize coordinate system to use css pixels
    ctx.scale(dpr, dpr);

    // Clear previous frame
    ctx.clearRect(0, 0, rect.width, rect.height);

    // Object-fit: cover logic to fill the canvas and center the image
    const imgRatio = img.width / img.height;
    const canvasRatio = rect.width / rect.height;

    let drawWidth, drawHeight, offsetX, offsetY;

    if (canvasRatio < 1) {
      // Mobile portrait layout (9:16 ratio)
      // Limit zoom-in by making the car span a custom width multiplier and center vertically
      drawWidth = rect.width * 1.65;
      drawHeight = drawWidth / imgRatio;
      offsetX = (rect.width - drawWidth) / 2;
      offsetY = (rect.height - drawHeight) / 2;
    } else if (canvasRatio > imgRatio) {
      // Canvas is wider than image (cover width, crop height)
      drawWidth = rect.width;
      drawHeight = rect.width / imgRatio;
      offsetX = 0;
      offsetY = (rect.height - drawHeight) / 2;
    } else {
      // Canvas is taller than image (cover height, crop width)
      drawHeight = rect.height;
      drawWidth = rect.height * imgRatio;
      offsetX = (rect.width - drawWidth) / 2;
      offsetY = 0;
    }

    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  // 3. React to Scroll
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Map progress (0-1) to frame index (0 to totalFrames - 1)
    const frameIndex = Math.min(
      totalFrames - 1,
      Math.floor(latest * totalFrames)
    );
    requestAnimationFrame(() => renderFrame(frameIndex));
  });

  // 4. Initial Render & Resize handling
  useEffect(() => {
    if (imagesLoaded > 0) {
      renderFrame(0);
    }

    const handleResize = () => {
      // Get current frame from scroll progress
      const frameIndex = Math.min(
        totalFrames - 1,
        Math.floor(scrollYProgress.get() * totalFrames)
      );
      renderFrame(frameIndex);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [imagesLoaded]); // Re-run when images load

  return (
    <div className="absolute inset-0 w-full h-full bg-black z-0">
      {/* Loading Overlay */}
      {imagesLoaded < startThreshold && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#1a1a1a]">
          <div className="font-heading text-[#D4AF37] tracking-[0.3em] mb-4 text-sm pulse-ring">
            INITIALIZING EXPERIENCE
          </div>
          <div className="w-64 h-1 bg-white/10 relative overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-[#D4AF37] transition-all duration-100 ease-linear"
              style={{ width: `${(imagesLoaded / startThreshold) * 100}%` }}
            ></div>
          </div>
          <div className="font-mono text-white/50 text-xs mt-2">
            {Math.min(100, Math.round((imagesLoaded / startThreshold) * 100))}%
          </div>
        </div>
      )}

      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover"
        style={{ display: imagesLoaded > 0 ? "block" : "none" }}
      />
    </div>
  );
}
