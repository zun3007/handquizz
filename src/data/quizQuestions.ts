import { QuizQuestion } from '../types';

// 20 questions about AI from the "AI for Everyone" course by Andrew Ng
export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question:
      'Which of the following best describes what Artificial Intelligence (AI) is?',
    options: [
      'A technology that can do anything a human can do',
      'A field focused on making computers think and behave exactly like humans',
      'Software that can perform a specific task that normally requires human intelligence',
      'A robot with human-like physical capabilities',
    ],
    correctAnswerIndex: 2,
    explanation:
      'AI refers to software that can perform specific tasks that traditionally required human intelligence, not general human abilities.',
    category: 'AI Fundamentals',
    difficulty: 'easy',
  },
  {
    id: 2,
    question:
      'What is the most common type of AI being deployed in businesses today?',
    options: [
      'Artificial General Intelligence (AGI)',
      'Supervised Learning',
      'Robot Process Automation',
      'Reinforcement Learning',
    ],
    correctAnswerIndex: 1,
    explanation:
      'Supervised Learning is the most widely deployed form of AI, where models learn from labeled examples.',
    category: 'AI Applications',
    difficulty: 'medium',
  },
  {
    id: 3,
    question: 'What does "Machine Learning" primarily involve?',
    options: [
      'Programming explicit rules for computers to follow',
      'Learning from data to make predictions or decisions',
      'Robots mimicking human physical movements',
      'Creating human-like consciousness in computers',
    ],
    correctAnswerIndex: 1,
    explanation:
      'Machine Learning is about algorithms learning patterns from data rather than following explicitly programmed rules.',
    category: 'AI Fundamentals',
    difficulty: 'easy',
  },
  {
    id: 4,
    question:
      'What is the difference between AI and AGI (Artificial General Intelligence)?',
    options: [
      'AI is smarter than AGI',
      'AI is focused on specific tasks, while AGI would have human-level intelligence across all tasks',
      'AI requires supervision while AGI is unsupervised',
      'There is no difference; they are different terms for the same concept',
    ],
    correctAnswerIndex: 1,
    explanation:
      'Current AI systems are "narrow" and focused on specific tasks, while AGI would have general intelligence comparable to humans across all domains.',
    category: 'AI Concepts',
    difficulty: 'medium',
  },
  {
    id: 5,
    question: 'What is a neural network in the context of AI?',
    options: [
      'A network of computers working together',
      'A simulation of the human brain in hardware',
      'A mathematical model inspired by the structure of biological neural networks',
      'A network of robots communicating with each other',
    ],
    correctAnswerIndex: 2,
    explanation:
      'Neural networks are mathematical models inspired by biological neural networks, but they are not simulations of the human brain.',
    category: 'AI Technology',
    difficulty: 'medium',
  },
  {
    id: 6,
    question:
      'Which of the following is NOT a major category of machine learning?',
    options: [
      'Supervised Learning',
      'Unsupervised Learning',
      'Automated Learning',
      'Reinforcement Learning',
    ],
    correctAnswerIndex: 2,
    explanation:
      'Automated Learning is not a standard category of machine learning. The three main categories are Supervised Learning, Unsupervised Learning, and Reinforcement Learning.',
    category: 'AI Fundamentals',
    difficulty: 'medium',
  },
  {
    id: 7,
    question: 'What is a "data-centric" approach to AI development?',
    options: [
      'Using as much data as possible',
      'Focusing on improving data quality rather than just model architectures',
      'Selling data to make profit',
      'Storing all data in centralized databases',
    ],
    correctAnswerIndex: 1,
    explanation:
      'A data-centric approach focuses on systematically improving data quality, which often has more impact than tweaking model architectures.',
    category: 'AI Development',
    difficulty: 'hard',
  },
  {
    id: 8,
    question: 'What is "Deep Learning"?',
    options: [
      'Learning that requires deep concentration',
      'A branch of machine learning using neural networks with many layers',
      'Learning that takes a long time to complete',
      'Learning from the deepest parts of the internet',
    ],
    correctAnswerIndex: 1,
    explanation:
      'Deep Learning uses neural networks with many layers (hence "deep") to learn representations of data with multiple levels of abstraction.',
    category: 'AI Technology',
    difficulty: 'medium',
  },
  {
    id: 9,
    question:
      'According to Andrew Ng, what is the "fuel" that powers modern AI?',
    options: ['Electricity', 'Data', 'Algorithms', 'Computing power'],
    correctAnswerIndex: 1,
    explanation:
      'Andrew Ng often refers to data as the "fuel" that powers modern AI systems, emphasizing its critical importance.',
    category: 'AI Development',
    difficulty: 'easy',
  },
  {
    id: 10,
    question: 'Which of the following is a realistic expectation about AI?',
    options: [
      'AI will replace all human jobs within the next decade',
      'AI will never be as creative as humans',
      'AI can automate some tasks but often works best augmenting human capabilities',
      'AI is approaching human-level general intelligence',
    ],
    correctAnswerIndex: 2,
    explanation:
      'A realistic view is that AI can automate specific tasks but often provides the most value when augmenting human capabilities rather than replacing humans entirely.',
    category: 'AI Impact',
    difficulty: 'medium',
  },
  {
    id: 11,
    question: 'What is "bias" in AI systems?',
    options: [
      'A technical error in the algorithm code',
      'When an AI system consistently favors certain outcomes over others in unfair ways',
      'When an AI system runs slower than expected',
      'The processing power needed to run AI models',
    ],
    correctAnswerIndex: 1,
    explanation:
      'Bias in AI refers to systematic and unfair discrimination that typically results from flawed data or algorithm design.',
    category: 'AI Ethics',
    difficulty: 'medium',
  },
  {
    id: 12,
    question: 'What is a "prompt" in the context of modern AI language models?',
    options: [
      'A reminder to update the AI software',
      "The input text given to instruct or guide the AI's response",
      'A technical term for AI processing speed',
      'The deadline for an AI project',
    ],
    correctAnswerIndex: 1,
    explanation:
      'A prompt is the input text given to a language model that guides or instructs what kind of response the AI should generate.',
    category: 'AI Technology',
    difficulty: 'easy',
  },
  {
    id: 13,
    question:
      'Which of the following is NOT a common challenge when implementing AI in businesses?',
    options: [
      'Data quality and availability issues',
      'Integration with existing systems',
      'Technical limitations of current AI',
      'AI projects always cost less than expected',
    ],
    correctAnswerIndex: 3,
    explanation:
      'AI projects often face budget overruns rather than costing less than expected. The other options are genuine common challenges.',
    category: 'AI Applications',
    difficulty: 'medium',
  },
  {
    id: 14,
    question: 'What does "AI alignment" refer to?',
    options: [
      'Making sure AI systems physically line up correctly',
      'The process of ensuring AI systems act in accordance with human values and intentions',
      'Aligning AI processing cores for maximum efficiency',
      'The technical process of calibrating AI sensors',
    ],
    correctAnswerIndex: 1,
    explanation:
      "AI alignment refers to the challenge of ensuring AI systems' goals and behaviors remain aligned with human values and intentions.",
    category: 'AI Ethics',
    difficulty: 'hard',
  },
  {
    id: 15,
    question: 'What is "transfer learning" in AI?',
    options: [
      'Transferring AI systems between different computers',
      'A technique where knowledge gained in one problem is applied to a different but related problem',
      'Moving AI from research to production',
      'Transferring data between different AI models',
    ],
    correctAnswerIndex: 1,
    explanation:
      'Transfer learning is a technique where a model developed for one task is reused as the starting point for a model on a second task, improving efficiency and performance.',
    category: 'AI Technology',
    difficulty: 'hard',
  },
  {
    id: 16,
    question: 'What is the "AI flywheel effect"?',
    options: [
      'The speed at which AI processors operate',
      'The physical spinning of computer cooling fans',
      'A cycle where better AI products attract more users, generating more data, leading to even better AI',
      'The rotation of data storage devices',
    ],
    correctAnswerIndex: 2,
    explanation:
      'The AI flywheel effect describes a virtuous cycle where better AI attracts more users, generating more data, which improves the AI further, creating a self-reinforcing cycle of improvement.',
    category: 'AI Business',
    difficulty: 'hard',
  },
  {
    id: 17,
    question: 'What are "foundation models" in AI?',
    options: [
      'The basic mathematical principles underlying all AI',
      'Large AI models trained on broad data that can be adapted to specific tasks',
      'The architectural blueprints for AI data centers',
      'The first models developed in AI history',
    ],
    correctAnswerIndex: 1,
    explanation:
      'Foundation models are large-scale models trained on vast datasets that serve as a base (foundation) for fine-tuning on specific tasks.',
    category: 'AI Technology',
    difficulty: 'medium',
  },
  {
    id: 18,
    question:
      'What distinguishes a successful AI strategy according to the AI for Everyone course?',
    options: [
      'Using AI for every possible business process',
      'Creating an AI department separate from the rest of the organization',
      'Focusing on quick wins while building toward transformative applications',
      'Prioritizing fully autonomous AI systems',
    ],
    correctAnswerIndex: 2,
    explanation:
      'Successful AI strategies typically balance quick wins (to build momentum and ROI) with a longer-term vision for more transformative applications.',
    category: 'AI Strategy',
    difficulty: 'medium',
  },
  {
    id: 19,
    question: 'What is a "responsible AI" approach?',
    options: [
      'Making sure AI is financially responsible and cost-effective',
      'Developing and deploying AI with consideration of ethics, fairness, transparency, and societal impact',
      'Ensuring AI systems take responsibility for their own actions',
      'Restricting AI use to only responsible organizations',
    ],
    correctAnswerIndex: 1,
    explanation:
      'Responsible AI involves developing and deploying AI systems with careful consideration of ethical principles, fairness, transparency, and broader societal implications.',
    category: 'AI Ethics',
    difficulty: 'medium',
  },
  {
    id: 20,
    question:
      'According to Andrew Ng, what is one of the most important skills for the AI era?',
    options: [
      'Programming in Python',
      'Building hardware for AI systems',
      'Continuous learning and adaptation',
      'Website development',
    ],
    correctAnswerIndex: 2,
    explanation:
      'Andrew Ng emphasizes that continuous learning and adaptation are crucial skills in the rapidly changing AI landscape, more important than any specific technical skill.',
    category: 'AI Impact',
    difficulty: 'easy',
  },
];
