// src/components/StoryForm.tsx

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Play, Star, Sparkles } from "lucide-react";
import { callAIModel } from "@/utils/ai-utils/callModel";
import { useDeviceId } from "@/hooks/useDeviceId";

interface StoryFormProps {
  onStoryGenerated: (data: { childName: string; childAge: string; storyTheme: string; story?: string }) => void;
}

const StoryForm = ({ onStoryGenerated }: StoryFormProps) => {
  const deviceId = useDeviceId();
  const [childName, setChildName] = useState("");
  const [childAge, setChildAge] = useState("");
  const [storyTheme, setStoryTheme] = useState("");
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);

  const steps = [
    {
      title: "What's your child's name?",
      component: (
        <div className="space-y-4">
          <Label htmlFor="childName">Child's Name</Label>
          <Input
            id="childName"
            placeholder="Enter name"
            value={childName}
            onChange={(e) => setChildName(e.target.value)}
            className="w-full"
          />
        </div>
      ),
    },
    {
      title: "How old is your child?",
      component: (
        <div className="space-y-4">
          <Label htmlFor="childAge">Child's Age</Label>
          <Input
            id="childAge"
            type="number"
            placeholder="Enter age"
            value={childAge}
            onChange={(e) => setChildAge(e.target.value)}
            className="w-full"
            min="1"
            max="12"
          />
        </div>
      ),
    },
    {
      title: "Choose a story theme",
      component: (
        <div className="space-y-4">
          <Label htmlFor="storyTheme">Story Theme</Label>
          <Select onValueChange={setStoryTheme} value={storyTheme}>
            <SelectTrigger>
              <SelectValue placeholder="Select a theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="adventure">Adventure</SelectItem>
              <SelectItem value="fantasy">Fantasy</SelectItem>
              <SelectItem value="animals">Animals</SelectItem>
              <SelectItem value="space">Space</SelectItem>
              <SelectItem value="fairy-tale">Fairy Tale</SelectItem>
            </SelectContent>
          </Select>
        </div>
      ),
    },
  ];

  const isStepValid = () => {
    switch (currentStep) {
      case 0:
        return childName.trim().length > 0;
      case 1:
        return childAge !== "" && Number(childAge) >= 1 && Number(childAge) <= 12;
      case 2:
        return storyTheme !== "";
      default:
        return false;
    }
  };

  const handleNext = async () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setLoading(true);

      const prompt = `
Write a magical bedtime story for a ${childAge}-year-old child named ${childName}.
The theme is ${storyTheme}.
Make it 4–6 sentences long, comforting, and imaginative.
End with a soft line like: "And then they drifted off to sleep under the stars..."
`.trim();

      try {
        const storyResult = await callAIModel(deviceId, "StoryBuddy", prompt);
        setLoading(false);

        if (!storyResult) {
          console.error("AI Model returned nothing");
          onStoryGenerated({ childName, childAge, storyTheme });
        } else {
          onStoryGenerated({ childName, childAge, storyTheme, story: storyResult });
        }
      } catch (error) {
        console.error("Error during story generation:", error);
        setLoading(false);
        onStoryGenerated({ childName, childAge, storyTheme });
      }
    }
  };

  return (
    <Card className="w-full max-w-md p-6 bg-gradient-to-br from-[#FF7F50] via-[#FF69B4] to-[#4169E1] backdrop-blur-sm shadow-xl rounded-2xl border-2 border-white/30">
      <div className="flex items-center justify-center gap-2 mb-6">
        <Star className="w-5 h-5 text-yellow-300 animate-float" />
        <h2 className="text-2xl font-semibold text-center text-white drop-shadow-md font-nunito">
          {steps[currentStep].title}
        </h2>
        <Star className="w-5 h-5 text-yellow-300 animate-float" style={{ animationDelay: "0.5s" }} />
      </div>
      <div className="mb-6 space-y-4">
        {steps[currentStep].component}
      </div>
      <Button
        onClick={handleNext}
        disabled={!isStepValid() || loading}
        className="w-full bg-gradient-to-r from-[#8A2BE2] to-[#3CB371] text-white hover:opacity-90 transition-all duration-300 font-nunito"
      >
        {loading ? "✨ Generating..." : currentStep === steps.length - 1 ? (
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            <span>Generate Story</span>
            <Sparkles className="w-4 h-4" />
          </div>
        ) : (
          "Next"
        )}
      </Button>
    </Card>
  );
};

export default StoryForm;
