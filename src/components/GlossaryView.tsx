import { useMemo, useState } from 'react';
import { BookOpen, Search } from 'lucide-react';
import type {
  GlossaryEntry,
  StudySession,
} from '../data/curriculumTypes';
import type { SyllabusReferenceGroup } from '../data/curriculum';
import { filterGlossary } from '../utils/studyEngine';

interface GlossaryViewProps {
  entries: GlossaryEntry[];
  sessions: StudySession[];
  referenceGroups: SyllabusReferenceGroup[];
  onOpenSession: (sessionId: string) => void;
}

export function GlossaryView({
  entries,
  sessions,
  referenceGroups,
  onOpenSession,
}: GlossaryViewProps) {
  const [query, setQuery] = useState('');
  const [sessionFilter, setSessionFilter] = useState('all');

  const filtered = useMemo(
    () => filterGlossary(entries, query, sessionFilter),
    [entries, query, sessionFilter],
  );

  return (
    <div className="mx-auto max-w-6xl px-3 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
      <div className="border-b border-slate-200 pb-5">
        <p className="font-mono text-xs font-medium uppercase tracking-wider text-sky-800">
          Plain-English Dictionary &amp; Official Bibliography
        </p>
        <h1 className="mt-1 font-display text-2xl font-bold text-slate-900 sm:text-3xl">
          Beginner Glossary &amp; Provided Course References
        </h1>
        <p className="mt-1 text-sm text-slate-600">
          Look up any psychology term in plain language and verify the exact PDF or reading it comes from.
        </p>
      </div>

      {/* Search & Filter */}
      <div className="mt-5 grid gap-3 sm:grid-cols-12">
        <div className="relative min-w-0 sm:col-span-8">
          <Search
            className="pointer-events-none absolute left-3.5 top-3 h-4 w-4 text-slate-400"
            aria-hidden="true"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search term, example, or theorist (e.g., ZPD, Centration)..."
            aria-label="Search glossary terms"
            className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-sky-600 focus:outline-none"
          />
        </div>

        <div className="min-w-0 sm:col-span-4">
          <select
            value={sessionFilter}
            onChange={(e) => setSessionFilter(e.target.value)}
            aria-label="Filter glossary by session"
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-800 focus:border-sky-600 focus:outline-none"
          >
            <option value="all">All Sessions ({entries.length} terms)</option>
            {sessions.map((s) => (
              <option key={s.id} value={s.id}>
                Session {s.number}: {s.shortTitle}
              </option>
            ))}
          </select>
        </div>
      </div>

      <p className="mt-3 font-mono text-xs text-slate-500 tabular-nums">
        Showing {filtered.length} of {entries.length} beginner definitions
      </p>

      {/* Glossary Grid */}
      {filtered.length > 0 ? (
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {filtered.map((item) => (
            <div
              key={item.term}
              className="flex min-w-0 flex-col justify-between rounded-xl border border-slate-200 bg-white p-4 sm:p-5"
            >
              <div>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h2 className="font-display text-lg font-semibold text-slate-900">
                    {item.term}
                  </h2>
                  <button
                    type="button"
                    onClick={() => onOpenSession(item.sessionId)}
                    className="font-mono text-xs font-medium text-sky-700 hover:underline"
                  >
                    Session {item.sessionNumber}
                  </button>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">
                  {item.beginnerDefinition}
                </p>
                <p className="mt-2.5 rounded-lg bg-slate-50 p-3 text-xs leading-relaxed text-slate-700">
                  <strong className="font-semibold text-slate-900">Example:</strong>{' '}
                  {item.example}
                </p>
              </div>
              <p className="mt-3 break-words font-mono text-xs text-slate-500">
                Source: {item.sourceRef}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-4 rounded-xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-600">
          No matching terms found. Try clearing your search filter.
        </div>
      )}

      {/* Official Syllabus & PDF Source Index */}
      <section className="mt-8 rounded-xl border border-slate-200 bg-white p-4 sm:mt-10 sm:p-6">
        <div className="flex items-start gap-2.5 border-b border-slate-200 pb-4">
          <BookOpen className="mt-0.5 h-5 w-5 shrink-0 text-sky-700" aria-hidden="true" />
          <div className="min-w-0">
            <h2 className="font-display text-xl font-bold text-slate-900">
              Complete Syllabus &amp; PDF Source Index
            </h2>
            <p className="text-xs text-slate-600">
              Every definition, case study, simulation, and quiz item in this studio maps strictly to these provided sources.
            </p>
          </div>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-2 sm:gap-5">
          {referenceGroups.map((grp) => (
            <div
              key={grp.unitTitle}
              className="min-w-0 rounded-lg border border-slate-200 bg-slate-50 p-4"
            >
              <span className="font-mono text-xs font-medium text-sky-800">
                UNIT {grp.sessionNumber}
              </span>
              <h3 className="mt-1 font-display text-base font-semibold text-slate-900">
                {grp.unitTitle}
              </h3>

              <div className="mt-2.5">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Provided Course PDFs
                </p>
                <ul className="mt-1 space-y-1 text-xs text-slate-800">
                  {grp.pdfs.map((pdf) => (
                    <li key={pdf} className="break-words">
                      · {pdf}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Cited Texts &amp; Syllabus Readings
                </p>
                <ul className="mt-1 space-y-1 text-xs text-slate-600">
                  {grp.readingsAndCitations.map((ref) => (
                    <li key={ref} className="break-words">
                      · {ref}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
