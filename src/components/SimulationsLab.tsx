import { useState } from 'react';
import { RotateCcw, Sliders, Sparkles } from 'lucide-react';
import type { SimulationId } from '../data/curriculumTypes';
import {
  analyzePersonalityCase,
  BICYCLE_SCHEMA_STEPS,
  evaluateEmotionCognition,
  evaluateGagneHierarchy,
  evaluateKolbQuadrant,
  evaluatePiagetConservation,
  evaluateTransferScenario,
  GAGNE_INTELLECTUAL_SKILLS,
  GAGNE_NINE_EVENTS,
  MASLOW_NEEDS_TIERS,
  PLUTCHIK_BLENDS,
  recommendChildStudyMethod,
  simulateMemoryPipeline,
  simulateSkinnerSchedule,
  simulateWeinerAttribution,
  type ChildStudyScenarioId,
  type ConservationTaskType,
  type EmotionCognitionInput,
  type PersonalityLensId,
  type PiagetStageOption,
  type SkinnerScheduleType,
  type WeinerCauseId,
} from '../utils/studyEngine';

interface SimulationsLabProps {
  activeSimulation: SimulationId;
  onSelectSimulation: (simId: SimulationId) => void;
  onJumpToSession: (sessionId: string) => void;
}

const SIM_TABS: { id: SimulationId; label: string; sessionRef: string }[] = [
  { id: 'piaget', label: 'Piaget Conservation & Schemas', sessionRef: 's08' },
  { id: 'memory', label: 'Gagne Memory Pipeline', sessionRef: 's08' },
  { id: 'conditioning', label: 'Skinner Schedules & Pavlov', sessionRef: 's09' },
  { id: 'ecology-styles', label: 'Bronfenbrenner & Kolb Styles', sessionRef: 's04' },
  { id: 'gagne-transfer', label: 'Gagne 8 Skills & Transfer', sessionRef: 's09' },
  { id: 'motivation-emotion', label: 'Motivation & Emotion Lab', sessionRef: 's10' },
  { id: 'personality-methods', label: 'Child Study & Personality', sessionRef: 's11' },
];

const ECOLOGY_LAYERS = [
  {
    id: 'micro',
    name: 'Microsystem',
    radius: 54,
    color: '#0369a1',
    bg: '#e0f2fe',
    plainMeaning: 'People and places the child directly interacts with every day.',
    examples: 'Parents at dinner, Grade 4 classroom teacher, playground friends.',
  },
  {
    id: 'meso',
    name: 'Mesosystem',
    radius: 92,
    color: '#0284c7',
    bg: '#f0f9ff',
    plainMeaning: 'Connections and communication bridges between Microsystems.',
    examples: 'Parent-teacher conferences, family alignment with school homework rules.',
  },
  {
    id: 'exo',
    name: 'Exosystem',
    radius: 130,
    color: '#1d4ed8',
    bg: '#eff6ff',
    plainMeaning: 'Settings the child never visits directly that still impact daily care.',
    examples: 'Parent’s night-shift factory schedule, school district funding policies.',
  },
  {
    id: 'macro',
    name: 'Macrosystem',
    radius: 168,
    color: '#334155',
    bg: '#f8fafc',
    plainMeaning: 'Wider cultural beliefs, laws, economic conditions, and values.',
    examples: 'Cultural view of adolescent independence (Margaret Mead), exam culture.',
  },
  {
    id: 'chrono',
    name: 'Chronosystem',
    radius: 204,
    color: '#475569',
    bg: '#f1f5f9',
    plainMeaning: 'Time dimension: life transitions and historical events shaping growth.',
    examples: 'Parental divorce, changing schools, pandemic digital transition.',
  },
];

const GARDNER_DOMAINS = [
  { name: 'Verbal-Linguistic', cue: 'Storytelling, debates, explaining ideas clearly in words' },
  { name: 'Logical-Mathematical', cue: 'Patterns, cause-effect puzzles, step-by-step reasoning' },
  { name: 'Visual-Spatial', cue: 'Diagrams, mental maps, geometry, sketching ideas' },
  { name: 'Bodily-Kinesthetic', cue: 'Hands-on building, role-play, physical movement' },
  { name: 'Musical-Rhythmic', cue: 'Rhythm, chant mnemonics, tone sensitivity' },
  { name: 'Interpersonal', cue: 'Reading others’ moods, peer tutoring, group harmony' },
  { name: 'Intrapersonal', cue: 'Quiet self-reflection, setting personal study goals' },
  { name: 'Naturalistic', cue: 'Sorting living things, noticing environmental patterns' },
  { name: 'Existential (Table 1)', cue: 'Asking big "why" questions about purpose & life' },
];

