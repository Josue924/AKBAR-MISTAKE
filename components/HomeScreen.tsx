
import React from 'react';
import { Category } from '../types';
import { CATEGORIES } from '../constants';

interface HomeScreenProps {
  onStartQuiz: (category: Category) => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onStartQuiz }) => {
  return (
    <main className="container mx-auto px-4 py-12 text-center">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-bold mb-4">Welcome to QuizBot!</h2>
        <p className="text-xl text-gray-300 mb-12">
          Challenge yourself with AI-powered quizzes. Select a category to begin your learning adventure.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {CATEGORIES.map((category) => (
          <div
            key={category.name}
            onClick={() => onStartQuiz(category)}
            className={`group bg-gray-800 rounded-xl p-6 flex flex-col items-center justify-center space-y-4 cursor-pointer transition-all duration-300 ease-in-out transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/20`}
          >
            <div className={`p-4 rounded-full bg-gray-700 group-hover:bg-gradient-to-r ${category.color} transition-colors duration-300`}>
              {category.icon}
            </div>
            <h3 className="text-xl font-semibold text-white">{category.name}</h3>
          </div>
        ))}
      </div>

       <div className="mt-16">
         <button 
            onClick={() => onStartQuiz(CATEGORIES[0])}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-4 px-10 rounded-full text-xl shadow-lg hover:shadow-xl hover:scale-105 transform transition-all duration-300 ease-in-out"
          >
            Try a Quick Quiz!
          </button>
       </div>
    </main>
  );
};

export default HomeScreen;
