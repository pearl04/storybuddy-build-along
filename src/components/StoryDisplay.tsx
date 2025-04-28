import React, { useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Download, Star } from "lucide-react";
import { toPng } from 'html-to-image';

interface StoryDisplayProps {
  story: string;
  onRegenerate: () => void;
}

const StoryDisplay = ({ story, onRegenerate }: StoryDisplayProps) => {
  const [isReading, setIsReading] = useState(false);
  const storyRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (storyRef.current === null) return;

    try {
      const dataUrl = await toPng(storyRef.current, { quality: 1, pixelRatio: 2 });
      const link = document.createElement('a');
      link.download = 'storybuddy-story.png';
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Failed to download image', err);
    }
  };

  return (
    <Card className="w-full max-w-2xl p-6 bg-gradient-to-br from-storybuddy-cream via-storybuddy-pink to-storybuddy-peach backdrop-blur-sm shadow-xl rounded-3xl border-2 border-white/30">
      <div ref={storyRef} className="prose max-w-none mb-6 p-6 bg-white/70 rounded-2xl">
        <div className="text-lg leading-relaxed text-gray-700 whitespace-pre-wrap font-poppins">
          {story}
        </div>
      </div>
      <div className="flex gap-4 mt-4">
        <Button
          onClick={onRegenerate}
          className="flex-1 bg-gradient-to-r from-storybuddy-lavender to-storybuddy-blue text-white hover:opacity-90 transition-all duration-300"
        >
          <div className="flex items-center gap-2">
            <Play className="w-4 h-4" />
            <span>Regenerate Story</span>
          </div>
        </Button>
        <Button
          onClick={handleDownload}
          className="flex-1 bg-gradient-to-r from-green-400 to-blue-500 text-white hover:opacity-90 transition-all duration-300"
        >
          <div className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            <span>Download as Image</span>
          </div>
        </Button>
      </div>
    </Card>
  );
};

export default StoryDisplay;
