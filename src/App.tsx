/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useMemo, useState } from 'react';
import { Header } from './components/Header';
import { HeroStartView } from './components/HeroStartView';
import { CurriculumView } from './components/CurriculumView';
import { SimulationsLab } from './components/SimulationsLab';
import { FlashcardsView } from './components/FlashcardsView';
import { QuizAndCompareView } from './components/QuizAndCompareView';
import { GlossaryView } from './components/GlossaryView';
import { AboutView } from './components/AboutView';
import {
  FLASHCARDS,
  GLOSSARY_ENTRIES,
  METHOD_COMPARISON_MATRIX,
  QUIZ_QUESTIONS,
  STUDY_SESSIONS,
  SYLLABUS_REFERENCE_GROUPS,
  THEORY_COMPARISON_MATRIX,
} from './data/curriculum';
import type { SimulationId, StudyTab } from './data/curriculumTypes';
import { calculateStudyProgress } from './utils/studyEngine';

const STORAGE_KEY = 'edpsych_primer_progress_v1';

interface StoredProgress {
  completedSessionIds: string[];
  masteredCardIds: string[];
  lastQuizScorePercent: number | null;
}

function loadStoredProgress(): StoredProgress {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return {
        completedSessionIds: [],
        masteredCardIds: [],
        lastQuizScorePercent: null,
      };
    }
    const parsed = JSON.parse(raw) as Partial<StoredProgress>;
    return {
      completedSessionIds: Array.isArray(parsed.completedSessionIds)
        ? parsed.completedSessionIds
        : [],
      masteredCardIds: Array.isArray(parsed.masteredCardIds)
        ? parsed.masteredCardIds
        : [],
      lastQuizScorePercent:
        typeof parsed.lastQuizScorePercent === 'number'
          ? parsed.lastQuizScorePercent
          : null,
    };
  } catch {
    return {
      completedSessionIds: [],
      masteredCardIds: [],
      lastQuizScorePercent: null,
    };
  }
}

