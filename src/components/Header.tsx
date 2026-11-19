import { useState } from 'react';
import { BookOpen, Menu, X } from 'lucide-react';
import type { StudyTab } from '../data/curriculumTypes';
import type { StudyProgressSummary } from '../utils/studyEngine';

interface HeaderProps {
  activeTab: StudyTab;
  onSelectTab: (tab: StudyTab) => void;
  onStartQuickQuiz: () => void;
  progress: StudyProgressSummary;
}

const NAV_ITEMS: { id: StudyTab; label: string }[] = [
  { id: 'foundations', label: 'Foundations' },
  { id: 'simulations', label: 'Simulations' },
  { id: 'flashcards', label: 'Study Cards' },
  { id: 'quiz-matrix', label: 'Quiz & Matrix' },
  { id: 'glossary', label: 'Glossary' },
  { id: 'about', label: 'About' },
];

export function Header({
  activeTab,
  onSelectTab,
  onStartQuickQuiz,
  progress,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (tab: StudyTab) => {
    onSelectTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-2 px-3 sm:h-16 sm:gap-4 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={() => handleNavClick('overview')}
          className="flex min-w-0 shrink items-center gap-1.5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-600 sm:gap-2.5"
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sky-700 text-white sm:h-9 sm:w-9">
            <BookOpen className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
          </span>
          <span className="truncate font-display text-[13px] font-bold tracking-tight text-slate-900 sm:text-base lg:text-lg">
            EdPsych for STP8301 PGDE
          </span>
        </button>

        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-1 md:flex"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                aria-current={isActive ? 'page' : undefined}
                className={`whitespace-nowrap rounded-lg px-2 py-2 text-xs font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-600 lg:px-3 lg:text-sm ${
                  isActive
                    ? 'bg-sky-50 text-sky-800'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-3">
          <span className="hidden text-xs font-medium text-slate-500 tabular-nums lg:inline">
            {progress.sessionsCompleted}/{progress.totalSessions} sessions
          </span>
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              onStartQuickQuiz();
            }}
            className="whitespace-nowrap rounded-lg bg-sky-700 px-2.5 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-sky-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-600 focus-visible:ring-offset-2 sm:px-3.5 sm:py-2 sm:text-sm"
          >
            Quick Quiz
          </button>
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 sm:h-10 sm:w-10 md:hidden"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="border-t border-slate-200 bg-white px-4 py-3 md:hidden">
          <div className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`flex items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm font-medium ${
                    isActive
                      ? 'bg-sky-50 text-sky-800'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.id === 'foundations' && (
                    <span className="font-mono text-xs text-slate-500 tabular-nums">
                      {progress.sessionsCompleted}/{progress.totalSessions}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
