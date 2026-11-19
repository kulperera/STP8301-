import { useEffect, useState } from 'react';
import {
  ArrowRight,
  BookMarked,
  CheckCircle2,
  Circle,
  FlaskConical,
  HelpCircle,
  Lightbulb,
  Users,
} from 'lucide-react';
import type { SimulationId, StudySession } from '../data/curriculumTypes';

interface CurriculumViewProps {
  sessions: StudySession[];
  activeSessionId: string;
  completedSessionIds: string[];
  onSelectSession: (sessionId: string) => void;
  onToggleComplete: (sessionId: string) => void;
  onOpenSimulation: (simId: SimulationId) => void;
}

const SESSION_SIM_LINKS: Partial<
  Record<string, { simId: SimulationId; label: string }>
> = {
  s02: { simId: 'personality-methods', label: 'Try Child Study Method Chooser' },
  s04: { simId: 'ecology-styles', label: 'Explore Bronfenbrenner Rings Lab' },
  s07: { simId: 'ecology-styles', label: 'Test Kolb & Gardner Styles Lab' },
  s08: { simId: 'memory', label: 'Experiment with Memory & Piaget Labs' },
  s09: { simId: 'gagne-transfer', label: 'Try Gagne 8 Skills & Schedules Labs' },
  s10: { simId: 'motivation-emotion', label: 'Simulate Motivation & Emotion Lab' },
  s11: { simId: 'personality-methods', label: 'Analyze 6 Personality Lenses Lab' },
};

