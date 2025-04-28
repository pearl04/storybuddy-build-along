"use client";

import React, { useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Download } from "lucide-react";
import domtoimage from "dom-to-image-more";

interface StoryDisplayProps {
  story: string;
  onRegenerate: () => void;
}

const StoryDisplay = ({ story, onRegenerate }: StoryDisplayProps) => {
  const exportRef = useRef<HTMLDivElement>(null);

  const downloadAsImage = async () => {
    if (!exportRef.current) return;
    try {
      const dataUrl = await domtoimage.toPng(exportRef.current);
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = "storybuddy-story.png";
      link.click();
    } catch (error) {
      console.error("Download failed", error);
    }
  };

  return (
    <>
      {/* 🌟 Visible fancy version */}
      <Card className="w-full max-w-2xl p-8 bg-gradient-to-br from-storybuddy-cream via-storybuddy-pink to-storybuddy-peach backdrop-blur-md shadow-xl rounded-3xl border-2 border-white/30 relative overflow-hidden">
        <div className="prose max-w-none text-gray-700 font-poppins text-lg leading-relaxed whitespace-pre-wrap">
          {story}
        </div>
        <div className="flex gap-4 mt-6">
          <Button
            onClick={onRegenerate}
            className="flex-1 bg-gradient-to-r from-purple-400 to-blue-400 text-white hover:opacity-90 transition-all duration-300"
          >
            <div className="flex items-center gap-2">
              <Play className="w-4 h-4" />
              <span>Regenerate Story</span>
            </div>
          </Button>
          <Button
            onClick={downloadAsImage}
            className="flex-1 bg-gradient-to-r from-green-400 to-blue-400 text-white hover:opacity-90 transition-all duration-300"
          >
            <div className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              <span>Download as Image</span>
            </div>
          </Button>
        </div>
      </Card>

      {/* 🌸 Hidden clean version for download */}
      <div
        ref={exportRef}
        className="fixed top-[-9999px] left-[-9999px] w-[600px] p-8 bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 rounded-3xl text-gray-700 shadow-lg font-poppins text-lg leading-relaxed whitespace-pre-wrap"
      >
        <h1 className="text-2xl font-bold text-purple-600 mb-4 text-center">✨ Your Magical Story ✨</h1>
        <div>{story}</div>
      </div>
    </>
  );
};

export default StoryDisplay;
