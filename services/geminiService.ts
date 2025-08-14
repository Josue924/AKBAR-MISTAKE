
import { GoogleGenAI, Type } from "@google/genai";
import { Difficulty, QuizQuestion } from '../types';

// Check for process and API_KEY to avoid crashing in environments where it's not defined.
const apiKey = typeof process !== 'undefined' && process.env.API_KEY ? process.env.API_KEY : undefined;
let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({ apiKey });
} else {
  console.warn("API_KEY environment variable not set. QuizBot will use fallback questions.");
}

const questionSchema = {
    type: Type.OBJECT,
    properties: {
        question: {
            type: Type.STRING,
            description: "The question text."
        },
        options: {
            type: Type.ARRAY,
            description: "An array of 4 strings representing the multiple-choice options.",
            items: { type: Type.STRING }
        },
        correctAnswerIndex: {
            type: Type.INTEGER,
            description: "The 0-based index of the correct answer in the 'options' array."
        },
        difficulty: {
            type: Type.STRING,
            enum: [Difficulty.Easy, Difficulty.Medium, Difficulty.Hard],
            description: "The difficulty of the generated question."
        }
    },
    required: ["question", "options", "correctAnswerIndex", "difficulty"]
};

const getFallbackQuestion = (): QuizQuestion => ({
    question: "The AI is currently offline. As a backup, what is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correctAnswerIndex: 2,
    difficulty: Difficulty.Easy,
});

export const generateQuizQuestion = async (
  category: string,
  difficulty: Difficulty,
  previousQuestions: string[]
): Promise<QuizQuestion> => {
  if (!ai) {
    return getFallbackQuestion();
  }

  try {
    const systemInstruction = `You are a quiz generator. Your task is to create a unique multiple-choice question based on a given category and difficulty.
The question must not be a repeat of any question from the provided list of previous questions.
You must strictly adhere to the provided JSON schema for the output, including providing 4 options and a correct answer index.`;
    
    const userPrompt = `
      Category: ${category}
      Difficulty: ${difficulty}
      Previous questions to avoid: [${previousQuestions.map(q => `"${q}"`).join(', ')}]
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userPrompt,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
        responseSchema: questionSchema,
        temperature: 0.8,
      }
    });
    
    const text = response.text.trim();
    const generatedQuestion = JSON.parse(text);

    if (
      !generatedQuestion.question ||
      !Array.isArray(generatedQuestion.options) ||
      generatedQuestion.options.length !== 4 ||
      typeof generatedQuestion.correctAnswerIndex !== 'number' ||
      generatedQuestion.correctAnswerIndex < 0 ||
      generatedQuestion.correctAnswerIndex >= 4
    ) {
      throw new Error("Invalid question format received from API");
    }

    return generatedQuestion as QuizQuestion;
  } catch (error) {
    console.error("Error generating quiz question:", error);
    return getFallbackQuestion();
  }
};