export default function App() {
  const [activeTab, setActiveTab] = useState<StudyTab>(() => {
    const params = new URLSearchParams(window.location.search);
    const tabParam = params.get('tab') as StudyTab | null;
    if (
      tabParam === 'foundations' ||
      tabParam === 'simulations' ||
      tabParam === 'flashcards' ||
      tabParam === 'quiz-matrix' ||
      tabParam === 'glossary' ||
      tabParam === 'about'
    ) {
      return tabParam;
    }
    if (params.get('autostart') === '1') {
      return 'foundations';
    }
    return 'overview';
  });

  const [activeSessionId, setActiveSessionId] = useState<string>('s01');
  const [activeSimulation, setActiveSimulation] = useState<SimulationId>('piaget');

  const [stored, setStored] = useState<StoredProgress>(() => loadStoredProgress());

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
    } catch {
      // Ignore storage quota errors safely
    }
  }, [stored]);

  const progress = useMemo(
    () =>
      calculateStudyProgress({
        completedSessionIds: stored.completedSessionIds,
        masteredCardIds: stored.masteredCardIds,
        lastQuizScorePercent: stored.lastQuizScorePercent,
        totalSessions: STUDY_SESSIONS.length,
        totalCards: FLASHCARDS.length,
      }),
    [stored],
  );

  const handleOpenSession = (sessionId: string) => {
    setActiveSessionId(sessionId);
    setActiveTab('foundations');
    window.scrollTo(0, 0);
  };

  const handleOpenSimulation = (simId: SimulationId) => {
    setActiveSimulation(simId);
    setActiveTab('simulations');
    window.scrollTo(0, 0);
  };

  const handleToggleSessionComplete = (sessionId: string) => {
    setStored((prev) => {
      const exists = prev.completedSessionIds.includes(sessionId);
      const next = exists
        ? prev.completedSessionIds.filter((id) => id !== sessionId)
        : [...prev.completedSessionIds, sessionId];
      return { ...prev, completedSessionIds: next };
    });
  };

  const handleSetCardMastered = (cardId: string, mastered: boolean) => {
    setStored((prev) => {
      const filtered = prev.masteredCardIds.filter((id) => id !== cardId);
      const next = mastered ? [...filtered, cardId] : filtered;
      return { ...prev, masteredCardIds: next };
    });
  };

  const handleSaveQuizScore = (scorePercent: number) => {
    setStored((prev) => ({ ...prev, lastQuizScorePercent: scorePercent }));
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
      <Header
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo(0, 0);
        }}
        onStartQuickQuiz={() => {
          setActiveTab('quiz-matrix');
          window.scrollTo(0, 0);
        }}
        progress={progress}
      />

      <main className="flex-1">
        {activeTab === 'overview' && (
          <HeroStartView
            sessions={STUDY_SESSIONS}
            completedSessionIds={stored.completedSessionIds}
            progress={progress}
            onOpenSession={handleOpenSession}
            onOpenSimulation={handleOpenSimulation}
            onOpenFlashcards={() => {
              setActiveTab('flashcards');
              window.scrollTo(0, 0);
            }}
          />
        )}

        {activeTab === 'foundations' && (
          <CurriculumView
            sessions={STUDY_SESSIONS}
            activeSessionId={activeSessionId}
            completedSessionIds={stored.completedSessionIds}
            onSelectSession={(sid) => {
              setActiveSessionId(sid);
              window.scrollTo(0, 0);
            }}
            onToggleComplete={handleToggleSessionComplete}
            onOpenSimulation={handleOpenSimulation}
          />
        )}

        {activeTab === 'simulations' && (
          <SimulationsLab
            activeSimulation={activeSimulation}
            onSelectSimulation={setActiveSimulation}
            onJumpToSession={handleOpenSession}
          />
        )}

        {activeTab === 'flashcards' && (
          <FlashcardsView
            cards={FLASHCARDS}
            sessions={STUDY_SESSIONS}
            masteredCardIds={stored.masteredCardIds}
            onSetCardMastered={handleSetCardMastered}
          />
        )}

        {activeTab === 'quiz-matrix' && (
          <QuizAndCompareView
            questions={QUIZ_QUESTIONS}
            sessions={STUDY_SESSIONS}
            methodMatrix={METHOD_COMPARISON_MATRIX}
            theoryMatrix={THEORY_COMPARISON_MATRIX}
            onSaveQuizScore={handleSaveQuizScore}
            onOpenSession={handleOpenSession}
          />
        )}

        {activeTab === 'glossary' && (
          <GlossaryView
            entries={GLOSSARY_ENTRIES}
            sessions={STUDY_SESSIONS}
            referenceGroups={SYLLABUS_REFERENCE_GROUPS}
            onOpenSession={handleOpenSession}
          />
        )}

        {activeTab === 'about' && (
          <AboutView
            totalSessions={STUDY_SESSIONS.length}
            totalSimulations={7}
            totalFlashcards={FLASHCARDS.length}
            totalQuizQuestions={QUIZ_QUESTIONS.length}
            totalGlossaryTerms={GLOSSARY_ENTRIES.length}
            onNavigateTab={(tab) => {
              setActiveTab(tab);
              window.scrollTo(0, 0);
            }}
          />
        )}
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-2 px-4 py-4 text-xs text-slate-500 sm:flex-row sm:items-center sm:px-6 lg:px-8">
          <span>
            EdPsych for STP8301 PGDE · Compiled by K.U.L.Perera (PGDE English medium).
          </span>
          <div className="flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => {
                setActiveTab('about');
                window.scrollTo(0, 0);
              }}
              className="font-medium text-sky-700 hover:underline"
            >
              About
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab('glossary');
                window.scrollTo(0, 0);
              }}
              className="font-medium text-sky-700 hover:underline"
            >
              View Complete Source Bibliography
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
