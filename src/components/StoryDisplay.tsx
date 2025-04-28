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

  const handleDownload = async () => {
    if (exportRef.current) {
      try {
        const dataUrl = await domtoimage.toPng(exportRef.current);
        const link = document.createElement("a");
        link.download = "storybuddy-story.png";
        link.href = dataUrl;
        link.click();
      } catch (error) {
        console.error("Error exporting image:", error);
      }
    }
  };

  return (
    <>
      {/* Visible Card */}
      <Card className="w-full max-w-2xl p-8 bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 backdrop-blur-sm shadow-xl rounded-3xl border-2 border-white/30 relative overflow-hidden">
        <div className="prose max-w-none font-poppins">
          <div className="text-lg leading-relaxed whitespace-pre-wrap space-y-4 text-gray-700">
            {story.split("\n\n").map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>

        <div className="flex gap-4 mt-6">
          <Button
            onClick={onRegenerate}
            className="flex-1 bg-gradient-to-r from-purple-500 to-green-400 text-white hover:opacity-90"
          >
            <Play className="w-4 h-4 mr-2" />
            Regenerate Story
          </Button>
          <Button
            onClick={handleDownload}
            className="flex-1 bg-gradient-to-r from-blue-400 to-green-400 text-white hover:opacity-90"
          >
            <Download className="w-4 h-4 mr-2" />
            Download as Image
          </Button>
        </div>
      </Card>

      {/* Hidden Div for clean download */}
      <div
        ref={exportRef}
        className="fixed top-[-9999px] left-[-9999px] w-[600px] p-8 rounded-3xl text-gray-700 font-poppins text-lg leading-relaxed whitespace-pre-wrap"
        style={{
          backgroundImage: "linear-gradient(135deg, #ffe4e6, #e0c3fc, #c2e9fb)",
          backgroundSize: "cover",
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h1 className="text-2xl font-bold text-purple-600 mb-6 text-center">✨ Your Magical Story ✨</h1>
        <div>{story}</div>
      </div>
    </>
  );
};

export default StoryDisplay;
