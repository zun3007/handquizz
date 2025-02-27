// Student type
export interface Student {
  name: string;
  studentId: string;
}

// Quiz question type
export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation?: string;
  category?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
}

// Quiz attempt type
export interface QuizAttempt {
  id?: string;
  userName: string;
  studentId: string;
  startedAt: Date;
  completedAt?: Date;
  score?: number;
  timeTaken?: number; // Time in seconds
  answers?: number[];
  isCompleted: boolean;
  questionIds: number[];
}

// Leaderboard entry type
export interface LeaderboardEntry {
  id?: string;
  name: string;
  studentId: string;
  score: number;
  timeTaken: number;
  date: Date;
  attemptId?: string;
}

// Hand gesture types
export enum HandGesture {
  ONE = 'one',
  TWO = 'two',
  THREE = 'three',
  FOUR = 'four',
  THUMB_UP = 'thumb_up',
  UNKNOWN = 'unknown',
}

// Quiz state
export interface QuizState {
  currentQuestionIndex: number;
  selectedAnswerIndex: number | null;
  questions: QuizQuestion[];
  answers: (number | null)[];
  isQuizCompleted: boolean;
  startTime: Date;
  endTime?: Date;
  student: Student;
}
