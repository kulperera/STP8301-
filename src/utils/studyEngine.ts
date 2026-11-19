import type {
  FlashcardItem,
  GlossaryEntry,
  QuizQuestion,
} from '../data/curriculumTypes';

export interface StudyProgressSummary {
  sessionsCompleted: number;
  totalSessions: number;
  sessionPercent: number;
  cardsMastered: number;
  totalCards: number;
  cardPercent: number;
  lastQuizScorePercent: number | null;
}

export function calculateStudyProgress(params: {
  completedSessionIds: string[];
  masteredCardIds: string[];
  lastQuizScorePercent: number | null;
  totalSessions: number;
  totalCards: number;
}): StudyProgressSummary {
  const uniqueSessions = new Set(params.completedSessionIds);
  const uniqueCards = new Set(params.masteredCardIds);
  const sessionsCompleted = Math.min(uniqueSessions.size, params.totalSessions);
  const cardsMastered = Math.min(uniqueCards.size, params.totalCards);

  const sessionPercent =
    params.totalSessions > 0
      ? Math.round((sessionsCompleted / params.totalSessions) * 100)
      : 0;
  const cardPercent =
    params.totalCards > 0
      ? Math.round((cardsMastered / params.totalCards) * 100)
      : 0;

  return {
    sessionsCompleted,
    totalSessions: params.totalSessions,
    sessionPercent,
    cardsMastered,
    totalCards: params.totalCards,
    cardPercent,
    lastQuizScorePercent: params.lastQuizScorePercent,
  };
}

export interface MemoryPipelineInput {
  attentionLevel: number; // 0 to 100
  chunkingEnabled: boolean;
  rehearsalMinutes: number; // 0 to 30
  interferenceLoad: number; // 0 to 100
  itemsCount: number; // 3 to 15 raw items
}

export interface MemoryPipelineResult {
  sensoryCapturedPercent: number;
  effectiveStmUnits: number;
  stmCapacityLimit: number;
  stmHeldItems: number;
  stmWindowSeconds: number;
  ltmEncodedPercent: number;
  bottleneckNote: string;
  forgettingMechanism: 'Trace Decay' | 'Interference' | 'Balanced Encoding';
}

/**
 * Models Gagne (1985) / Atkinson-Shiffrin (1971) / Miller's (~7 bits) memory flow
 * from Session 08 & Cognitive Process PDF.
 */
export function simulateMemoryPipeline(
  input: MemoryPipelineInput,
): MemoryPipelineResult {
  const attention = Math.max(0, Math.min(100, input.attentionLevel));
  const interference = Math.max(0, Math.min(100, input.interferenceLoad));
  const rehearsal = Math.max(0, Math.min(30, input.rehearsalMinutes));
  const items = Math.max(1, Math.min(20, Math.round(input.itemsCount)));

  const sensoryCapturedPercent = Math.round(25 + attention * 0.72);

  // STM holds ~7 independent bits (Miller / Session 08) for ~15-20s without rehearsal.
  // Grouping into meaningful chunks multiplies how many raw items fit inside ~7 slots.
  const stmCapacityLimit = 7;
  const effectiveStmUnits = input.chunkingEnabled ? Math.ceil(items / 3) : items;
  const attentionPassRatio = attention / 100;
  const rawPassItems = Math.round(items * attentionPassRatio);
  const stmHeldItems = input.chunkingEnabled
    ? Math.min(rawPassItems, stmCapacityLimit * 3)
    : Math.min(rawPassItems, stmCapacityLimit);

  const stmWindowSeconds = Math.round(15 + Math.min(rehearsal, 10) * 0.5);

  const rehearsalBoost = Math.min(35, rehearsal * 1.45);
  const chunkBoost = input.chunkingEnabled ? 18 : 0;
  const interferencePenalty = interference * 0.42;
  const overloadPenalty =
    effectiveStmUnits > stmCapacityLimit
      ? (effectiveStmUnits - stmCapacityLimit) * 5
      : 0;

  const rawRetention =
    attention * 0.48 +
    rehearsalBoost +
    chunkBoost -
    interferencePenalty -
    overloadPenalty;

  const ltmEncodedPercent = Math.max(5, Math.min(96, Math.round(rawRetention)));

  let forgettingMechanism: MemoryPipelineResult['forgettingMechanism'] =
    'Balanced Encoding';
  let bottleneckNote =
    'Attention and organized rehearsal support transfer from Working Memory into Long-Term Memory schemas.';

  if (interference >= 55) {
    forgettingMechanism = 'Interference';
    bottleneckNote =
      'High distraction or competing material causes Interference, blocking consolidation before LTM encoding completes.';
  } else if (rehearsal <= 3 || attention < 40) {
    forgettingMechanism = 'Trace Decay';
    bottleneckNote =
      'Low attention or minimal rehearsal lets sensory/STM traces fade within the 15–20 second working-memory window (Trace Decay).';
  } else if (!input.chunkingEnabled && items > stmCapacityLimit) {
    forgettingMechanism = 'Interference';
    bottleneckNote =
      'Raw items exceed Short-Term Memory (~7 bits). Enable chunking/meaningful grouping to fit more information into existing schemas.';
  }

  return {
    sensoryCapturedPercent,
    effectiveStmUnits,
    stmCapacityLimit,
    stmHeldItems,
    stmWindowSeconds,
    ltmEncodedPercent,
    bottleneckNote,
    forgettingMechanism,
  };
}

