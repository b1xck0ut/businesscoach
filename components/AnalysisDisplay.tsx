
import React from 'react';
import type { Analysis } from '../types';
import { CheckCircleIcon } from './icons/CheckCircleIcon';
import { XCircleIcon } from './icons/XCircleIcon';
import { DocumentTextIcon } from './icons/DocumentTextIcon';
import { ClipboardListIcon } from './icons/ClipboardListIcon';
import { DollarSignIcon } from './icons/DollarSignIcon';
import { CogIcon } from './icons/CogIcon';
import { TrendingUpIcon } from './icons/TrendingUpIcon';
import { BarChartIcon } from './icons/BarChartIcon';

interface AnalysisDisplayProps {
  analysis: Analysis;
}

const Section: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode; }> = ({ title, icon, children }) => (
  <section className="mb-12">
    <div className="flex items-center gap-3 mb-4">
      <div className="bg-gray-700 p-2 rounded-lg">{icon}</div>
      <h2 className="text-2xl font-bold text-cyan-400">{title}</h2>
    </div>
    <div className="pl-4 border-l-2 border-gray-700">{children}</div>
  </section>
);


const AnalysisDisplay: React.FC<AnalysisDisplayProps> = ({ analysis }) => {
  const scoreColor = analysis.revenueProbability.percentage >= 60 ? 'text-green-400' : analysis.revenueProbability.percentage >= 30 ? 'text-yellow-400' : 'text-red-400';
  const sortedNextSteps = [...analysis.nextSteps].sort((a, b) => a.priority - b.priority);

  return (
    <div className="animate-fade-in space-y-12">
       <Section title="Executive Summary" icon={<DocumentTextIcon className="w-6 h-6 text-gray-300" />}>
        <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 shadow-lg">
          <p className="text-gray-300 leading-relaxed">{analysis.executiveSummary}</p>
        </div>
      </Section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="flex items-center gap-2 text-xl font-semibold text-green-400 mb-3">
            <CheckCircleIcon className="w-6 h-6" /> What Works
          </h3>
          <ul className="space-y-2 list-inside">
            {analysis.whatWorks.map((strength, index) => (
              <li key={index} className="bg-green-900/30 p-3 rounded-md border border-green-800/50 text-gray-300">
                {strength}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="flex items-center gap-2 text-xl font-semibold text-red-400 mb-3">
            <XCircleIcon className="w-6 h-6" /> Critical Issues
          </h3>
          <ul className="space-y-2 list-inside">
            {analysis.criticalIssues.map((weakness, index) => (
              <li key={index} className="bg-red-900/30 p-3 rounded-md border border-red-800/50 text-gray-300">
                {weakness}
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      <Section title="Market Reality Check" icon={<BarChartIcon className="w-6 h-6 text-orange-400" />}>
        <div className="space-y-4">
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
              <h4 className="font-bold text-orange-400">Competition</h4>
              <p className="text-gray-400 mt-1">{analysis.marketRealityCheck.competition}</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
              <h4 className="font-bold text-orange-400">Demand</h4>
              <p className="text-gray-400 mt-1">{analysis.marketRealityCheck.demand}</p>
            </div>
             <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
              <h4 className="font-bold text-orange-400">Timing</h4>
              <p className="text-gray-400 mt-1">{analysis.marketRealityCheck.timing}</p>
            </div>
        </div>
      </Section>

      <Section title="Technical Feasibility" icon={<CogIcon className="w-6 h-6 text-indigo-400" />}>
        <div className="space-y-4">
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
              <h4 className="font-bold text-indigo-400">Complexity</h4>
              <p className="text-gray-400 mt-1">{analysis.technicalFeasibility.complexity}</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
              <h4 className="font-bold text-indigo-400">Resources</h4>
              <p className="text-gray-400 mt-1">{analysis.technicalFeasibility.resources}</p>
            </div>
        </div>
      </Section>

      <Section title="Revenue Probability" icon={<DollarSignIcon className="w-6 h-6 text-green-400" />}>
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 flex flex-col md:flex-row items-center gap-6">
            <div className="relative">
                <svg className="w-32 h-32" viewBox="0 0 36 36">
                    <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#4A5568"
                        strokeWidth="3"
                    />
                    <path
                        className={`transition-all duration-1000 ease-out ${scoreColor}`}
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeDasharray={`${analysis.revenueProbability.percentage}, 100`}
                    />
                </svg>
                <div className={`absolute inset-0 flex items-center justify-center text-4xl font-bold ${scoreColor}`}>
                    {analysis.revenueProbability.percentage}<span className="text-2xl">%</span>
                </div>
            </div>
            <div className="flex-1">
                <h4 className="font-bold text-green-400">Chance of reaching $10k MRR in 18 months</h4>
                <p className="text-gray-300 mt-1">{analysis.revenueProbability.justification}</p>
            </div>
        </div>
      </Section>

       <Section title="Actionable Next Steps" icon={<ClipboardListIcon className="w-6 h-6 text-blue-400" />}>
        <div className="space-y-6">
          {sortedNextSteps.map((step, index) => (
            <div key={step.priority} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center w-10 h-10 bg-blue-500 text-white font-bold rounded-full">
                  {step.priority}
                </div>
                {sortedNextSteps.length > index + 1 && <div className="w-0.5 h-full bg-gray-600 mt-2"></div>}
              </div>
              <div className="flex-1 pb-4">
                <h4 className="text-lg font-bold text-blue-400">{step.action}</h4>
                <p className="text-gray-400">{step.details}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>
      
      <Section title="Success Metrics (KPIs)" icon={<TrendingUpIcon className="w-6 h-6 text-purple-400" />}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {analysis.successMetrics.map((item, index) => (
            <div key={index} className="bg-gray-800 p-4 rounded-lg border border-gray-700">
              <h4 className="font-bold text-purple-400">{item.metric}</h4>
              <p className="text-sm text-gray-400 mt-1">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

    </div>
  );
};

export default AnalysisDisplay;
