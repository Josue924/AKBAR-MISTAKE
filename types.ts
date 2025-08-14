
export enum Screen {
  Home = 'HOME',
  Quiz = 'QUIZ',
  Results = 'RESULTS',
}

export enum Difficulty {
  Easy = 'Easy',
  Medium = 'Medium',
  Hard = 'Hard',
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswerIndex: number;
  difficulty: Difficulty;
}

export interface Category {
  name: string;
  icon: React.ReactNode;
  color: string;
}

export interface UserProgress {
  score: number;
  badges: BadgeType[];
  highScores: Record<string, number>;
}

export enum BadgeType {
  FirstQuiz = 'First Quiz',
  Novice = 'Novice',
  Adept = 'Adept',
  Expert = 'Expert',
  Master = 'Master',
  PerfectScore = 'Perfect Score!',
}
