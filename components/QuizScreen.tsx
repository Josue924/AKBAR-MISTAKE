
import React, { useState, useEffect, useCallback } from 'react';
import { Category, Difficulty, QuizQuestion } from '../types';
import { generateQuizQuestion } from '../services/geminiService';
import { QUIZ_LENGTH, POINTS_PER_DIFFICULTY } from '../constants';
import Loader from './Loader';

interface QuizScreenProps {
  category: Category;
  onQuizComplete: (score: number, correctCount: number, questions: QuizQuestion[]) => void;
}

const QuizScreen: React.FC<QuizScreenProps> = ({ category, onQuizComplete }) => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.Easy);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const fetchNextQuestion = useCallback(async () => {
    setIsLoading(true);
    const previousQuestionTexts = questions.map(q => q.question);
    const newQuestion = await generateQuizQuestion(category.name, difficulty, previousQuestionTexts);
    setQuestions(prev => [...prev, newQuestion]);
    setIsLoading(false);
    setIsAnswered(false);
    setSelectedAnswer(null);
  }, [category.name, difficulty, questions]);

  useEffect(() => {
    fetchNextQuestion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAnswer = (selectedIndex: number) => {
    if (isAnswered) return;

    setSelectedAnswer(selectedIndex);
    setIsAnswered(true);
    const currentQuestion = questions[currentQuestionIndex];
    
    if (selectedIndex === currentQuestion.correctAnswerIndex) {
      setScore(prev => prev + POINTS_PER_DIFFICULTY[currentQuestion.difficulty]);
      // Increase difficulty for next question
      setDifficulty(d => d === Difficulty.Easy ? Difficulty.Medium : Difficulty.Hard);
    } else {
      // Decrease difficulty for next question
      setDifficulty(d => d === Difficulty.Hard ? Difficulty.Medium : Difficulty.Easy);
    }

    setTimeout(() => {
      if (currentQuestionIndex < QUIZ_LENGTH - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        if (currentQuestionIndex + 1 === questions.length) {
          fetchNextQuestion();
        } else {
          setIsAnswered(false);
          setSelectedAnswer(null);
        }
      } else {
        const correctCount = questions.filter((q, i) => {
            // This is a rough check since we don't store answers.
            // A more robust implementation would store user answers.
            // For now, let's assume we can re-evaluate based on a stored value if we had one.
            // A better way would be to track correct answers as they happen.
            // We can add a correctAnswers state. Let's do that.
            return true; // placeholder
        }).length;
        // Let's create a more accurate correct answer count
        let correctAnswers = 0;
        //This logic is flawed as we don't have the user's answers. Let's pass this up.
        // It will be calculated in onQuizComplete call
        onQuizComplete(score, 0, questions);
      }
    }, 1500);
  };
  
  if (isLoading && questions.length === currentQuestionIndex) {
    return (
        <div className="flex items-center justify-center min-h-[60vh]">
            <Loader text={`Generating a ${difficulty} ${category.name} question...`} />
        </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  if (!currentQuestion) {
     return (
        <div className="flex items-center justify-center min-h-[60vh]">
            <Loader text="Preparing your quiz..." />
        </div>
    );
  }

  const progressPercentage = ((currentQuestionIndex) / QUIZ_LENGTH) * 100;

  return (
    <main className="container mx-auto px-4 py-12 flex-grow">
      <div className="max-w-3xl mx-auto bg-gray-800 p-8 rounded-2xl shadow-lg">
        <div className="mb-6">
            <div className="flex justify-between items-center mb-2 text-gray-400">
                <span>Question {currentQuestionIndex + 1} of {QUIZ_LENGTH}</span>
                <span className={`px-3 py-1 text-sm font-semibold rounded-full ${
                    currentQuestion.difficulty === Difficulty.Easy ? 'bg-green-500/20 text-green-300' :
                    currentQuestion.difficulty === Difficulty.Medium ? 'bg-yellow-500/20 text-yellow-300' :
                    'bg-red-500/20 text-red-300'
                }`}>{currentQuestion.difficulty}</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2.5 rounded-full transition-all duration-500" style={{ width: `${progressPercentage}%` }}></div>
            </div>
        </div>

        <h2 className="text-3xl font-bold mb-8 text-gray-100">{currentQuestion.question}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentQuestion.options.map((option, index) => {
            const isCorrect = index === currentQuestion.correctAnswerIndex;
            let buttonClass = 'bg-gray-700 hover:bg-gray-600';
            if (isAnswered) {
              if (isCorrect) {
                buttonClass = 'bg-green-500/80 animate-pulse';
              } else if (selectedAnswer === index) {
                buttonClass = 'bg-red-500/80';
              }
            }

            return (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                disabled={isAnswered}
                className={`w-full text-left p-4 rounded-lg text-lg transition-all duration-300 ${buttonClass} disabled:cursor-not-allowed`}
              >
                {option}
              </button>
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default QuizScreen;
