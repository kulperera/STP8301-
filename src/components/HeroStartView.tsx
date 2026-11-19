import { ArrowRight, CheckCircle2, Compass, FlaskConical, Layers } from 'lucide-react';
import type { SimulationId, StudySession } from '../data/curriculumTypes';
import type { StudyProgressSummary } from '../utils/studyEngine';

interface HeroStartViewProps {
  sessions: StudySession[];
  completedSessionIds: string[];
  progress: StudyProgressSummary;
  onOpenSession: (sessionId: string) => void;
  onOpenSimulation: (simId: SimulationId) => void;
  onOpenFlashcards: () => void;
}

export function HeroStartView({
  sessions,
  completedSessionIds,
  progress,
  onOpenSession,
  onOpenSimulation,
  onOpenFlashcards,
}: HeroStartViewProps) {
  const nextSession =
    sessions.find((s) => !completedSessionIds.includes(s.id)) ?? sessions[0];

  return (
    <div className="mx-auto max-w-7xl px-3 py-5 sm:px-6 sm:py-8 lg:px-8 lg:py-12">
      <section className="grid gap-6 rounded-2xl border border-slate-200 bg-white p-4 sm:gap-8 sm:p-10 lg:grid-cols-12 lg:items-center">
        <div className="min-w-0 lg:col-span-7">
          <p className="font-mono text-xs font-medium uppercase tracking-wider text-sky-800">
            Zero-Prerequisite Study Studio · STP8301 &amp; Sessions 01–11
          </p>
          <h1 className="mt-2.5 font-display text-2xl font-bold tracking-tight text-slate-900 sm:mt-3 sm:text-4xl lg:text-5xl">
            Learn Educational Psychology from Scratch—Clearly &amp; Hands-On.
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 sm:mt-4 sm:text-lg">
            Built for someone starting with zero background in psychology, strictly from your 26
            provided course PDFs, case studies, and syllabus readings. Read plain-English lessons,
            test classic experiments interactively, and lock in key ideas through active recall.
          </p>

          <div className="mt-5 flex flex-col gap-3 sm:mt-7 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
            <button
              type="button"
              onClick={() => onOpenSession(nextSession.id)}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-sky-700 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-sky-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-600 focus-visible:ring-offset-2 sm:w-auto"
            >
              <span>
                {progress.sessionsCompleted > 0
                  ? `Resume Session ${nextSession.number}`
                  : 'Start Session 01: What Is EdPsych?'}
              </span>
              <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => onOpenSimulation('piaget')}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-800 transition-colors hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-600 sm:w-auto"
            >
              <FlaskConical className="h-4 w-4 shrink-0 text-sky-700" aria-hidden="true" />
              <span>Try Interactive Labs</span>
            </button>
          </div>
        </div>

        <div className="min-w-0 rounded-xl border border-slate-200 bg-slate-50 p-4 sm:p-6 lg:col-span-5">
          <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-slate-200 pb-3">
            <h2 className="font-display text-lg font-semibold text-slate-900">
              Your Study Snapshot
            </h2>
            <span className="font-mono text-xs text-slate-500 tabular-nums">
              100% Reference-Grounded
            </span>
          </div>

          <dl className="mt-4 grid grid-cols-3 gap-2 text-center sm:gap-3">
            <div className="min-w-0 rounded-lg border border-slate-200 bg-white p-2.5 sm:p-3">
              <dt className="text-[11px] font-medium text-slate-500 sm:text-xs">Sessions</dt>
              <dd className="mt-1 font-mono text-lg font-semibold text-slate-900 tabular-nums sm:text-xl">
                {progress.sessionsCompleted}/{progress.totalSessions}
              </dd>
            </div>
            <div className="min-w-0 rounded-lg border border-slate-200 bg-white p-2.5 sm:p-3">
              <dt className="text-[11px] font-medium text-slate-500 sm:text-xs">Cards</dt>
              <dd className="mt-1 font-mono text-lg font-semibold text-slate-900 tabular-nums sm:text-xl">
                {progress.cardsMastered}/{progress.totalCards}
              </dd>
            </div>
            <div className="min-w-0 rounded-lg border border-slate-200 bg-white p-2.5 sm:p-3">
              <dt className="text-[11px] font-medium text-slate-500 sm:text-xs">Last Quiz</dt>
              <dd className="mt-1 font-mono text-lg font-semibold text-slate-900 tabular-nums sm:text-xl">
                {progress.lastQuizScorePercent !== null
                  ? `${progress.lastQuizScorePercent}%`
                  : '—'}
              </dd>
            </div>
          </dl>

          <div className="mt-5 space-y-3 border-t border-slate-200 pt-4 text-sm text-slate-700">
            <div className="flex items-start gap-2.5">
              <Compass className="mt-0.5 h-4 w-4 shrink-0 text-sky-700" aria-hidden="true" />
              <p>
                <strong className="font-semibold text-slate-900">1. Read Plainly:</strong> Each
                session translates technical PDF jargon into everyday examples and real student
                stories.
              </p>
            </div>
            <div className="flex items-start gap-2.5">
              <FlaskConical className="mt-0.5 h-4 w-4 shrink-0 text-sky-700" aria-hidden="true" />
              <p>
                <strong className="font-semibold text-slate-900">2. Experiment:</strong> Test 7
                interactive labs covering Piaget, Memory, Skinner, Bronfenbrenner/Kolb, Gagne/Transfer,
                Motivation/Emotion, and Child Study/Personality.
              </p>
            </div>
            <div className="flex items-start gap-2.5">
              <Layers className="mt-0.5 h-4 w-4 shrink-0 text-sky-700" aria-hidden="true" />
              <p>
                <strong className="font-semibold text-slate-900">3. Recall &amp; Compare:</strong>{' '}
                Test yourself with{' '}
                <button
                  type="button"
                  onClick={onOpenFlashcards}
                  className="font-semibold text-sky-700 underline underline-offset-2 hover:text-sky-800"
                >
                  {progress.totalCards} flashcards
                </button>{' '}
                and method/theory comparison tables.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-10" aria-labelledby="roadmap-heading">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2
              id="roadmap-heading"
              className="font-display text-2xl font-bold text-slate-900"
            >
              11-Session Beginner Learning Path
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Follow Sessions 01–11 in order—every topic builds naturally on the previous one.
            </p>
          </div>
          <span className="font-mono text-xs text-slate-500 tabular-nums">
            {progress.sessionPercent}% course roadmap complete
          </span>
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sessions.map((session) => {
            const done = completedSessionIds.includes(session.id);
            return (
              <button
                key={session.id}
                type="button"
                onClick={() => onOpenSession(session.id)}
                className="group flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-5 text-left transition-colors hover:border-sky-400 hover:bg-sky-50/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-600"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 text-xs">
                    <span className="font-mono font-medium text-sky-800">
                      SESSION {session.number} · {session.estimatedMinutes} MIN
                    </span>
                    {done ? (
                      <span className="inline-flex items-center gap-1 font-medium text-emerald-700">
                        <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                        Done
                      </span>
                    ) : (
                      <span className="text-slate-400">Unread</span>
                    )}
                  </div>
                  <h3 className="mt-2 font-display text-lg font-semibold text-slate-900 group-hover:text-sky-800">
                    {session.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm text-slate-600">
                    {session.beginnerHook}
                  </p>
                </div>

                <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-sky-700">
                  <span>Open lesson</span>
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </div>
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
}
