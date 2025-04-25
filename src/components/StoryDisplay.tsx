
import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { play } from "lucide-react";

interface StoryDisplayProps {
  story: string;
  onRegenerate: () => void;
}

const StoryDisplay = ({ story, onRegenerate }: StoryDisplayProps) => {
  return (
    <Card className="w-full max-w-2xl p-6 bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl border-2 border-storybuddy-blue">
      <div className="prose max-w-none mb-6">
        <div className="text-lg leading-relaxed text-gray-800 whitespace-pre-wrap">
          {story}
        </div>
      </div>
      <Button 
        onClick={onRegenerate}
        className="w-full bg-gradient-to-r from-storybuddy-blue to-storybuddy-purple hover:opacity-90 transition-all duration-300"
      >
        <div className="flex items-center gap-2">
          <play className="w-4 h-4" />
          <span>Generate New Story</span>
        </div>
      </Button>
    </Card>
  );
};

export default StoryDisplay;