export type PiagetStageOption =
  | 'pre-operational'
  | 'concrete-operational'
  | 'formal-operational';

export type ConservationTaskType = 'liquid-glass' | 'offset-pencils';

export interface PiagetEvaluation {
  conservesAmount: boolean;
  reasoningLabel: string;
  childExplanation: string;
  cognitiveRule: string;
}

export function evaluatePiagetConservation(
  stage: PiagetStageOption,
  task: ConservationTaskType,
  transformed: boolean,
): PiagetEvaluation {
  if (!transformed) {
    return {
      conservesAmount: true,
      reasoningLabel: 'Initial Equal State',
      childExplanation:
        task === 'liquid-glass'
          ? 'Both identical glasses hold the exact same amount of water.'
          : 'Both rows have 5 pencils lined up one-to-one, so they look equal.',
      cognitiveRule:
        'Before a perceptual transformation occurs, learners across stages agree the two quantities match.',
    };
  }

  if (stage === 'pre-operational') {
    return {
      conservesAmount: false,
      reasoningLabel: 'Centration (Fails Conservation)',
      childExplanation:
        task === 'liquid-glass'
          ? 'The tall narrow glass has MORE water now because the water level is higher.'
          : 'The shifted row has MORE pencils because the line stretches farther.',
      cognitiveRule:
        'In Piaget’s Pre-operational stage (2–7 yrs), children focus on one striking dimension (height or length) and cannot mentally reverse the action.',
    };
  }

  if (stage === 'concrete-operational') {
    return {
      conservesAmount: true,
      reasoningLabel: 'Reversibility & Conservation Achieved',
      childExplanation:
        task === 'liquid-glass'
          ? 'It is the same water! You only poured it into a taller, thinner glass—pouring it back proves it is equal.'
          : 'There are still 5 pencils in each row. Sliding them sideways did not add or remove any.',
      cognitiveRule:
        'In the Concrete Operational stage (7–11 yrs), learners mentally reverse transformations and coordinate height with width (decentration).',
    };
  }

  return {
    conservesAmount: true,
    reasoningLabel: 'Abstract & Proportional Reasoning',
    childExplanation:
      task === 'liquid-glass'
        ? 'Volume is invariant under container shape transformation (V = cross-sectional area × height); no pouring back is even needed.'
        : 'Cardinality is invariant under spatial translation; both sets preserve 1-to-1 correspondence.',
    cognitiveRule:
      'In the Formal Operational stage (11+ yrs), learners generalize conservation principles abstractly and test hypotheses systematically.',
  };
}

export interface SchemaAdaptationStep {
  stepNumber: 1 | 2 | 3 | 4;
  phase: 'Existing Schema' | 'Assimilation' | 'Disequilibrium' | 'Accommodation';
  childAction: string;
  mentalModel: string;
}

export const BICYCLE_SCHEMA_STEPS: SchemaAdaptationStep[] = [
  {
    stepNumber: 1,
    phase: 'Existing Schema',
    childAction: 'Child rides a 3-wheeled tricycle smoothly.',
    mentalModel:
      'Schema = "Two-foot pedaling + handlebar balance = stable three-wheel ride."',
  },
  {
    stepNumber: 2,
    phase: 'Assimilation',
    childAction: 'Child climbs onto a 2-wheeled bicycle and pedals the exact same way.',
    mentalModel:
      'Child tries to fit the new bicycle into the old tricycle schema without changing rules.',
  },
  {
    stepNumber: 3,
    phase: 'Disequilibrium',
    childAction: 'Bicycle wobbles and falls sideways when stopped or slowed.',
    mentalModel:
      'Cognitive conflict! The old schema fails to predict balance on two wheels—motivating learning.',
  },
  {
    stepNumber: 4,
    phase: 'Accommodation',
    childAction: 'Child adjusts posture, speed, and steering lean to stay upright.',
    mentalModel:
      'Schema updated: "Two-wheeled cycles require forward momentum and dynamic steering balance."',
  },
];

export type SkinnerScheduleType =
  | 'continuous'
  | 'fixed-interval'
  | 'variable-interval'
  | 'fixed-ratio'
  | 'variable-ratio';

export interface SkinnerScheduleResult {
  label: string;
  plainDescription: string;
  responsePattern: string;
  extinctionResistance: 'Low' | 'Moderate' | 'High' | 'Highest';
  classroomExample: string;
  cumulativeCurvePoints: number[]; // 10 trial intervals (0-100 cumulative response index)
}

