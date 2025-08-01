
import React, { useState } from 'react';

interface IdeaInputFormProps {
  onSubmit: (idea: string) => void;
  isLoading: boolean;
}

const IdeaInputForm: React.FC<IdeaInputFormProps> = ({ onSubmit, isLoading }) => {
  const [idea, setIdea] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(idea);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label htmlFor="business-idea" className="block text-lg font-medium text-gray-300">
        Enter your Business, Website, or SaaS Idea
      </label>
      <textarea
        id="business-idea"
        value={idea}
        onChange={(e) => setIdea(e.target.value)}
        placeholder="e.g., An AI-powered tool that automatically generates documentation for existing codebases."
        className="w-full h-36 p-4 bg-gray-900 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-shadow duration-200 text-gray-200 placeholder-gray-500 resize-none"
        disabled={isLoading}
      />
      <button
        type="submit"
        disabled={isLoading || !idea.trim()}
        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 disabled:transform-none"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Analyzing...
          </>
        ) : (
          'Analyze My Idea'
        )}
      </button>
    </form>
  );
};

export default IdeaInputForm;
