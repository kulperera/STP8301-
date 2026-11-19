import test from 'node:test';
import assert from 'node:assert/strict';
import {
  analyzePersonalityCase,
  BICYCLE_SCHEMA_STEPS,
  calculateStudyProgress,
  evaluateEmotionCognition,
  evaluateGagneHierarchy,
  evaluateKolbQuadrant,
  evaluatePiagetConservation,
  evaluateTransferScenario,
  filterGlossary,
  GAGNE_INTELLECTUAL_SKILLS,
  GAGNE_NINE_EVENTS,
  MASLOW_NEEDS_TIERS,
  orderFlashcards,
  PLUTCHIK_BLENDS,
  recommendChildStudyMethod,
  scoreQuizAttempt,
  simulateMemoryPipeline,
  simulateSkinnerSchedule,
  simulateWeinerAttribution,
} from './studyEngine.ts';
import type {
  FlashcardItem,
  GlossaryEntry,
  QuizQuestion,
} from '../data/curriculumTypes.ts';

test('calculateStudyProgress deduplicates IDs and clamps percentages', () => {
  const summary = calculateStudyProgress({
    completedSessionIds: ['s01', 's01', 's02', 's03'],
    masteredCardIds: ['c1', 'c2', 'c2'],
    lastQuizScorePercent: 85,
    totalSessions: 11,
    totalCards: 20,
  });

  assert.equal(summary.sessionsCompleted, 3);
  assert.equal(summary.sessionPercent, 27);
  assert.equal(summary.cardsMastered, 2);
  assert.equal(summary.cardPercent, 10);
  assert.equal(summary.lastQuizScorePercent, 85);
});

test('simulateMemoryPipeline reflects Miller ~7 capacity, chunking benefit, and interference', () => {
  const unchunkedOverload = simulateMemoryPipeline({
    attentionLevel: 85,
    chunkingEnabled: false,
    rehearsalMinutes: 12,
    interferenceLoad: 20,
    itemsCount: 12,
  });

  const chunked = simulateMemoryPipeline({
    attentionLevel: 85,
    chunkingEnabled: true,
    rehearsalMinutes: 12,
    interferenceLoad: 20,
    itemsCount: 12,
  });

  assert.equal(unchunkedOverload.stmCapacityLimit, 7);
  assert.equal(unchunkedOverload.effectiveStmUnits, 12);
  assert.equal(chunked.effectiveStmUnits, 4);
  assert.ok(chunked.stmHeldItems > unchunkedOverload.stmHeldItems);
  assert.ok(chunked.ltmEncodedPercent > unchunkedOverload.ltmEncodedPercent);

  const highInterference = simulateMemoryPipeline({
    attentionLevel: 85,
    chunkingEnabled: true,
    rehearsalMinutes: 12,
    interferenceLoad: 80,
    itemsCount: 9,
  });
  assert.equal(highInterference.forgettingMechanism, 'Interference');

  const lowRehearsal = simulateMemoryPipeline({
    attentionLevel: 30,
    chunkingEnabled: false,
    rehearsalMinutes: 2,
    interferenceLoad: 15,
    itemsCount: 6,
  });
  assert.equal(lowRehearsal.forgettingMechanism, 'Trace Decay');
});

test('evaluatePiagetConservation distinguishes Pre-operational centration from Concrete reversibility', () => {
  const initialPre = evaluatePiagetConservation('pre-operational', 'liquid-glass', false);
  assert.equal(initialPre.conservesAmount, true);

  const pouredPre = evaluatePiagetConservation('pre-operational', 'liquid-glass', true);
  assert.equal(pouredPre.conservesAmount, false);
  assert.match(pouredPre.reasoningLabel, /Centration/i);

  const pouredConcrete = evaluatePiagetConservation('concrete-operational', 'liquid-glass', true);
  assert.equal(pouredConcrete.conservesAmount, true);
  assert.match(pouredConcrete.reasoningLabel, /Reversibility/i);

  const pencilsFormal = evaluatePiagetConservation('formal-operational', 'offset-pencils', true);
  assert.equal(pencilsFormal.conservesAmount, true);
  assert.equal(BICYCLE_SCHEMA_STEPS.length, 4);
});