export function simulateSkinnerSchedule(
  scheduleType: SkinnerScheduleType,
): SkinnerScheduleResult {
  switch (scheduleType) {
    case 'continuous':
      return {
        label: 'Continuous Reinforcement',
        plainDescription: 'Reward delivered after every single correct response.',
        responsePattern: 'Fast initial learning, rapid drop once rewards stop.',
        extinctionResistance: 'Low',
        classroomExample: 'Praising a beginner after every correctly sounded-out letter.',
        cumulativeCurvePoints: [15, 30, 45, 58, 68, 74, 76, 76, 76, 76],
      };
    case 'fixed-interval':
      return {
        label: 'Fixed Interval (FI)',
        plainDescription: 'Reward arrives after a fixed amount of time passes (e.g., every Friday).',
        responsePattern: 'Scalloped curve: pause after reward, rush right before deadline.',
        extinctionResistance: 'Moderate',
        classroomExample: 'Weekly spelling quiz every Friday—students cram on Thursday night.',
        cumulativeCurvePoints: [6, 10, 28, 30, 34, 56, 58, 62, 84, 86],
      };
    case 'variable-interval':
      return {
        label: 'Variable Interval (VI)',
        plainDescription: 'Reward arrives after unpredictable time gaps.',
        responsePattern: 'Steady, moderate pace with few pauses.',
        extinctionResistance: 'High',
        classroomExample: 'Unannounced pop quizzes or surprise teacher check-ins during independent study.',
        cumulativeCurvePoints: [9, 19, 29, 39, 49, 59, 69, 78, 87, 94],
      };
    case 'fixed-ratio':
      return {
        label: 'Fixed Ratio (FR)',
        plainDescription: 'Reward delivered after a fixed number of responses (e.g., every 5 problems).',
        responsePattern: 'High steady burst, brief pause immediately after reward.',
        extinctionResistance: 'Moderate',
        classroomExample: 'Earning a star after completing every 5 math exercises.',
        cumulativeCurvePoints: [14, 29, 31, 46, 61, 63, 78, 92, 93, 96],
      };
    case 'variable-ratio':
      return {
        label: 'Variable Ratio (VR)',
        plainDescription: 'Reward delivered after an unpredictable number of responses.',
        responsePattern: 'Rapid, steady high rate with highest persistence when rewards cease.',
        extinctionResistance: 'Highest',
        classroomExample: 'Randomly calling on raised hands—students stay attentive because any raise could be chosen.',
        cumulativeCurvePoints: [13, 27, 40, 53, 66, 77, 86, 93, 98, 100],
      };
  }
}

export interface KolbEvaluation {
  quadrant: 'Diverging' | 'Assimilating' | 'Converging' | 'Accommodating';
  axesSummary: string;
  strengths: string;
  studyTip: string;
}

/**
 * Kolb Experiential Learning Style grid from Session 07:
 * vertical: Concrete Experience (Feeling, <=0) vs Abstract Conceptualization (Thinking, >0)
 * horizontal: Active Experimentation (Doing, <=0) vs Reflective Observation (Watching, >0)
 */
export function evaluateKolbQuadrant(params: {
  thinkingScore: number; // -50 (Feeling/CE) to +50 (Thinking/AC)
  watchingScore: number; // -50 (Doing/AE) to +50 (Watching/RO)
}): KolbEvaluation {
  const isThinking = params.thinkingScore >= 0;
  const isWatching = params.watchingScore >= 0;

  if (!isThinking && isWatching) {
    return {
      quadrant: 'Diverging',
      axesSummary: 'Concrete Experience (Feeling) + Reflective Observation (Watching)',
      strengths: 'Imaginative, sensitive to feelings, skilled at brainstorming multiple viewpoints.',
      studyTip: 'Use group discussions, real student stories, and mind maps before memorizing definitions.',
    };
  }
  if (isThinking && isWatching) {
    return {
      quadrant: 'Assimilating',
      axesSummary: 'Abstract Conceptualization (Thinking) + Reflective Observation (Watching)',
      strengths: 'Organizes wide information into clear logical theories and concise models.',
      studyTip: 'Use structured outlines, comparison tables, and theorist timelines.',
    };
  }
  if (isThinking && !isWatching) {
    return {
      quadrant: 'Converging',
      axesSummary: 'Abstract Conceptualization (Thinking) + Active Experimentation (Doing)',
      strengths: 'Solves practical classroom problems by testing ideas and finding single best applications.',
      studyTip: 'Work through applied case scenarios, interactive labs, and diagnostic quizzes.',
    };
  }
  return {
    quadrant: 'Accommodating',
    axesSummary: 'Concrete Experience (Feeling) + Active Experimentation (Doing)',
    strengths: 'Learns hands-on through trial, intuition, and adapting quickly to classroom realities.',
    studyTip: 'Test concepts immediately inside the simulations and reflect on what changed.',
  };
}

export interface QuizBreakdownItem {
  questionId: string;
  sessionId: string;
  sessionNumber: string;
  selectedIndex: number | null;
  correctIndex: number;
  isCorrect: boolean;
}

export interface QuizAttemptResult {
  totalQuestions: number;
  answeredCount: number;
  correctCount: number;
  scorePercent: number;
  weakSessionIds: string[];
  breakdown: QuizBreakdownItem[];
}

export function scoreQuizAttempt(
  questions: QuizQuestion[],
  answers: Record<string, number>,
): QuizAttemptResult {
  const breakdown: QuizBreakdownItem[] = questions.map((q) => {
    const selectedIndex =
      typeof answers[q.id] === 'number' ? answers[q.id] : null;
    const isCorrect = selectedIndex === q.correctIndex;
    return {
      questionId: q.id,
      sessionId: q.sessionId,
      sessionNumber: q.sessionNumber,
      selectedIndex,
      correctIndex: q.correctIndex,
      isCorrect,
    };
  });

  const answeredCount = breakdown.filter((b) => b.selectedIndex !== null).length;
  const correctCount = breakdown.filter((b) => b.isCorrect).length;
  const totalQuestions = questions.length;
  const scorePercent =
    totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

  const missCounts = new Map<string, number>();
  for (const item of breakdown) {
    if (!item.isCorrect) {
      missCounts.set(item.sessionId, (missCounts.get(item.sessionId) ?? 0) + 1);
    }
  }

  const weakSessionIds = Array.from(missCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([sessionId]) => sessionId);

  return {
    totalQuestions,
    answeredCount,
    correctCount,
    scorePercent,
    weakSessionIds,
    breakdown,
  };
}

