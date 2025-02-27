import { useState, useEffect } from 'react';
import { QuizState, Student } from '../types';
import { quizQuestions } from '../data/quizQuestions';
import { api } from '../services/api';

export const useQuiz = (student: Student) => {
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestionIndex: 0,
    selectedAnswerIndex: null,
    questions: quizQuestions,
    answers: Array(quizQuestions.length).fill(null),
    isQuizCompleted: false,
    startTime: new Date(),
    student,
  });

  const [score, setScore] = useState<number | null>(null);
  const [timeTaken, setTimeTaken] = useState<number | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  // Get current question
  const currentQuestion = quizState.questions[quizState.currentQuestionIndex];

  // Select an answer
  const selectAnswer = (answerIndex: number) => {
    if (quizState.isQuizCompleted) return;

    setQuizState((prev) => {
      const newAnswers = [...prev.answers];
      newAnswers[prev.currentQuestionIndex] = answerIndex;

      return {
        ...prev,
        selectedAnswerIndex: answerIndex,
        answers: newAnswers,
      };
    });
  };

  // Go to next question
  const goToNextQuestion = () => {
    if (quizState.isQuizCompleted) return;

    if (quizState.selectedAnswerIndex === null) {
      // Cannot proceed without selecting an answer
      return;
    }

    const isLastQuestion =
      quizState.currentQuestionIndex === quizState.questions.length - 1;

    if (isLastQuestion) {
      // End quiz
      setQuizState((prev) => ({
        ...prev,
        isQuizCompleted: true,
        endTime: new Date(),
      }));
    } else {
      // Go to next question
      setQuizState((prev) => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1,
        selectedAnswerIndex: null,
      }));
    }
  };

  // Go to previous question
  const goToPreviousQuestion = () => {
    if (quizState.currentQuestionIndex > 0 && !quizState.isQuizCompleted) {
      setQuizState((prev) => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex - 1,
        selectedAnswerIndex: prev.answers[prev.currentQuestionIndex - 1],
      }));
    }
  };

  // Calculate score and save results
  const calculateAndSaveResults = async () => {
    if (!quizState.isQuizCompleted || !quizState.endTime) return;

    // Calculate score - simpler approach to avoid TypeScript issues
    let correctCount = 0;
    for (let i = 0; i < quizState.questions.length; i++) {
      const userAnswer = quizState.answers[i];
      const correctAnswer = quizState.questions[i].correctAnswerIndex;
      if (userAnswer !== null && userAnswer === correctAnswer) {
        correctCount++;
      }
    }

    const totalQuestions = quizState.questions.length;
    const calculatedScore = Math.round((correctCount / totalQuestions) * 100);

    // Calculate time taken in seconds
    const calculatedTimeTaken = Math.floor(
      (quizState.endTime.getTime() - quizState.startTime.getTime()) / 1000
    );

    setScore(calculatedScore);
    setTimeTaken(calculatedTimeTaken);

    // Save to database
    setIsSaving(true);
    setSaveError(null);

    try {
      // Save quiz attempt
      const attemptId = await api.saveQuizAttempt({
        userName: student.name,
        studentId: student.studentId,
        startedAt: quizState.startTime,
        completedAt: quizState.endTime,
        score: calculatedScore,
        timeTaken: calculatedTimeTaken,
        answers: quizState.answers.map((answer) => answer ?? -1), // Convert null to -1
        isCompleted: true,
        questionIds: quizState.questions.map((q) => q.id),
      });

      // Save to leaderboard
      if (attemptId) {
        await api.saveToLeaderboard({
          name: student.name,
          studentId: student.studentId,
          score: calculatedScore,
          timeTaken: calculatedTimeTaken,
          date: new Date(),
          attemptId,
        });
      }

      setIsSaving(false);
    } catch (error) {
      console.error('Error saving quiz results:', error);
      setSaveError('Failed to save quiz results. Please try again.');
      setIsSaving(false);
    }
  };

  // Reset quiz
  const resetQuiz = () => {
    setQuizState({
      currentQuestionIndex: 0,
      selectedAnswerIndex: null,
      questions: quizQuestions,
      answers: Array(quizQuestions.length).fill(null),
      isQuizCompleted: false,
      startTime: new Date(),
      student,
    });
    setScore(null);
    setTimeTaken(null);
    setSaveError(null);
  };

  // Calculate and save results when quiz is completed
  useEffect(() => {
    if (quizState.isQuizCompleted && score === null) {
      calculateAndSaveResults();
    }
  }, [quizState.isQuizCompleted, score]);

  return {
    quizState,
    currentQuestion,
    score,
    timeTaken,
    isSaving,
    saveError,
    selectAnswer,
    goToNextQuestion,
    goToPreviousQuestion,
    resetQuiz,
  };
};
