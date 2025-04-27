import { useState } from "react";
import StoryForm from "@/components/StoryForm";
import StoryDisplay from "@/components/StoryDisplay";
import { callAIModel } from "@/utils/ai-utils/callModel";
import { Card } from "@/components/ui/card";
import { Loader, Star, Moon, Cloud, Sparkle } from "lucide-react";

const Index = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedStory, setGeneratedStory] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleStoryGenerated = async (childName: string, childAge: string, storyTheme: string) => {
    setIsGenerating(true);
    setError(null);

    try {
      const prompt = `Write a creative and engaging children's bedtime story about "${storyTheme}", featuring a ${childAge} year old child named "${childName}". Make it magical but easy to understand for a child.`;

      const result = await callAIModel({
        prompt,
        deviceId: "storybuddy-device-1",
        app: "StoryBuddy",
      });

      if (!result || !result.success) {
        throw new Error(result?.error || "Something went wrong!");
      }

      setGeneratedStory(result.data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Oops! Something went wrong. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-storybuddy-cream via-storybuddy-pink to-storybuddy-peach animate-gradient bg-size-200 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Cloud className="absolute top-20 left-[10%] text-storybuddy-blue/40 w-16 h-16 animate-float" />
        <Cloud className="absolute top-40 right-[15%] text-storybuddy-blue/30 w-12 h-12 animate-float" style={{ animationDelay: "1s" }} />
        <Star className="absolute top-32 left-[25%] text-storybuddy-lavender/60 w-8 h-8 animate-pulse" />
        <Star className="absolute bottom-32 right-[20%] text-storybuddy-lavender/60 w-6 h-6 animate-pulse" style={{ animationDelay: "0.5s" }} />
        <Moon className="absolute top-24 right-[30%] text-storybuddy-blue/50 w-10 h-10 animate-float" style={{ animationDelay: "1.5s" }} />
        <Sparkle className="absolute bottom-40 left-[15%] text-storybuddy-peach/70 w-8 h-8 animate-pulse" style={{ animationDelay: "0.7s" }} />
      </div>

      <div className="container mx-auto px-4 py-8 md:py-16 relative">
        {/* Title */}
        <div className="flex flex-col items-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 text-storybuddy-lavender drop-shadow-lg animate-float font-poppins">
            StoryBuddy
          </h1>
          <p className="text-lg md:text-xl text-storybuddy-blue/80 font-nunito max-w-md mx-auto">
            Your magical companion for bedtime stories ✨
          </p>
        </div>

        {/* Main content */}
        <div className="flex flex-col items-center justify-center gap-8 relative">
          {isGenerating ? (
            <Card className="w-full max-w-md p-6 bg-storybuddy-pink/80 backdrop-blur-sm shadow-xl rounded-3xl border-2 border-storybuddy-peach/30">
              <div className="flex flex-col items-center gap-4">
                <Loader className="w-8 h-8 animate-spin text-storybuddy-lavender" />
                <p className="text-lg font-medium text-storybuddy-lavender font-poppins">
                  Creating your magical story...
                </p>
              </div>
            </Card>
          ) : error ? (
            <Card className="w-full max-w-md p-6 bg-red-50/90 backdrop-blur-sm shadow-xl rounded-3xl border-2 border-red-200/30">
              <div className="flex flex-col items-center gap-4">
                <p className="text-red-400 font-poppins">{error}</p>
                <button
                  onClick={() => setError(null)}
                  className="text-red-500 hover:underline font-poppins"
                >
                  Try Again
                </button>
              </div>
            </Card>
          ) : generatedStory ? (
            <StoryDisplay
              story={generatedStory}
              onRegenerate={() => setGeneratedStory(null)}
            />
          ) : (
            <Card className="w-full max-w-md p-6 bg-storybuddy-pink/80 backdrop-blur-sm shadow-xl rounded-3xl border-2 border-storybuddy-peach/30">
              <StoryForm onStoryGenerated={({ childName, childAge, storyTheme }) => handleStoryGenerated(childName, childAge, storyTheme)} />
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
