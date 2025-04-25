
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, BookOpen } from "lucide-react";

interface StoryDisplayProps {
  story: string;
  onRegenerate: () => void;
}

const StoryDisplay = ({ story, onRegenerate }: StoryDisplayProps) => {
  const [isReading, setIsReading] = useState(false);

  if (isReading) {
    return (
      <Card className="w-full max-w-2xl p-8 bg-white/90 backdrop-blur-sm shadow-xl rounded-3xl border-2 border-storybuddy-purple">
        <div className="prose max-w-none">
          <div className="text-xl leading-relaxed text-gray-800 whitespace-pre-wrap font-story space-y-6">
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
    <Card className="w-full max-w-2xl p-6 bg-gradient-to-br from-storybuddy-yellow via-white to-storybuddy-pink backdrop-blur-sm shadow-xl rounded-2xl border-2 border-storybuddy-purple">
      <div className="prose max-w-none mb-6">
        <div className="text-lg leading-relaxed text-gray-800 whitespace-pre-wrap">
          {story}
        </div>
      </div>
      <div className="flex gap-4">
        <Button 
          onClick={onRegenerate}
          className="flex-1 bg-gradient-to-r from-storybuddy-purple to-storybuddy-pink hover:opacity-90 transition-all duration-300"
        >
          <div className="flex items-center gap-2">
            <Play className="w-4 h-4" />
            <span>Regenerate Story</span>
          </div>
        </Button>
        <Button 
          onClick={() => setIsReading(true)}
          className="flex-1 bg-gradient-to-r from-storybuddy-blue to-storybuddy-purple hover:opacity-90 transition-all duration-300"
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
