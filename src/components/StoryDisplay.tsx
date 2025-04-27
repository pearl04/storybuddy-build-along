import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, BookOpen, Star } from "lucide-react";

interface StoryDisplayProps {
  story: string;
  onRegenerate: () => void;
}

const StoryDisplay = ({ story, onRegenerate }: StoryDisplayProps) => {
  const [isReading, setIsReading] = useState(false);

  if (!story) {
    return (
      <Card className="w-full max-w-xl p-6 text-center text-gray-600">
        <p>📖 No story to show yet. Let’s generate a magical tale!</p>
      </Card>
    );
  }

  if (isReading) {
    return (
      <Card className="w-full max-w-2xl p-8 bg-gradient-to-br from-storybuddy-cream via-storybuddy-pink to-storybuddy-peach text-gray-700 backdrop-blur-sm shadow-xl rounded-3xl border-2 border-white/30 relative overflow-hidden">
        <Star className="absolute top-4 right-4 text-storybuddy-lavender/50 w-6 h-6 animate-pulse" />
        <Star className="absolute bottom-4 left-4 text-storybuddy-lavender/50 w-4 h-4 animate-pulse" style={{ animationDelay: "0.5s" }} />
        <div className="prose max-w-none font-poppins">
          <h3 className="text-2xl mb-4 font-bold text-purple-700">✨ Your Magical Story ✨</h3>
          <div className="text-lg leading-relaxed whitespace-pre-wrap space-y-4">
            {story.split("\n\n").map((paragraph, index) => (
              <p
                key={index}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl p-6 bg-gradient-to-br from-storybuddy-cream via-storybuddy-pink to-storybuddy-peach backdrop-blur-sm shadow-xl rounded-3xl border-2 border-white/30">
      <div className="prose max-w-none mb-6">
        <div className="text-lg leading-relaxed text-gray-700 whitespace-pre-wrap font-poppins">
          {story}
        </div>
      </div>
      <div className="flex gap-4">
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
          onClick={() => setIsReading(true)}
          className="flex-1 bg-gradient-to-r from-storybuddy-peach to-storybuddy-lavender text-white hover:opacity-90 transition-all duration-300"
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
