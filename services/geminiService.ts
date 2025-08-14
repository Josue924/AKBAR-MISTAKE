
import { GoogleGenAI, Type } from "@google/genai";
import { Difficulty, QuizQuestion } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

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

export const generateQuizQuestion = async (
  category: string,
  difficulty: Difficulty,
  previousQuestions: string[]
): Promise<QuizQuestion> => {
  try {
    const prompt = `
      Generate a unique multiple-choice question for a quiz.
      Category: ${category}
      Difficulty: ${difficulty}
      Ensure the question is different from these previous questions: ${previousQuestions.join(', ')}.
      The question should be engaging and test knowledge on the given category and difficulty.
      Provide 4 options and the index of the correct one.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: questionSchema,
        temperature: 0.8,
      }
    });
    
    const text = response.text.trim();
    const generatedQuestion = JSON.parse(text);

    // Basic validation
    if (
      !generatedQuestion.question ||
      !Array.isArray(generatedQuestion.options) ||
      generatedQuestion.options.length !== 4 ||
      typeof generatedQuestion.correctAnswerIndex !== 'number'
    ) {
      throw new Error("Invalid question format received from API");
    }

    return generatedQuestion as QuizQuestion;
  } catch (error) {
    console.error("Error generating quiz question:", error);
    // Fallback to a hardcoded question in case of API failure
    return {
      question: "What is 1 + 1?",
      options: ["1", "2", "3", "4"],
      correctAnswerIndex: 1,
      difficulty: Difficulty.Easy,
    };
  }
};
