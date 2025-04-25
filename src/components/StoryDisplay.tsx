
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, BookOpen, Star, Sparkle } from "lucide-react";

interface StoryDisplayProps {
  story: string;
  onRegenerate: () => void;
}

const StoryDisplay = ({ story, onRegenerate }: StoryDisplayProps) => {
  const [isReading, setIsReading] = useState(false);

  if (isReading) {
    return (
      <Card className="w-full max-w-2xl p-8 bg-gradient-to-br from-[#FFE5E5] via-[#F0E6FF] to-[#E0F4FF] text-[#4A4A4A] backdrop-blur-sm shadow-xl rounded-3xl border-2 border-white/30 relative overflow-hidden">
        <Star className="absolute top-4 right-4 text-yellow-300/50 w-6 h-6 animate-pulse" />
        <Star className="absolute bottom-4 left-4 text-yellow-300/50 w-4 h-4 animate-pulse" style={{ animationDelay: "0.5s" }} />
        <div className="prose max-w-none">
          <div className="text-xl leading-relaxed whitespace-pre-wrap font-poppins space-y-6">
            {story.split('\n\n').map((paragraph, index) => (
              <p key={index} className="animate-fade-in" style={{ animationDelay: `${index * 200}ms` }}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl p-6 bg-gradient-to-br from-[#FFE5E5] via-[#F0E6FF] to-[#E0F4FF] backdrop-blur-sm shadow-xl rounded-3xl border-2 border-white/30">
      <div className="prose max-w-none mb-6">
        <div className="text-lg leading-relaxed text-[#4A4A4A] whitespace-pre-wrap font-poppins">
          {story}
        </div>
      </div>
      <div className="flex gap-4">
        <Button 
          onClick={onRegenerate}
          className="flex-1 bg-gradient-to-r from-[#9370DB] to-[#B19CD9] text-white hover:opacity-90 transition-all duration-300"
        >
          <div className="flex items-center gap-2">
            <Play className="w-4 h-4" />
            <span>Regenerate Story</span>
          </div>
        </Button>
        <Button 
          onClick={() => setIsReading(true)}
          className="flex-1 bg-gradient-to-r from-[#87CEEB] to-[#B19CD9] text-white hover:opacity-90 transition-all duration-300"
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