export function CurriculumView({
  sessions,
  activeSessionId,
  completedSessionIds,
  onSelectSession,
  onToggleComplete,
  onOpenSimulation,
}: CurriculumViewProps) {
  const activeIndex = Math.max(
    0,
    sessions.findIndex((s) => s.id === activeSessionId),
  );
  const session = sessions[activeIndex] ?? sessions[0];
  const isCompleted = completedSessionIds.includes(session.id);
  const nextSession =
    activeIndex < sessions.length - 1 ? sessions[activeIndex + 1] : null;
  const linkedSim = SESSION_SIM_LINKS[session.id];

  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [checkedAnswer, setCheckedAnswer] = useState(false);

  useEffect(() => {
    setSelectedOption(null);
    setCheckedAnswer(false);
  }, [session.id]);

  return (
    <div className="mx-auto max-w-7xl px-3 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
      <div className="grid gap-5 lg:grid-cols-12 lg:gap-6">
        {/* Session Rail (Mobile Select + Desktop Sidebar) */}
        <aside
          aria-label="Course sessions"
          className="min-w-0 lg:col-span-4 xl:col-span-3"
        >
          <div className="rounded-xl border border-slate-200 bg-white p-3 lg:sticky lg:top-20">
            <div className="flex items-center justify-between border-b border-slate-200 px-1 pb-2.5 lg:px-2">
              <span className="font-mono text-xs font-medium uppercase tracking-wider text-slate-600">
                Sessions 01–11
              </span>
              <span className="font-mono text-xs text-slate-500 tabular-nums">
                {completedSessionIds.length}/{sessions.length} done
              </span>
            </div>

            {/* Mobile dropdown switcher */}
            <div className="mt-2.5 lg:hidden">
              <label htmlFor="mobile-session-select" className="sr-only">
                Jump to session
              </label>
              <select
                id="mobile-session-select"
                value={session.id}
                onChange={(e) => onSelectSession(e.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2.5 text-sm font-medium text-slate-900 focus:border-sky-600 focus:outline-none"
              >
                {sessions.map((item) => {
                  const done = completedSessionIds.includes(item.id);
                  return (
                    <option key={item.id} value={item.id}>
                      {item.number} · {item.shortTitle} {done ? '(Completed)' : ''}
                    </option>
                  );
                })}
              </select>
            </div>

            {/* Desktop vertical session rail */}
            <div className="mt-2 hidden gap-1 lg:flex lg:flex-col">
              {sessions.map((item) => {
                const active = item.id === session.id;
                const done = completedSessionIds.includes(item.id);
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onSelectSession(item.id)}
                    aria-current={active ? 'step' : undefined}
                    className={`flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-600 ${
                      active
                        ? 'bg-sky-50 font-semibold text-sky-900'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span className="flex min-w-0 items-center gap-2.5">
                      <span className="font-mono text-xs text-slate-500">
                        {item.number}
                      </span>
                      <span className="truncate">{item.shortTitle}</span>
                    </span>
                    {done ? (
                      <CheckCircle2
                        className="h-4 w-4 shrink-0 text-emerald-700"
                        aria-label="Completed"
                      />
                    ) : (
                      <Circle
                        className="h-4 w-4 shrink-0 text-slate-300"
                        aria-label="Not completed"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        {/* Lesson Workspace */}
        <article className="min-w-0 space-y-6 lg:col-span-8 xl:col-span-9">
          <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4">
              <div className="font-mono text-xs font-medium text-sky-800">
                SESSION {session.number} · ~{session.estimatedMinutes} MIN READ ·{' '}
                {isCompleted ? 'COMPLETED' : 'IN PROGRESS'}
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {linkedSim && (
                  <button
                    type="button"
                    onClick={() => onOpenSimulation(linkedSim.simId)}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-sky-200 bg-sky-50 px-3 py-1.5 text-xs font-semibold text-sky-800 transition-colors hover:bg-sky-100"
                  >
                    <FlaskConical className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    <span>{linkedSim.label}</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => onToggleComplete(session.id)}
                  className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors ${
                    isCompleted
                      ? 'border-emerald-300 bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
                      : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  <span>{isCompleted ? 'Completed' : 'Mark Complete'}</span>
                </button>
              </div>
            </div>

            <h1 className="mt-4 font-display text-xl font-bold text-slate-900 sm:mt-5 sm:text-3xl">
              {session.title}
            </h1>
            <p className="mt-3 text-sm font-medium leading-relaxed text-sky-900 sm:text-base">
              {session.beginnerHook}
            </p>

            {/* In Plain English Box */}
            <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4 sm:mt-6 sm:p-5">
              <h2 className="font-display text-lg font-semibold text-slate-900">
                In Plain English (Zero-Prior-Knowledge Summary)
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-700 sm:text-base">
                {session.inPlainEnglish}
              </p>
              <p className="mt-3 border-t border-slate-200 pt-3 text-sm text-slate-600">
                <strong className="font-semibold text-slate-800">Why learn this first:</strong>{' '}
                {session.whyItMattersForZeroPriorKnowledge}
              </p>
            </div>

            {/* Key Questions */}
            <div className="mt-6">
              <h2 className="font-display text-base font-semibold text-slate-900">
                Questions You Will Answer Here
              </h2>
              <ul className="mt-2.5 grid gap-2 sm:grid-cols-2">
                {session.keyQuestionsAnswered.map((q) => (
                  <li
                    key={q}
                    className="flex items-start gap-2 rounded-lg border border-slate-200 bg-white p-3 text-sm text-slate-700"
                  >
                    <HelpCircle
                      className="mt-0.5 h-4 w-4 shrink-0 text-sky-700"
                      aria-hidden="true"
                    />
                    <span>{q}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Core Concepts */}
          <section className="space-y-4" aria-label="Core reference concepts">
            <h2 className="font-display text-xl font-bold text-slate-900">
              Core Ideas Explained Step-by-Step
            </h2>
            {session.concepts.map((concept) => (
              <div
                key={concept.title}
                className="rounded-xl border border-slate-200 bg-white p-4 sm:p-6"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-display text-lg font-semibold text-slate-900">
                    {concept.title}
                  </h3>
                  <span className="font-mono text-xs text-slate-500">
                    {concept.sourceTag}
                  </span>
                </div>
                <p className="mt-2 text-sm font-medium text-slate-700 sm:text-base">
                  {concept.plainExplanation}
                </p>
                <ul className="mt-3 space-y-2 border-t border-slate-100 pt-3 text-sm leading-relaxed text-slate-700">
                  {concept.details.map((detail) => (
                    <li key={detail} className="flex items-start gap-2.5">
                      <span
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-sm bg-sky-700"
                        aria-hidden="true"
                      />
                      <span className="min-w-0 break-words">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          {/* Real Case Studies from the PDFs */}
          {session.caseStudies.length > 0 && (
            <section className="space-y-4" aria-label="Course case studies">
              <h2 className="font-display text-xl font-bold text-slate-900">
                Real Case Studies &amp; Experiments in Your Readings
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                {session.caseStudies.map((cs) => (
                  <div
                    key={cs.title}
                    className="min-w-0 rounded-xl border border-slate-200 bg-white p-4 sm:p-5"
                  >
                    <span className="font-mono text-xs text-sky-800">
                      CASE STUDY · {cs.sourceTag}
                    </span>
                    <h3 className="mt-1.5 font-display text-lg font-semibold text-slate-900">
                      {cs.title}
                    </h3>
                    <p className="mt-2 text-sm text-slate-600">{cs.context}</p>
                    <p className="mt-2 text-sm leading-relaxed text-slate-800">
                      <strong className="font-semibold">What happened:</strong>{' '}
                      {cs.whatHappened}
                    </p>
                    <p className="mt-3 rounded-lg bg-slate-50 p-3 text-sm text-slate-800">
                      <strong className="font-semibold text-sky-900">Lesson:</strong>{' '}
                      {cs.psychologyTakeaway}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Theorist Spotlights & Takeaways */}
          <div className="grid gap-6 md:grid-cols-12">
            <section className="min-w-0 rounded-xl border border-slate-200 bg-white p-4 sm:p-6 md:col-span-7">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-sky-700" aria-hidden="true" />
                <h2 className="font-display text-lg font-bold text-slate-900">
                  Key People to Know
                </h2>
              </div>
              <div className="mt-4 space-y-4">
                {session.theorists.map((t) => (
                  <div
                    key={t.name}
                    className="border-b border-slate-100 pb-3 last:border-b-0 last:pb-0"
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="font-sans text-sm font-bold text-slate-900">
                        {t.name}
                      </h3>
                      <span className="font-mono text-xs text-slate-500">
                        {t.eraOrWork}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-slate-700">{t.coreIdea}</p>
                    <p className="mt-1 text-xs text-sky-800">
                      Classroom link: {t.classroomLink}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section className="min-w-0 rounded-xl border border-slate-200 bg-white p-4 sm:p-6 md:col-span-5">
              <div className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 shrink-0 text-amber-700" aria-hidden="true" />
                <h2 className="font-display text-lg font-bold text-slate-900">
                  Practical Takeaways
                </h2>
              </div>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-slate-700">
                {session.teacherTakeaways.map((tip) => (
                  <li key={tip} className="flex items-start gap-2.5">
                    <CheckCircle2
                      className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700"
                      aria-hidden="true"
                    />
                    <span className="min-w-0 break-words">{tip}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Inline Understanding Check */}
          <section className="rounded-xl border border-slate-200 bg-white p-4 sm:p-6">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="font-display text-lg font-bold text-slate-900">
                Quick Check: Did This Idea Click?
              </h2>
              <span className="font-mono text-xs text-slate-500">
                {session.miniCheck.sourceTag}
              </span>
            </div>
            <p className="mt-2 text-sm font-medium text-slate-800 sm:text-base">
              {session.miniCheck.question}
            </p>
            <div className="mt-4 space-y-2">
              {session.miniCheck.options.map((opt, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = idx === session.miniCheck.correctIndex;
                let borderStyle = 'border-slate-200 bg-white hover:bg-slate-50';
                if (checkedAnswer) {
                  if (isCorrect) {
                    borderStyle = 'border-emerald-400 bg-emerald-50 text-emerald-950';
                  } else if (isSelected && !isCorrect) {
                    borderStyle = 'border-amber-400 bg-amber-50 text-amber-950';
                  }
                } else if (isSelected) {
                  borderStyle = 'border-sky-600 bg-sky-50 text-sky-950';
                }

                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => {
                      setSelectedOption(idx);
                      setCheckedAnswer(true);
                    }}
                    className={`flex w-full items-start gap-3 rounded-lg border px-3.5 py-3 text-left text-sm transition-colors sm:px-4 ${borderStyle}`}
                  >
                    <span className="mt-0.5 shrink-0 font-mono text-xs font-semibold text-slate-500">
                      {String.fromCharCode(65 + idx)}.
                    </span>
                    <span className="min-w-0 break-words">{opt}</span>
                  </button>
                );
              })}
            </div>

            {checkedAnswer && selectedOption !== null && (
              <div
                role="status"
                className={`mt-4 rounded-lg border p-4 text-sm ${
                  selectedOption === session.miniCheck.correctIndex
                    ? 'border-emerald-300 bg-emerald-50 text-emerald-950'
                    : 'border-amber-300 bg-amber-50 text-amber-950'
                }`}
              >
                <p className="font-semibold">
                  {selectedOption === session.miniCheck.correctIndex
                    ? 'Correct — nicely reasoned!'
                    : 'Not quite — review why:'}
                </p>
                <p className="mt-1 leading-relaxed">{session.miniCheck.explanation}</p>
              </div>
            )}
          </section>

          {/* Sources & Next Session Footer */}
          <footer className="flex flex-col justify-between gap-4 rounded-xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center sm:p-6">
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-500">
                <BookMarked className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                <span>Exact Sources for Session {session.number}</span>
              </div>
              <ul className="mt-1.5 space-y-0.5 text-xs text-slate-600">
                {session.sources.map((src) => (
                  <li key={src.citation} className="break-words">
                    · {src.citation}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
              {!isCompleted && (
                <button
                  type="button"
                  onClick={() => onToggleComplete(session.id)}
                  className="w-full rounded-lg border border-emerald-600 bg-emerald-700 px-4 py-2.5 text-center text-sm font-semibold text-white hover:bg-emerald-800 sm:w-auto"
                >
                  Mark Session {session.number} Complete
                </button>
              )}
              {nextSession && (
                <button
                  type="button"
                  onClick={() => onSelectSession(nextSession.id)}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-sky-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-sky-800 sm:w-auto"
                >
                  <span>Next: {nextSession.number} {nextSession.shortTitle}</span>
                  <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                </button>
              )}
            </div>
          </footer>
        </article>
      </div>
    </div>
  );
}
