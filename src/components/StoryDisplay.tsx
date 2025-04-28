// src/components/StoryDisplay.tsx

import React, { useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Download } from "lucide-react";
import html2canvas from "html2canvas";
import domtoimage from "dom-to-image-more";

interface StoryDisplayProps {
  story: string;
  onRegenerate: () => void;
}

const StoryDisplay = ({ story, onRegenerate }: StoryDisplayProps) => {
  const captureRef = useRef<HTMLDivElement>(null);

  const downloadAsImage = async () => {
    if (captureRef.current) {
      const dataUrl = await domtoimage.toPng(captureRef.current);
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = "storybuddy-story.png";
      link.click();
    }
  };

  if (!story) {
    return (
      <Card className="w-full max-w-xl p-6 text-center text-gray-600">
        <p>📖 No story to show yet. Let’s generate a magical tale!</p>
      </Card>
    );
  }

  return (
    <div className="flex flex-col items-center gap-6">
      {/* This is the magical area we will screenshot */}
      <div
        ref={captureRef}
        className="w-full max-w-2xl p-8 bg-gradient-to-br from-[#FF7F50]/30 via-[#FF69B4]/30 to-[#4169E1]/30 backdrop-blur-md shadow-2xl rounded-3xl border-2 border-white/40 text-gray-800 font-poppins"
      >
        <div className="prose max-w-none text-lg leading-relaxed whitespace-pre-wrap">
          {story}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-4 w-full max-w-2xl">
        <Button
          onClick={onRegenerate}
          className="flex-1 bg-gradient-to-r from-[#8A2BE2] to-[#3CB371] text-white hover:opacity-90 transition-all duration-300"
        >
          <div className="flex items-center gap-2">
            <Play className="w-4 h-4" />
            <span>Regenerate Story</span>
          </div>
        </Button>
        <Button
          onClick={downloadAsImage}
          className="flex-1 bg-gradient-to-r from-[#00C9FF] to-[#92FE9D] text-white hover:opacity-90 transition-all duration-300"
        >
          <div className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            <span>Download as Image</span>
          </div>
        </Button>
      </div>
    </div>
  );
};

export default StoryDisplay;
