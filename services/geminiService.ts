
import { GoogleGenAI, Type } from "@google/genai";
import type { Analysis } from '../types';

if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    executiveSummary: {
      type: Type.STRING,
      description: "A 2-3 sentence executive summary on the overall viability of the business idea. Be direct and honest.",
    },
    whatWorks: {
      type: Type.ARRAY,
      description: "3-5 of the strongest aspects, core strengths, or biggest opportunities for the idea.",
      items: { type: Type.STRING },
    },
    criticalIssues: {
      type: Type.ARRAY,
      description: "3-5 major concerns, obstacles, or fatal flaws. Be brutally honest and specific.",
      items: { type: Type.STRING },
    },
    marketRealityCheck: {
      type: Type.OBJECT,
      description: "An assessment of the market conditions.",
      properties: {
        competition: { type: Type.STRING, description: "Analysis of the direct and indirect competitive landscape and the idea's differentiation." },
        demand: { type: Type.STRING, description: "Assessment of the target market's demand, pain point severity, and willingness to pay." },
        timing: { type: Type.STRING, description: "Comments on whether the market timing is right for this idea (e.g., technology maturity, user readiness)." },
      },
      required: ["competition", "demand", "timing"],
    },
    technicalFeasibility: {
        type: Type.OBJECT,
        description: "An analysis of the technical requirements and challenges for an AI/SaaS product.",
        properties: {
            complexity: { type: Type.STRING, description: "Assessment of the development complexity, required tech stack, and potential AI/ML challenges." },
            resources: { type: Type.STRING, description: "What resources (skills, data, infrastructure, APIs) are needed to build an MVP." },
        },
        required: ["complexity", "resources"],
    },
    revenueProbability: {
      type: Type.OBJECT,
      description: "A realistic probability of generating meaningful revenue.",
      properties: {
        percentage: {
          type: Type.INTEGER,
          description: "A percentage (0-100) chance of generating $10K+ monthly recurring revenue within 18 months.",
        },
        justification: {
          type: Type.STRING,
          description: "A brief, honest explanation for the given percentage, based on market, execution difficulty, and monetization potential.",
        },
      },
      required: ["percentage", "justification"],
    },
    nextSteps: {
      type: Type.ARRAY,
      description: "A list of 5-7 specific, actionable next steps, ranked by priority.",
      items: {
        type: Type.OBJECT,
        properties: {
          priority: { type: Type.INTEGER, description: "The priority number of the step (1 being highest)." },
          action: { type: Type.STRING, description: "A concise title for the action item (e.g., 'Validate Customer Pain Point')." },
          details: { type: Type.STRING, description: "A brief, concrete description of what to do for this step." },
        },
        required: ["priority", "action", "details"],
      },
    },
    successMetrics: {
        type: Type.ARRAY,
        description: "Key Performance Indicators (KPIs) to track progress and validate core assumptions.",
        items: {
            type: Type.OBJECT,
            properties: {
                metric: { type: Type.STRING, description: "The name of the KPI (e.g., 'User Activation Rate')." },
                description: { type: Type.STRING, description: "Why this metric is important for this specific business and how to measure it." },
            },
            required: ["metric", "description"],
        }
    }
  },
  required: [
    "executiveSummary",
    "whatWorks",
    "criticalIssues",
    "marketRealityCheck",
    "technicalFeasibility",
    "revenueProbability",
    "nextSteps",
    "successMetrics"
  ],
};


export const getBusinessAnalysis = async (idea: string): Promise<Analysis> => {
  const systemInstruction = `You are an expert business coach and analyst specializing in AI-powered online businesses and SaaS ventures. Your name is 'CoachAI'. Your role is to evaluate business ideas with brutal honesty while providing constructive guidance and actionable next steps. Analyze market viability, technical feasibility, revenue potential, and the competitive landscape. Provide a candid critique on fatal flaws, weak points, and unrealistic assumptions. Balance criticism with identifying strengths and offering improvement strategies. Create concrete, prioritized next steps. Assess the probability of generating meaningful revenue ($10K+ MRR within 18 months). Your communication style must be direct, evidence-based, and actionable. Avoid generic advice. You must respond in a structured JSON format according to the provided schema.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: idea,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.5,
      },
    });

    const jsonText = response.text.trim();
    const result: Analysis = JSON.parse(jsonText);
    return result;
  } catch (error) {
    console.error("Error fetching or parsing business analysis:", error);
    throw new Error("Failed to get analysis from AI service.");
  }
};
