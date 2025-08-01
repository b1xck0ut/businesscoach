
export interface Analysis {
  executiveSummary: string;
  whatWorks: string[];
  criticalIssues: string[];
  marketRealityCheck: {
    competition: string;
    demand: string;
    timing: string;
  };
  technicalFeasibility: {
    complexity: string;
    resources: string;
  };
  revenueProbability: {
    percentage: number;
    justification: string;
  };
  nextSteps: {
    priority: number;
    action: string;
    details: string;
  }[];
  successMetrics: {
    metric: string;
    description: string;
  }[];
}