test('simulateSkinnerSchedule identifies Variable Ratio as highest extinction resistance', () => {
  const vr = simulateSkinnerSchedule('variable-ratio');
  const fi = simulateSkinnerSchedule('fixed-interval');
  const cont = simulateSkinnerSchedule('continuous');

  assert.equal(vr.extinctionResistance, 'Highest');
  assert.equal(cont.extinctionResistance, 'Low');
  assert.equal(fi.cumulativeCurvePoints.length, 10);
  assert.ok(vr.cumulativeCurvePoints[9] >= fi.cumulativeCurvePoints[9]);
});

test('evaluateKolbQuadrant maps Feeling/Thinking vs Watching/Doing correctly', () => {
  assert.equal(
    evaluateKolbQuadrant({ thinkingScore: -20, watchingScore: 20 }).quadrant,
    'Diverging',
  );
  assert.equal(
    evaluateKolbQuadrant({ thinkingScore: 25, watchingScore: 25 }).quadrant,
    'Assimilating',
  );
  assert.equal(
    evaluateKolbQuadrant({ thinkingScore: 25, watchingScore: -25 }).quadrant,
    'Converging',
  );
  assert.equal(
    evaluateKolbQuadrant({ thinkingScore: -25, watchingScore: -25 }).quadrant,
    'Accommodating',
  );
});

test('scoreQuizAttempt grades answers and ranks weak sessions by error count', () => {
  const sampleQuestions: QuizQuestion[] = [
    {
      id: 'q1',
      sessionId: 's01',
      sessionNumber: '01',
      kind: 'concept',
      question: 'Q1',
      options: ['A', 'B'],
      correctIndex: 0,
      rationale: 'R1',
      sourceRef: 'Session 01',
    },
    {
      id: 'q2',
      sessionId: 's08',
      sessionNumber: '08',
      kind: 'scenario',
      question: 'Q2',
      options: ['A', 'B'],
      correctIndex: 1,
      rationale: 'R2',
      sourceRef: 'Session 08',
    },
    {
      id: 'q3',
      sessionId: 's08',
      sessionNumber: '08',
      kind: 'concept',
      question: 'Q3',
      options: ['A', 'B'],
      correctIndex: 1,
      rationale: 'R3',
      sourceRef: 'Session 08',
    },
  ];

  const result = scoreQuizAttempt(sampleQuestions, { q1: 0, q2: 0, q3: 0 });
  assert.equal(result.correctCount, 1);
  assert.equal(result.scorePercent, 33);
  assert.deepEqual(result.weakSessionIds, ['s08']);
});

test('orderFlashcards and filterGlossary handle session filtering and queries', () => {
  const cards: FlashcardItem[] = [
    {
      id: 'f1',
      sessionId: 's01',
      sessionNumber: '01',
      term: 'Educational Psychology',
      prompt: 'P1',
      answer: 'A1',
      concreteExample: 'E1',
      sourceRef: 'S1',
    },
    {
      id: 'f2',
      sessionId: 's08',
      sessionNumber: '08',
      term: 'ZPD',
      prompt: 'P2',
      answer: 'A2',
      concreteExample: 'E2',
      sourceRef: 'S8',
    },
  ];

  const ordered = orderFlashcards(cards, ['f1'], 'all', true);
  assert.equal(ordered[0].id, 'f2');
  assert.equal(ordered[1].id, 'f1');

  const glossary: GlossaryEntry[] = [
    {
      term: 'Zone of Proximal Development (ZPD)',
      sessionId: 's08',
      sessionNumber: '08',
      beginnerDefinition: 'Gap between solo ability and guided ability.',
      example: 'Stacking beakers with hints.',
      sourceRef: 'Session 08',
    },
    {
      term: 'Affordance (Real vs Perceived)',
      sessionId: 's01',
      sessionNumber: '01',
      beginnerDefinition: 'What technology actually lets you do vs what you notice.',
      example: 'Smartboard capabilities.',
      sourceRef: 'Mutlu (2016)',
    },
  ];

  assert.equal(filterGlossary(glossary, 'zpd', 'all').length, 1);
  assert.equal(filterGlossary(glossary, '', 's01').length, 1);
});