export function orderFlashcards(
  cards: FlashcardItem[],
  masteredIds: string[],
  sessionFilter: string,
  showUnmasteredFirst: boolean,
): FlashcardItem[] {
  const masteredSet = new Set(masteredIds);
  const filtered =
    sessionFilter === 'all'
      ? [...cards]
      : cards.filter((c) => c.sessionId === sessionFilter);

  if (!showUnmasteredFirst) {
    return filtered;
  }

  return filtered.sort((a, b) => {
    const aMastered = masteredSet.has(a.id) ? 1 : 0;
    const bMastered = masteredSet.has(b.id) ? 1 : 0;
    return aMastered - bMastered;
  });
}

export function filterGlossary(
  entries: GlossaryEntry[],
  query: string,
  sessionFilter: string,
): GlossaryEntry[] {
  const normalizedQuery = query.trim().toLowerCase();
  return entries.filter((entry) => {
    const matchesSession =
      sessionFilter === 'all' || entry.sessionId === sessionFilter;
    if (!matchesSession) return false;
    if (!normalizedQuery) return true;
    return (
      entry.term.toLowerCase().includes(normalizedQuery) ||
      entry.beginnerDefinition.toLowerCase().includes(normalizedQuery) ||
      entry.example.toLowerCase().includes(normalizedQuery) ||
      entry.sourceRef.toLowerCase().includes(normalizedQuery)
    );
  });
}

// ============================================================================
// LAB 5: GAGNE 8-STEP HIERARCHY, 9 EVENTS & TRANSFER OF LEARNING
// Grounded strictly in Learning Process II (pp. 59-64) & Cognitive Process (pp. 35-36)
// ============================================================================

export interface GagneSkillLevel {
  level: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  name: string;
  domainNote: string;
  plainMeaning: string;
  sourceExample: string;
  prerequisites: number[];
}

export const GAGNE_INTELLECTUAL_SKILLS: GagneSkillLevel[] = [
  {
    level: 1,
    name: 'Signal Learning',
    domainNote: 'Foundation (Classical Conditioning)',
    plainMeaning: 'Unconscious reflexive response triggered by a repeated warning or cue.',
    sourceExample: 'Eyes watering merely at the sight of onions after previously peeling them.',
    prerequisites: [],
  },
  {
    level: 2,
    name: 'Stimulus-Response Bonding',
    domainNote: 'Voluntary single connection (Operant)',
    plainMeaning: 'Repeating a specific deliberate action because it earns a satisfying reward.',
    sourceExample: 'Receiving gold stars for neat classwork motivates careful writing.',
    prerequisites: [1],
  },
  {
    level: 3,
    name: 'Chaining',
    domainNote: 'Linking S-R units (3 conditions: prior bonds, sequence link, reinforcement)',
    plainMeaning: 'Connecting two or more previously learned S-R steps smoothly into a habit.',
    sourceExample: 'Chaining step-by-step lab setup or daily study routine habits.',
    prerequisites: [2],
  },
  {
    level: 4,
    name: 'Verbal Association',
    domainNote: 'Sub-variety of chaining using words',
    plainMeaning: 'Linking a spoken or written name accurately to a perceived object.',
    sourceExample: 'Naming geometric shapes correctly as triangle, circle, and cube.',
    prerequisites: [2, 3],
  },
  {
    level: 5,
    name: 'Discrimination Learning',
    domainNote: 'Required directly before Concept Learning',
    plainMeaning: 'Distinguishing between items that share some similarities without confusing them.',
    sourceExample: 'Telling a harbour apart from a lagoon, or distinguishing close sounds and colours.',
    prerequisites: [2, 3, 4],
  },
  {
    level: 6,
    name: 'Concept Learning',
    domainNote: 'Generalization built upon Discrimination (Level 5)',
    plainMeaning: 'Recognizing shared common features across different examples to form a category.',
    sourceExample: 'Identifying what all islands share regardless of size before mastering the concept "island".',
    prerequisites: [5],
  },
  {
    level: 7,
    name: 'Rule & Principle Learning',
    domainNote: 'Combining two or more mastered Concepts',
    plainMeaning: 'Linking established concepts together into a reliable predictive relationship.',
    sourceExample: '"Light objects float on water" requires first understanding float, light, objects, and water.',
    prerequisites: [6],
  },
  {
    level: 8,
    name: 'Problem Solving',
    domainNote: 'Highest Intellectual Skill',
    plainMeaning: 'Constructing novel solutions by seeing connections between a new problem and prior rules.',
    sourceExample: 'Designing a fair classroom balance scale or solving an unfamiliar word problem using known principles.',
    prerequisites: [7],
  },
];

export interface GagneEvaluation {
  selectedSkill: GagneSkillLevel;
  missingPrerequisites: GagneSkillLevel[];
  readinessStatus: 'Ready for Mastery' | 'Missing Lower Foundations';
  guidanceNote: string;
}

