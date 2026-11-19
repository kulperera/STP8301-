import { BookOpen, GraduationCap, Layers, Phone, UserCheck } from 'lucide-react';
import type { StudyTab } from '../data/curriculumTypes';

interface AboutViewProps {
  totalSessions: number;
  totalSimulations: number;
  totalFlashcards: number;
  totalQuizQuestions: number;
  totalGlossaryTerms: number;
  onNavigateTab: (tab: StudyTab) => void;
}

export function AboutView({
  totalSessions,
  totalSimulations,
  totalFlashcards,
  totalQuizQuestions,
  totalGlossaryTerms,
  onNavigateTab,
}: AboutViewProps) {
  return (
    <div className="mx-auto max-w-5xl px-3 py-6 sm:px-6 sm:py-8 lg:px-8">
      <div className="border-b border-slate-200 pb-6">
        <p className="font-mono text-xs font-medium uppercase tracking-wider text-sky-800">
          About This Study Studio · OUSL STP8301
        </p>
        <h1 className="mt-1.5 font-display text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          EdPsych for STP8301 PGDE
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
          An interactive, zero-prerequisite Educational Psychology study companion built exclusively from the STP8301 PGDE (English Medium) course PDFs, Sessions 01–11, and cited syllabus readings.
        </p>
      </div>

      {/* Compiler Details Card */}
      <section
        aria-labelledby="compiler-details-heading"
        className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 sm:p-8"
      >
        <div className="flex flex-col gap-4 border-b border-slate-100 pb-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <span className="font-mono text-xs font-medium uppercase tracking-wider text-sky-800">
              Course Compilation Credit
            </span>
            <h2
              id="compiler-details-heading"
              className="mt-1 font-display text-xl font-bold text-slate-900 sm:text-2xl"
            >
              Compiled by - K.U.L.Perera 0771706664 PGDE English medium
            </h2>
          </div>
          <span className="inline-flex w-fit shrink-0 items-center gap-2 rounded-lg border border-sky-200 bg-sky-50 px-3 py-1.5 font-mono text-xs font-semibold text-sky-800">
            <GraduationCap className="h-4 w-4" aria-hidden="true" />
            PGDE English Medium
          </span>
        </div>

        <dl className="mt-5 grid gap-4 sm:grid-cols-3">
          <div className="min-w-0 rounded-xl border border-slate-200 bg-slate-50 p-4">
            <dt className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-slate-500">
              <UserCheck className="h-3.5 w-3.5 text-sky-700" aria-hidden="true" />
              Compiled By
            </dt>
            <dd className="mt-1.5 break-words font-display text-base font-semibold text-slate-900">
              K.U.L.Perera
            </dd>
          </div>

          <div className="min-w-0 rounded-xl border border-slate-200 bg-slate-50 p-4">
            <dt className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-slate-500">
              <Phone className="h-3.5 w-3.5 text-sky-700" aria-hidden="true" />
              Contact Number
            </dt>
            <dd className="mt-1.5 font-mono text-base font-semibold text-slate-900 tabular-nums">
              <a
                href="tel:0771706664"
                className="text-sky-800 underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-600"
              >
                0771706664
              </a>
            </dd>
          </div>

          <div className="min-w-0 rounded-xl border border-slate-200 bg-slate-50 p-4">
            <dt className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-slate-500">
              <BookOpen className="h-3.5 w-3.5 text-sky-700" aria-hidden="true" />
              Programme &amp; Medium
            </dt>
            <dd className="mt-1.5 break-words font-display text-base font-semibold text-slate-900">
              PGDE English medium
            </dd>
          </div>
        </dl>
      </section>

      {/* Study Studio Scope & Quick Links */}
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <section className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
          <div className="flex items-center gap-2 text-slate-900">
            <Layers className="h-4 w-4 text-sky-700" aria-hidden="true" />
            <h2 className="font-display text-lg font-semibold">
              What Is Covered in STP8301
            </h2>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Designed for learners starting Educational Psychology with zero prior background. Every concept, classroom example, simulation, flashcard, and quiz rationale traces directly to the 26 provided course documents:
          </p>
          <ul className="mt-4 space-y-2 text-sm text-slate-700">
            <li className="flex items-baseline justify-between gap-3 border-b border-slate-100 pb-2">
              <span>Guided Plain-English Sessions</span>
              <span className="font-mono text-xs font-semibold text-sky-800 tabular-nums">
                {totalSessions} Sessions (01–11)
              </span>
            </li>
            <li className="flex items-baseline justify-between gap-3 border-b border-slate-100 pb-2">
              <span>Interactive Psychology Labs</span>
              <span className="font-mono text-xs font-semibold text-sky-800 tabular-nums">
                {totalSimulations} Models
              </span>
            </li>
            <li className="flex items-baseline justify-between gap-3 border-b border-slate-100 pb-2">
              <span>Active Recall Flashcards</span>
              <span className="font-mono text-xs font-semibold text-sky-800 tabular-nums">
                {totalFlashcards} Cards
              </span>
            </li>
            <li className="flex items-baseline justify-between gap-3 border-b border-slate-100 pb-2">
              <span>Diagnostic Practice Questions</span>
              <span className="font-mono text-xs font-semibold text-sky-800 tabular-nums">
                {totalQuizQuestions} Questions
              </span>
            </li>
            <li className="flex items-baseline justify-between gap-3">
              <span>Beginner Glossary Definitions</span>
              <span className="font-mono text-xs font-semibold text-sky-800 tabular-nums">
                {totalGlossaryTerms} Terms
              </span>
            </li>
          </ul>
        </section>

        <section className="min-w-0 flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
          <div>
            <h2 className="font-display text-lg font-semibold text-slate-900">
              Primary Reference Foundation
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Content strictly follows OUSL STP8301 core module readings, Sessions 01–11 lecture guides, Aabriti Sharma (2017) on Piagetian cognitive stages, and Tugba Mutlu (2016) on child study research methods, alongside the syllabus texts and readings.
            </p>
          </div>

          <div className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
            <button
              type="button"
              onClick={() => onNavigateTab('foundations')}
              className="w-full rounded-lg bg-sky-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-sky-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-600 sm:w-auto"
            >
              Open Sessions 01–11
            </button>
            <button
              type="button"
              onClick={() => onNavigateTab('glossary')}
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-600 sm:w-auto"
            >
              View Source Bibliography
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
