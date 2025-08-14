
import React from 'react';

interface HeaderProps {
  score: number;
}

const Header: React.FC<HeaderProps> = ({ score }) => {
  return (
    <header className="py-4 px-8 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-20">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
          QuizBot
        </h1>
        <div className="flex items-center space-x-2 text-xl font-semibold bg-gray-800 px-4 py-2 rounded-lg">
          <span role="img" aria-label="star">⭐</span>
          <span>{score}</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