test('evaluateGagneHierarchy and evaluateTransferScenario model Gagne 8 steps, 9 events, and Transfer rules', () => {
  assert.equal(GAGNE_INTELLECTUAL_SKILLS.length, 8);
  assert.equal(GAGNE_NINE_EVENTS.length, 9);

  const missing = evaluateGagneHierarchy(6, [1, 2, 3, 4]); // Missing Discrimination (L5)
  assert.equal(missing.readinessStatus, 'Missing Lower Foundations');
  assert.equal(missing.missingPrerequisites.length, 1);
  assert.equal(missing.missingPrerequisites[0].level, 5);

  const ready = evaluateGagneHierarchy(6, [1, 2, 3, 4, 5]);
  assert.equal(ready.readinessStatus, 'Ready for Mastery');

  const neg = evaluateTransferScenario({
    similarity: 'similar-classroom',
    oldHabitClashes: true,
    firstTaskMastered: true,
    overlearningActive: false,
  });
  assert.equal(neg.direction, 'Negative Transfer');
  assert.equal(neg.scopeType, 'Specific Transfer');

  const posGeneral = evaluateTransferScenario({
    similarity: 'broad-life',
    oldHabitClashes: false,
    firstTaskMastered: true,
    overlearningActive: true,
  });
  assert.equal(posGeneral.direction, 'Positive Transfer');
  assert.equal(posGeneral.scopeType, 'General Transfer');
  assert.ok(posGeneral.transferStrengthPercent >= 80);
});

test('simulateWeinerAttribution and evaluateEmotionCognition reflect Motivation & Emotional Behaviour PDFs', () => {
  assert.equal(MASLOW_NEEDS_TIERS.length, 6);
  assert.equal(PLUTCHIK_BLENDS.length, 3);

  const effort = simulateWeinerAttribution('effort-strategy');
  assert.equal(effort.locus, 'Internal');
  assert.equal(effort.controllability, 'Controllable');
  assert.equal(effort.futurePersistence, 'High Resilience');

  const ability = simulateWeinerAttribution('low-ability');
  assert.equal(ability.futurePersistence, 'Helpless / At-Risk');

  const candleJoy = evaluateEmotionCognition({
    moodState: 'joyful-warm',
    learningMaterial: 'candle-insight',
  });
  assert.equal(candleJoy.recallEfficiency, 'High');
  assert.match(candleJoy.insightOutcome, /Low Functional Fixedness/i);

  const candleFear = evaluateEmotionCognition({
    moodState: 'anxious-fear',
    learningMaterial: 'candle-insight',
  });
  assert.match(candleFear.insightOutcome, /Functional Fixedness/i);
});

test('recommendChildStudyMethod and analyzePersonalityCase return grounded guidance across scenarios and theories', () => {
  const recCase = recommendChildStudyMethod('single-grade7-drop');
  assert.match(recCase.recommendedMethod, /Case Study/i);

  const recMixed = recommendChildStudyMethod('large-tablet-survey');
  assert.match(recMixed.moduleCaveatAndEthics, /verba volant/i);

  const adler = analyzePersonalityCase('neo-freudian-adler');
  assert.match(adler.diagnosisOfDisruption, /Inferiority Complex/i);
  const cattell = analyzePersonalityCase('trait-cattell');
  assert.match(cattell.diagnosisOfDisruption, /2\/3/);
});
