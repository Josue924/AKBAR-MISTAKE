
import React from 'react';
import { Category, Difficulty, BadgeType } from './types';

export const CATEGORIES: Category[] = [
  { name: 'General Knowledge', icon: <GlobeAltIcon />, color: 'from-blue-500 to-indigo-600' },
  { name: 'Coding Basics', icon: <CodeBracketIcon />, color: 'from-green-500 to-teal-600' },
  { name: 'Financial Literacy', icon: <BanknotesIcon />, color: 'from-yellow-500 to-amber-600' },
  { name: 'Health & Nutrition', icon: <HeartIcon />, color: 'from-red-500 to-rose-600' },
  { name: 'Language Learning', icon: <LanguageIcon />, color: 'from-purple-500 to-violet-600' },
  { name: 'Career Skills', icon: <BriefcaseIcon />, color: 'from-sky-500 to-cyan-600' },
];

export const QUIZ_LENGTH = 5;

export const POINTS_PER_DIFFICULTY: Record<Difficulty, number> = {
  [Difficulty.Easy]: 10,
  [Difficulty.Medium]: 20,
  [Difficulty.Hard]: 30,
};

export const BADGE_DEFINITIONS: Record<BadgeType, { description: string; icon: React.ReactNode }> = {
  [BadgeType.FirstQuiz]: { description: "Completed your first quiz!", icon: <SparklesIcon /> },
  [BadgeType.Novice]: { description: "Answered 10 questions correctly.", icon: <AcademicCapIcon /> },
  [BadgeType.Adept]: { description: "Answered 25 questions correctly.", icon: <StarIcon /> },
  [BadgeType.Expert]: { description: "Answered 50 questions correctly.", icon: <TrophyIcon /> },
  [BadgeType.Master]: { description: "Reached a total score of 1000!", icon: <BoltIcon /> },
  [BadgeType.PerfectScore]: { description: "Got a perfect score on a quiz!", icon: <CheckBadgeIcon /> },
};


// --- HeroIcons SVG Components ---

function GlobeAltIcon() {
  return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
  </svg>;
}
function CodeBracketIcon() {
  return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
  </svg>;
}
function BanknotesIcon() {
  return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.75A.75.75 0 013 4.5h.75m0 0h.75A.75.75 0 015.25 6v.75m0 0v-.75A.75.75 0 014.5 6h-.75m16.5 0h.75a.75.75 0 01.75.75v.75m0 0V6A.75.75 0 0021 5.25h-.75m0 0h-.75a.75.75 0 00-.75.75v.75m0 0v.75a.75.75 0 00.75.75h.75M4.5 12v.75a.75.75 0 01-.75.75h-.75m0 0v-.75a.75.75 0 01.75-.75h.75m0 0h.75a.75.75 0 01.75.75v.75m0 0v-.75a.75.75 0 01-.75-.75h-.75m12 0h.75a.75.75 0 01.75.75v.75m0 0v-.75a.75.75 0 00-.75-.75h-.75m0 0h-.75a.75.75 0 00-.75.75v.75m0 0v.75a.75.75 0 00.75.75h.75" />
  </svg>;
}
function HeartIcon() {
  return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
  </svg>;
}
function LanguageIcon() {
  return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C13.18 7.061 14.122 7.5 15 7.5c.878 0 1.82-.439 2.666-1.136M15 7.5V3m-3.334 2.364a48.473 48.473 0 00-3.334-.114" />
  </svg>;
}
function BriefcaseIcon() {
  return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.07a2.25 2.25 0 01-2.25 2.25h-12a2.25 2.25 0 01-2.25-2.25v-4.07M20.25 14.15v-4.82a2.25 2.25 0 00-2.25-2.25h-1.5a2.25 2.25 0 00-2.25 2.25v4.82M20.25 14.15M3.75 14.15v-4.82a2.25 2.25 0 012.25-2.25h1.5A2.25 2.25 0 019.75 9.33v4.82M3.75 14.15M9 14.15v-4.82M15 14.15v-4.82M12 15.75a.75.75 0 01-.75-.75v-4.5a.75.75 0 011.5 0v4.5a.75.75 0 01-.75.75z" />
  </svg>;
}
function SparklesIcon() {
    return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.572L16.5 21.75l-.398-1.178a3.375 3.375 0 00-2.455-2.456L12.75 18l1.178-.398a3.375 3.375 0 002.455-2.456L16.5 14.25l.398 1.178a3.375 3.375 0 002.456 2.456L20.25 18l-1.178.398a3.375 3.375 0 00-2.456 2.456z" />
    </svg>;
}
function AcademicCapIcon() {
    return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0l-.07.042m15.482 0l.07.042m1.226 1.06l-.07-.042m-1.226 1.06l.07-.042m0 0l.07.042m-1.226-1.102l-.07.042m1.226 1.102l.07.042M12 6a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" />
    </svg>;
}
function StarIcon() {
    return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
    </svg>;
}
function TrophyIcon() {
    return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9a9.75 9.75 0 01-4.874-1.935M16.5 18.75a9.75 9.75 0 004.874-1.935M16.5 18.75v-1.5a3.375 3.375 0 00-3.375-3.375h-1.5a3.375 3.375 0 00-3.375 3.375v1.5M16.5 18.75a9.75 9.75 0 00-9 0M12 14.25v4.5M4.875 16.815a9.75 9.75 0 01-1.826-5.715C3.049 8.25 3 7.875 3 7.5c0-4.142 3.358-7.5 7.5-7.5s7.5 3.358 7.5 7.5c0 .375-.049.75-.149 1.115a9.75 9.75 0 01-1.826 5.715M4.875 16.815L3.75 15M19.125 16.815L20.25 15" />
    </svg>;
}
function BoltIcon() {
    return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
    </svg>;
}
function CheckBadgeIcon() {
    return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>;
}

