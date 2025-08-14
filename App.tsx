import React, { useState, useEffect, useCallback } from 'react';
import { Screen, Category, UserProgress, Difficulty, BadgeType, QuizQuestion } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './components/HomeScreen';
import QuizScreen from './components/QuizScreen';
import ResultsScreen from './components/ResultsScreen';
import { QUIZ_LENGTH, BADGE_DEFINITIONS } from './constants';

const App: React.FC = () => {
  const [screen, setScreen] = useState<Screen>(Screen.Home);
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
  const [userProgress, setUserProgress] = useState<UserProgress>({
    score: 0,
    badges: [],
    highScores: {},
    quizCount: 0,
    totalCorrectAnswers: 0,
  });
  const [quizResult, setQuizResult] = useState({ score: 0, correctCount: 0, questions: [] as QuizQuestion[] });
  const [newBadges, setNewBadges] = useState<BadgeType[]>([]);

  useEffect(() => {
    try {
      const savedProgress = localStorage.getItem('quizBotUserProgress');
      if (savedProgress) {
        // Provide default values for new fields if they don't exist in old data
        const parsedProgress = JSON.parse(savedProgress);
        setUserProgress({
          quizCount: 0,
          totalCorrectAnswers: 0,
          ...parsedProgress,
        });
      }
    } catch (error) {
      console.error("Failed to load user progress from localStorage", error);
    }
  }, []);

  const saveProgress = useCallback((progress: UserProgress) => {
    try {
      localStorage.setItem('quizBotUserProgress', JSON.stringify(progress));
    } catch (error) {
      console.error("Failed to save user progress to localStorage", error);
    }
  }, []);

  const startQuiz = (category: Category) => {
    setCurrentCategory(category);
    setScreen(Screen.Quiz);
  };

  const calculateNewBadges = (
    currentProgress: UserProgress,
    quizCorrectCount: number,
    newTotalScore: number,
    newTotalCorrect: number
  ): BadgeType[] => {
    const newlyAwarded: BadgeType[] = [];
    
    const award = (badge: BadgeType) => {
      if (!currentProgress.badges.includes(badge)) {
        newlyAwarded.push(badge);
      }
    };
    
    if (currentProgress.quizCount === 0) award(BadgeType.FirstQuiz);
    if (quizCorrectCount === QUIZ_LENGTH) award(BadgeType.PerfectScore);
    if (newTotalCorrect >= 10 && currentProgress.totalCorrectAnswers < 10) award(BadgeType.Novice);
    if (newTotalCorrect >= 25 && currentProgress.totalCorrectAnswers < 25) award(BadgeType.Adept);
    if (newTotalCorrect >= 50 && currentProgress.totalCorrectAnswers < 50) award(BadgeType.Expert);
    if (newTotalScore >= 1000 && currentProgress.score < 1000) award(BadgeType.Master);

    return newlyAwarded;
  };

  const handleQuizComplete = (score: number, correctCount: number, questions: QuizQuestion[]) => {
    if (!currentCategory) return;
    
    setQuizResult({ score, correctCount, questions });
    
    const newTotalScore = userProgress.score + score;
    const newTotalCorrect = userProgress.totalCorrectAnswers + correctCount;

    const awardedBadges = calculateNewBadges(userProgress, correctCount, newTotalScore, newTotalCorrect);
    setNewBadges(awardedBadges);
    
    const updatedProgress: UserProgress = {
      ...userProgress,
      score: newTotalScore,
      totalCorrectAnswers: newTotalCorrect,
      quizCount: userProgress.quizCount + 1,
      badges: [...userProgress.badges, ...awardedBadges],
      highScores: {
        ...userProgress.highScores,
        [currentCategory.name]: Math.max(userProgress.highScores[currentCategory.name] || 0, score),
      },
    };

    setUserProgress(updatedProgress);
    saveProgress(updatedProgress);
    
    setScreen(Screen.Results);
  };

  const playAgain = () => {
    if (currentCategory) {
      setNewBadges([]);
      setQuizResult({ score: 0, correctCount: 0, questions: [] });
      setScreen(Screen.Quiz);
    }
  };

  const goHome = () => {
    setCurrentCategory(null);
    setNewBadges([]);
    setQuizResult({ score: 0, correctCount: 0, questions: [] });
    setScreen(Screen.Home);
  };

  const renderScreen = () => {
    switch (screen) {
      case Screen.Quiz:
        return currentCategory && <QuizScreen category={currentCategory} onQuizComplete={handleQuizComplete} />;
      case Screen.Results:
        return currentCategory && <ResultsScreen 
          category={currentCategory}
          score={quizResult.score}
          correctCount={quizResult.correctCount}
          userProgress={userProgress}
          newBadges={newBadges}
          questions={quizResult.questions}
          onPlayAgain={playAgain}
          onGoHome={goHome}
        />;
      case Screen.Home:
      default:
        return <HomeScreen onStartQuiz={startQuiz} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 bg-gradient-to-br from-gray-900 via-gray-900 to-purple-900/30">
      <Header score={userProgress.score} />
      <div className="flex-grow">
        {renderScreen()}
      </div>
      <Footer />
    </div>
  );
};

export default App;
