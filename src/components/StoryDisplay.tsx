import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

interface StoryDisplayProps {
  story: string;
  onRegenerate: () => void;
}

const StoryDisplay = ({ story, onRegenerate }: StoryDisplayProps) => {
  return (
    <Card className="w-full max-w-2xl p-8 bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 backdrop-blur-sm shadow-xl rounded-3xl border-2 border-white/30 relative overflow-hidden">
      <div className="prose max-w-none font-poppins">
        <div className="text-lg leading-relaxed whitespace-pre-wrap space-y-4 text-gray-700">
          {story.split("\n\n").map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>

      {/* Single centered button */}
      <div className="flex justify-center mt-8">
        <Button
          onClick={onRegenerate}
          className="bg-gradient-to-r from-purple-500 to-green-400 text-white hover:opacity-90 px-6 py-3 rounded-full text-lg"
        >
          <Play className="w-5 h-5 mr-2" />
          Regenerate Story
        </Button>
      </div>
    </Card>
  );
};

export default StoryDisplay;
