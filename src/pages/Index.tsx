
import { useState } from "react";
import StoryForm from "@/components/StoryForm";
import StoryDisplay from "@/components/StoryDisplay";
import { Card } from "@/components/ui/card";
import { Loader } from "lucide-react";

const Index = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedStory, setGeneratedStory] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFormSubmit = async (data: {
    childName: string;
    childAge: string;
    storyTheme: string;
  }) => {
    setIsGenerating(true);
    setError(null);

    try {
      // This is where you'll plug in your AI logic later
      // For now, we'll simulate a delay and return a placeholder story
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setGeneratedStory(`Once upon a time, there was a ${data.childAge} year old child named ${data.childName} who loved ${data.storyTheme} stories...`);
    } catch (err) {
      setError("Oops! Something went wrong. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FF69B4] via-[#4169E1] to-[#8A2BE2] animate-gradient bg-size-200">
      <div className="container mx-auto px-4 py-8 md:py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 text-white drop-shadow-xl animate-float">
          StoryBuddy
        </h1>
        <div className="flex flex-col items-center justify-center gap-8">
          {isGenerating ? (
            <Card className="w-full max-w-md p-6 bg-white/20 backdrop-blur-sm shadow-xl rounded-2xl border-2 border-white/30">
              <div className="flex flex-col items-center gap-4">
                <Loader className="w-8 h-8 animate-spin text-white" />
                <p className="text-lg font-medium text-white">
                  Creating your magical story...
                </p>
              </div>
            </Card>
          ) : error ? (
            <Card className="w-full max-w-md p-6 bg-red-500/20 backdrop-blur-sm shadow-xl rounded-2xl border-2 border-red-300">
              <div className="flex flex-col items-center gap-4">
                <p className="text-red-100">{error}</p>
                <button
                  onClick={() => setError(null)}
                  className="text-white hover:underline"
                >
                  Try Again
                </button>
              </div>
            </Card>
          ) : generatedStory ? (
            <StoryDisplay
              story={generatedStory}
              onRegenerate={() => handleFormSubmit({ childName: "Test", childAge: "5", storyTheme: "adventure" })}
            />
          ) : (
            <StoryForm onSubmit={handleFormSubmit} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;

