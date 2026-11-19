import { useMemo, useState } from 'react';
import { CheckCircle2, RotateCcw, Eye, ArrowLeft, ArrowRight } from 'lucide-react';
import type { FlashcardItem, StudySession } from '../data/curriculumTypes';
import { orderFlashcards } from '../utils/studyEngine';

interface FlashcardsViewProps {
  cards: FlashcardItem[];
  sessions: StudySession[];
  masteredCardIds: string[];
  onSetCardMastered: (cardId: string, mastered: boolean) => void;
}

export function FlashcardsView({
  cards,
  sessions,
  masteredCardIds,
  onSetCardMastered,
}: FlashcardsViewProps) {
  const [sessionFilter, setSessionFilter] = useState<string>('all');
  const [unmasteredFirst, setUnmasteredFirst] = useState<boolean>(true);
  const [cardIndex, setCardIndex] = useState<number>(0);
  const [flipped, setFlipped] = useState<boolean>(false);

  const orderedCards = useMemo(
    () => orderFlashcards(cards, masteredCardIds, sessionFilter, unmasteredFirst),
    [cards, masteredCardIds, sessionFilter, unmasteredFirst],
  );

  const safeIndex =
    orderedCards.length > 0 ? Math.min(cardIndex, orderedCards.length - 1) : 0;
  const activeCard = orderedCards[safeIndex];
  const isMastered = activeCard ? masteredCardIds.includes(activeCard.id) : false;

  const handleFilterChange = (nextFilter: string) => {
    setSessionFilter(nextFilter);
    setCardIndex(0);
    setFlipped(false);
  };

  const handleNext = () => {
    if (orderedCards.length === 0) return;
    setCardIndex((prev) => (prev + 1) % orderedCards.length);
    setFlipped(false);
  };

  const handlePrev = () => {
    if (orderedCards.length === 0) return;
    setCardIndex((prev) => (prev - 1 + orderedCards.length) % orderedCards.length);
    setFlipped(false);
  };

  const masteredInFilter = orderedCards.filter((c) =>
    masteredCardIds.includes(c.id),
  ).length;

  return (
    <div className="mx-auto max-w-5xl px-3 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
      <div className="flex flex-col gap-3 border-b border-slate-200 pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-mono text-xs font-medium uppercase tracking-wider text-sky-800">
            Active Recall · Reference-Grounded Flashcards
          </p>
          <h1 className="mt-1 font-display text-2xl font-bold text-slate-900 sm:text-3xl">
            Study Cards Across Sessions 01–11
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            Read the prompt, try answering from memory before flipping, and mark cards you have mastered.
          </p>
        </div>
        <div className="font-mono text-sm text-slate-700 tabular-nums">
          Mastered: <strong>{masteredInFilter}</strong> / {orderedCards.length}
        </div>
      </div>

      {/* Filter Bar */}
      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-2">
          <label htmlFor="flashcard-session-select" className="text-sm font-medium text-slate-700">
            Filter by Session:
          </label>
          <select
            id="flashcard-session-select"
            value={sessionFilter}
            onChange={(e) => handleFilterChange(e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 focus:border-sky-600 focus:outline-none sm:w-auto"
          >
            <option value="all">All Sessions ({cards.length} cards)</option>
            {sessions.map((s) => (
              <option key={s.id} value={s.id}>
                Session {s.number}: {s.shortTitle}
              </option>
            ))}
          </select>
        </div>

        <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-700">
          <input
            type="checkbox"
            checked={unmasteredFirst}
            onChange={(e) => {
              setUnmasteredFirst(e.target.checked);
              setCardIndex(0);
              setFlipped(false);
            }}
            className="h-4 w-4 rounded border-slate-300 text-sky-700 focus:ring-sky-600"
          />
          <span>Show cards needing review first</span>
        </label>
      </div>

      {/* Active Card Stage */}
      {activeCard ? (
        <div className="mt-5 sm:mt-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-10">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4 text-xs">
              <span className="font-mono font-medium text-sky-800">
                CARD {safeIndex + 1} OF {orderedCards.length} · SESSION {activeCard.sessionNumber}
              </span>
              <span
                className={`font-medium ${
                  isMastered ? 'text-emerald-700' : 'text-amber-700'
                }`}
              >
                {isMastered ? '● Mastered' : '▲ Needs Review'}
              </span>
            </div>

            <div className="mt-5 min-h-[180px] sm:mt-6 sm:min-h-[210px]">
              <p className="font-mono text-xs uppercase tracking-wider text-slate-500">
                {activeCard.term}
              </p>

              {!flipped ? (
                <div className="mt-3">
                  <h2 className="font-display text-lg font-semibold leading-snug text-slate-900 sm:text-2xl">
                    {activeCard.prompt}
                  </h2>
                  <p className="mt-5 text-sm text-slate-500 sm:mt-6">
                    Pause and state your own plain-English answer before revealing the back.
                  </p>
                </div>
              ) : (
                <div className="mt-3 space-y-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-emerald-800">
                      Reference Answer
                    </p>
                    <p className="mt-1 font-display text-lg font-semibold leading-snug text-slate-900 sm:text-2xl">
                      {activeCard.answer}
                    </p>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-3.5 text-sm text-slate-700 sm:p-4">
                    <strong className="font-semibold text-slate-900">Concrete Example:</strong>{' '}
                    {activeCard.concreteExample}
                  </div>
                  <p className="font-mono text-xs text-slate-500">
                    Source: {activeCard.sourceRef}
                  </p>
                </div>
              )}
            </div>

            {/* Card Actions */}
            <div className="mt-6 flex flex-col gap-3 border-t border-slate-100 pt-5 sm:mt-8 sm:flex-row sm:items-center sm:justify-between">
              <div className="grid grid-cols-3 gap-2 sm:flex sm:items-center">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="inline-flex items-center justify-center gap-1 rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 sm:px-3.5 sm:py-2"
                >
                  <ArrowLeft className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>Prev</span>
                </button>
                <button
                  type="button"
                  onClick={() => setFlipped((f) => !f)}
                  className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-sky-700 px-3 py-2.5 text-sm font-semibold text-white hover:bg-sky-800 sm:px-4 sm:py-2"
                >
                  <Eye className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>{flipped ? 'Prompt' : 'Reveal'}</span>
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="inline-flex items-center justify-center gap-1 rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 sm:px-3.5 sm:py-2"
                >
                  <span>Next</span>
                  <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2 sm:flex sm:items-center">
                <button
                  type="button"
                  onClick={() => {
                    onSetCardMastered(activeCard.id, false);
                    handleNext();
                  }}
                  className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-amber-300 bg-amber-50 px-3 py-2.5 text-sm font-semibold text-amber-900 hover:bg-amber-100 sm:px-3.5 sm:py-2"
                >
                  <RotateCcw className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>Still Learning</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onSetCardMastered(activeCard.id, true);
                    handleNext();
                  }}
                  className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-emerald-600 bg-emerald-700 px-3 py-2.5 text-sm font-semibold text-white hover:bg-emerald-800 sm:px-3.5 sm:py-2"
                >
                  <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>Mastered</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-6 rounded-xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-600">
          No flashcards found for this selection.
        </div>
      )}
    </div>
  );
}
