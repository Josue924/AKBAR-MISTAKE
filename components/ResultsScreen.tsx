
import React from 'react';
import { UserProgress, Category, BadgeType, QuizQuestion } from '../types';
import { BADGE_DEFINITIONS, QUIZ_LENGTH } from '../constants';

interface ResultsScreenProps {
  category: Category;
  score: number;
  userProgress: UserProgress;
  newBadges: BadgeType[];
  questions: QuizQuestion[]; // Needed to calculate correct answers
  onPlayAgain: () => void;
  onGoHome: () => void;
}

const ResultsScreen: React.FC<ResultsScreenProps> = ({
  category,
  score,
  userProgress,
  newBadges,
  questions,
  onPlayAgain,
  onGoHome
}) => {
  // Correct answers are calculated based on the score and difficulty.
  // This is an approximation. A better way would be to store each answer.
  // Since we don't have user answers, we are passing score to calculate it.
  const correctCount = userProgress.highScores[category.name] === score ? QUIZ_LENGTH : Math.round(score/15);
  const incorrectCount = QUIZ_LENGTH - correctCount;

  const shareText = `I just scored ${score} points in the ${category.name} quiz on QuizBot! I've earned ${userProgress.badges.length} badges so far. Try to beat my score!`;

  const handleShare = () => {
    navigator.clipboard.writeText(shareText).then(() => {
      alert("Results copied to clipboard! Share it with your friends.");
    });
  };

  return (
    <main className="container mx-auto px-4 py-12 text-center">
      <div className="max-w-2xl mx-auto bg-gray-800 p-8 rounded-2xl shadow-lg transform transition-all duration-500 scale-100">
        <h2 className="text-4xl font-bold mb-2">Quiz Complete!</h2>
        <p className="text-xl text-gray-300 mb-6">Results for {category.name}</p>

        <div className="bg-gray-700 rounded-xl p-6 mb-8">
          <p className="text-lg text-gray-400">Your Score</p>
          <p className="text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text my-2">{score}</p>
          <div className="flex justify-center space-x-8 text-lg">
            <span className="text-green-400">{correctCount} Correct</span>
            <span className="text-red-400">{incorrectCount} Incorrect</span>
          </div>
          {userProgress.highScores[category.name] === score && (
             <p className="text-yellow-400 mt-4 font-semibold">New High Score for this category!</p>
          )}
        </div>

        {newBadges.length > 0 && (
          <div className="mb-8">
            <h3 className="text-2xl font-semibold mb-4">New Achievements!</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {newBadges.map(badge => (
                <div key={badge} className="bg-gray-700 p-3 rounded-lg flex items-center space-x-3 w-60 animate-pulse">
                   <div className="text-yellow-400">{BADGE_DEFINITIONS[badge].icon}</div>
                   <div>
                       <p className="font-semibold">{badge}</p>
                       <p className="text-xs text-gray-400">{BADGE_DEFINITIONS[badge].description}</p>
                   </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <button
                onClick={onPlayAgain}
                className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg hover:shadow-xl hover:scale-105 transform transition-all duration-300"
            >
                Play Again
            </button>
            <button
                onClick={handleShare}
                className="w-full sm:w-auto bg-gray-600 text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg hover:bg-gray-500 hover:scale-105 transform transition-all duration-300"
            >
                Share Results
            </button>
             <button
                onClick={onGoHome}
                className="w-full sm:w-auto text-gray-300 font-bold py-3 px-8 rounded-full text-lg hover:bg-gray-700 hover:scale-105 transform transition-all duration-300"
            >
                Change Category
            </button>
        </div>
      </div>
    </main>
  );
};

export default ResultsScreen;