export function evaluateGagneHierarchy(
  targetLevel: number,
  masteredLevels: number[],
): GagneEvaluation {
  const clamped = Math.max(1, Math.min(8, Math.round(targetLevel)));
  const selectedSkill =
    GAGNE_INTELLECTUAL_SKILLS.find((s) => s.level === clamped) ??
    GAGNE_INTELLECTUAL_SKILLS[0];
  const masteredSet = new Set(masteredLevels);

  // Per Gagne Figure I (p. 60), achieving Level 6 requires Level 5, and Level 5 requires Levels 2, 3, 4.
  const requiredChain = GAGNE_INTELLECTUAL_SKILLS.filter((s) => s.level < clamped);
  const missingPrerequisites = requiredChain.filter((s) => !masteredSet.has(s.level));

  if (missingPrerequisites.length === 0) {
    return {
      selectedSkill,
      missingPrerequisites: [],
      readinessStatus: 'Ready for Mastery',
      guidanceNote: `All prerequisite foundations below Level ${selectedSkill.level} (${selectedSkill.name}) are active—your learner can connect lower skills into ${selectedSkill.name}.`,
    };
  }

  return {
    selectedSkill,
    missingPrerequisites,
    readinessStatus: 'Missing Lower Foundations',
    guidanceNote: `Gagne warns learners fail Level ${selectedSkill.level} (${selectedSkill.name}) when lower rungs are skipped. Scaffold ${missingPrerequisites
      .map((m) => `L${m.level} ${m.name}`)
      .join(', ')} first.`,
  };
}

export interface GagneEventStep {
  eventNumber: number;
  learningSituation: string;
  teachingProcess: string;
  classroomMove: string;
}

export const GAGNE_NINE_EVENTS: GagneEventStep[] = [
  {
    eventNumber: 1,
    learningSituation: 'Expectation',
    teachingProcess: 'Get students actively motivated',
    classroomMove: 'Spark curiosity with a relatable classroom puzzle before defining terms.',
  },
  {
    eventNumber: 2,
    learningSituation: 'Expectation',
    teachingProcess: 'Place aims and objectives before them',
    classroomMove: 'State plainly what learners will be able to do by lesson end.',
  },
  {
    eventNumber: 3,
    learningSituation: 'Attention',
    teachingProcess: 'Focus attention',
    classroomMove: 'Use contrast, colour, or wonder to pass the Sensory Register gate.',
  },
  {
    eventNumber: 4,
    learningSituation: 'Peaking / Approach to storage',
    teachingProcess: 'Educational guidance',
    classroomMove: 'Highlight distinguishing features and context (Dual Coding & cues).',
  },
  {
    eventNumber: 5,
    learningSituation: 'Storage of information',
    teachingProcess: 'Facilitate retention',
    classroomMove: 'Use organized charts and meaningful connections rather than loose rote lists.',
  },
  {
    eventNumber: 6,
    learningSituation: 'Recall',
    teachingProcess: 'Facilitate recall',
    classroomMove: 'Prompt students to retrieve prerequisite facts into Working Memory.',
  },
  {
    eventNumber: 7,
    learningSituation: 'Transfer',
    teachingProcess: 'Facilitate Transfer of learning',
    classroomMove: 'Ask students to apply the rule to a new map, problem, or real-life case.',
  },
  {
    eventNumber: 8,
    learningSituation: 'Responding',
    teachingProcess: 'Enable achievement of objectives',
    classroomMove: 'Provide independent practice proving the objective was reached.',
  },
  {
    eventNumber: 9,
    learningSituation: 'Reinforcement',
    teachingProcess: 'Provide reinforcers',
    classroomMove: 'Deliver specific encouraging feedback to stabilize the new skill.',
  },
];

export interface TransferSimulationInput {
  similarity: 'similar-classroom' | 'broad-life';
  oldHabitClashes: boolean;
  firstTaskMastered: boolean;
  overlearningActive: boolean;
}

export interface TransferSimulationResult {
  direction: 'Positive Transfer' | 'Negative Transfer' | 'Blocked / Weak Transfer';
  scopeType: 'Specific Transfer' | 'General Transfer';
  transferStrengthPercent: number;
  explanation: string;
  sourceExample: string;
}

export function evaluateTransferScenario(
  input: TransferSimulationInput,
): TransferSimulationResult {
  const scopeType: TransferSimulationResult['scopeType'] =
    input.similarity === 'similar-classroom'
      ? 'Specific Transfer'
      : 'General Transfer';

  const sourceExample =
    scopeType === 'Specific Transfer'
      ? 'Using classroom knowledge of mountains and valleys to read similar geological shapes on a map (Cognitive Process, p. 35).'
      : 'Applying classroom problem-solving habits to handle unexpected challenges in everyday life (Cognitive Process, p. 35).';

  if (input.oldHabitClashes) {
    return {
      direction: 'Negative Transfer',
      scopeType,
      transferStrengthPercent: input.overlearningActive ? 38 : 22,
      explanation:
        'Earlier irregular habits actively interfere with new structured learning—like unlearning two-finger irregular typing when mastering formal touch-typing (Cognitive Process, p. 35).',
      sourceExample,
    };
  }

  if (!input.firstTaskMastered) {
    return {
      direction: 'Blocked / Weak Transfer',
      scopeType,
      transferStrengthPercent: 32,
      explanation:
        'Cognitive Process (p. 36) stresses that transfer fails unless the first task is thoroughly mastered, clearly organized, and transferable similarities are explicitly pointed out.',
      sourceExample,
    };
  }

  const strength =
    (input.similarity === 'similar-classroom' ? 78 : 66) +
    (input.overlearningActive ? 16 : 0);

  return {
    direction: 'Positive Transfer',
    scopeType,
    transferStrengthPercent: Math.min(96, strength),
    explanation: input.overlearningActive
      ? 'Thorough mastery + over-learning (recollecting, reading varied books, clarifying connections) maximizes reliable Positive Transfer to new contexts.'
      : 'Mastered prior learning makes solving new related tasks faster and clearer (Positive Transfer).',
    sourceExample,
  };
}