export function SimulationsLab({
  activeSimulation,
  onSelectSimulation,
  onJumpToSession,
}: SimulationsLabProps) {
  // 1. Piaget state
  const [piagetTask, setPiagetTask] = useState<ConservationTaskType>('liquid-glass');
  const [piagetTransformed, setPiagetTransformed] = useState<boolean>(false);
  const [piagetStage, setPiagetStage] = useState<PiagetStageOption>('pre-operational');
  const [schemaStepIdx, setSchemaStepIdx] = useState<number>(0);

  // 2. Memory pipeline state
  const [attentionLevel, setAttentionLevel] = useState<number>(70);
  const [chunkingEnabled, setChunkingEnabled] = useState<boolean>(false);
  const [rehearsalMinutes, setRehearsalMinutes] = useState<number>(8);
  const [interferenceLoad, setInterferenceLoad] = useState<number>(25);
  const [itemsCount, setItemsCount] = useState<number>(11);

  // 3. Conditioning state
  const [skinnerSchedule, setSkinnerSchedule] = useState<SkinnerScheduleType>('variable-ratio');
  const [pavlovStep, setPavlovStep] = useState<number>(1);

  // 4. Bronfenbrenner & Kolb state
  const [selectedLayerId, setSelectedLayerId] = useState<string>('meso');
  const [thinkingScore, setThinkingScore] = useState<number>(20);
  const [watchingScore, setWatchingScore] = useState<number>(-20);

  // 5. Gagne & Transfer state
  const [gagneTargetLevel, setGagneTargetLevel] = useState<number>(7);
  const [gagneMasteredLevels, setGagneMasteredLevels] = useState<number[]>([1, 2, 3, 4, 5, 6]);
  const [activeGagneEvent, setActiveGagneEvent] = useState<number>(1);
  const [transferSimilarity, setTransferSimilarity] = useState<'similar-classroom' | 'broad-life'>('similar-classroom');
  const [oldHabitClashes, setOldHabitClashes] = useState<boolean>(false);
  const [firstTaskMastered, setFirstTaskMastered] = useState<boolean>(true);
  const [overlearningActive, setOverlearningActive] = useState<boolean>(true);

  // 6. Motivation & Emotion state
  const [selectedMaslowLevel, setSelectedMaslowLevel] = useState<number>(5);
  const [weinerCause, setWeinerCause] = useState<WeinerCauseId>('effort-strategy');
  const [moodState, setMoodState] = useState<EmotionCognitionInput['moodState']>('joyful-warm');
  const [learningMaterial, setLearningMaterial] =
    useState<EmotionCognitionInput['learningMaterial']>('candle-insight');

  // 7. Child Study Methods & Personality state
  const [studyScenario, setStudyScenario] = useState<ChildStudyScenarioId>('single-grade7-drop');
  const [personalityLens, setPersonalityLens] = useState<PersonalityLensId>('neo-freudian-adler');

  const piagetResult = evaluatePiagetConservation(
    piagetStage,
    piagetTask,
    piagetTransformed,
  );
  const schemaStep = BICYCLE_SCHEMA_STEPS[schemaStepIdx];

  const memoryResult = simulateMemoryPipeline({
    attentionLevel,
    chunkingEnabled,
    rehearsalMinutes,
    interferenceLoad,
    itemsCount,
  });

  const skinnerResult = simulateSkinnerSchedule(skinnerSchedule);
  const kolbResult = evaluateKolbQuadrant({ thinkingScore, watchingScore });
  const selectedLayer =
    ECOLOGY_LAYERS.find((l) => l.id === selectedLayerId) ?? ECOLOGY_LAYERS[0];

  const gagneResult = evaluateGagneHierarchy(gagneTargetLevel, gagneMasteredLevels);
  const transferResult = evaluateTransferScenario({
    similarity: transferSimilarity,
    oldHabitClashes,
    firstTaskMastered,
    overlearningActive,
  });
  const selectedMaslow =
    MASLOW_NEEDS_TIERS.find((t) => t.level === selectedMaslowLevel) ?? MASLOW_NEEDS_TIERS[0];
  const weinerResult = simulateWeinerAttribution(weinerCause);
  const emotionResult = evaluateEmotionCognition({ moodState, learningMaterial });
  const studyMethodResult = recommendChildStudyMethod(studyScenario);
  const personalityResult = analyzePersonalityCase(personalityLens);

  const toggleMasteredGagne = (lvl: number) => {
    setGagneMasteredLevels((prev) =>
      prev.includes(lvl) ? prev.filter((item) => item !== lvl) : [...prev, lvl].sort((a, b) => a - b),
    );
  };

  const activeMeta = SIM_TABS.find((t) => t.id === activeSimulation) ?? SIM_TABS[0];

  return (
    <div className="mx-auto max-w-7xl px-3 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
      <div className="flex flex-col gap-3 border-b border-slate-200 pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-mono text-xs font-medium uppercase tracking-wider text-sky-800">
            Interactive Psychology Labs · See Concepts Move
          </p>
          <h1 className="mt-1 font-display text-2xl font-bold text-slate-900 sm:text-3xl">
            Experiment With Core Educational Psychology Models
          </h1>
        </div>
        <button
          type="button"
          onClick={() => onJumpToSession(activeMeta.sessionRef)}
          className="self-start rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 sm:self-auto"
        >
          Read Matching Session {activeMeta.sessionRef.replace('s', '')}
        </button>
      </div>

      {/* Lab Selector Tabs */}
      <div
        role="tablist"
        aria-label="Interactive simulations"
        className="mt-5 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap"
      >
        {SIM_TABS.map((tab) => {
          const active = tab.id === activeSimulation;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => onSelectSimulation(tab.id)}
              className={`rounded-lg border px-3 py-2 text-left text-xs font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-600 sm:px-3.5 sm:text-sm ${
                active
                  ? 'border-sky-700 bg-sky-700 text-white'
                  : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* 1. PIAGET LAB */}
      {activeSimulation === 'piaget' && (
        <div className="mt-6 space-y-6">
          <div className="grid gap-6 lg:grid-cols-12">
            {/* Stage (65%) */}
            <div className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 lg:col-span-7">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <h2 className="font-display text-lg font-semibold text-slate-900">
                  {piagetTask === 'liquid-glass'
                    ? 'Piaget Water-Glass Conservation Experiment'
                    : 'Piaget Offset-Pencils Conservation Experiment'}
                </h2>
                <span
                  className={`font-mono text-xs font-semibold ${
                    piagetResult.conservesAmount ? 'text-emerald-700' : 'text-amber-700'
                  }`}
                >
                  {piagetResult.conservesAmount ? '● CONSERVES QUANTITY' : '▲ CENTRATION ERROR'}
                </span>
              </div>

              <div className="mt-5 flex min-h-[260px] items-center justify-center rounded-xl border border-slate-200 bg-slate-50 p-6">
                {piagetTask === 'liquid-glass' ? (
                  <svg
                    viewBox="0 0 420 210"
                    className="h-52 w-full max-w-md"
                    role="img"
                    aria-label={
                      piagetTransformed
                        ? 'Two unequal shaped glasses holding identical water volume'
                        : 'Two identical wide glasses holding equal water levels'
                    }
                  >
                    {/* Left reference wide glass */}
                    <text x="95" y="24" textAnchor="middle" className="fill-slate-600 text-xs font-medium">
                      Glass A (Wide)
                    </text>
                    <rect x="45" y="40" width="100" height="130" rx="4" fill="#ffffff" stroke="#475569" strokeWidth="2.5" />
                    <rect x="47" y="105" width="96" height="63" fill="#38bdf8" opacity="0.75" />
                    <line x1="45" y1="105" x2="145" y2="105" stroke="#0284c7" strokeWidth="2" />
                    <text x="95" y="192" textAnchor="middle" className="fill-slate-700 text-xs font-mono">
                      200 ml
                    </text>

                    {/* Arrow */}
                    <text x="208" y="112" textAnchor="middle" className="fill-slate-500 text-lg font-bold">
                      {piagetTransformed ? '→' : '='}
                    </text>

                    {/* Right glass */}
                    {!piagetTransformed ? (
                      <>
                        <text x="315" y="24" textAnchor="middle" className="fill-slate-600 text-xs font-medium">
                          Glass B (Identical)
                        </text>
                        <rect x="265" y="40" width="100" height="130" rx="4" fill="#ffffff" stroke="#475569" strokeWidth="2.5" />
                        <rect x="267" y="105" width="96" height="63" fill="#38bdf8" opacity="0.75" />
                        <line x1="265" y1="105" x2="365" y2="105" stroke="#0284c7" strokeWidth="2" />
                        <text x="315" y="192" textAnchor="middle" className="fill-slate-700 text-xs font-mono">
                          200 ml (Same Height)
                        </text>
                      </>
                    ) : (
                      <>
                        <text x="315" y="24" textAnchor="middle" className="fill-slate-600 text-xs font-medium">
                          Glass C (Tall &amp; Narrow)
                        </text>
                        <rect x="290" y="34" width="50" height="136" rx="4" fill="#ffffff" stroke="#475569" strokeWidth="2.5" />
                        <rect x="292" y="54" width="46" height="114" fill="#0284c7" opacity="0.75" />
                        <line x1="290" y1="54" x2="340" y2="54" stroke="#0369a1" strokeWidth="2" />
                        <text x="315" y="192" textAnchor="middle" className="fill-slate-700 text-xs font-mono">
                          200 ml (Higher Level)
                        </text>
                      </>
                    )}
                  </svg>
                ) : (
                  <svg
                    viewBox="0 0 420 190"
                    className="h-48 w-full max-w-md"
                    role="img"
                    aria-label="Two rows of 5 pencils aligned or offset horizontally"
                  >
                    <text x="20" y="34" className="fill-slate-600 text-xs font-medium">
                      Row 1 (5 pencils)
                    </text>
                    {[0, 1, 2, 3, 4].map((i) => (
                      <g key={`r1-${i}`} transform={`translate(${40 + i * 56}, 48)`}>
                        <rect width="38" height="10" rx="2" fill="#0284c7" />
                        <polygon points="38,0 48,5 38,10" fill="#f59e0b" />
                      </g>
                    ))}

                    <text x="20" y="106" className="fill-slate-600 text-xs font-medium">
                      Row 2 (5 pencils{piagetTransformed ? ' — shifted right' : ' — aligned 1:1'})
                    </text>
                    {[0, 1, 2, 3, 4].map((i) => (
                      <g
                        key={`r2-${i}`}
                        transform={`translate(${
                          (piagetTransformed ? 96 : 40) + i * (piagetTransformed ? 64 : 56)
                        }, 122)`}
                      >
                        <rect width="38" height="10" rx="2" fill="#0f766e" />
                        <polygon points="38,0 48,5 38,10" fill="#f59e0b" />
                      </g>
                    ))}
                  </svg>
                )}
              </div>

              <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="font-mono text-xs font-semibold uppercase tracking-wider text-sky-800">
                  {piagetResult.reasoningLabel}
                </p>
                <p className="mt-1.5 text-sm font-medium text-slate-900">
                  Student says: &ldquo;{piagetResult.childExplanation}&rdquo;
                </p>
                <p className="mt-2 text-sm text-slate-600">{piagetResult.cognitiveRule}</p>
              </div>
            </div>

            {/* Control Deck (35%) */}
            <div className="min-w-0 space-y-5 rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 lg:col-span-5">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <Sliders className="h-4 w-4 text-sky-700" aria-hidden="true" />
                <h2 className="font-display text-lg font-semibold text-slate-900">
                  Experiment Controls
                </h2>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  1. Choose Conservation Task (Cognitive Development PDF)
                </p>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setPiagetTask('liquid-glass');
                      setPiagetTransformed(false);
                    }}
                    className={`rounded-lg border px-3 py-2 text-xs font-semibold ${
                      piagetTask === 'liquid-glass'
                        ? 'border-sky-700 bg-sky-50 text-sky-900'
                        : 'border-slate-300 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    Water Glass Pour
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setPiagetTask('offset-pencils');
                      setPiagetTransformed(false);
                    }}
                    className={`rounded-lg border px-3 py-2 text-xs font-semibold ${
                      piagetTask === 'offset-pencils'
                        ? 'border-sky-700 bg-sky-50 text-sky-900'
                        : 'border-slate-300 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    Offset Pencils
                  </button>
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  2. Trigger Transformation
                </p>
                <button
                  type="button"
                  onClick={() => setPiagetTransformed((t) => !t)}
                  className="mt-2 w-full rounded-lg bg-sky-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-sky-800"
                >
                  {piagetTransformed
                    ? 'Reset Back to Equal Appearance'
                    : piagetTask === 'liquid-glass'
                    ? 'Pour Water into Tall Narrow Glass'
                    : 'Spread & Shift Row 2 Pencils'}
                </button>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  3. Select Learner’s Cognitive Stage
                </p>
                <div className="mt-2 space-y-2">
                  {(
                    [
                      ['pre-operational', 'Pre-Operational (2–7 yrs)'],
                      ['concrete-operational', 'Concrete Operational (7–11 yrs)'],
                      ['formal-operational', 'Formal Operational (11+ yrs)'],
                    ] as [PiagetStageOption, string][]
                  ).map(([val, label]) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setPiagetStage(val)}
                      className={`w-full rounded-lg border px-3 py-2 text-left text-sm font-medium ${
                        piagetStage === val
                          ? 'border-sky-700 bg-sky-50 text-sky-900'
                          : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bicycle Schema Adaptation Stepper */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="font-mono text-xs uppercase tracking-wider text-sky-800">
                  Schema Stepper · Tricycle to Bicycle Example (Session 08)
                </p>
                <h2 className="mt-1 font-display text-lg font-semibold text-slate-900">
                  How Disequilibrium Forces Mental Growth
                </h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {BICYCLE_SCHEMA_STEPS.map((st, i) => (
                  <button
                    key={st.phase}
                    type="button"
                    onClick={() => setSchemaStepIdx(i)}
                    className={`rounded-lg border px-3 py-1.5 text-xs font-semibold ${
                      schemaStepIdx === i
                        ? 'border-sky-700 bg-sky-700 text-white'
                        : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {st.stepNumber}. {st.phase}
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-4 grid gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4 sm:grid-cols-2">
              <div>
                <p className="font-mono text-xs font-semibold text-slate-500">
                  OBSERVABLE ACTION
                </p>
                <p className="mt-1 text-sm font-medium text-slate-900">
                  {schemaStep.childAction}
                </p>
              </div>
              <div>
                <p className="font-mono text-xs font-semibold text-sky-800">
                  INTERNAL COGNITIVE PROCESS
                </p>
                <p className="mt-1 text-sm text-slate-700">{schemaStep.mentalModel}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. MEMORY PIPELINE LAB */}
      {activeSimulation === 'memory' && (
        <div className="mt-6 grid gap-6 lg:grid-cols-12">
          <div className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 lg:col-span-7">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <h2 className="font-display text-lg font-semibold text-slate-900">
                Gagne / Atkinson-Shiffrin Information Processing Flow
              </h2>
              <span className="font-mono text-xs font-semibold text-sky-800">
                {memoryResult.forgettingMechanism}
              </span>
            </div>

            {/* Mobile Vertical Pipeline (legible >=14px text on small screens) */}
            <div className="mt-4 space-y-2.5 sm:hidden">
              <div className="rounded-xl border-2 border-sky-600 bg-white p-3.5">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-sm font-bold text-slate-900">1. Sensory Register</span>
                  <span className="font-mono text-base font-bold text-sky-700 tabular-nums">
                    {memoryResult.sensoryCapturedPercent}%
                  </span>
                </div>
                <p className="mt-1 text-xs text-slate-600">
                  Captured via attention · Brief 5-sense buffer
                </p>
              </div>
              <div className="text-center font-mono text-xs text-slate-500">↓</div>
              <div
                className={`rounded-xl border-2 bg-white p-3.5 ${
                  memoryResult.effectiveStmUnits > 7 ? 'border-amber-600' : 'border-sky-600'
                }`}
              >
                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-sm font-bold text-slate-900">2. Working Memory (STM)</span>
                  <span className="font-mono text-base font-bold text-slate-900 tabular-nums">
                    {memoryResult.stmHeldItems}/{itemsCount} items
                  </span>
                </div>
                <p className="mt-1 text-xs text-slate-600">
                  {memoryResult.effectiveStmUnits} slots used (limit ~7) · Window: ~
                  {memoryResult.stmWindowSeconds}s
                </p>
                <p className="mt-1 text-xs font-semibold text-amber-800">
                  {chunkingEnabled ? 'Chunking Active (3 items/slot)' : 'Unchunked Raw Bits'}
                </p>
              </div>
              <div className="text-center font-mono text-xs text-slate-500">↓</div>
              <div className="rounded-xl border-2 border-emerald-700 bg-white p-3.5">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-sm font-bold text-slate-900">3. Long-Term Memory</span>
                  <span className="font-mono text-base font-bold text-emerald-700 tabular-nums">
                    {memoryResult.ltmEncodedPercent}%
                  </span>
                </div>
                <p className="mt-1 text-xs text-slate-600">
                  Encoded to LTM schemas · Episodic · Semantic · Procedural
                </p>
              </div>
            </div>

            {/* Desktop Horizontal SVG Flow */}
            <div className="mt-5 hidden rounded-xl border border-slate-200 bg-slate-50 p-4 sm:block">
              <svg
                viewBox="0 0 640 190"
                className="w-full"
                role="img"
                aria-label="Memory flow from Sensory Register to Short-Term Memory to Long-Term Memory"
              >
                {/* Sensory Register */}
                <rect x="10" y="28" width="166" height="114" rx="10" fill="#ffffff" stroke="#0284c7" strokeWidth="2" />
                <text x="93" y="52" textAnchor="middle" className="fill-slate-900 text-xs font-bold">
                  1. Sensory Register
                </text>
                <text x="93" y="78" textAnchor="middle" className="fill-sky-700 text-lg font-mono font-bold">
                  {memoryResult.sensoryCapturedPercent}%
                </text>
                <text x="93" y="98" textAnchor="middle" className="fill-slate-500 text-[11px]">
                  captured via attention
                </text>
                <text x="93" y="122" textAnchor="middle" className="fill-slate-600 text-[10px]">
                  Brief 5-sense buffer
                </text>

                {/* Arrow 1 */}
                <line x1="178" y1="85" x2="214" y2="85" stroke="#64748b" strokeWidth="2" />
                <polygon points="212,80 222,85 212,90" fill="#64748b" />

                {/* STM / Working Memory */}
                <rect
                  x="224"
                  y="20"
                  width="184"
                  height="130"
                  rx="10"
                  fill="#ffffff"
                  stroke={memoryResult.effectiveStmUnits > 7 ? '#d97706' : '#0284c7'}
                  strokeWidth="2.5"
                />
                <text x="316" y="45" textAnchor="middle" className="fill-slate-900 text-xs font-bold">
                  2. Working Memory (STM)
                </text>
                <text x="316" y="73" textAnchor="middle" className="fill-slate-900 text-lg font-mono font-bold">
                  {memoryResult.stmHeldItems}/{itemsCount} items
                </text>
                <text x="316" y="94" textAnchor="middle" className="fill-slate-600 text-[11px]">
                  {memoryResult.effectiveStmUnits} slots used (limit ~7)
                </text>
                <text x="316" y="114" textAnchor="middle" className="fill-slate-600 text-[11px]">
                  Window: ~{memoryResult.stmWindowSeconds}s
                </text>
                <text x="316" y="135" textAnchor="middle" className="fill-amber-700 text-[10px] font-semibold">
                  {chunkingEnabled ? 'Chunking Active (3 items/slot)' : 'Unchunked Raw Bits'}
                </text>

                {/* Arrow 2 */}
                <line x1="410" y1="85" x2="446" y2="85" stroke="#64748b" strokeWidth="2" />
                <polygon points="444,80 454,85 444,90" fill="#64748b" />

                {/* Long-Term Memory */}
                <rect x="456" y="28" width="174" height="114" rx="10" fill="#ffffff" stroke="#047857" strokeWidth="2" />
                <text x="543" y="52" textAnchor="middle" className="fill-slate-900 text-xs font-bold">
                  3. Long-Term Memory
                </text>
                <text x="543" y="78" textAnchor="middle" className="fill-emerald-700 text-lg font-mono font-bold">
                  {memoryResult.ltmEncodedPercent}%
                </text>
                <text x="543" y="98" textAnchor="middle" className="fill-slate-500 text-[11px]">
                  encoded to LTM schemas
                </text>
                <text x="543" y="122" textAnchor="middle" className="fill-slate-600 text-[9.5px]">
                  Episodic · Semantic · Procedural
                </text>
              </svg>
            </div>

            <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
              <p className="font-semibold text-slate-900">Diagnosis From Your Settings:</p>
              <p className="mt-1 leading-relaxed">{memoryResult.bottleneckNote}</p>
            </div>
          </div>

          {/* Memory Controls */}
          <div className="min-w-0 space-y-5 rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 lg:col-span-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Sliders className="h-4 w-4 text-sky-700" aria-hidden="true" />
                <h2 className="font-display text-lg font-semibold text-slate-900">
                  Study &amp; Classroom Variables
                </h2>
              </div>
              <button
                type="button"
                onClick={() => {
                  setAttentionLevel(70);
                  setChunkingEnabled(false);
                  setRehearsalMinutes(8);
                  setInterferenceLoad(25);
                  setItemsCount(11);
                }}
                className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-slate-800"
              >
                <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Reset</span>
              </button>
            </div>

            <div>
              <div className="flex justify-between text-sm">
                <label htmlFor="mem-items" className="font-medium text-slate-700">
                  New Facts Taught at Once
                </label>
                <span className="font-mono font-semibold tabular-nums">{itemsCount}</span>
              </div>
              <input
                id="mem-items"
                type="range"
                min={3}
                max={15}
                value={itemsCount}
                onChange={(e) => setItemsCount(Number(e.target.value))}
                className="mt-1.5 w-full accent-sky-700"
              />
            </div>

            <div>
              <div className="flex justify-between text-sm">
                <label htmlFor="mem-attention" className="font-medium text-slate-700">
                  Student Attention Focus
                </label>
                <span className="font-mono font-semibold tabular-nums">{attentionLevel}%</span>
              </div>
              <input
                id="mem-attention"
                type="range"
                min={10}
                max={100}
                value={attentionLevel}
                onChange={(e) => setAttentionLevel(Number(e.target.value))}
                className="mt-1.5 w-full accent-sky-700"
              />
            </div>

            <div>
              <div className="flex justify-between text-sm">
                <label htmlFor="mem-rehearsal" className="font-medium text-slate-700">
                  Spaced Rehearsal &amp; Elaboration
                </label>
                <span className="font-mono font-semibold tabular-nums">{rehearsalMinutes} min</span>
              </div>
              <input
                id="mem-rehearsal"
                type="range"
                min={0}
                max={25}
                value={rehearsalMinutes}
                onChange={(e) => setRehearsalMinutes(Number(e.target.value))}
                className="mt-1.5 w-full accent-sky-700"
              />
            </div>

            <div>
              <div className="flex justify-between text-sm">
                <label htmlFor="mem-interference" className="font-medium text-slate-700">
                  Competing Distraction / Interference
                </label>
                <span className="font-mono font-semibold tabular-nums">{interferenceLoad}%</span>
              </div>
              <input
                id="mem-interference"
                type="range"
                min={0}
                max={95}
                value={interferenceLoad}
                onChange={(e) => setInterferenceLoad(Number(e.target.value))}
                className="mt-1.5 w-full accent-amber-600"
              />
            </div>

            <label className="flex cursor-pointer items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-3.5">
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  Enable Meaningful Chunking &amp; Dual Coding
                </p>
                <p className="text-xs text-slate-600">
                  Groups ~3 raw items per Working Memory slot (Miller ~7 limit)
                </p>
              </div>
              <input
                type="checkbox"
                checked={chunkingEnabled}
                onChange={(e) => setChunkingEnabled(e.target.checked)}
                className="h-5 w-5 rounded border-slate-300 text-sky-700"
              />
            </label>
          </div>
        </div>
      )}

      {/* 3. CONDITIONING LAB */}
      {activeSimulation === 'conditioning' && (
        <div className="mt-6 space-y-6">
          <div className="grid gap-6 lg:grid-cols-12">
            <div className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 lg:col-span-7">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <h2 className="font-display text-lg font-semibold text-slate-900">
                  Skinner Operant Reinforcement Curve: {skinnerResult.label}
                </h2>
                <span className="font-mono text-xs font-semibold text-sky-800">
                  Extinction Resistance: {skinnerResult.extinctionResistance}
                </span>
              </div>

              <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-3 sm:p-4">
                <svg
                  viewBox="0 0 460 190"
                  className="w-full"
                  role="img"
                  aria-label={`Cumulative response rate curve for ${skinnerResult.label}`}
                >
                  {/* Axes */}
                  <line x1="46" y1="20" x2="46" y2="152" stroke="#64748b" strokeWidth="1.5" />
                  <line x1="46" y1="152" x2="438" y2="152" stroke="#64748b" strokeWidth="1.5" />
                  <text x="16" y="88" transform="rotate(-90 16,88)" textAnchor="middle" className="fill-slate-500 text-[10px]">
                    Cumulative Effort
                  </text>
                  <text x="242" y="176" textAnchor="middle" className="fill-slate-500 text-[10px]">
                    Study Trials (1 → 10, rewards taper off near end)
                  </text>

                  {/* Polyline */}
                  <polyline
                    fill="none"
                    stroke="#0284c7"
                    strokeWidth="3"
                    points={skinnerResult.cumulativeCurvePoints
                      .map((val, idx) => `${56 + idx * 41},${148 - val * 1.2}`)
                      .join(' ')}
                  />
                  {skinnerResult.cumulativeCurvePoints.map((val, idx) => (
                    <circle
                      key={`pt-${idx}`}
                      cx={56 + idx * 41}
                      cy={148 - val * 1.2}
                      r="4"
                      fill="#0369a1"
                    />
                  ))}
                </svg>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm">
                  <p className="font-mono text-xs font-semibold text-slate-500">
                    BEHAVIOUR PATTERN
                  </p>
                  <p className="mt-1 text-slate-800">{skinnerResult.responsePattern}</p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm">
                  <p className="font-mono text-xs font-semibold text-sky-800">
                    CLASSROOM EXAMPLE
                  </p>
                  <p className="mt-1 text-slate-800">{skinnerResult.classroomExample}</p>
                </div>
              </div>
            </div>

            <div className="min-w-0 space-y-4 rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 lg:col-span-5">
              <h2 className="font-display text-lg font-semibold text-slate-900">
                Compare All 5 Reinforcement Schedules
              </h2>
              <p className="text-sm text-slate-600">{skinnerResult.plainDescription}</p>
              <div className="space-y-2">
                {(
                  [
                    ['continuous', 'Continuous (Every Response)'],
                    ['fixed-interval', 'Fixed Interval (Fixed Time — e.g., Friday Quiz)'],
                    ['variable-interval', 'Variable Interval (Unpredictable Time)'],
                    ['fixed-ratio', 'Fixed Ratio (Every N Responses)'],
                    ['variable-ratio', 'Variable Ratio (Unpredictable Count)'],
                  ] as [SkinnerScheduleType, string][]
                ).map(([val, label]) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setSkinnerSchedule(val)}
                    className={`w-full rounded-lg border px-3.5 py-2.5 text-left text-sm font-medium ${
                      skinnerSchedule === val
                        ? 'border-sky-700 bg-sky-50 text-sky-900'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Pavlov Classical Conditioning Stepper */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="font-display text-lg font-semibold text-slate-900">
                Pavlov Classical Conditioning Stepper (Learning Process I)
              </h2>
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 4].map((step) => (
                  <button
                    key={step}
                    type="button"
                    onClick={() => setPavlovStep(step)}
                    className={`rounded-lg border px-3 py-1.5 text-xs font-semibold ${
                      pavlovStep === step
                        ? 'border-sky-700 bg-sky-700 text-white'
                        : 'border-slate-300 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    Stage {step}
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-800">
              {pavlovStep === 1 && (
                <p>
                  <strong>1. Before Conditioning:</strong> Unconditioned Stimulus (Warm helpful feedback / Food) naturally triggers Unconditioned Response (Relaxed curiosity / Salivation). Neutral classroom bell produces zero response.
                </p>
              )}
              {pavlovStep === 2 && (
                <p>
                  <strong>2. During Pairing:</strong> The bell/cue (Neutral → Conditioned Stimulus) rings right before warm praise repeatedly across days.
                </p>
              )}
              {pavlovStep === 3 && (
                <p>
                  <strong>3. After Conditioning:</strong> Hearing the Conditioned Stimulus (CS) alone triggers the Conditioned Response (CR)—instant readiness and calm focus.
                </p>
              )}
              {pavlovStep === 4 && (
                <p>
                  <strong>4. Extinction &amp; Generalization:</strong> If the cue is paired with nothing indefinitely, CR fades (Extinction), though it may briefly return later (Spontaneous Recovery). Similar tones trigger Generalization.
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 4. BRONFENBRENNER & KOLB / GARDNER LAB */}
      {activeSimulation === 'ecology-styles' && (
        <div className="mt-6 space-y-6">
          <div className="grid gap-6 lg:grid-cols-12">
            {/* Bronfenbrenner Interactive Concentric Explorer */}
            <div className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 lg:col-span-6">
              <h2 className="font-display text-lg font-semibold text-slate-900">
                Bronfenbrenner’s 5 Ecological Layers (Click Any Ring)
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                Select a circle to see how outer community and historical systems surround the learner.
              </p>

              <div className="mt-4 flex justify-center">
                <svg viewBox="0 0 440 430" className="h-64 w-full max-w-sm sm:h-72">
                  {[...ECOLOGY_LAYERS].reverse().map((layer) => {
                    const isSelected = layer.id === selectedLayer.id;
                    return (
                      <g
                        key={layer.id}
                        onClick={() => setSelectedLayerId(layer.id)}
                        className="cursor-pointer"
                      >
                        <circle
                          cx="220"
                          cy="215"
                          r={layer.radius}
                          fill={isSelected ? layer.bg : '#ffffff'}
                          stroke={isSelected ? layer.color : '#cbd5e1'}
                          strokeWidth={isSelected ? '3' : '1.5'}
                        />
                        <text
                          x="220"
                          y={215 - layer.radius + 16}
                          textAnchor="middle"
                          className={`text-[11px] font-semibold ${
                            isSelected ? 'fill-sky-900' : 'fill-slate-600'
                          }`}
                        >
                          {layer.name}
                        </text>
                      </g>
                    );
                  })}
                  <circle cx="220" cy="215" r="22" fill="#0284c7" />
                  <text x="220" y="219" textAnchor="middle" className="fill-white text-[11px] font-bold">
                    Child
                  </text>
                </svg>
              </div>

              <div className="mt-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="font-mono text-xs font-semibold uppercase text-sky-800">
                  {selectedLayer.name}
                </p>
                <p className="mt-1 text-sm font-medium text-slate-900">
                  {selectedLayer.plainMeaning}
                </p>
                <p className="mt-1.5 text-xs text-slate-600">
                  <strong>Examples:</strong> {selectedLayer.examples}
                </p>
              </div>
            </div>

            {/* Kolb Style Explorer */}
            <div className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 lg:col-span-6">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <h2 className="font-display text-lg font-semibold text-slate-900">
                  Kolb Learning Style Quadrant Explorer
                </h2>
                <span className="font-mono text-xs font-semibold text-sky-800">
                  {kolbResult.quadrant}
                </span>
              </div>

              <div className="mt-4 space-y-4">
                <div>
                  <div className="flex justify-between gap-2 text-xs font-medium text-slate-700">
                    <span>Concrete (Feeling)</span>
                    <span className="text-right">Abstract (Thinking)</span>
                  </div>
                  <input
                    type="range"
                    min={-50}
                    max={50}
                    value={thinkingScore}
                    onChange={(e) => setThinkingScore(Number(e.target.value))}
                    aria-label="Feeling versus Thinking preference"
                    className="mt-1.5 w-full accent-sky-700"
                  />
                </div>

                <div>
                  <div className="flex justify-between gap-2 text-xs font-medium text-slate-700">
                    <span>Active (Doing)</span>
                    <span className="text-right">Reflective (Watching)</span>
                  </div>
                  <input
                    type="range"
                    min={-50}
                    max={50}
                    value={watchingScore}
                    onChange={(e) => setWatchingScore(Number(e.target.value))}
                    aria-label="Doing versus Watching preference"
                    className="mt-1.5 w-full accent-sky-700"
                  />
                </div>
              </div>

              <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm">
                <p className="font-display text-lg font-bold text-slate-900">
                  Quadrant: {kolbResult.quadrant}
                </p>
                <p className="mt-1 font-mono text-xs text-sky-800">{kolbResult.axesSummary}</p>
                <p className="mt-2 text-slate-700">
                  <strong>Natural Strengths:</strong> {kolbResult.strengths}
                </p>
                <p className="mt-2 text-slate-700">
                  <strong>Best Study Method:</strong> {kolbResult.studyTip}
                </p>
              </div>

              <div className="mt-5 border-t border-slate-100 pt-4">
                <div className="flex items-center gap-1.5">
                  <Sparkles className="h-4 w-4 shrink-0 text-sky-700" aria-hidden="true" />
                  <h3 className="font-display text-base font-semibold text-slate-900">
                    Howard Gardner’s 9 Multiple Intelligences (Session 07 Table 1)
                  </h3>
                </div>
                <div className="mt-2.5 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {GARDNER_DOMAINS.map((g) => (
                    <div
                      key={g.name}
                      className="rounded-lg border border-slate-200 bg-white p-2.5 text-xs"
                    >
                      <p className="font-semibold text-slate-900">{g.name}</p>
                      <p className="mt-0.5 text-slate-600">{g.cue}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. GAGNE 8-STEP HIERARCHY, 9 EVENTS & TRANSFER OF LEARNING LAB */}
      {activeSimulation === 'gagne-transfer' && (
        <div className="mt-6 space-y-6">
          <div className="grid gap-6 lg:grid-cols-12">
            {/* Gagne 8-step hierarchy explorer */}
            <div className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 lg:col-span-7">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <h2 className="font-display text-lg font-semibold text-slate-900">
                  Gagne’s 8-Level Intellectual Skills Ladder (Learning Process II)
                </h2>
                <span
                  className={`font-mono text-xs font-semibold ${
                    gagneResult.readinessStatus === 'Ready for Mastery'
                      ? 'text-emerald-700'
                      : 'text-amber-700'
                  }`}
                >
                  {gagneResult.readinessStatus}
                </span>
              </div>
              <p className="mt-2 text-xs text-slate-600 sm:text-sm">
                Click Set Target on any skill row (L1–L8), then toggle lower mastered prerequisites to see when a learner stalls or succeeds.
              </p>

              <div className="mt-4 space-y-2">
                {[...GAGNE_INTELLECTUAL_SKILLS].reverse().map((skill) => {
                  const isTarget = skill.level === gagneTargetLevel;
                  const isMastered = gagneMasteredLevels.includes(skill.level);
                  const isMissingPrereq = gagneResult.missingPrerequisites.some(
                    (m) => m.level === skill.level,
                  );

                  return (
                    <div
                      key={skill.level}
                      className={`flex flex-col gap-2 rounded-xl border p-3 sm:flex-row sm:items-center sm:justify-between ${
                        isTarget
                          ? 'border-sky-600 bg-sky-50'
                          : isMissingPrereq
                          ? 'border-amber-400 bg-amber-50'
                          : 'border-slate-200 bg-white'
                      }`}
                    >
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-mono text-xs font-bold text-slate-500">
                            L{skill.level}
                          </span>
                          <span className="text-sm font-semibold text-slate-900">
                            {skill.name}
                          </span>
                          <span className="font-mono text-[11px] text-sky-800">
                            {skill.domainNote}
                          </span>
                        </div>
                        <p className="mt-1 text-xs text-slate-600">{skill.sourceExample}</p>
                      </div>

                      <div className="flex shrink-0 items-center gap-2">
                        {skill.level < gagneTargetLevel && (
                          <button
                            type="button"
                            onClick={() => toggleMasteredGagne(skill.level)}
                            className={`rounded-lg border px-2.5 py-1 text-xs font-semibold ${
                              isMastered
                                ? 'border-emerald-400 bg-emerald-50 text-emerald-900'
                                : 'border-amber-400 bg-white text-amber-900'
                            }`}
                          >
                            {isMastered ? 'Mastered ✓' : 'Missing Prereq'}
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => setGagneTargetLevel(skill.level)}
                          className={`rounded-lg border px-2.5 py-1 text-xs font-semibold ${
                            isTarget
                              ? 'border-sky-700 bg-sky-700 text-white'
                              : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          {isTarget ? 'Target Goal' : 'Set Target'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm">
                <p className="font-mono text-xs font-semibold uppercase text-sky-800">
                  DIAGNOSIS FOR L{gagneResult.selectedSkill.level}: {gagneResult.selectedSkill.name}
                </p>
                <p className="mt-1 font-medium text-slate-900">{gagneResult.guidanceNote}</p>
                <p className="mt-1 text-xs text-slate-600">
                  Meaning: {gagneResult.selectedSkill.plainMeaning}
                </p>
              </div>
            </div>

            {/* Transfer of Learning Simulator */}
            <div className="min-w-0 space-y-5 rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 lg:col-span-5">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <h2 className="font-display text-lg font-semibold text-slate-900">
                  Transfer of Learning Simulator
                </h2>
                <span className="font-mono text-xs font-semibold text-sky-800 tabular-nums">
                  {transferResult.transferStrengthPercent}% Transfer
                </span>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  1. Target Application Context (Cognitive Process p. 35)
                </p>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setTransferSimilarity('similar-classroom')}
                    className={`rounded-lg border px-3 py-2 text-xs font-semibold ${
                      transferSimilarity === 'similar-classroom'
                        ? 'border-sky-700 bg-sky-50 text-sky-900'
                        : 'border-slate-300 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    Specific (Map Symbols)
                  </button>
                  <button
                    type="button"
                    onClick={() => setTransferSimilarity('broad-life')}
                    className={`rounded-lg border px-3 py-2 text-xs font-semibold ${
                      transferSimilarity === 'broad-life'
                        ? 'border-sky-700 bg-sky-50 text-sky-900'
                        : 'border-slate-300 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    General (Everyday Life)
                  </button>
                </div>
              </div>

              <div className="space-y-2.5">
                <label className="flex cursor-pointer items-start justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
                  <div>
                    <p className="text-xs font-semibold text-slate-900 sm:text-sm">
                      Clashing Old Habit (e.g., Irregular 2-Finger Typing)
                    </p>
                    <p className="text-xs text-slate-600">
                      Tests Thorndike/Woodworth Negative Transfer interference
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={oldHabitClashes}
                    onChange={(e) => setOldHabitClashes(e.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-slate-300 text-sky-700"
                  />
                </label>

                <label className="flex cursor-pointer items-start justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
                  <div>
                    <p className="text-xs font-semibold text-slate-900 sm:text-sm">
                      Initial Task Thoroughly Mastered
                    </p>
                    <p className="text-xs text-slate-600">
                      Rule 1: Half-learned foundations fail to transfer
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={firstTaskMastered}
                    onChange={(e) => setFirstTaskMastered(e.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-slate-300 text-sky-700"
                  />
                </label>

                <label className="flex cursor-pointer items-start justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
                  <div>
                    <p className="text-xs font-semibold text-slate-900 sm:text-sm">
                      Over-learning &amp; Principle Comparison Active
                    </p>
                    <p className="text-xs text-slate-600">
                      Extra fluent practice beyond initial success (p. 36)
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={overlearningActive}
                    onChange={(e) => setOverlearningActive(e.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-slate-300 text-sky-700"
                  />
                </label>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <span className="font-mono text-xs font-bold uppercase text-sky-800">
                    {transferResult.direction}
                  </span>
                  <span className="font-mono text-xs text-slate-600">
                    Scope: {transferResult.scopeType}
                  </span>
                </div>
                <p className="mt-2 text-slate-800">{transferResult.explanation}</p>
                <p className="mt-2 border-t border-slate-200 pt-2 text-xs text-slate-600">
                  <strong>Source Example:</strong> {transferResult.sourceExample}
                </p>
              </div>
            </div>
          </div>

          {/* Gagne 9 Instructional Events Choreography */}
          <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="font-mono text-xs uppercase tracking-wider text-sky-800">
                  Lesson Design Blueprint · Learning Process II (p. 64)
                </p>
                <h2 className="mt-1 font-display text-lg font-semibold text-slate-900">
                  Gagne’s 9 Instructional Events (Click Any Step 1–9)
                </h2>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {GAGNE_NINE_EVENTS.map((ev) => (
                  <button
                    key={ev.eventNumber}
                    type="button"
                    onClick={() => setActiveGagneEvent(ev.eventNumber)}
                    className={`rounded-lg border px-2.5 py-1.5 font-mono text-xs font-semibold ${
                      activeGagneEvent === ev.eventNumber
                        ? 'border-sky-700 bg-sky-700 text-white'
                        : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    Event {ev.eventNumber}
                  </button>
                ))}
              </div>
            </div>
            {(() => {
              const ev =
                GAGNE_NINE_EVENTS.find((item) => item.eventNumber === activeGagneEvent) ??
                GAGNE_NINE_EVENTS[0];
              return (
                <div className="mt-4 grid gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 sm:grid-cols-3">
                  <div>
                    <p className="font-mono text-xs font-semibold text-slate-500">
                      INTERNAL LEARNING SITUATION
                    </p>
                    <p className="mt-1 text-sm font-semibold text-slate-900">
                      {ev.learningSituation}
                    </p>
                  </div>
                  <div>
                    <p className="font-mono text-xs font-semibold text-sky-800">
                      TEACHER PROCESS
                    </p>
                    <p className="mt-1 text-sm font-semibold text-slate-900">
                      {ev.teachingProcess}
                    </p>
                  </div>
                  <div>
                    <p className="font-mono text-xs font-semibold text-emerald-800">
                      CLASSROOM MOVE
                    </p>
                    <p className="mt-1 text-sm text-slate-700">{ev.classroomMove}</p>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* 6. MOTIVATION & EMOTIONAL BEHAVIOUR LAB */}
      {activeSimulation === 'motivation-emotion' && (
        <div className="mt-6 space-y-6">
          <div className="grid gap-6 lg:grid-cols-12">
            {/* Maslow 6-tier pyramid & Weiner Attribution */}
            <div className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 lg:col-span-6">
              <h2 className="font-display text-lg font-semibold text-slate-900">
                Maslow’s 6-Tier Needs Ladder (Session 10 &amp; Motivation PDF)
              </h2>
              <p className="mt-1 text-xs text-slate-600 sm:text-sm">
                Click any rung from Physiological up to Self-Actualization to inspect Deficiency vs. Growth needs.
              </p>

              <div className="mt-4 space-y-2">
                {[...MASLOW_NEEDS_TIERS].reverse().map((tier) => {
                  const selected = tier.level === selectedMaslowLevel;
                  return (
                    <button
                      key={tier.level}
                      type="button"
                      onClick={() => setSelectedMaslowLevel(tier.level)}
                      className={`flex w-full items-center justify-between gap-2 rounded-xl border px-3.5 py-2.5 text-left text-sm ${
                        selected
                          ? 'border-sky-700 bg-sky-50 text-sky-950'
                          : 'border-slate-200 bg-white text-slate-800 hover:bg-slate-50'
                      }`}
                    >
                      <span className="font-semibold">
                        Tier {tier.level}: {tier.name}
                      </span>
                      <span className="font-mono text-[11px] text-slate-600">
                        {tier.category}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm">
                <p className="font-mono text-xs font-semibold uppercase text-sky-800">
                  {selectedMaslow.name} · {selectedMaslow.category}
                </p>
                <p className="mt-1 font-medium text-slate-900">{selectedMaslow.classroomReality}</p>
                <p className="mt-2 text-xs text-slate-700">
                  <strong>Module Illustration:</strong> {selectedMaslow.moduleExample}
                </p>
              </div>
            </div>

            {/* Weiner Attribution & Emotion x Cognition */}
            <div className="min-w-0 space-y-6 lg:col-span-6">
              <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-6">
                <h2 className="font-display text-lg font-semibold text-slate-900">
                  Weiner’s (1979/1984) Attribution After an Exam Setback
                </h2>
                <p className="mt-1 text-xs text-slate-600 sm:text-sm">
                  Compare how a student’s explanation shapes whether they quit or try a new strategy.
                </p>
                <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {(
                    [
                      ['effort-strategy', 'Effort / Study Strategy'],
                      ['low-ability', 'Fixed Low Ability'],
                      ['unfair-syllabus', 'Unfair Exam / Teacher'],
                      ['lucky-guess', 'Random Luck'],
                    ] as [WeinerCauseId, string][]
                  ).map(([id, label]) => (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setWeinerCause(id)}
                      className={`rounded-lg border px-3 py-2 text-left text-xs font-semibold ${
                        weinerCause === id
                          ? 'border-sky-700 bg-sky-50 text-sky-900'
                          : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>

                <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-mono text-xs font-bold text-sky-800">
                      {weinerResult.locus} · {weinerResult.controllability}
                    </span>
                    <span
                      className={`font-mono text-xs font-semibold ${
                        weinerResult.futurePersistence === 'High Resilience'
                          ? 'text-emerald-700'
                          : 'text-amber-700'
                      }`}
                    >
                      {weinerResult.futurePersistence}
                    </span>
                  </div>
                  <p className="mt-2 font-medium text-slate-900">{weinerResult.studentThought}</p>
                  <p className="mt-1.5 text-xs text-slate-700">
                    <strong>Teacher Coach Move:</strong> {weinerResult.teacherIntervention}
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-6">
                <h2 className="font-display text-lg font-semibold text-slate-900">
                  Emotion × Cognition Lab (Bower 1982, Duncker 1945 &amp; Plutchik)
                </h2>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="emotion-mood-select"
                      className="block text-xs font-semibold uppercase text-slate-500"
                    >
                      Classroom Emotional Climate
                    </label>
                    <select
                      id="emotion-mood-select"
                      value={moodState}
                      onChange={(e) =>
                        setMoodState(e.target.value as EmotionCognitionInput['moodState'])
                      }
                      className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800"
                    >
                      <option value="joyful-warm">Joyful, Safe &amp; Supportive</option>
                      <option value="anxious-fear">Anxious / Exam Fear</option>
                      <option value="angry-threat">Threatening / Ridiculing</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="emotion-task-select"
                      className="block text-xs font-semibold uppercase text-slate-500"
                    >
                      Task / Material Type
                    </label>
                    <select
                      id="emotion-task-select"
                      value={learningMaterial}
                      onChange={(e) =>
                        setLearningMaterial(
                          e.target.value as EmotionCognitionInput['learningMaterial'],
                        )
                      }
                      className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800"
                    >
                      <option value="candle-insight">Duncker Candle Creative Problem</option>
                      <option value="joyful-story">Joyful Story Recall (Bower)</option>
                      <option value="sorrowful-story">Sorrowful Story Recall (Bower)</option>
                    </select>
                  </div>
                </div>

                <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-semibold text-slate-900">
                      {emotionResult.insightOutcome}
                    </span>
                    <span className="font-mono text-xs font-semibold text-sky-800">
                      Recall: {emotionResult.recallEfficiency}
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-slate-700">{emotionResult.empiricalFinding}</p>
                  <p className="mt-1.5 text-xs font-medium text-sky-900">
                    Takeaway: {emotionResult.classroomTakeaway}
                  </p>
                </div>

                <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-3">
                  {PLUTCHIK_BLENDS.map((b) => (
                    <div
                      key={b.secondaryEmotion}
                      className="rounded-lg border border-slate-200 bg-white p-2.5 text-xs"
                    >
                      <p className="text-slate-600">{b.pair}</p>
                      <p className="mt-0.5 font-semibold text-slate-900">→ {b.secondaryEmotion}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 7. CHILD STUDY METHOD CHOOSER & 6-LENS PERSONALITY DIAGNOSTIC */}
      {activeSimulation === 'personality-methods' && (
        <div className="mt-6 grid gap-6 lg:grid-cols-12">
          {/* Child Study Method Chooser */}
          <div className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 lg:col-span-6">
            <h2 className="font-display text-lg font-semibold text-slate-900">
              Child Study Method Chooser (Session 02 &amp; Mutlu)
            </h2>
            <p className="mt-1 text-xs text-slate-600 sm:text-sm">
              Select a real school research question to see which STP8301 method fits best—and its ethical safeguard.
            </p>

            <div className="mt-4 space-y-2">
              {(
                [
                  ['single-grade7-drop', 'One Grade 7 student’s marks plunge suddenly (Nimali case)'],
                  ['two-teaching-methods', 'Testing Exploratory Groups vs. Lecture on post-test scores'],
                  ['large-tablet-survey', 'Auditing tablet attitudes across 266 students (Mutlu study)'],
                  ['grade1-play-aggression', 'Tracking Grade 1 playground aggression in natural play'],
                  ['hidden-solving-steps', 'Discovering silent math thoughts in a verbal teen'],
                ] as [ChildStudyScenarioId, string][]
              ).map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setStudyScenario(id)}
                  className={`w-full rounded-lg border px-3.5 py-2.5 text-left text-xs font-medium sm:text-sm ${
                    studyScenario === id
                      ? 'border-sky-700 bg-sky-50 font-semibold text-sky-950'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="mt-4 space-y-2 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm">
              <p className="font-mono text-xs font-bold uppercase text-sky-800">
                BEST FIT: {studyMethodResult.recommendedMethod}
              </p>
              <p className="text-xs font-semibold text-emerald-800">
                Pair with: {studyMethodResult.secondarySafeguard}
              </p>
              <p className="text-slate-800">{studyMethodResult.whyThisFits}</p>
              <p className="border-t border-slate-200 pt-2 text-xs text-slate-600">
                <strong>Limits &amp; Ethics:</strong> {studyMethodResult.moduleCaveatAndEthics}
              </p>
            </div>
          </div>

          {/* 6-Lens Personality Case Diagnostic */}
          <div className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 lg:col-span-6">
            <h2 className="font-display text-lg font-semibold text-slate-900">
              6-Lens Personality Case Analyzer (Session 11)
            </h2>
            <p className="mt-1 text-xs text-slate-600 sm:text-sm">
              Case: A struggling 13-year-old reader disrupts class with loud jokes and blame. Switch theoretical lenses to compare diagnoses.
            </p>

            <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {(
                [
                  ['neo-freudian-adler', 'Alfred Adler (Inferiority)'],
                  ['psychoanalytic-freud', 'Sigmund Freud (Defenses)'],
                  ['trait-cattell', 'Cattell 16PF (1/3 vs 2/3)'],
                  ['humanistic-rogers', 'Rogers (Unconditional Regard)'],
                  ['cognitive-kelly', 'Kelly (Personal Constructs)'],
                  ['social-learning-bandura', 'Bandura (1977 Modeling)'],
                ] as [PersonalityLensId, string][]
              ).map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setPersonalityLens(id)}
                  className={`rounded-lg border px-3 py-2 text-left text-xs font-semibold ${
                    personalityLens === id
                      ? 'border-sky-700 bg-sky-50 text-sky-900'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="mt-4 space-y-2.5 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="font-display text-base font-bold text-slate-900">
                  {personalityResult.theoristAndTradition}
                </p>
                <span className="font-mono text-[11px] text-sky-800">
                  {personalityResult.moduleCitation}
                </span>
              </div>
              <p className="text-slate-800">
                <strong>Why It Happens:</strong> {personalityResult.diagnosisOfDisruption}
              </p>
              <p className="rounded-lg border border-sky-100 bg-white p-3 text-slate-800">
                <strong className="text-sky-900">Recommended Teacher Action:</strong>{' '}
                {personalityResult.teacherActionPlan}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
