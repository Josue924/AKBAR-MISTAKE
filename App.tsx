
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
  });
  const [quizResult, setQuizResult] = useState({ score: 0, questions: [] as QuizQuestion[] });
  const [newBadges, setNewBadges] = useState<BadgeType[]>([]);
  const [totalCorrectAnswers, setTotalCorrectAnswers] = useState(0);

  useEffect(() => {
    try {
      const savedProgress = localStorage.getItem('quizBotUserProgress');
      if (savedProgress) {
        setUserProgress(JSON.parse(savedProgress));
      }
      const savedTotalCorrect = localStorage.getItem('quizBotTotalCorrect');
      if (savedTotalCorrect) {
        setTotalCorrectAnswers(JSON.parse(savedTotalCorrect));
      }
    } catch (error) {
      console.error("Failed to load user progress from localStorage", error);
    }
  }, []);

  const saveProgress = useCallback((progress: UserProgress, totalCorrect: number) => {
    try {
      localStorage.setItem('quizBotUserProgress', JSON.stringify(progress));
      localStorage.setItem('quizBotTotalCorrect', JSON.stringify(totalCorrect));
    } catch (error) {
      console.error("Failed to save user progress to localStorage", error);
    }
  }, []);

  const startQuiz = (category: Category) => {
    setCurrentCategory(category);
    setScreen(Screen.Quiz);
  };

  const checkAndAwardBadges = (
    currentProgress: UserProgress, 
    quizScore: number, 
    quizCorrectCount: number, 
    categoryName: string
  ): { updatedProgress: UserProgress; awardedBadges: BadgeType[] } => {
    const awardedBadges: BadgeType[] = [];
    let updatedBadges = [...currentProgress.badges];
    let updatedTotalCorrect = totalCorrectAnswers + quizCorrectCount;
    setTotalCorrectAnswers(updatedTotalCorrect);

    const award = (badge: BadgeType) => {
      if (!updatedBadges.includes(badge)) {
        updatedBadges.push(badge);
        awardedBadges.push(badge);
      }
    };
    
    award(BadgeType.FirstQuiz);
    if (quizCorrectCount === QUIZ_LENGTH) award(BadgeType.PerfectScore);
    if (updatedTotalCorrect >= 10) award(BadgeType.Novice);
    if (updatedTotalCorrect >= 25) award(BadgeType.Adept);
    if (updatedTotalCorrect >= 50) award(BadgeType.Expert);
    if (currentProgress.score + quizScore >= 1000) award(BadgeType.Master);

    const updatedProgress: UserProgress = {
      ...currentProgress,
      score: currentProgress.score + quizScore,
      badges: updatedBadges,
      highScores: {
        ...currentProgress.highScores,
        [categoryName]: Math.max(currentProgress.highScores[categoryName] || 0, quizScore),
      },
    };
    
    return { updatedProgress, awardedBadges };
  };

  const handleQuizComplete = (score: number, correctCount: number, questions: QuizQuestion[]) => {
    if (!currentCategory) return;
    setQuizResult({ score, questions });

    const { updatedProgress, awardedBadges } = checkAndAwardBadges(userProgress, score, correctCount, currentCategory.name);

    setUserProgress(updatedProgress);
    setNewBadges(awardedBadges);
    saveProgress(updatedProgress, totalCorrectAnswers + correctCount);
    
    setScreen(Screen.Results);
  };

  const playAgain = () => {
    if (currentCategory) {
      setNewBadges([]);
      setScreen(Screen.Quiz);
    }
  };

  const goHome = () => {
    setCurrentCategory(null);
    setNewBadges([]);
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