// ============================================================================
// LAB 6: MOTIVATION (MASLOW, WEINER) & EMOTION (PLUTCHIK, BOWER, DUNCKER)
// Grounded strictly in Motivation PDF & Emotional Behaviour (pp. 3-21)
// ============================================================================

export interface MaslowTier {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  name: string;
  category: 'Deficiency Need' | 'Growth Need';
  classroomReality: string;
  moduleExample: string;
}

export const MASLOW_NEEDS_TIERS: MaslowTier[] = [
  {
    level: 1,
    name: 'Physiological Needs',
    category: 'Deficiency Need',
    classroomReality: 'Hunger, thirst, rest, and freedom from physical pain come first.',
    moduleExample:
      'Schools provide free meals/water; even Buddhist literature notes hunger and thirst were satisfied before preaching Dhamma (Motivation PDF, p. 7).',
  },
  {
    level: 2,
    name: 'Safety Needs',
    category: 'Deficiency Need',
    classroomReality: 'Students need physical protection and emotional safety from harsh teachers or bullying.',
    moduleExample:
      'A primary child facing home insecurity seeks protective, warm "second-parent" calm from the teacher.',
  },
  {
    level: 3,
    name: 'Love & Belonging Needs',
    category: 'Deficiency Need',
    classroomReality: 'Warm acceptance by family, peers, and classroom groups at every age.',
    moduleExample:
      'Unmet belonging breeds poor mental health, personality strain, and delinquent behaviour (Motivation PDF, pp. 3-4).',
  },
  {
    level: 4,
    name: 'Esteem Needs',
    category: 'Deficiency Need',
    classroomReality: 'Desire to be accepted, appreciated, and respected—building self-confidence and self-concept.',
    moduleExample:
      'Fair recognition of honest progress rather than public humiliation.',
  },
  {
    level: 5,
    name: 'Desire to Know & Understand',
    category: 'Growth Need',
    classroomReality: 'Cognitive curiosity driving humans to investigate and master knowledge.',
    moduleExample:
      'Activates strongly for sustained study once lower biological and safety needs are reasonably secure.',
  },
  {
    level: 6,
    name: 'Self-Actualization Needs',
    category: 'Growth Need',
    classroomReality: 'Striving to develop one’s highest artistic, musical, athletic, or intellectual potential.',
    moduleExample:
      'A musician, artist, or dancer practicing tirelessly to become their fullest self.',
  },
];

export type WeinerCauseId =
  | 'effort-strategy'
  | 'low-ability'
  | 'unfair-syllabus'
  | 'lucky-guess';

export interface WeinerAttributionResult {
  causeLabel: string;
  locus: 'Internal' | 'External';
  controllability: 'Controllable' | 'Uncontrollable';
  futurePersistence: 'High Resilience' | 'Helpless / At-Risk';
  studentThought: string;
  teacherIntervention: string;
}

export function simulateWeinerAttribution(
  cause: WeinerCauseId,
): WeinerAttributionResult {
  switch (cause) {
    case 'effort-strategy':
      return {
        causeLabel: 'Inadequate Application & Strategy (Internal, Controllable)',
        locus: 'Internal',
        controllability: 'Controllable',
        futurePersistence: 'High Resilience',
        studentThought:
          '"I misunderstood key questions and crammed late—if I fix my study plan, I can pass next time!"',
        teacherIntervention:
          'Weiner (1979, 1984) shows this keeps motivation alive. Coach specific spaced revision habits.',
      };
    case 'low-ability':
      return {
        causeLabel: 'Fixed Lack of Ability (Internal, Uncontrollable)',
        locus: 'Internal',
        controllability: 'Uncontrollable',
        futurePersistence: 'Helpless / At-Risk',
        studentThought: '"I am just dumb at this subject; trying harder changes nothing."',
        teacherIntervention:
          'Break tasks into small attainable wins and attribute progress explicitly to controllable strategy.',
      };
    case 'unfair-syllabus':
      return {
        causeLabel: 'Outside Syllabus / Teacher Blame (External, Uncontrollable)',
        locus: 'External',
        controllability: 'Uncontrollable',
        futurePersistence: 'Helpless / At-Risk',
        studentThought:
          '"Exam questions were outside the syllabus and time was too short—nothing I do matters."',
        teacherIntervention:
          'Module (p. 10) warns linking failure to forces beyond one’s control stalls growth. Share clear objectives & study guides.',
      };
    case 'lucky-guess':
      return {
        causeLabel: 'Pure Luck (External, Uncontrollable)',
        locus: 'External',
        controllability: 'Uncontrollable',
        futurePersistence: 'Helpless / At-Risk',
        studentThought: '"I only passed because easy topics came out by luck."',
        teacherIntervention:
          'Point out exact practiced skills that earned the marks so confidence shifts inward and controllable.',
      };
  }
}

export interface EmotionCognitionInput {
  moodState: 'joyful-warm' | 'anxious-fear' | 'angry-threat';
  learningMaterial: 'joyful-story' | 'sorrowful-story' | 'candle-insight';
}

export interface EmotionCognitionResult {
  recallEfficiency: 'High' | 'Selective / Distorted' | 'Blocked';
  insightOutcome: string;
  empiricalFinding: string;
  classroomTakeaway: string;
}

