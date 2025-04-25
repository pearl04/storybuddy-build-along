
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Play } from "lucide-react";

interface StoryFormProps {
  onSubmit: (data: {
    childName: string;
    childAge: string;
    storyTheme: string;
  }) => void;
}

const StoryForm = ({ onSubmit }: StoryFormProps) => {
  const [childName, setChildName] = useState("");
  const [childAge, setChildAge] = useState("");
  const [storyTheme, setStoryTheme] = useState("");
  const [currentStep, setCurrentStep] = useState(0);

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

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onSubmit({ childName, childAge, storyTheme });
    }
  };

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

  return (
    <Card className="w-full max-w-md p-6 bg-gradient-to-br from-white via-white/95 to-storybuddy-yellow/20 backdrop-blur-sm shadow-xl rounded-2xl border-2 border-storybuddy-purple">
      <h2 className="text-2xl font-semibold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-storybuddy-purple to-storybuddy-pink">
        {steps[currentStep].title}
      </h2>
      <div className="mb-6">
        {steps[currentStep].component}
      </div>
      <Button 
        onClick={handleNext}
        disabled={!isStepValid()}
        className="w-full bg-gradient-to-r from-storybuddy-purple to-storybuddy-pink hover:opacity-90 transition-all duration-300"
      >
        {currentStep === steps.length - 1 ? (
          <div className="flex items-center gap-2">
            <Play className="w-4 h-4" />
            <span>Generate Story</span>
          </div>
        ) : (
          "Next"
        )}
      </Button>
    </Card>
  );
};

export default StoryForm;
