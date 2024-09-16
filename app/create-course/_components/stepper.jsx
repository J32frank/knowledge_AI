'use client';

import React, { useState, useEffect, useCallback, useMemo, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Circle } from "lucide-react";
import dynamic from "next/dynamic"; // For lazy loading components
import { v4 as uuidv4 } from "uuid";
import { db } from "@/app/db/db";
import { getSelectedValue } from "./storage"; // Corrected import
import { handleGenerate_AI } from "@/config/AiMobel";
import { courseData } from "@/app/db/schema";

// Lazy load heavy components
const LearningGoal = dynamic(() => import('./learningGoal'), { suspense: true });
const Levels = dynamic(() => import('./levels'), { suspense: true });
const Category = dynamic(() => import('./category'), { suspense: true });
const Generate = dynamic(() => import('./generate'), { suspense: true });
const CurrentActivities = dynamic(() => import('./currerntActiveties'), { suspense: true });

// Define the steps
const steps = [
  "Current Activities",
  "Learning Goal",
  "Category",
  "Levels",
  "Generate",
];

export default function EnhancedStepper() {
  const router = useRouter();
  const [state, setState] = useState({
    currentStep: 0,
    inputField: "",
    textArea: "",
    loading: false,
    numberOfChapters: 0,
    typeSelect: "",
    courseGoal: "",
    selectedValue: "",
    selectedCard: null,
    selectedCategory: null,
    errorMessage: '',
    loadingMessage: '',
  });

  // Load initial selected value on mount
  useEffect(() => {
    const storedValue = getSelectedValue(); // Corrected the function name
    if (storedValue) {
      setState(prev => ({ ...prev, selectedValue: storedValue }));
    }
  }, []);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setState(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleContinue = useCallback(() => {
    setState(prev => {
      // Validation logic based on the step
      if (prev.currentStep === 1 && prev.inputField.trim() === "") {
        return { ...prev, errorMessage: "Please enter a topic before continuing." };
      }
      if (prev.currentStep === 2 && prev.typeSelect === "" && prev.courseGoal === "") {
        return { ...prev, errorMessage: "Please select at least one theme before continuing." };
      }
      if (prev.currentStep === 3 && prev.selectedCard === null) {
        return { ...prev, errorMessage: "Please select a level before continuing." };
      }
      if (prev.currentStep < steps.length - 1) {
        return { ...prev, currentStep: prev.currentStep + 1, errorMessage: '' };
      }
      return prev;
    });
  }, []);

  // Generate course with AI (this can take time, so it's crucial to show loading indicators)
  const handleGenerate = useCallback(async () => {
    setState(prev => ({
      ...prev,
      errorMessage: '',
      loading: true,
      loadingMessage: 'Generating course content...',
    }));

    try {
      const promptUser = `Generate course tutorial with about of each chapter and a time allocated and with books to read based on the following details in Json:
        Current Activities:${state.selectedValue}
        Topic: ${state.inputField}
        Descriptions:${state.textArea} 
        Number Of chapter: ${state.numberOfChapters}
        course Goal: ${state.courseGoal}
        Difficult Levels: ${state.selectedCard}`;

      console.log("Sending prompt to AI:", promptUser);

      const result = await handleGenerate_AI.sendMessage(promptUser);

      if (!result || !result.response) {
        throw new Error("No response received from AI");
      }

      const responseText = await result.response.text();
      let parsedResult = JSON.parse(responseText);

      if (!parsedResult || typeof parsedResult !== "object") {
        throw new Error("Invalid data structure in AI response");
      }

      setState(prev => ({ ...prev, loadingMessage: 'Saving course data...' }));
      await pushToBackend(parsedResult);
    } catch (error) {
      console.error("Error in handleGenerate:", error);
      setState(prev => ({
        ...prev,
        errorMessage: error.message || 'An unexpected error occurred.',
        loading: false,
        loadingMessage: '',
      }));
    }
  }, [state]);

  // Push data to the backend and handle routing with shallow routing
  const pushToBackend = useCallback(async (data) => {
    const id = uuidv4();

    try {
      const insertData = {
        courseId: id,
        courseTitle: data.course_name || state.inputField,
        courseDescription: data.description || state.textArea,
        numberOfChapters: state.numberOfChapters,
        currentActivities: state.selectedValue,
        levels: data.level || state.selectedCard,
        courseLayout: JSON.stringify(data.lessons || []),
      };

      await db.insert(courseData).values(insertData);

      // Shallow routing to prevent full page reload
      router.push(`/create-course/${id}`, undefined, { shallow: true });
    } catch (error) {
      console.error("Error inserting course data:", error);
      setState(prev => ({
        ...prev,
        errorMessage: "Failed to save the course data. Please try again.",
        loading: false,
        loadingMessage: '',
      }));
    }
  }, [state, router]);

  const handleBack = useCallback(() => {
    setState(prev => prev.currentStep > 0 ? { ...prev, currentStep: prev.currentStep - 1 } : prev);
  }, []);

  const handleCategorySelect = useCallback((category) => {
    setState(prev => ({ ...prev, selectedCategory: category }));
  }, []);

  const handleLevelSelect = useCallback((level) => {
    setState(prev => ({ ...prev, selectedCard: level }));
  }, []);

  // Render step based on current state
  const renderStep = useMemo(() => {
    switch (state.currentStep) {
      case 0:
        return <CurrentActivities initialValue={state.selectedValue} />;
      case 1:
        return (
          <LearningGoal
            inputField={state.inputField}
            textArea={state.textArea}
            handleChange={handleChange}
          />
        );
      case 2:
        return (
          <Category
            setTypeSelect={(value) => setState(prev => ({ ...prev, typeSelect: value }))}
            setCourseGoal={(value) => setState(prev => ({ ...prev, courseGoal: value }))}
            numberOfChapters={state.numberOfChapters}
            setNumberOfChapters={(value) => setState(prev => ({ ...prev, numberOfChapters: value }))}
          />
        );
      case 3:
        return (
          <Levels
            onCategorySelect={handleCategorySelect}
            onLevelSelect={handleLevelSelect}
          />
        );
      case 4:
        return <Generate />;
      default:
        return null;
    }
  }, [state, handleChange, handleCategorySelect, handleLevelSelect]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl shadow-xl">
        <CardContent className="p-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Knowledge Growth</h2>
            <p className="text-gray-600 mt-2">Follow these steps to create your course</p>
          </div>

          {/* Error or loading messages */}
          {state.errorMessage && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6"
              role="alert"
            >
              <p>{state.errorMessage}</p>
            </motion.div>
          )}

          {state.loading && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-6"
              role="alert"
            >
              <p>{state.loadingMessage}</p>
            </motion.div>
          )}

          {/* Step Progress */}
          <div className="mb-8">
            <Progress value={(state.currentStep / (steps.length - 1)) * 100} className="h-2" />
          </div>

          {/* Stepper Navigation */}
          <div className="flex justify-between mb-8">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  index <= state.currentStep ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-600'
                }`}>
                  {index < state.currentStep ? (
                    <CheckCircle className="w-6 h-6" />
                  ) : (
                    <Circle className="w-6 h-6" />
                  )}
                </div>
                <span className={`mt-2 text-sm ${
                  index <= state.currentStep ? 'text-blue-600 font-medium' : 'text-gray-500'
                }`}>
                  {step}
                </span>
              </div>
            ))}
          </div>

          {/* Render Current Step */}
          <AnimatePresence mode="wait">
            <motion.div
              key={state.currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Suspense fallback={<div>Loading step...</div>}>
                {renderStep}
              </Suspense>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={state.currentStep === 0 || state.loading}
              className="px-6 py-2"
            >
              Back
            </Button>
            <Button
              onClick={state.currentStep === steps.length - 1 ? handleGenerate : handleContinue}
              disabled={state.loading}
              className="px-6 py-2 bg-blue-500 text-white hover:bg-blue-600 transition-colors"
            >
              {state.loading ? 'Processing...' : state.currentStep === steps.length - 1 ? 'Generate' : 'Continue'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