export function evaluateEmotionCognition(
  input: EmotionCognitionInput,
): EmotionCognitionResult {
  if (input.learningMaterial === 'candle-insight') {
    if (input.moodState === 'joyful-warm') {
      return {
        recallEfficiency: 'High',
        insightOutcome: 'Solves Candle Problem Flexibly (Low Functional Fixedness)',
        empiricalFinding:
          'Duncker (1945) & Clark & Isen (1982): Watching an enjoyable film beforehand lifted creative problem-solving—participants emptied the thumbtack box and tacked it to the wall as a shelf.',
        classroomTakeaway:
          'Warm, threat-free classrooms help learners see creative new uses for concepts rather than getting mentally stuck.',
      };
    }
    return {
      recallEfficiency: input.moodState === 'anxious-fear' ? 'Selective / Distorted' : 'Blocked',
      insightOutcome: 'Trapped in Functional Fixedness (Slow / Rigid Solutions)',
      empiricalFinding:
        'Stress, acute fear, or threat (Duncker 1945; Emotional Behaviour p. 20–21) restricts cognitive flexibility so learners treat the tack box strictly as a container and fail to mount the candle.',
      classroomTakeaway:
        'Eliminate harsh fear before analytical or creative lessons; Rogers emphasizes "learning without threat".',
    };
  }

  // Bower & Cohen (1982) Mood-Congruent Recall
  const matchesPositive =
    input.moodState === 'joyful-warm' && input.learningMaterial === 'joyful-story';
  const matchesNegative =
    input.moodState !== 'joyful-warm' && input.learningMaterial === 'sorrowful-story';

  if (matchesPositive) {
    return {
      recallEfficiency: 'High',
      insightOutcome: 'Strong Joy-Congruent Recall & Helpful Attitude',
      empiricalFinding:
        'Bower & Cohen (1982): Students induced into a joyful state while reading recalled far more of the joyful story than the sorrowful one.',
      classroomTakeaway:
        'Positive, inquisitive classroom emotion strengthens attention toward encouraging material and later retrieval.',
    };
  }

  if (matchesNegative) {
    return {
      recallEfficiency: 'Selective / Distorted',
      insightOutcome: 'Mood-Congruent Bias Toward Sorrowful / Negative Memories',
      empiricalFinding:
        'Bower & Cohen (1982): Learners in a sorrowful/distressed mood recalled the sorrowful person’s story significantly better—demonstrating mood-congruent memory bias.',
      classroomTakeaway:
        'High exam fear causes anxious students who studied hard to blank out on neutral facts while retrieving failure worries.',
    };
  }

  return {
    recallEfficiency: input.moodState === 'joyful-warm' ? 'High' : 'Blocked',
    insightOutcome:
      input.moodState === 'joyful-warm'
        ? 'Stable Calm Retrieval Even on Sad Topics'
        : 'Acute Fear/Anger Disrupts Encoding & Recall',
    empiricalFinding:
      'Acute anger or exam fear monopolizes Working Memory ("forgetting everything at the examination", p. 20), whereas calm positive curiosity supports steady attention.',
    classroomTakeaway:
      'Offer calm encouragement before tests and provide healthy creative outlets (debates, drama, athletics) rather than emotional repression.',
  };
}

export const PLUTCHIK_BLENDS: { pair: string; secondaryEmotion: string }[] = [
  { pair: 'Joy + Anger (Primary)', secondaryEmotion: 'Pride (Secondary)' },
  { pair: 'Joy + Acceptance (Primary)', secondaryEmotion: 'Affection (Secondary)' },
  { pair: 'Fear + Ridicule (Primary)', secondaryEmotion: 'Shame (Secondary)' },
];

// ============================================================================
// LAB 7: CHILD STUDY METHOD CHOOSER & 6-LENS PERSONALITY DIAGNOSTIC
// Grounded strictly in Session 02, STP8301 Child Study Methods, Mutlu (2016) & Session 11
// ============================================================================

export type ChildStudyScenarioId =
  | 'single-grade7-drop'
  | 'two-teaching-methods'
  | 'large-tablet-survey'
  | 'grade1-play-aggression'
  | 'hidden-solving-steps';

export interface ChildStudyRecommendation {
  recommendedMethod: string;
  secondarySafeguard: string;
  whyThisFits: string;
  moduleCaveatAndEthics: string;
}

