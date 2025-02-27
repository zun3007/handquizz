import { useState } from 'react';
import { Container } from '@chakra-ui/react';
import { Student } from '../types';
import { StudentForm } from '../components/StudentForm';
import { Quiz } from '../components/Quiz';
import { QuizResults } from '../components/QuizResults';
import { useQuiz } from '../hooks/useQuiz';

export const HomePage = () => {
  const [student, setStudent] = useState<Student | null>(null);

  // Create a dummy student to satisfy the type requirement, but only use the real quiz when student exists
  const quizData = useQuiz(student || { name: '', studentId: '' });
  const quiz = student ? quizData : null;

  const handleRegister = (studentData: Student) => {
    setStudent(studentData);
  };

  const handleRetakeQuiz = () => {
    if (quiz) {
      quiz.resetQuiz();
    }
  };

  // Show the appropriate component based on the current state
  const renderContent = () => {
    if (!student) {
      return <StudentForm onSubmit={handleRegister} />;
    }

    if (quiz?.quizState.isQuizCompleted) {
      return (
        <QuizResults
          score={quiz.score || 0}
          timeTaken={quiz.timeTaken || 0}
          totalQuestions={quiz.quizState.questions.length}
          studentName={student.name}
          onRetakeQuiz={handleRetakeQuiz}
          isSaving={quiz.isSaving}
          saveError={quiz.saveError}
        />
      );
    }

    // Only render Quiz if we have all required props
    if (
      quiz?.currentQuestion &&
      typeof quiz.quizState.currentQuestionIndex === 'number'
    ) {
      return (
        <Quiz
          currentQuestion={quiz.currentQuestion}
          currentQuestionIndex={quiz.quizState.currentQuestionIndex}
          totalQuestions={quiz.quizState.questions.length}
          selectedAnswerIndex={quiz.quizState.selectedAnswerIndex}
          onSelectAnswer={quiz.selectAnswer}
          onNextQuestion={quiz.goToNextQuestion}
          onPreviousQuestion={quiz.goToPreviousQuestion}
        />
      );
    }

    return null;
  };

  return <Container maxW='container.xl'>{renderContent()}</Container>;
};
