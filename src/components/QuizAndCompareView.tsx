import { useMemo, useState } from 'react';
import { CheckCircle2, RotateCcw, AlertTriangle, Table2, HelpCircle } from 'lucide-react';
import type {
  MethodComparisonRow,
  QuizQuestion,
  StudySession,
  TheoryComparisonRow,
} from '../data/curriculumTypes';
import { scoreQuizAttempt } from '../utils/studyEngine';

interface QuizAndCompareViewProps {
  questions: QuizQuestion[];
  sessions: StudySession[];
  methodMatrix: MethodComparisonRow[];
  theoryMatrix: TheoryComparisonRow[];
  onSaveQuizScore: (scorePercent: number) => void;
  onOpenSession: (sessionId: string) => void;
}

type SubView = 'quiz' | 'methods-matrix' | 'theories-matrix';

export function QuizAndCompareView({
  questions,
  sessions,
  methodMatrix,
  theoryMatrix,
  onSaveQuizScore,
  onOpenSession,
}: QuizAndCompareViewProps) {
  const [subView, setSubView] = useState<SubView>('quiz');
  const [sessionFilter, setSessionFilter] = useState<string>('all');
  const [questionCountLimit, setQuestionCountLimit] = useState<number>(10);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState<boolean>(false);

  const activeQuestions = useMemo(() => {
    const pool =
      sessionFilter === 'all'
        ? questions
        : questions.filter((q) => q.sessionId === sessionFilter);
    return pool.slice(0, questionCountLimit);
  }, [questions, sessionFilter, questionCountLimit]);

  const result = useMemo(
    () => scoreQuizAttempt(activeQuestions, answers),
    [activeQuestions, answers],
  );

  const handleSelectOption = (questionId: string, optionIdx: number) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [questionId]: optionIdx }));
  };

  const handleSubmit = () => {
    setSubmitted(true);
    onSaveQuizScore(result.scorePercent);
    window.scrollTo(0, 0);
  };

  const handleResetQuiz = () => {
    setAnswers({});
    setSubmitted(false);
  };

  return (
    <div className="mx-auto max-w-7xl px-3 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
      <div className="flex flex-col gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-mono text-xs font-medium uppercase tracking-wider text-sky-800">
            Diagnostic Self-Test &amp; Side-by-Side Comparison Tables
          </p>
          <h1 className="mt-1 font-display text-2xl font-bold text-slate-900 sm:text-3xl">
            Quiz Your Understanding &amp; Compare Frameworks
          </h1>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
          <button
            type="button"
            onClick={() => setSubView('quiz')}
            className={`inline-flex items-center justify-center gap-1.5 rounded-lg border px-3.5 py-2 text-sm font-medium ${
              subView === 'quiz'
                ? 'border-sky-700 bg-sky-700 text-white'
                : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
            }`}
          >
            <HelpCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span>Practice Quiz</span>
          </button>
          <button
            type="button"
            onClick={() => setSubView('methods-matrix')}
            className={`inline-flex items-center justify-center gap-1.5 rounded-lg border px-3.5 py-2 text-sm font-medium ${
              subView === 'methods-matrix'
                ? 'border-sky-700 bg-sky-700 text-white'
                : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Table2 className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span>Child Study Methods Matrix</span>
          </button>
          <button
            type="button"
            onClick={() => setSubView('theories-matrix')}
            className={`inline-flex items-center justify-center gap-1.5 rounded-lg border px-3.5 py-2 text-sm font-medium ${
              subView === 'theories-matrix'
                ? 'border-sky-700 bg-sky-700 text-white'
                : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Table2 className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span>Learning Theories Matrix</span>
          </button>
        </div>
      </div>

      {/* PRACTICE QUIZ */}
      {subView === 'quiz' && (
        <div className="mt-6 space-y-6">
          <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
            <div className="grid gap-3 sm:flex sm:flex-wrap sm:items-center">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-2">
                <label htmlFor="quiz-session-filter" className="text-sm font-medium text-slate-700">
                  Scope:
                </label>
                <select
                  id="quiz-session-filter"
                  value={sessionFilter}
                  onChange={(e) => {
                    setSessionFilter(e.target.value);
                    handleResetQuiz();
                  }}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 sm:w-auto sm:py-1.5"
                >
                  <option value="all">All Sessions (Mixed Review)</option>
                  {sessions.map((s) => (
                    <option key={s.id} value={s.id}>
                      Session {s.number}: {s.shortTitle}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-2">
                <label htmlFor="quiz-length" className="text-sm font-medium text-slate-700">
                  Questions:
                </label>
                <select
                  id="quiz-length"
                  value={questionCountLimit}
                  onChange={(e) => {
                    setQuestionCountLimit(Number(e.target.value));
                    handleResetQuiz();
                  }}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 sm:w-auto sm:py-1.5"
                >
                  <option value={5}>5 Quick Questions</option>
                  <option value={10}>10 Standard Questions</option>
                  <option value={20}>20 Deep Review Questions</option>
                  <option value={questions.length}>
                    Full Course Bank ({questions.length} Questions)
                  </option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 border-t border-slate-100 pt-2 sm:justify-end sm:border-t-0 sm:pt-0">
              <span className="font-mono text-xs text-slate-600 tabular-nums">
                Answered {result.answeredCount}/{result.totalQuestions}
              </span>
              <button
                type="button"
                onClick={handleResetQuiz}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Reset</span>
              </button>
            </div>
          </div>

          {submitted && (
            <section
              aria-live="polite"
              className="rounded-2xl border border-slate-200 bg-white p-6"
            >
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="font-mono text-xs uppercase tracking-wider text-sky-800">
                    Diagnostic Results
                  </p>
                  <h2 className="mt-1 font-display text-2xl font-bold text-slate-900">
                    You scored {result.correctCount} / {result.totalQuestions} (
                    {result.scorePercent}%)
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={handleResetQuiz}
                  className="rounded-lg bg-sky-700 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-800"
                >
                  Retake Quiz
                </button>
              </div>

              {result.weakSessionIds.length > 0 ? (
                <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-950">
                  <div className="flex items-center gap-2 font-semibold">
                    <AlertTriangle className="h-4 w-4 text-amber-700" aria-hidden="true" />
                    <span>Recommended Sessions to Review Based on Missed Items:</span>
                  </div>
                  <div className="mt-2.5 flex flex-wrap gap-2">
                    {result.weakSessionIds.map((sid) => {
                      const s = sessions.find((item) => item.id === sid);
                      if (!s) return null;
                      return (
                        <button
                          key={sid}
                          type="button"
                          onClick={() => onOpenSession(sid)}
                          className="rounded-lg border border-amber-300 bg-white px-3 py-1.5 text-xs font-semibold text-amber-950 hover:bg-amber-100"
                        >
                          Review Session {s.number}: {s.shortTitle}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <p className="mt-3 text-sm font-medium text-emerald-800">
                  Perfect score across every tested session!
                </p>
              )}
            </section>
          )}

          {/* Questions List */}
          <div className="space-y-4">
            {activeQuestions.map((q, qIndex) => {
              const chosen = answers[q.id];
              const isCorrect = chosen === q.correctIndex;
              return (
                <div
                  key={q.id}
                  className="rounded-xl border border-slate-200 bg-white p-4 sm:p-6"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                    <span className="font-mono font-medium text-sky-800">
                      Q{qIndex + 1} · SESSION {q.sessionNumber} · {q.kind.toUpperCase()}
                    </span>
                    <span className="font-mono text-slate-500">{q.sourceRef}</span>
                  </div>

                  <h3 className="mt-2 font-display text-lg font-semibold text-slate-900">
                    {q.question}
                  </h3>

                  <div className="mt-4 space-y-2">
                    {q.options.map((opt, oIdx) => {
                      const selected = chosen === oIdx;
                      const correctOpt = q.correctIndex === oIdx;

                      let cls =
                        'border-slate-200 bg-white text-slate-800 hover:bg-slate-50';
                      if (submitted) {
                        if (correctOpt) {
                          cls =
                            'border-emerald-500 bg-emerald-50 text-emerald-950 font-medium';
                        } else if (selected && !correctOpt) {
                          cls = 'border-amber-500 bg-amber-50 text-amber-950';
                        }
                      } else if (selected) {
                        cls = 'border-sky-600 bg-sky-50 text-sky-950 font-medium';
                      }

                      return (
                        <button
                          key={opt}
                          type="button"
                          disabled={submitted}
                          onClick={() => handleSelectOption(q.id, oIdx)}
                          className={`flex w-full items-start gap-3 rounded-lg border px-4 py-3 text-left text-sm transition-colors ${cls}`}
                        >
                          <span className="mt-0.5 font-mono text-xs font-semibold text-slate-500">
                            {String.fromCharCode(65 + oIdx)}.
                          </span>
                          <span>{opt}</span>
                        </button>
                      );
                    })}
                  </div>

                  {submitted && (
                    <div
                      className={`mt-4 rounded-lg border p-3.5 text-sm ${
                        isCorrect
                          ? 'border-emerald-200 bg-emerald-50 text-emerald-950'
                          : 'border-amber-200 bg-amber-50 text-amber-950'
                      }`}
                    >
                      <p className="font-semibold">
                        {isCorrect ? '✓ Correct' : '✗ Review Reference Rationale'}
                      </p>
                      <p className="mt-1 leading-relaxed">{q.rationale}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {!submitted && activeQuestions.length > 0 && (
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleSubmit}
                className="inline-flex items-center gap-2 rounded-lg bg-sky-700 px-6 py-3 text-sm font-semibold text-white hover:bg-sky-800"
              >
                <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                <span>Submit &amp; Grade Quiz</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* CHILD STUDY METHODS MATRIX */}
      {subView === 'methods-matrix' && (
        <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <div className="border-b border-slate-200 p-4 sm:p-5">
            <h2 className="font-display text-xl font-bold text-slate-900">
              Child Study &amp; Research Methods Side-by-Side (Session 02 &amp; Mutlu)
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Compare how psychologists gather reliable evidence about students—and when each method falls short.
            </p>
          </div>

          {/* Mobile Stacked Cards (Zero horizontal table panning) */}
          <div className="divide-y divide-slate-200 md:hidden">
            {methodMatrix.map((row) => (
              <div key={row.method} className="space-y-2.5 p-4 text-sm">
                <div>
                  <h3 className="font-display text-base font-bold text-slate-900">
                    {row.method}
                  </h3>
                  <p className="mt-0.5 font-mono text-[11px] text-sky-800">{row.sourceRef}</p>
                </div>
                <div>
                  <span className="font-mono text-[11px] font-semibold uppercase text-slate-500">
                    How It Works
                  </span>
                  <p className="mt-0.5 text-slate-700">{row.howItWorks}</p>
                </div>
                <div>
                  <span className="font-mono text-[11px] font-semibold uppercase text-slate-500">
                    Variables / Tools
                  </span>
                  <p className="mt-0.5 text-slate-700">{row.keyVariablesOrTools}</p>
                </div>
                <div>
                  <span className="font-mono text-[11px] font-semibold uppercase text-slate-500">
                    Best Used When
                  </span>
                  <p className="mt-0.5 text-slate-700">{row.bestUsedWhen}</p>
                </div>
                <div className="rounded-lg bg-slate-50 p-3">
                  <span className="font-mono text-[11px] font-semibold uppercase text-amber-800">
                    Limits &amp; Ethics
                  </span>
                  <p className="mt-0.5 text-slate-700">{row.limitationsOrEthics}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Comparison Table */}
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full min-w-[800px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-xs font-semibold uppercase tracking-wider text-slate-600">
                  <th className="p-4">Method</th>
                  <th className="p-4">How It Works</th>
                  <th className="p-4">Variables / Tools</th>
                  <th className="p-4">Best Used When</th>
                  <th className="p-4">Limits &amp; Ethics</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {methodMatrix.map((row) => (
                  <tr key={row.method} className="align-top hover:bg-slate-50/70">
                    <td className="p-4 font-semibold text-slate-900">
                      <div>{row.method}</div>
                      <div className="mt-1 font-mono text-[11px] font-normal text-sky-800">
                        {row.sourceRef}
                      </div>
                    </td>
                    <td className="p-4 text-slate-700">{row.howItWorks}</td>
                    <td className="p-4 text-slate-700">{row.keyVariablesOrTools}</td>
                    <td className="p-4 text-slate-700">{row.bestUsedWhen}</td>
                    <td className="p-4 text-slate-700">{row.limitationsOrEthics}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* LEARNING THEORIES MATRIX */}
      {subView === 'theories-matrix' && (
        <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <div className="border-b border-slate-200 p-4 sm:p-5">
            <h2 className="font-display text-xl font-bold text-slate-900">
              Comparing Major Learning &amp; Psychology Perspectives (Sessions 04, 08, 09, 10, 11)
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Spot how Behavioural, Cognitive, Social, Humanistic, Motivation/Affective, and Personality traditions each explain learners differently.
            </p>
          </div>

          {/* Mobile Stacked Cards */}
          <div className="divide-y divide-slate-200 md:hidden">
            {theoryMatrix.map((row) => (
              <div key={row.perspective} className="space-y-2.5 p-4 text-sm">
                <div>
                  <h3 className="font-display text-base font-bold text-slate-900">
                    {row.perspective}
                  </h3>
                  <p className="mt-0.5 font-mono text-[11px] text-sky-800">{row.sourceRef}</p>
                </div>
                <div>
                  <span className="font-mono text-[11px] font-semibold uppercase text-slate-500">
                    Key Theorists
                  </span>
                  <p className="mt-0.5 text-slate-700">{row.keyTheorists}</p>
                </div>
                <div>
                  <span className="font-mono text-[11px] font-semibold uppercase text-slate-500">
                    How Learning Happens
                  </span>
                  <p className="mt-0.5 text-slate-700">{row.howLearningHappens}</p>
                </div>
                <div>
                  <span className="font-mono text-[11px] font-semibold uppercase text-slate-500">
                    Teacher &amp; Student Roles
                  </span>
                  <p className="mt-0.5 text-slate-700">{row.roleOfTeacherAndStudent}</p>
                </div>
                <div className="rounded-lg bg-slate-50 p-3">
                  <span className="font-mono text-[11px] font-semibold uppercase text-sky-800">
                    Classroom Example
                  </span>
                  <p className="mt-0.5 text-slate-700">{row.classroomExample}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Comparison Table */}
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full min-w-[800px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-xs font-semibold uppercase tracking-wider text-slate-600">
                  <th className="p-4">Perspective</th>
                  <th className="p-4">Key Theorists</th>
                  <th className="p-4">How Learning Happens</th>
                  <th className="p-4">Teacher &amp; Student Roles</th>
                  <th className="p-4">Classroom Example</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {theoryMatrix.map((row) => (
                  <tr key={row.perspective} className="align-top hover:bg-slate-50/70">
                    <td className="p-4 font-semibold text-slate-900">
                      <div>{row.perspective}</div>
                      <div className="mt-1 font-mono text-[11px] font-normal text-sky-800">
                        {row.sourceRef}
                      </div>
                    </td>
                    <td className="p-4 text-slate-700">{row.keyTheorists}</td>
                    <td className="p-4 text-slate-700">{row.howLearningHappens}</td>
                    <td className="p-4 text-slate-700">{row.roleOfTeacherAndStudent}</td>
                    <td className="p-4 text-slate-700">{row.classroomExample}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