export function recommendChildStudyMethod(
  scenario: ChildStudyScenarioId,
): ChildStudyRecommendation {
  switch (scenario) {
    case 'single-grade7-drop':
      return {
        recommendedMethod: 'Case Study Method (Zainal, 2007)',
        secondarySafeguard: 'Exploratory 1-Way Interview + Parent Mesosystem Check',
        whyThisFits:
          'Best for deeply investigating one child’s sudden drop (like Nimali’s Grade 7 math slump) across all 4 Case Study domains: Personal info, Family background, Nature of problem, and Tailored solutions.',
        moduleCaveatAndEthics:
          'Cannot generalize statistically to the whole school; guard family privacy strictly under UN/UNICEF confidentiality rules.',
      };
    case 'two-teaching-methods':
      return {
        recommendedMethod: 'Experimental Method (Wundt 1879)',
        secondarySafeguard: 'Pre-Test Equivalence + Control Group',
        whyThisFits:
          'When comparing whether Exploratory Group work (IV) raises post-test scores (DV) more than Lecture, matching pre-tests isolates causal impact.',
        moduleCaveatAndEthics:
          'STP8301 warns parents may object ethically to unequal classroom treatments, and IQ, home, and peer factors remain hard to control fully.',
      };
    case 'large-tablet-survey':
      return {
        recommendedMethod: 'Convergent Mixed Methods (Questionnaire + Observation/Interview)',
        secondarySafeguard: 'Semi-structured probing for negative Likert scores',
        whyThisFits:
          'Closed/Thurstone questionnaires reach large samples quickly (requiring Grade 6+ literacy), while interviews prevent misreading broken hardware as anti-tech attitudes (Mutlu, 2016).',
        moduleCaveatAndEthics:
          'Remember "verba volant, scripta manent"—forced signatures on consent forms can intimidate teachers/students about anonymity.',
      };
    case 'grade1-play-aggression':
      return {
        recommendedMethod: 'Direct / Participant Observation (Hargreaves 1967; Roy 1952)',
        secondarySafeguard: 'Apply all 8 STP8301 Observation Reliability Rules',
        whyThisFits:
          'Young children under Grade 6 lack questionnaire literacy and may tighten up in interviews; structured observation tracks natural playground triggers objectively.',
        moduleCaveatAndEthics:
          'Define operational variables clearly, use an observation schedule across multiple sessions, train observers, and avoid snap prejudgments.',
      };
    case 'hidden-solving-steps':
      return {
        recommendedMethod: 'Introspective Method (Verbalizing Internal Thought)',
        secondarySafeguard: 'Cross-check with concrete task performance / Sociometric or Attainment tests',
        whyThisFits:
          'Introspection invites a student to talk aloud through memory recall or math steps—revealing hidden internal reasoning processes unreachable by outward watching.',
        moduleCaveatAndEthics:
          'STP8301 notes introspection is subjective and cannot be independently verified like an objective measurement.',
      };
  }
}

export type PersonalityLensId =
  | 'psychoanalytic-freud'
  | 'neo-freudian-adler'
  | 'trait-cattell'
  | 'humanistic-rogers'
  | 'cognitive-kelly'
  | 'social-learning-bandura';

export interface PersonalityLensAnalysis {
  theoristAndTradition: string;
  diagnosisOfDisruption: string;
  teacherActionPlan: string;
  moduleCitation: string;
}

export function analyzePersonalityCase(
  lens: PersonalityLensId,
): PersonalityLensAnalysis {
  switch (lens) {
    case 'psychoanalytic-freud':
      return {
        theoristAndTradition: 'Sigmund Freud — Psychoanalytic Developmental Theory',
        diagnosisOfDisruption:
          'The student’s loud joking acts as an unconscious Ego Defense Mechanism (Displacement / Rationalization / Denial) shielding anxiety over reading struggle.',
        teacherActionPlan:
          'Avoid harsh public punishment that deepens repression; offer safe counseling and creative/athletic outlets.',
        moduleCitation: 'Personality Development.pdf (pp. 80–82)',
      };
    case 'neo-freudian-adler':
      return {
        theoristAndTradition: 'Alfred Adler — Neo-Freudian Inferiority & Compensation',
        diagnosisOfDisruption:
          'Repeated adult criticism or academic defeat bred an Inferiority Complex; clowning tries awkwardly to win peer status and compensate for perceived weakness.',
        teacherActionPlan:
          'Assign an achievable classroom leadership/organizer role and scaffold private reading wins to turn inadequacy into healthy striving.',
        moduleCitation: 'Personality Development.pdf (pp. 82–83)',
      };
    case 'trait-cattell':
      return {
        theoristAndTradition: 'Raymond Cattell / Allport — Trait Psychology (16PF)',
        diagnosisOfDisruption:
          'Extroverted expressiveness combined with school stress triggers reactive traits—yet Cattell showed ~2/3 of personality variance stems from environmental shaping.',
        teacherActionPlan:
          'Do not label the child permanently "disruptive"; reshape classroom norms because environment holds huge leverage over trait expression.',
        moduleCitation: 'Session 11 & Personality Development.pdf',
      };
    case 'humanistic-rogers':
      return {
        theoristAndTradition: 'Carl Rogers & Abraham Maslow — Humanistic / Phenomenological',
        diagnosisOfDisruption:
          'Threatened self-concept and unmet belongingness drive defensive masking; harmony requires aligning self-concept with safe lived experiences.',
        teacherActionPlan:
          'Show genuine acceptance (unconditional positive regard), remove public shame, and build warm teacher-pupil trust.',
        moduleCitation: 'Personality Development.pdf (p. 84) & Session 11',
      };
    case 'cognitive-kelly':
      return {
        theoristAndTradition: 'George Kelly — Personal Construct Theory',
        diagnosisOfDisruption:
          'Through past failures, the child formed a predictive construct: "Reading aloud = guaranteed humiliation, whereas joking = safety."',
        teacherActionPlan:
          'Help the student test a new lived prediction (low-stakes paired reading) so their internal construct updates calmly.',
        moduleCitation: 'Session 11 & Personality Development.pdf',
      };
    case 'social-learning-bandura':
      return {
        theoristAndTradition: 'Albert Bandura (1977) — Social Cognitive / Observational Learning',
        diagnosisOfDisruption:
          'The child observed teasing or aggressive television/peer models winning laughter and attention (Vicarious Reinforcement).',
        teacherActionPlan:
          'Model respectful humour and peer encouragement yourself, and visibly reinforce cooperative classmates.',
        moduleCitation: 'Personality Development.pdf (pp. 83–84)',
      };
  }
}

