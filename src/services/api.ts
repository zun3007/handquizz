import { supabase } from './supabase';
import { LeaderboardEntry, QuizAttempt } from '../types';

/**
 * API service for interacting with the Supabase database
 */
export const api = {
  /**
   * Save a quiz attempt to the database
   */
  async saveQuizAttempt(attempt: QuizAttempt): Promise<string | null> {
    try {
      const { data, error } = await supabase
        .from('quiz_attempts')
        .insert(attempt)
        .select('id')
        .single();

      if (error) {
        console.error('Error saving quiz attempt:', error);
        return null;
      }

      return data.id;
    } catch (error) {
      console.error('Error saving quiz attempt:', error);
      return null;
    }
  },

  /**
   * Save a score to the leaderboard
   */
  async saveToLeaderboard(entry: LeaderboardEntry): Promise<boolean> {
    try {
      const { error } = await supabase.from('leaderboard').insert(entry);

      if (error) {
        console.error('Error saving to leaderboard:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error saving to leaderboard:', error);
      return false;
    }
  },

  /**
   * Get top scores from the leaderboard
   */
  async getTopScores(limit: number = 10): Promise<LeaderboardEntry[]> {
    try {
      const { data, error } = await supabase
        .from('leaderboard')
        .select('*')
        .order('score', { ascending: false })
        .order('time_taken', { ascending: true })
        .limit(limit);

      if (error) {
        console.error('Error fetching top scores:', error);
        return [];
      }

      return data.map((entry) => ({
        id: entry.id,
        name: entry.name,
        studentId: entry.student_id,
        score: entry.score,
        timeTaken: entry.time_taken,
        date: new Date(entry.date),
        attemptId: entry.attempt_id,
      }));
    } catch (error) {
      console.error('Error fetching top scores:', error);
      return [];
    }
  },

  /**
   * Validate student ID format (2 letters followed by 6 digits)
   */
  validateStudentId(studentId: string): boolean {
    // Student ID format: 2 letters followed by 6 digits
    const regex = /^[A-Za-z]{2}\d{6}$/;
    return regex.test(studentId);
  },

  /**
   * Get a student's previous scores
   */
  async getStudentScores(studentId: string): Promise<LeaderboardEntry[]> {
    try {
      const { data, error } = await supabase
        .from('leaderboard')
        .select('*')
        .eq('student_id', studentId)
        .order('date', { ascending: false });

      if (error) {
        console.error('Error fetching student scores:', error);
        return [];
      }

      return data.map((entry) => ({
        id: entry.id,
        name: entry.name,
        studentId: entry.student_id,
        score: entry.score,
        timeTaken: entry.time_taken,
        date: new Date(entry.date),
        attemptId: entry.attempt_id,
      }));
    } catch (error) {
      console.error('Error fetching student scores:', error);
      return [];
    }
  },
};
