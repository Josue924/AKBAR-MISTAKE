
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="py-6 text-center text-gray-500">
      <div className="container mx-auto">
        <p>&copy; {new Date().getFullYear()} QuizBot. A life-changing learning experience.</p>
      </div>
    </footer>
  );
};

export default Footer;
