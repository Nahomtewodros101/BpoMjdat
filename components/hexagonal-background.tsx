"use client";

import type React from "react";
import { cn } from "@/lib/utils";

interface HexagonalBackgroundProps
  extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "light" | "dark";
}

export function HexagonalBackground({
  variant = "dark",
  className,
  ...props
}: HexagonalBackgroundProps) {
  const hexColor =
    variant === "dark" ? "rgba(0, 255, 127, 0.1)" : "rgba(0, 255, 127, 0.05)"; // Subtle green tint

  return (
    <div
      className={cn(
        "absolute inset-0 overflow-hidden pointer-events-none z-0",
        className
      )}
      style={{
        backgroundImage: `
          linear-gradient(to right, ${hexColor} 1px, transparent 1px),
          linear-gradient(to bottom, ${hexColor} 1px, transparent 1px)
        `,
        backgroundSize: "20px 20px", // Adjust grid size
        maskImage: `
          radial-gradient(ellipse 80% 50% at 50% 0%, black 70%, transparent 100%),
          linear-gradient(to bottom, black 0%, transparent 100%)
        `, // Fade out towards bottom
        WebkitMaskImage: `
          radial-gradient(ellipse 80% 50% at 50% 0%, black 70%, transparent 100%),
          linear-gradient(to bottom, black 0%, transparent 100%)
        `,
        // For hexagonal pattern, we can use a more complex SVG or CSS pattern
        // This is a simplified grid, for true hexagons, a background SVG is better.
        // For a more complex hexagonal pattern, you'd use a base64 encoded SVG as background-image
        // Example: background-image: url("data:image/svg+xml,...");
      }}
      {...props}
    >
      {/* Example of a few static SVG hexagons for decoration */}
      <svg
        className="absolute top-1/4 left-1/4 w-24 h-24 opacity-20 animate-pulse"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M50 0L93.3013 25V75L50 100L6.69873 75V25L50 0Z"
          fill="currentColor"
          className="text-green-500"
        />
      </svg>
      <svg
        className="absolute bottom-1/3 right-1/3 w-32 h-32 opacity-15 animate-spin-slow"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M50 0L93.3013 25V75L50 100L6.69873 75V25L50 0Z"
          fill="currentColor"
          className="text-gray-700 dark:text-gray-300"
        />
      </svg>
      <svg
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 opacity-10 animate-float"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M50 0L93.3013 25V75L50 100L6.69873 75V25L50 0Z"
          fill="currentColor"
          className="text-green-600"
        />
      </svg>
      {/* Add more SVG elements as needed for "large amounts" */}
      <style jsx>{`
        @keyframes pulse {
          0%,
          100% {
            opacity: 0.2;
            transform: scale(1);
          }
          50% {
            opacity: 0.3;
            transform: scale(1.05);
          }
        }
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes float {
          0% {
            transform: translate(-50%, -50%) translateY(0px);
          }
          50% {
            transform: translate(-50%, -50%) translateY(-10px);
          }
          100% {
            transform: translate(-50%, -50%) translateY(0px);
          }
        }
        .animate-pulse {
          animation: pulse 4s infinite ease-in-out;
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        .animate-float {
          animation: float 6s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
}
