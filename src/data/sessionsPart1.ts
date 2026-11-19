import type { StudySession } from './curriculumTypes';

export const SESSIONS_PART_1: StudySession[] = [
  {
    id: 's01',
    number: '01',
    title: 'Educational Psychology & the Changing Role of the Teacher',
    shortTitle: 'Foundations & Teacher Role',
    estimatedMinutes: 16,
    beginnerHook:
      'Start here if you have never studied psychology before: what does it actually mean to understand how a human learns, and how does a modern teacher step off the podium?',
    inPlainEnglish:
      'Psychology evolved from debating the unseen "soul" or "mind" into scientifically studying observable behaviour and mental processes (attention, memory, problem solving, emotion). While Oxford/Webster dictionaries often narrow "education" to formal school instruction, Roemer (1878, p. 4) frames education broadly as intentional influence guiding physical, intellectual, and moral growth. Educational Psychology zeroes in on three connected classroom elements—the Learner, the Learning Process, and the Learning Situation (Lindgren, 1980)—so everyday teachers can design instruction that truly reaches learners.',
    whyItMattersForZeroPriorKnowledge:
      'Before memorizing learning theories or developmental charts, you need the big picture: knowing your subject (like math or science) is not enough if you do not understand how students think, feel, resist, or stay motivated.',
    keyQuestionsAnswered: [
      'How did Psychology expand from general study into Educational, Child, Cognitive, Clinical, Organisational, Health, and Applied branches?',
      'How does Educational Psychology differ from School Psychology, and why is it an independent applied discipline (Woolfolk, 1987/1993)?',
      'What separates a traditional "Teacher" from a modern "Facilitator" (Brownstein 2001; Rhodes & Bellamy 1999; Kotalawala 1996)?',
      'Why do teachers adopt front-of-room smartboards yet quietly resist student tablets (Mutlu, 2016)?',
    ],
    concepts: [
      {
        title: 'Psychology’s Expanding Family Tree (Figure 1.1 & Diagram 1)',
        plainExplanation:
          'General psychology branched into specialized fields so researchers could solve specific human problems in classrooms, clinics, workplaces, and hospitals.',
        details: [
          'Educational Psychology: Scientific study of social, emotional, and cognitive processes involved in learning and teaching across the entire lifespan (Woolfolk, 1987/1993 defines it with its own dedicated theories, principles, and research methods).',
          'Educational vs. School Psychology: Educational Psychology prepares everyday teachers across whole classrooms and curriculum; School Psychology diagnoses and treats individual learners experiencing clinical, behavioural, or special needs.',
          'Developmental & Child Psychology: Developmental Psychology explains growth, change, and consistency across the entire lifespan; Child Psychology explains how behaviour changes from birth through adolescence.',
          'Cognitive Psychology: Investigates internal mental processes—attention, language use, memory, perception, problem solving, creativity, and critical thinking.',
          'Clinical, Health & Medical Psychology: Clinical relieves psychological distress and promotes subjective well-being; Health examines behavioural processes in health and illness; Medical applies clinical/health principles inside hospital practice.',
          'Social, Organisational & Applied Psychology: Social explains how others shape thoughts/feelings/actions; Organisational/Industrial applies theories to workplaces; Diagram 1 also lists Animal, Adolescent, Adult, Neuro, Experimental, Physical, Counselling, and Parapsychology.',
        ],
        sourceTag: 'Session 01, Additional Readings (Fig 1.1) & STP8301 Unit 1 Diagram 1',
      },
      {
        title: 'Lindgren’s 3-Part Lens & Kotalawala’s Three Teaching Steps',
        plainExplanation:
          'Classroom success depends on connecting who the student is, how the brain learns, and what climate surrounds them—executed through three non-separable steps.',
        details: [
          'H.C. Lindgren (1980) Three Interconnected Focus Areas: (1) The Learner (readiness, background, needs), (2) The Learning Process (how encoding, practice, and insight unfold), and (3) The Learning Situation (seating, peer climate, tools, teacher tone).',
          'Kotalawala (1996, p. 13) Three Non-Separable Steps: (1) Formulate clear behavioural learning objectives spanning Cognitive (knowledge), Attitudinal (values), and Psychomotor/Skill domains; (2) Organize suitable learning experiences; (3) Evaluate learning outcomes and design targeted remedial teaching.',
          'Eight Sub-Roles of a Teacher: Instructor, Decision Maker, Knowledge Provider, Classroom Manager, Leader, Facilitator, Counsellor, and Resource Provider.',
          'Roemer (1878) Broad View vs. Narrow View: Rather than treating education only as memorising school textbooks for exams, educational psychology develops the whole person across school, home, and community life.',
        ],
        sourceTag: 'STP8301 Educational Psychology and the Teacher / Kotalawala (1996)',
      },
      {
        title: 'Teacher vs. Facilitator & 21st-Century Competencies',
        plainExplanation:
          'Modern society demands teachers who ask open questions and coach discovery rather than delivering one-way monologues.',
        details: [
          'Brownstein (2001) & Rhodes & Bellamy (1999) Contrast: Traditional Teachers tell from the front, give fixed answers, and speak in monologue; Facilitators ask probing questions, support from behind/beside learners, offer flexible guidelines, and sustain continuous two-way dialogue.',
          'Four Drivers Changing the Classroom (Seifert & Sutton, 2011): Increasing student diversity, expanding instructional technology, higher public accountability, and heightened teacher professionalism.',
          '21st-Century Teacher Shift (Johnson & McElroy, 2010; Singapore NIE): Educators move from isolated content gatekeepers to collaborative designers of inquiry, adaptability, and reflective learning.',
          'Competency vs. Competence vs. Effectiveness & Delors’ (1996) Four Pillars (Aabriti Sharma, 2017): A competency is a single assessable skill/knowledge/value; Competence is integrated capacity; Teacher Effectiveness is verified strictly by real pupil outcomes—anchored on Learning to Know, Learning to Do, Learning to Live Together, and Learning to Be.',
        ],
        sourceTag: 'Session 01 / Sharma (2017) / Seifert & Sutton (2011)',
      },
      {
        title: 'Why Classroom Technology Meets Resistance (Mutlu, 2016)',
        plainExplanation:
          'Dropping tablets or smartboards into a classroom fails unless teachers feel confident, supported, and genuinely in ownership of how the tool helps pedagogy.',
        details: [
          '"21st-century technology with 19th-century pedagogy" (Magid, 2015) and "polished performances of conventional practices" (Davies & Merchant, 2009): teachers frequently treat interactive whiteboards simply as cleaner blackboards.',
          'Affordances (Gibson 1979 vs. Norman 1988 vs. Hammond 2010): Real affordances are every action a tool physically permits; perceived affordances are the actions a teacher notices and feels confident trying; Hammond showed affordances emerge bidirectionally between user and tool.',
          'UTAUT2 + Psychological Ownership (PO) & Self-Efficacy (SE): In Tugba Mutlu’s mixed-methods PhD thesis (15 teachers, 266 students in Turkey’s FATIH project), Facilitating Conditions strongly lifted Effort Expectancy (f² = 0.191), Self-Efficacy boosted Effort Expectancy (f² = 0.268) and Behavioural Intention (f² = 0.042), and Psychological Ownership raised Intention (f² = 0.154).',
        ],
        sourceTag: 'Tugba Mutlu PhD Thesis (2016)',
      },
    ],
    caseStudies: [
      {
        title: 'Smartboards vs. Student Tablets in the FATIH Classroom',
        context:
          'Upper-secondary teachers received both front-of-room interactive whiteboards (IWBs) and personal student tablets.',
        whatHappened:
          'Teachers eagerly used IWBs because front-of-class projection protected their authority, eye-line control, and identity ("we teach who we are"). Student tablets faced quiet avoidance due to over-filtering, technical glitches, mismatched training, a belief that paper feels more authentic, and fear of losing classroom focus.',
        psychologyTakeaway:
          'Educational tools only transform learning when teachers build self-efficacy and psychological ownership alongside pedagogical redesign.',
        sourceTag: 'Tugba Mutlu PhD Thesis (2016), Ch. 2 & 5',
      },
    ],
    theorists: [
      {
        name: 'Johann Herbart',
        eraOrWork: 'Pioneer — "Father of Educational Psychology"',
        coreIdea: 'Connected systematic psychology to structured lesson preparation and moral/intellectual formation.',
        classroomLink: 'Inspired logical lesson steps that link new ideas directly to what students already know.',
      },
      {
        name: 'William James',
        eraOrWork: 'Talks to Teachers on Psychology (1899)',
        coreIdea: 'Explained that psychology is a science whereas teaching is a living art requiring tact and close observation.',
        classroomLink: 'Urged teachers to read real student reactions rather than applying rigid formulas mechanically.',
      },
      {
        name: 'Anita Woolfolk & H.C. Lindgren',
        eraOrWork: 'Educational Psychology Foundations (1980 / 1987 / 1993)',
        coreIdea: 'Established Educational Psychology as a distinct applied science built around Learner + Learning Process + Learning Situation.',
        classroomLink: 'Gives every beginner teacher a 3-part diagnostic lens whenever a lesson stalls.',
      },
      {
        name: 'E. Kotalawala & Aabriti Sharma',
        eraOrWork: 'Teacher Functions (1996) & Competencies (2017)',
        coreIdea: 'Defined teaching via objectives -> experiences -> evaluation/remediation and measured teacher effectiveness by real pupil growth.',
        classroomLink: 'Aligns cognitive, attitudinal, and practical skills with Delors’ 4 Pillars of Education.',
      },
    ],
    teacherTakeaways: [
      'Always diagnose stalled lessons across all three Lindgren dimensions: the learner, the learning process, and the classroom situation.',
      'Step out of pure monologue: trade fixed answers for probing facilitator questions and guided continuous dialogue.',
      'Tie every lesson objective across Cognitive, Attitudinal, and Skill domains—and verify learning through evaluation and remedial follow-up.',
    ],
    miniCheck: {
      question:
        'Which distinction accurately separates Educational Psychology from School Psychology in STP8301?',
      options: [
        'Educational Psychology focuses broadly on learners, learning processes, and classroom situations; School Psychology centers on diagnosing and supporting individual students with clinical or special needs.',
        'Educational Psychology only studies university adults, whereas School Psychology studies infants.',
        'Educational Psychology is strictly medical treatment in hospitals, while School Psychology writes textbooks.',
      ],
      correctIndex: 0,
      explanation:
        'Session 01 and STP8301 clarify that Educational Psychology equips teachers with principles of learning, development, and classroom environments for all learners, whereas School Psychology works clinically with individual diagnostic and special needs.',
      sourceTag: 'Session 01 & STP8301 Educational Psychology and the Teacher',
    },
    sources: [
      { citation: 'Session_01_English.pdf — Educational Psychology Foundations', type: 'pdf' },
      { citation: 'STP8301_English Medium-Educational Psychology and the Teacher.pdf', type: 'pdf' },
      { citation: '24-Aabriti Sharma (2017) — Teaching Competencies & Delors 4 Pillars', type: 'pdf' },
      { citation: 'Tugba Mutlu (2016) — Teachers & Tech Affordances / UTAUT2 PhD Thesis', type: 'pdf' },
      { citation: 'Seifert, K., & Sutton, R. (2011). Educational Psychology (3rd ed.)', type: 'book' },
      { citation: 'Johnson & McElroy (2010); Castle & Buckler (2014); Slavin (2006)', type: 'book' },
    ],
  },
  {
    id: 's02',
    number: '02',
    title: 'Child Study Methods & Ethical Research',
    shortTitle: 'Child Study Methods',
    estimatedMinutes: 16,
    beginnerHook:
      'Teachers should never guess why a student is struggling. How do psychologists and teachers systematically gather real evidence about a child without causing harm?',
    inPlainEnglish:
      'STP8301 notes three vital reasons teachers study children carefully: to discover what motivates action, to prevent problems before habits harden, and to predict how an individual child will respond to guidance. Following Wundt’s three scientific criteria—objectivity, consistency, and self-correctedness—educators pick from Experiments, Observation, Questionnaires, Interviews, Case Studies, Cognitive/Affective Tests, Introspection, and Mixed Methods while strictly safeguarding every child under age 18.',
    whyItMattersForZeroPriorKnowledge:
      'Understanding Independent Variables, Controlled Variables, the 8 Observation Rules, and why questionnaires alone can mislead you prevents you from jumping to false labels about quiet or struggling students.',
    keyQuestionsAnswered: [
      'What are Wundt’s 3 criteria for scientific child study, and how do IV, DV, and Control groups work?',
      'What are the 8 Observation Reliability Rules (Hargreaves 1967; Roy 1952), and how does Introspection differ?',
      'How do Thurstone scales, Standardized vs. Exploratory interviews, and Cognitive vs. Affective tests work?',
      'What ethical safeguards (UN, UNICEF, BERA 2011) protect children—including Mutlu’s consent-vs-anonymity dilemma?',
    ],
    concepts: [
      {
        title: 'Scientific Foundations & the Experimental Method (Wundt, 1879)',
        plainExplanation:
          'True scientific inquiry requires objectivity, consistency, and self-correction—and Experiments isolate cause and effect by manipulating one factor at a time.',
        details: [
          'Three Criteria of Science: Objectivity (free from personal bias), Consistency (repeatable under matched conditions), and Self-correctedness (revising claims when new data disproves them).',
          'Experiment Anatomy: Independent Variable (IV = manipulated cause, e.g., teaching style or fluoride toothpaste); Dependent Variable (DV = measured outcome after treatment); Controlled/Extraneous Variables (matched age, IQ, baseline score).',
          'Real Module Example 1 — Fluoride Toothpaste Study (STP8301): Children aged 3–12 are split into Experimental (daily fluoride paste) vs. Control (non-fluoride paste) groups with cavity checks at baseline and after 1 year to isolate dental protection.',
          'Two Major Classroom Limitations: (1) Ethics forbid withholding beneficial help from control children, and (2) real human behaviour reflects interwoven IQ, family, school, and peer factors hard to isolate completely.',
        ],
        sourceTag: 'Session 02 & STP8301 Child Study Methods',
      },
      {
        title: 'Observation Method (Direct, Indirect, Participant & 8 Rules)',
        plainExplanation:
          'When manipulation is unethical or unnatural, disciplined watching reveals genuine behaviour in classrooms and playgrounds.',
        details: [
          'Three Forms: Direct Naturalistic Observation (Hargreaves, 1967—watching real classroom life unobstructed), Indirect Observation (one-way mirrors or video recordings), and Participant Observation (Roy, 1952 / Mutlu’s "observer as participant" joining naturally without distorting the group).',
          'STP8301’s 8 Rules for Reliable Observation: (1) Define exact purpose/target behaviour first, (2) Observe across multiple times and settings rather than one day, (3) Record facts immediately rather than trusting delayed memory, (4) Separate concrete observable acts from subjective guesses, (5) Use clear checklists/anecdotal logs, (6) Stay unobtrusive so students do not perform for the watcher, (7) Cross-check with another observer if possible, and (8) Keep records strictly confidential.',
        ],
        sourceTag: 'STP8301 Child Study Methods / Hargreaves (1967) / Roy (1952)',
      },
      {
        title: 'Questionnaires, Interviews, Introspection, Tests & Case Studies',
        plainExplanation:
          'Each self-report or diagnostic tool uncovers a different piece of a learner—thoughts, attitudes, social bonds, or hidden home difficulties.',
        details: [
          'Questionnaires & Thurstone Scales: Written Closed-ended (Likert/multiple-choice) and Open-ended items—low cost for large samples, plus Thurstone’s Method of Equal-Appearing Statements for measuring attitudes. Requires Grade 6+ literacy and fails to explain *why* without follow-up (Mutlu, 2016).',
          'Interviews (Standardized vs. Exploratory & Focus Groups): Governed by four pillars—interviewer rapport, one-way professional focus (avoiding lecturer tangents or biased prompting), clear questions, and accurate recording (SimplyPsychology / Abawi, 2013).',
          'Introspection Method: Asking a learner to look inward and report aloud what thoughts/feelings occurred while solving a task or recalling an event. Quick insight into covert thought, yet limited because young children struggle to verbalize thoughts and claims cannot be verified objectively by outsiders.',
          'Cognitive vs. Affective Tests & Case Studies: Cognitive tests measure Intelligence, Attainment, and Achievement; Affective tests gauge Attitudes, Interests, Sociometric peer friendships, and Projective responses. A Case Study integrates 4 required areas—Personal info, Family background, Nature of Problem, and Tailored Solutions (Zainal, 2007).',
        ],
        sourceTag: 'STP8301 Child Study Methods / Zainal (2007) / Abawi (2013)',
      },
      {
        title: 'Research Ethics & Convergent Mixed Methods',
        plainExplanation:
          'Protecting every learner under 18 takes priority over convenience, while triangulating methods prevents false conclusions.',
        details: [
          'UN, UNICEF & BERA (2011) Child Protections: Anyone under 18 is a child; research requires caregiver consent plus child assent, voluntary right to withdraw at any point, privacy, and zero physical or emotional harm.',
          'Consent vs. Anonymity Dilemma (Mutlu, 2016): Collecting written signatures can frighten participants who worry records may trace back to them (*verba volant, scripta manent*—"spoken words fly away, written words remain").',
          'Convergent Parallel Mixed Methods (Creswell): Combining quantitative scale breadth (survey/pre-post scores) with qualitative interview/observation depth cross-checks and explains surprises.',
        ],
        sourceTag: 'Session 02 / UNICEF TechNote1 / Mutlu (2016)',
      },
    ],
    caseStudies: [
      {
        title: 'Lecture vs. Exploratory Group Experiment (Pre-Test -> Post-Test)',
        context:
          'Three matched student groups all averaged 40 on a baseline pre-test before a new social-science unit.',
        whatHappened:
          'Group A received Lecture instruction (post-test = 60); Group B worked in Exploratory Groups (post-test = 75); the Control group received ordinary lessons without either new method (post-test = 50).',
        psychologyTakeaway:
          'Matched pre-tests plus a control group let teachers credit Exploratory Group learning (+15 over Lecture) to the Independent Variable rather than chance.',
        sourceTag: 'STP8301 Child Study Methods (Unit 2)',
      },
      {
        title: 'Why the Tablet Questionnaire Needed Observation (Mutlu, 2016)',
        context:
          'A secondary student strongly disagreed on every Likert item about using classroom tablets.',
        whatHappened:
          'Closed survey scores looked like hostility toward technology until classroom observation and interview showed the student’s tablet simply had a cracked screen and dead battery that remained unrepaired.',
        psychologyTakeaway:
          'Never trust closed questionnaire totals alone—triangulate with observation or short interviews to discover root causes.',
        sourceTag: 'Tugba Mutlu PhD Thesis (2016), Ch. 4–5',
      },
    ],
    theorists: [
      {
        name: 'Wilhelm Wundt',
        eraOrWork: '1879 Leipzig Laboratory & Scientific Criteria',
        coreIdea: 'Established experimental psychology anchored in objectivity, consistency, and self-correctedness.',
        classroomLink: 'Guides teachers to test instructional changes systematically instead of guessing.',
      },
      {
        name: 'Zainah Zainal & John Creswell',
        eraOrWork: 'Case Study (2007) & Mixed Methods Research',
        coreIdea: 'Case studies answer deep "how" and "why" questions inside real contexts; mixed methods pair numerical breadth with lived stories.',
        classroomLink: 'Prevents misdiagnosing a single struggling child from one low quiz score.',
      },
      {
        name: 'D. Hargreaves & D. Roy',
        eraOrWork: 'Classroom Observation Traditions (1952 / 1967)',
        coreIdea: 'Distinguished structured natural observation from participant observation embedded in group routines.',
        classroomLink: 'Shows how teachers notice authentic peer dynamics without disrupting class flow.',
      },
    ],
    teacherTakeaways: [
      'Apply the 8 Observation Rules: separate concrete behaviour ("stared out window for 4 minutes") from snap labels ("lazy").',
      'Whenever quantitative test or Likert scores puzzle you, follow up with a neutral, one-way exploratory interview.',
      'Hold children’s family notes and test profiles strictly confidential under UN/BERA child protection standards.',
    ],
    miniCheck: {
      question:
        'A school tests whether daily fluoride toothpaste prevents tooth decay over 1 year among matched 3–12-year-olds compared against a non-fluoride group. What is the Dependent Variable (DV)?',
      options: [
        'Whether a child receives fluoride or non-fluoride toothpaste',
        'The measured number of dental cavities after 1 year',
        'Keeping child age between 3 and 12 in both groups',
      ],
      correctIndex: 1,
      explanation:
        'The Dependent Variable (DV) is the outcome measured after treatment (cavity counts after 1 year). Toothpaste type is the Independent Variable (IV), and matched age is a Controlled Variable.',
      sourceTag: 'STP8301 Child Study Methods (Example 1)',
    },
    sources: [
      { citation: 'Session_02_English.pdf — Child Study Methods', type: 'pdf' },
      { citation: 'STP8301_English Medium-Child Study Methods.pdf', type: 'pdf' },
      { citation: 'Kevin, C. (2014). Child Development: A Practical Introduction (pp. 32–49)', type: 'book' },
      { citation: 'Zainal, Z. (2007). Case study as a research method', type: 'reading' },
      { citation: 'Abawi (2013); SimplyPsychology (Questionnaires, Interviews, Case Study)', type: 'reading' },
    ],
  },
  {
    id: 's03',
    number: '03',
    title: 'Growth, Development, Heredity & Environment',
    shortTitle: 'Growth, Heredity & Env',
    estimatedMinutes: 15,
    beginnerHook:
      'For centuries, society treated children as tiny "miniature adults" who just needed adult rules. Modern developmental psychology proves children grow and develop by very different rules.',
    inPlainEnglish:
      'Growth is quantitative and physically measurable—such as doubling birth weight within 6 months and adding height or BMI. Development is the qualitative, progressive improvement in how a child thinks, moves, speaks, feels, and acts morally. All five dimensions—Physical, Cognitive, Emotional, Social, and Moral—interlock constantly: if illness delays walking, reduced exploration can temporarily slow curiosity too. Neither genes (46 chromosomes, polygenic traits) nor environment (from womb conditions to classroom warmth) works alone.',
    whyItMattersForZeroPriorKnowledge:
      'Understanding why different body tissues grow at different rates and why Maturation sets the floor for Learning stops teachers from forcing cursive writing or abstract drills before nerves and muscles are ready.',
    keyQuestionsAnswered: [
      'Why was treating children as "miniature adults" wrong, and how do Growth vs. Development differ?',
      'Why do different tissues (neural vs digestive) grow at different rates, and how do the 5 development domains interact?',
      'How do Heredity (polygenic traits, twins, congenital limits) and Pre-natal/Post-natal Environments shape aptitude?',
      'Which concrete Maturation vs. Learning pairs guide classroom timing?',
    ],
    concepts: [
      {
        title: 'Growth vs. Development & Cross-Domain Interdependence',
        plainExplanation:
          'Growth measures physical size and stops in adulthood; Development builds functional quality across the whole lifespan.',
        details: [
          'Growth (Quantitative): Measurable changes in height, weight (birth weight typically doubles by 6 months), head circumference, and BMI. Crucially, tissues grow unevenly—neural/brain tissue matures much faster than digestive or circulatory organs up to age 12.',
          'Development (Qualitative): Orderly, relatively permanent shifts toward mature functioning—not children acting as "miniature adults," but evolving through distinct needs and capacities across Pre-natal -> Infancy (0–2) -> Early Childhood (2–5/6) -> Later Childhood (5/6–11/12) -> Adolescence (11/12–20/21) -> Adulthood.',
          'Interdependence of Five Domains (Physical, Cognitive, Emotional, Social, Moral): A delay in one domain ripples across others (e.g., chronic illness slowing physical mobility reduces play exploration, which shrinks language/cognitive inputs and social confidence).',
        ],
        sourceTag: 'Session 03 & Factors Affecting Growth and Development',
      },
      {
        title: 'Heredity (46 Chromosomes & Polygenic Potential) vs. Environment',
        plainExplanation:
          'Heredity hands out biological ranges through 23 chromosome pairs; environment decides how much of that potential actually blossoms.',
        details: [
          'Genetic Foundations (Plomin, 1990; Gilger, 1996): 46 chromosomes (23 maternal + 23 paternal) govern congenital traits and polygenic capacities (many genes shaping intelligence and temperament together).',
          'Identical Twin Comparisons & Congenital Ceilings: Even genetically identical twins raised in contrasting homes diverge in language and personality; meanwhile, severe congenital damage can cap ceiling capacity regardless of wealth.',
          'Pre-Natal Environment: Maternal diet, illnesses (Rubella, Syphilis, Diphtheria, TB), medications/toxins, and severe emotional stress (Burns, 1991 shows adrenaline crossing the placenta raises fetal heart reactivity).',
          'Post-Natal Environment & Golden 1000 Days (Pem, 2015; Vaida, 2007): Conception to age 2 demands nutrition, hygiene, shelter, emotional warmth, and *active* engagement—possessing toys does nothing if children cannot touch and explore them.',
        ],
        sourceTag: 'Heredity and Environment.pdf / Pem (2015)',
      },
      {
        title: 'Maturation Sets the Timing Floor for Learning',
        plainExplanation:
          'Practice improves skills fastest once biological nerves, bones, and muscles have matured enough to sustain them.',
        details: [
          'Maturation vs. Learning Pairs (Maturity & Learning PDF): Maturation governs standing before walking, vocal tract readiness before crisp speech, and skeletal bladder/finger control; Learning governs cutting smoothly with scissors, climbing stairs safely, solving math sums, and reciting verses cleanly.',
          'Two Classroom Warnings: Teaching a skill too early (before neural/finger maturation) breeds tears and failure; waiting too long after readiness misses the prime window of eagerness.',
        ],
        sourceTag: 'Maturity and Learning.pdf / Session 03',
      },
    ],
    caseStudies: [
      {
        title: 'Samantha vs. Anil & Nuwan’s Unrealized Aptitude',
        context:
          'Two classroom comparisons from the Growth and Heredity PDFs reveal how growth, development, and enrichment diverge.',
        whatHappened:
          'Anil grew tall and heavy rapidly yet struggled with expressive language beside smaller-framed Samantha, who reasoned fluently. Elsewhere, bright young Nuwan inherited strong natural curiosity yet lacked books, conversation, and learning enrichment—leaving his aptitude stalled.',
        psychologyTakeaway:
          'Tall height does not equal cognitive maturity, and strong genetic aptitude stays dormant without active environmental stimulation.',
        sourceTag: 'Factors Affecting Growth & Heredity and Environment.pdf',
      },
      {
        title: 'Pradeep’s Locked Toys & Nimali’s Home Tension',
        context:
          'Two learners from affluent vs. stressed households illustrate post-natal environmental power.',
        whatHappened:
          'Pradeep’s parents kept expensive toys locked behind glass cabinets to keep them pristine, depriving him of active tactile discovery. Nimali, an able Grade 7 student, suffered a steep mathematics collapse when severe family conflict erupted at home.',
        psychologyTakeaway:
          'Tools only teach through active handling, and emotional security at home is foundational fuel for school achievement.',
        sourceTag: 'Heredity and Environment.pdf',
      },
    ],
    theorists: [
      {
        name: 'Robert Plomin & J.W. Gilger',
        eraOrWork: 'Behavioural Genetics (1990 / 1996)',
        coreIdea: 'Proved intelligence and personality are polygenic traits continuously shaped by environmental quality.',
        classroomLink: 'Refutes fatalism: rich schooling elevates achievement across diverse genetic starting points.',
      },
      {
        name: 'D. Pem & N. Vaida',
        eraOrWork: 'Early Growth Research (2007 / 2015)',
        coreIdea: 'Documented the Golden 1000 days (conception to age 2) as decisive for neural and physical resilience.',
        classroomLink: 'Connects maternal/early childhood nutrition directly to primary-school attention and stamina.',
      },
    ],
    teacherTakeaways: [
      'Never expect adult-level sitting stillness or logical patience from young children—match expectations to tissue and nervous-system maturity.',
      'Put manipulatives directly into students’ hands (avoid Pradeep’s glass-cabinet trap).',
      'Watch sudden academic slumps for hidden emotional stress at home (Nimali’s pattern) or nutrition/sleep gaps.',
    ],
    miniCheck: {
      question:
        'Which classroom activity depends primarily on explicit Learning once biological Maturation has prepared the hand and brain?',
      options: [
        'Doubling birth weight by 6 months of age',
        'Cutting neatly along curved shapes with scissors and reciting poetry',
        'Rapid prenatal neural tissue expansion compared with digestive organs',
      ],
      correctIndex: 1,
      explanation:
        'Maturity & Learning contrasts biological unfolding (weight gain, organ rates, standing readiness) with practiced skills like scissor control, stair climbing, arithmetic, and reciting verses.',
      sourceTag: 'Maturity and Learning.pdf',
    },
    sources: [
      { citation: 'Session_03_English.pdf — Growth & Development', type: 'pdf' },
      { citation: 'English Medium-Factors Affecting Growth and Development of the Child.pdf', type: 'pdf' },
      { citation: 'English Medium-Heredity and Environment.pdf', type: 'pdf' },
      { citation: 'English Medium-Maturity and Learning.pdf', type: 'pdf' },
      { citation: 'Pem (2015); Vaida (2007); WikiEducator Lesson 5; Burnik Final PDF pp. 6–10', type: 'reading' },
    ],
  },
  {
    id: 's04',
    number: '04',
    title: 'Major Theories of Child Development',
    shortTitle: 'Development Theories',
    estimatedMinutes: 16,
    beginnerHook:
      'Why do different psychologists look at the exact same noisy classroom and notice totally different things? Meet the 7 core developmental lenses plus the two great debates dividing them.',
    inPlainEnglish:
      'Think of developmental theories as 7 different camera lenses—shaped by major debates over Stability vs. Change (are early childhood traits locked forever, or can later stages transform us?) and Continuous vs. Discontinuous growth (smooth brick-by-brick accumulation vs. sudden caterpillar-to-butterfly stage shifts). Freud zooms into unconscious wishes; Erikson spans 8 lifespan identity crises; Piaget, Vygotsky, and Information Processing study thought; Skinner and Bandura track habits and models; Darwin, Lorenz, and Bowlby focus on evolutionary bonding; and Bronfenbrenner maps five nested social layers.',
    whyItMattersForZeroPriorKnowledge:
      'Knowing these 7 lenses side-by-side keeps you from getting confused later when one unit talks about schemas, another about rewards, and another about home ecosystems.',
    keyQuestionsAnswered: [
      'How do Stability vs. Change and Continuous vs. Discontinuous debates divide developmental theorists?',
      'What are Freud’s 3 consciousness levels / 5 psychosexual stages vs. Erikson’s 8 psychosocial crises?',
      'How does Bandura’s Triadic Reciprocal Determinism link Behaviour, Person, and Environment?',
      'Which exact community agencies sit inside Bronfenbrenner’s Exosystem (Santrock Fig 4.2)?',
    ],
    concepts: [
      {
        title: 'Two Big Developmental Debates: Stability/Change & Continuous/Discontinuous',
        plainExplanation:
          'Before picking a theory, psychologists ask whether growth creeps upward smoothly or leaps in stages—and whether early wounds permanently lock adult destiny.',
        details: [
          'Stability vs. Change: Psychoanalysts (Freud) argued foundational personality sets largely in the first 5 years (Stability), whereas Erikson and lifelong humanistic theorists argue later mentors, peers, and choices continually reshape identity (Change).',
          'Continuous vs. Discontinuous: Behavioural/Information-Processing views see learning as Continuous accumulation (adding words and skills bit by bit); Cognitive stage theorists (Piaget, Freud, Erikson) see Discontinuous qualitative leaps from one stage to the next.',
        ],
        sourceTag: 'Session 04 — Theories of Child Development',
      },
      {
        title: 'Psychoanalytic (Freud) & Psychosocial (Erikson)',
        plainExplanation:
          'Freud highlighted unconscious biological drives inside early childhood; Erikson shifted focus to social relationships across eight whole-life stages.',
        details: [
          'Freud’s 3 Consciousness Levels & 3 Structures: Conscious, Pre-conscious (retrievable awareness), Unconscious (repressed urges); Id (pleasure principle), Ego (reality principle balancing urges safely), Super-Ego (moral conscience + ego ideal).',
          'Freud’s 5 Psychosexual Stages: Oral -> Anal -> Phallic -> Latency -> Genital.',
          'Erikson’s 8 Psychosocial Crises: (1) Trust vs Mistrust (0–1.5), (2) Autonomy vs Shame & Doubt (1.5–3), (3) Initiative vs Guilt (3–5), (4) Industry vs Inferiority (6–12 school years), (5) Identity vs Role Confusion (adolescence), (6) Intimacy vs Isolation, (7) Generativity vs Stagnation, (8) Integrity vs Despair.',
        ],
        sourceTag: 'Session 04 & Personality Development',
      },
      {
        title: 'Cognitive, Behavioural & Bandura’s Triadic Model',
        plainExplanation:
          'Mind, action, and environment form an endless three-way conversation rather than a one-way street.',
        details: [
          'Cognitive & Information Processing: Piaget (active construction across Sensorimotor, Pre-operational, Concrete, Formal), Vygotsky (language and social tools inside ZPD), and Information Processing (memory stores & encoding).',
          'Behavioural & Social Cognitive (Figure 4.1): Skinner emphasized environmental contingencies; Albert Bandura’s Triadic Reciprocal Determinism connects Behaviour <-> Person/Cognitive factors (beliefs, self-efficacy) <-> Environment mutually.',
        ],
        sourceTag: 'Session 04 (Fig 4.1)',
      },
      {
        title: 'Evolutionary, Ethological (Darwin, Lorenz, Bowlby) & Bronfenbrenner’s Rings',
        plainExplanation:
          'Biological attachment windows interact with five nested environmental systems surrounding every learner.',
        details: [
          'Evolutionary & Ethological Lenses: Charles Darwin highlighted how extended human infant dependency evolved to allow complex brain learning. Konrad Lorenz showed rapid critical-period imprinting in newly hatched goslings; John Bowlby linked responsive 1st-year sensitive-period caregiving to healthy lifelong attachment.',
          'Bronfenbrenner’s 5 Nested Systems (Santrock Fig 4.2): Microsystem (family, classroom, peers), Mesosystem (home-school links), Exosystem (explicitly includes Friends of family, Neighbors, Mass media, Parent workplace, Social welfare & Legal services), Macrosystem (cultural beliefs/ideologies), and Chronosystem (historical transitions and life timing).',
        ],
        sourceTag: 'Session 04 (Fig 4.2 / Santrock)',
      },
    ],
    caseStudies: [
      {
        title: 'Mapping One Absentee Student Through Bronfenbrenner’s Rings',
        context:
          'A 10-year-old repeatedly misses morning lessons and nods off in class.',
        whatHappened:
          'Focusing solely on the Microsystem blames laziness. Checking the Mesosystem exposes disconnected parent-teacher communication; the Exosystem reveals a parent’s overnight factory shift and lack of local social welfare care; Macrosystem shows economic strain; Chronosystem tracks post-pandemic schedule shocks.',
        psychologyTakeaway:
          'Ecological mapping helps teachers solve real attendance barriers with compassion rather than labeling the child.',
        sourceTag: 'Session 04 (Bronfenbrenner Ecological Model)',
      },
    ],
    theorists: [
      {
        name: 'Erik Erikson',
        eraOrWork: '8 Stages of Psychosocial Development',
        coreIdea: 'Every life stage centers on a social tension whose healthy resolution builds lasting virtue (e.g., Competence during school age).',
        classroomLink: 'Primary teachers nurture "Industry" via achievable tasks and respectful feedback instead of public shame.',
      },
      {
        name: 'Konrad Lorenz & John Bowlby',
        eraOrWork: 'Ethological Critical & Sensitive Periods',
        coreIdea: 'Biologically timed bonding windows (gosling imprinting; human 1st-year attachment) shape emotional safety.',
        classroomLink: 'Explains why predictable caregiver and preschool teacher warmth calms early separation anxiety.',
      },
      {
        name: 'Urie Bronfenbrenner',
        eraOrWork: 'Ecological Systems Theory (Figure 4.2)',
        coreIdea: 'Children grow inside Micro-, Meso-, Exo-, Macro-, and Chronosystems interacting continuously.',
        classroomLink: 'Strengthening Mesosystem home-school trust protects learning even when Exosystem strains hit.',
      },
    ],
    teacherTakeaways: [
      'Adopt the "Change" stance: supportive classrooms help students overcome rough early starts across Erikson’s stages.',
      'Use Bandura’s triangle intentionally—adjusting classroom seating and task clarity shifts confidence and effort together.',
      'Remember Exosystem forces (parent work schedules, media, neighborhood services) before judging parents or children.',
    ],
    miniCheck: {
      question:
        'In Santrock’s Figure 4.2 diagram of Bronfenbrenner’s model, which specific influences belong inside the Exosystem?',
      options: [
        'Friends of family, neighbors, mass media, social welfare services, and legal services',
        'Only the child’s chromosomes and prenatal nutrition',
        'Face-to-face classroom games with desk partners',
      ],
      correctIndex: 0,
      explanation:
        'Session 04 Figure 4.2 explicitly places Friends of family, Neighbors, Mass media, Social welfare, and Legal services in the Exosystem—forces affecting the child indirectly.',
      sourceTag: 'Session 04 (Figure 4.2)',
    },
    sources: [
      { citation: 'Session_04_English.pdf — Theories of Child Development', type: 'pdf' },
    ],
  },
  {
    id: 's05',
    number: '05',
    title: 'Infancy & Early Childhood (Birth to Age 5/6)',
    shortTitle: 'Infancy & Early Childhood',
    estimatedMinutes: 15,
    beginnerHook:
      'Roughly half of foundational human intellectual growth happens in the first 3–4 years. How does a fertilized cell develop into a curious preschooler ready for Grade 1?',
    inPlainEnglish:
      'Life begins with staggering prenatal speed: within the first month, six major organ systems begin differentiating inside a ~1/6-inch embryo, making months 1–3 the critical window against harmful pathogens. Born as Stone et al.’s "competent infant"—guided by mid-brain survival reflexes while the cerebral cortex keeps wiring for 6–12 months—newborns progress through Hurlock’s Partunate, Neonate, and Babyhood phases into Early Childhood (2–5/6 yrs), where language explodes, attachment anchors exploration, and Havighurst’s practical tasks unfold.',
    whyItMattersForZeroPriorKnowledge:
      'Preschool and Grade 1 teachers often misread egocentric thinking, brief emotional outbursts, or physical clinginess as naughtiness instead of normal 2–5-year-old brain and dependency transitions.',
    keyQuestionsAnswered: [
      'What exact prenatal organ windows (months 1–3, 28-week viability, final 10 weeks) and placental pathogens matter most?',
      'How does Stone et al.’s (1973/1985) "competent infant" shift from mid-brain reflexes to cerebral cortex control?',
      'What are Hurlock’s 3 infancy sub-periods, Bloom’s early intellect curve, and universal babbling (~6m)?',
      'What two types of dependency conflict appear in Early Childhood (2–5/6), and how does WHO Nurturing Care respond?',
    ],
    concepts: [
      {
        title: 'Pre-Natal Milestones, Organ Differentiation & Placental Hazards',
        plainExplanation:
          'The first three months build the body’s organs, while the last ten weeks turbocharge the brain and nervous system.',
        details: [
          'Rapid Embryonic Start: By 1 month, the ~1/6-inch embryo differentiates into 6 foundational organ systems (nervous, circulatory, digestive, respiratory, excretory, reproductive). Months 1–3 form the critical organogenesis sensitivity window.',
          'Viability & Final CNS Surge: Age of viability arrives around 28 weeks. During the final 10 weeks / 3 months of gestation, brain weight and central nervous system complexity accelerate sharply—continuing rapidly for 6–12 months after birth.',
          'Placental Pathogens: Although the placenta nourishes the fetus, maternal Rubella, Syphilis, Diphtheria, and Serum Hepatitis (alongside drugs/malnutrition) can cross or damage developing organs.',
        ],
        sourceTag: 'Infancy and Early Childhood.pdf / Session 05',
      },
      {
        title: 'The Competent Infant, Brain Cortex & Hurlock’s Sub-Periods',
        plainExplanation:
          'Newborns are active sense-makers guided initially by mid-brain reflexes while higher cortical areas wire up.',
        details: [
          'Hurlock (2009) Sub-Periods: Partunate (birth until umbilical cord is cut), Neonate (cord cut to ~2 weeks), and Babyhood (~2 weeks to 2 years).',
          'Stone et al. (1973/1985) "Competent Infant": Babies arrive ready to track faces, orient to voices, and trigger rooting, sucking, swallowing, grasping, and stepping reflexes coordinated mainly by subcortical mid-brain structures until cerebral cortex control matures.',
          'Bloom (1964) Intellectual Curve & Babbling (~6m): Roughly 50% of foundational intellectual growth takes place in the first 3–4 years; vowel-consonant babbling emerges universally around 6 months (even initially in deaf infants before declining without auditory feedback).',
        ],
        sourceTag: 'Session 05 & Infancy and Early Childhood.pdf',
      },
      {
        title: 'Early Childhood (Ages 2–5/6): Logic Limits, Emotional Outbursts & 2 Dependencies',
        plainExplanation:
          'Preschoolers grow ~3 inches and ~4.5 lb yearly while balancing budding independence against physical and cognitive dependency.',
        details: [
          'Thought Characteristics (2–5/6 yrs): Pre-operational children rely on rigid, egocentric cause-and-effect stories, animate objects ("the sun followed me"), and express frustration in sudden, brief emotional outbursts.',
          'Two Dependency Types Highlighted in Module: (1) Physical Dependency—parents who over-indulge or do every physical task for the toddler block self-feeding/dressing and provoke Eriksonian doubt and shame; (2) Cognitive Dependency—over-relying on adult answers versus guided exploration.',
          'Attachment Stability (~3–3.5 yrs): Secure Bowlby/Ainsworth bonding yields confident classroom exploration and smooth parent-teacher separation.',
        ],
        sourceTag: 'Infancy and Early Childhood.pdf',
      },
      {
        title: 'Havighurst’s Developmental Tasks & WHO/UNICEF Nurturing Care',
        plainExplanation:
          'Healthy early schooling aligns biology, family expectations, and whole-child nurturing care rather than premature drills.',
        details: [
          'Havighurst (1972) Three Triggers: Everyday tasks (walking, toilet control, sharing, reading readiness) arise at teachable moments when physical maturation, cultural pressure, and personal values align.',
          'WHO / UNICEF Nurturing Care Framework: Protects early brain potential through 5 pillars—Good health, Adequate nutrition, Responsive caregiving, Safety & security, and Opportunities for early learning through play.',
        ],
        sourceTag: 'Session 05 & Infancy and Early Childhood.pdf',
      },
    ],
    caseStudies: [
      {
        title: 'Universal Babbling at 6 Months & Over-Assisted Toddlers',
        context:
          'Researchers tracked 6-month-old vocalizations across deaf and hearing infants, and preschool teachers compared self-help skills across home styles.',
        whatHappened:
          'Both hearing and congenitally deaf babies began rhythmic babbling around 6 months from biological readiness, though vocal variety faded in deaf infants without auditory input. Meanwhile, toddlers whose parents dressed and spoon-fed them exclusively lagged in buttoning, Confidence, and autonomous initiative.',
        psychologyTakeaway:
          'Maturation sparks readiness, but environmental feedback and respectful autonomy ("let me try") convert readiness into lasting skill.',
        sourceTag: 'Infancy and Early Childhood.pdf',
      },
    ],
    theorists: [
      {
        name: 'Elizabeth Hurlock & L.J. Stone et al.',
        eraOrWork: 'Infancy Sub-Periods (2009) & The Competent Infant (1973)',
        coreIdea: 'Named Partunate/Neonate/Babyhood transitions and proved newborns actively filter faces and voices from day one.',
        classroomLink: 'Guides early childhood educators to respect infant sensory responsiveness alongside motor safety.',
      },
      {
        name: 'Benjamin Bloom & Robert Havighurst',
        eraOrWork: 'Intelligence Curve (1964) & Developmental Tasks (1972)',
        coreIdea: 'Quantified rapid intellectual growth before age 4 and identified teachable readiness windows.',
        classroomLink: 'Supports play-based conversation and joyful autonomy over rushed paper-and-pencil pressure.',
      },
    ],
    teacherTakeaways: [
      'Invite 3–5 year olds to zip coats, pour water, and tidy blocks independently to resolve physical dependency with pride rather than shame.',
      'Treat brief preschool tantrums as normal pre-operational frustration—calmly coach words for feelings.',
      'Build preschool routines around storytelling, song, sensory exploration, and responsive warmth.',
    ],
    miniCheck: {
      question:
        'Why do congenitally deaf infants still produce early vowel-consonant babbling around 6 months alongside hearing infants?',
      options: [
        'Babbling is initially triggered by universal biological vocal-motor maturation around 6 months, though later specialization relies on hearing feedback.',
        'All deaf infants memorize formal grammar in the womb.',
        'Because parents teach syllable flashcards to 2-week-old neonates.',
      ],
      correctIndex: 0,
      explanation:
        'Universal babbling (~6m) illustrates maturation launching a readiness milestone, while sustained speech later depends on auditory feedback and social interaction.',
      sourceTag: 'Infancy and Early Childhood.pdf',
    },
    sources: [
      { citation: 'Session_05_English.pdf — Infancy and Early Childhood', type: 'pdf' },
      { citation: 'English Medium-Infancy and Early Childhood.pdf', type: 'pdf' },
    ],
  },
  {
    id: 's06',
    number: '06',
    title: 'The School Child & the Adolescent',
    shortTitle: 'School Child & Adolescent',
    estimatedMinutes: 16,
    beginnerHook:
      'What transforms a clumsy first-grader writing with whole-body tension into a 10-year-old team gamer—and then into a 16-year-old debating identity and future careers?',
    inPlainEnglish:
      'The STP8301 module carefully separates Middle Childhood (6–9 yrs) from Later Childhood / Pre-Adolescence (9–12 yrs), followed by Early (10–13), Middle (14–17), and Late (18–21) Adolescence. First-graders initially write using whole-body tension before fine hand muscles mature; clock time settles around age 7; blind trial-and-error drops by age 8; and 9–12 brings a static growth plateau with intense peer-group loyalty. Later, puberty spurts alongside Coleman (1982) and Keniston (1960) adolescent transitions stir 9 key teen stress areas—showing why school guidance beats harsh authority.',
    whyItMattersForZeroPriorKnowledge:
      'Understanding exact primary milestones ("month" before "year", clock reading at 7) and teen stress realities stops teachers from shaming slow handwriting or overreacting to normal adolescent mood shifts.',
    keyQuestionsAnswered: [
      'How do Middle Childhood (6–9) and Later Childhood / Pre-Adolescence (9–12) differ in bones, coordination, and time/space understanding?',
      'Which 8 family/school triggers cause nail-biting, withdrawal, or aggression in primary learners?',
      'What 9 specific stress areas weigh on adolescents (Keniston 1960; Coleman 1982), and how should schools counsel smoking/drug risks?',
      'What did Margaret Mead prove about adolescent "storm and stress" across cultures?',
    ],
    concepts: [
      {
        title: 'Middle Childhood (6–9 yrs): Body Tension, Milk Teeth & Time Milestones',
        plainExplanation:
          'Between ages 6 and 9, children settle into formal schooling as bones lengthen, milk teeth shed, and abstract time words click into order.',
        details: [
          'Physical & Health Screening (~6–9 yrs): Marked bone spurt; vision, hearing, and communicable-disease checks are vital around school entry (~age 6); milk teeth begin shedding around age 7.',
          'Writing Coordination: In Grades 1–2, children squeeze pencils using whole-body muscular tension (clenched shoulders and tongue) until fine wrist/finger coordination refines around age 8–9.',
          'Time & Logic Milestones: Rote memory (<4 yrs) shifts to logical memory; children grasp "today/tomorrow" first, master reading clock time around age 7, understand "month" earlier than "year," and show a steady drop in blind trial-and-error by age 8.',
        ],
        sourceTag: 'The School Child and the Adolescent.pdf / Session 06',
      },
      {
        title: 'Later Childhood / Pre-Adolescence (9–12 yrs) & 8 Disturbance Triggers',
        plainExplanation:
          'Ages 9–12 form a relatively calm physical plateau before puberty while peer cliques, sports, maps, and encyclopedias take center stage.',
        details: [
          'Static Plateau & Cognitive Expansion (9–12 yrs): Physical height/weight stabilize briefly before puberty while boys/girls gain confidence with maps, encyclopedias, team sports, and same-sex peer cliques (9–13). Unchanneled group energy without healthy games can spill into pre-delinquent mischief.',
          'Eight Causes of Childhood Emotional Disturbances: Home insecurity, parental conflict, harsh criticism/ridicule, sibling rivalry, repeated school failure, peer rejection, unrealistic adult expectations, and chronic fatigue/illness—showing outwardly as nail-biting, shyness/withdrawal, or sudden aggression.',
        ],
        sourceTag: 'The School Child and the Adolescent.pdf',
      },
      {
        title: 'Adolescence (10–21): Puberty Timing, Keniston, Coleman & 9 Stress Areas',
        plainExplanation:
          'Adolescents gain powerful Formal Operational and metacognitive brains while caught between adult body desires and student economic dependence.',
        details: [
          'Three Phases & Puberty Gap: Early (10–13), Middle (14–17), Late (18–21). Girls generally start their growth spurt earlier (11–12) than boys (12–15)—early-maturing boys often gain sports status, whereas early-maturing girls sometimes experience acute self-consciousness.',
          'Coleman (1982) & Keniston (1960): Prolonged secondary/university schooling stretches the gap between sexual/cognitive adulthood and economic independence, fueling role tension.',
          'Nine Adolescent Stress Areas Cited in Module: (1) Falling in love/romantic uncertainty, (2) Religious doubts, (3) Family conflict/generation gap, (4) Heavy academic/exam demands, (5) Financial limits, (6) Career/job worries, (7) Uncertain future plans, (8) Self-image/personality insecurity, and (9) Marriage anxieties.',
          'Metacognition & Guidance Support: Teens monitor their own memory strategies (metacognition) and urgently need warm school counselling—not shaming lectures—to counter peer gang pressures around smoking or drugs.',
        ],
        sourceTag: 'The School Child and the Adolescent.pdf / Session 06',
      },
      {
        title: 'Is "Storm and Stress" Universal? (Margaret Mead)',
        plainExplanation:
          'Margaret Mead proved that painful teen rebellion surges when cultures withhold clear adult dignity, not simply from hormones alone.',
        details: [
          'Cross-Cultural Contrast (Samoa & New Guinea): Mead observed Samoan youths stepping gradually into trusted community roles with minimal anxiety or conflict, showing educational institutions can dramatically lower teen stress by granting respectful voice and clear responsibility.',
        ],
        sourceTag: 'The School Child and the Adolescent.pdf',
      },
    ],
    caseStudies: [
      {
        title: 'From Whole-Body Grade 1 Writing to Mead’s Samoan Youths',
        context:
          'Compare a tense 6-year-old gripping a pencil awkwardly with a conflicted 16-year-old navigating Samoan vs. exam-heavy city schooling.',
        whatHappened:
          'The 6-year-old fatigues quickly because whole-shoulder tension drives early writing before fine finger control matures. Meanwhile, Mead showed teenagers calm dramatically when communities grant real responsibility instead of treating them like children one minute and adults the next.',
        psychologyTakeaway:
          'Adjust physical pacing in primary grades and cultivate dignified, respectful counselling and student voice in high school.',
        sourceTag: 'The School Child and the Adolescent.pdf',
      },
    ],
    theorists: [
      {
        name: 'Margaret Mead',
        eraOrWork: 'Cultural Anthropology in Samoa & New Guinea',
        coreIdea: 'Demonstrated that adolescent "storm and stress" rises or falls according to cultural continuity and clarity of roles.',
        classroomLink: 'Replaces authoritarian policing with collaborative teen leadership and respected dialogue.',
      },
      {
        name: 'Kenneth Keniston & John Coleman',
        eraOrWork: 'Youth Transition (1960) & Nature of Adolescence (1982)',
        coreIdea: 'Explained the psychological strain of extended economic dependence and focal adolescent stressors.',
        classroomLink: 'Guides secondary teachers to validate future/career anxieties and partner with school counsellors.',
      },
    ],
    teacherTakeaways: [
      'Give Grades 1–2 frequent short movement breaks so whole-body writing tension does not exhaust young hands.',
      'Investigate primary-school nail-biting or bullying through the 8 emotional triggers rather than surface punishment.',
      'Channel 9–12 peer loyalty into supervised team sports and clubs, and protect adolescent mental health with empathetic guidance.',
    ],
    miniCheck: {
      question:
        'Which description accurately matches Middle Childhood (6–9) vs. Later Childhood (9–12) in the STP8301 School Child module?',
      options: [
        'In Grades 1–2 children write using whole-body tension and master clock time around age 7; by ages 9–12 growth temporarily plateaus while group sports, maps, and peer cliques flourish.',
        'Seven-year-olds reliably grasp "year" before understanding "today" or clock hours.',
        'Pre-adolescents aged 9–12 avoid peer groups completely and prefer solitary infant play.',
      ],
      correctIndex: 0,
      explanation:
        'The School Child module tracks whole-body writing tension in early primary grades, clock reading at ~7, reduced blind trial-and-error at ~8, and a calmer physical plateau with strong peer/game ties during ages 9–12.',
      sourceTag: 'The School Child and the Adolescent.pdf',
    },
    sources: [
      { citation: 'Session_06_English.pdf — The School Child and the Adolescent', type: 'pdf' },
      { citation: 'English Medium-The School Child and the Adolescent.pdf', type: 'pdf' },
    ],
  },
];
