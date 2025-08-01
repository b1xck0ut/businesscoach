
import React, { useState, useCallback } from 'react';
import type { Analysis } from './types';
import { getBusinessAnalysis } from './services/geminiService';
import IdeaInputForm from './components/IdeaInputForm';
import AnalysisDisplay from './components/AnalysisDisplay';
import Loader from './components/Loader';
import { SparklesIcon } from './components/icons/SparklesIcon';

const App: React.FC = () => {
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyzeIdea = useCallback(async (idea: string) => {
    if (!idea.trim()) {
      setError('Please enter a business idea.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setAnalysis(null);

    try {
      const result = await getBusinessAnalysis(idea);
      setAnalysis(result);
    } catch (e) {
      console.error(e);
      setError('An error occurred while analyzing your idea. Please check the console and try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-2">
            <SparklesIcon className="w-10 h-10 text-cyan-400" />
            <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              AI Business Coach & Analyst
            </h1>
          </div>
          <p className="text-lg text-gray-400">
            Get brutally honest feedback and an actionable plan for your AI or SaaS idea.
          </p>
        </header>

        <main>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-2xl shadow-cyan-500/10 p-6 border border-gray-700">
            <IdeaInputForm onSubmit={handleAnalyzeIdea} isLoading={isLoading} />
          </div>

          {isLoading && (
            <div className="mt-10 flex flex-col items-center justify-center">
              <Loader />
              <p className="mt-4 text-gray-400 animate-pulse">Your AI coach is analyzing the idea...</p>
            </div>
          )}

          {error && (
            <div className="mt-10 bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg text-center">
              <p><strong>Error:</strong> {error}</p>
            </div>
          )}

          {analysis && !isLoading && (
            <div className="mt-12">
              <AnalysisDisplay analysis={analysis} />
            </div>
          )}
        </main>
        
        <footer className="text-center mt-12 text-gray-600 text-sm">
            <p>Analysis by Gemini</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
