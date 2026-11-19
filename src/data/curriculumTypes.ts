export type StudyTab =
  | 'overview'
  | 'foundations'
  | 'simulations'
  | 'flashcards'
  | 'quiz-matrix'
  | 'glossary'
  | 'about';

export type SimulationId =
  | 'piaget'
  | 'memory'
  | 'conditioning'
  | 'ecology-styles'
  | 'gagne-transfer'
  | 'motivation-emotion'
  | 'personality-methods';

export interface ConceptBlock {
  title: string;
  plainExplanation: string;
  details: string[];
  sourceTag: string;
}

export interface CaseStudyBlock {
  title: string;
  context: string;
  whatHappened: string;
  psychologyTakeaway: string;
  sourceTag: string;
}

export interface TheoristSpotlight {
  name: string;
  eraOrWork: string;
  coreIdea: string;
  classroomLink: string;
}

export interface InlineCheck {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  sourceTag: string;
}

export interface ReferenceItem {
  citation: string;
  type: 'pdf' | 'book' | 'reading' | 'video';
  note?: string;
}

export interface StudySession {
  id: string;
  number: string;
  title: string;
  shortTitle: string;
  estimatedMinutes: number;
  beginnerHook: string;
  inPlainEnglish: string;
  whyItMattersForZeroPriorKnowledge: string;
  keyQuestionsAnswered: string[];
  concepts: ConceptBlock[];
  caseStudies: CaseStudyBlock[];
  theorists: TheoristSpotlight[];
  teacherTakeaways: string[];
  miniCheck: InlineCheck;
  sources: ReferenceItem[];
}

export interface FlashcardItem {
  id: string;
  sessionId: string;
  sessionNumber: string;
  term: string;
  prompt: string;
  answer: string;
  concreteExample: string;
  sourceRef: string;
}

export interface QuizQuestion {
  id: string;
  sessionId: string;
  sessionNumber: string;
  kind: 'concept' | 'scenario' | 'method';
  question: string;
  options: string[];
  correctIndex: number;
  rationale: string;
  sourceRef: string;
}

export interface MethodComparisonRow {
  method: string;
  howItWorks: string;
  keyVariablesOrTools: string;
  bestUsedWhen: string;
  limitationsOrEthics: string;
  sourceRef: string;
}

export interface TheoryComparisonRow {
  perspective: string;
  keyTheorists: string;
  howLearningHappens: string;
  roleOfTeacherAndStudent: string;
  classroomExample: string;
  sourceRef: string;
}

export interface GlossaryEntry {
  term: string;
  sessionId: string;
  sessionNumber: string;
  beginnerDefinition: string;
  example: string;
  sourceRef: string;
}
