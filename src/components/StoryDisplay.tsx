
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, BookOpen, Star, Sparkles } from "lucide-react";

interface StoryDisplayProps {
  story: string;
  onRegenerate: () => void;
}

const StoryDisplay = ({ story, onRegenerate }: StoryDisplayProps) => {
  const [isReading, setIsReading] = useState(false);

  if (isReading) {
    return (
      <Card className="w-full max-w-2xl p-8 bg-gradient-to-br from-[#FF69B4] via-[#4169E1] to-[#8A2BE2] text-white backdrop-blur-sm shadow-xl rounded-3xl border-2 border-white/30">
        <div className="prose max-w-none">
          <div className="text-xl leading-relaxed whitespace-pre-wrap font-story space-y-6">
            {story.split('\n\n').map((paragraph, index) => (
              <p key={index} className="animate-fade-in text-white" style={{ animationDelay: `${index * 200}ms` }}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl p-6 bg-gradient-to-br from-[#FF7F50] via-[#FF69B4] to-[#4169E1] backdrop-blur-sm shadow-xl rounded-2xl border-2 border-white/30">
      <div className="prose max-w-none mb-6">
        <div className="text-lg leading-relaxed text-white whitespace-pre-wrap">
          {story}
        </div>
      </div>
      <div className="flex gap-4">
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
          onClick={() => setIsReading(true)}
          className="flex-1 bg-gradient-to-r from-[#4169E1] to-[#FF69B4] text-white hover:opacity-90 transition-all duration-300"
        >
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            <span>Sounds Good!</span>
          </div>
        </Button>
      </div>
    </Card>
  );
};

export default StoryDisplay;
