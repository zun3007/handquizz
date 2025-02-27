-- AI Hand Tracking Quiz Database Schema
-- For use with Supabase or PostgreSQL

-- Create leaderboard table to store quiz results
CREATE TABLE leaderboard (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    student_id VARCHAR(50) NOT NULL,
    score INTEGER NOT NULL CHECK (score >= 0 AND score <= 100),
    time_taken INTEGER NOT NULL, -- Time in seconds
    date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for faster queries
CREATE INDEX idx_leaderboard_score ON leaderboard(score DESC);
CREATE INDEX idx_leaderboard_date ON leaderboard(date DESC);

-- Create a view for the top 100 scores
CREATE VIEW top_scores AS
SELECT 
    id,
    name,
    student_id,
    score,
    time_taken,
    date
FROM 
    leaderboard
ORDER BY 
    score DESC, 
    time_taken ASC
LIMIT 100;

-- Create a function to get top scores by date range
CREATE OR REPLACE FUNCTION get_top_scores_by_date_range(
    start_date TIMESTAMP WITH TIME ZONE,
    end_date TIMESTAMP WITH TIME ZONE,
    limit_count INTEGER DEFAULT 10
)
RETURNS TABLE (
    id UUID,
    name VARCHAR,
    student_id VARCHAR,
    score INTEGER,
    time_taken INTEGER,
    date TIMESTAMP WITH TIME ZONE
)
LANGUAGE SQL
AS $$
    SELECT 
        id,
        name,
        student_id,
        score,
        time_taken,
        date
    FROM 
        leaderboard
    WHERE 
        date BETWEEN start_date AND end_date
    ORDER BY 
        score DESC, 
        time_taken ASC
    LIMIT limit_count;
$$;

-- Row Level Security (RLS) policies
-- Enable RLS on the leaderboard table
ALTER TABLE leaderboard ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows reading all entries but only updating your own
CREATE POLICY "Public read access" 
ON leaderboard FOR SELECT 
USING (true);

CREATE POLICY "Insert own scores" 
ON leaderboard FOR INSERT 
WITH CHECK (true);

-- Optional: Create a table for quiz questions if you want to store them in the database
CREATE TABLE quiz_questions (
    id SERIAL PRIMARY KEY,
    question TEXT NOT NULL,
    options JSONB NOT NULL, -- Stores the array of options as JSON
    correct_answer INTEGER NOT NULL,
    explanation TEXT,
    category VARCHAR(50),
    difficulty VARCHAR(20) CHECK (difficulty IN ('easy', 'medium', 'hard'))
);

-- Create a table to track user sessions and quiz attempts
CREATE TABLE quiz_attempts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_name VARCHAR(100) NOT NULL,
    student_id VARCHAR(50) NOT NULL,
    started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE,
    score INTEGER,
    time_taken INTEGER, -- Time in seconds
    answers JSONB, -- JSON array of selected answers
    is_completed BOOLEAN DEFAULT FALSE,
    question_ids INTEGER[] -- Store the IDs of questions attempted
);

-- Add a foreign key to link quiz attempts to leaderboard entries
ALTER TABLE leaderboard 
ADD COLUMN attempt_id UUID REFERENCES quiz_attempts(id);

-- Create an analytics view to get insights about quiz performance
CREATE VIEW quiz_analytics AS
SELECT 
    qq.category,
    qq.difficulty,
    AVG(l.score) as average_score,
    COUNT(*) as attempt_count
FROM 
    leaderboard l
    JOIN quiz_attempts qa ON l.attempt_id = qa.id
    JOIN quiz_questions qq ON qq.id = ANY(qa.question_ids)
GROUP BY 
    qq.category, qq.difficulty
ORDER BY 
    qq.category, qq.difficulty;

-- Example of how to set up database triggers to automatically update statistics
CREATE TABLE quiz_statistics (
    id SERIAL PRIMARY KEY,
    total_attempts INTEGER DEFAULT 0,
    average_score DECIMAL(5,2) DEFAULT 0,
    average_time DECIMAL(10,2) DEFAULT 0,
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert initial statistics record
INSERT INTO quiz_statistics (id) VALUES (1);

-- Create a function to update statistics when a new score is added
CREATE OR REPLACE FUNCTION update_quiz_statistics()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE quiz_statistics
    SET 
        total_attempts = total_attempts + 1,
        average_score = (average_score * total_attempts + NEW.score) / (total_attempts + 1),
        average_time = (average_time * total_attempts + NEW.time_taken) / (total_attempts + 1),
        last_updated = NOW()
    WHERE id = 1;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to call the function whenever a new record is inserted
CREATE TRIGGER update_statistics_trigger
AFTER INSERT ON leaderboard
FOR EACH ROW
EXECUTE FUNCTION update_quiz_statistics();

-- Create a function to get user performance statistics
CREATE OR REPLACE FUNCTION get_user_statistics(user_student_id VARCHAR)
RETURNS TABLE (
    attempts INTEGER,
    best_score INTEGER,
    average_score DECIMAL,
    best_time INTEGER,
    average_time DECIMAL
)
LANGUAGE SQL
AS $$
    SELECT 
        COUNT(*) as attempts,
        MAX(score) as best_score,
        AVG(score) as average_score,
        MIN(time_taken) as best_time,
        AVG(time_taken) as average_time
    FROM 
        leaderboard
    WHERE 
        student_id = user_student_id;
$$;

-- Add some sample data for testing
INSERT INTO quiz_questions (question, options, correct_answer, explanation, category, difficulty)
VALUES 
    (
        'Which of the following best describes what Artificial Intelligence (AI) is?',
        '["A technology that can do anything a human can do", "A field focused on making computers think and behave exactly like humans", "Software that can perform a specific task that normally requires human intelligence", "A robot with human-like physical capabilities"]',
        2,
        'AI refers to software that can perform specific tasks that traditionally required human intelligence, not general human abilities.',
        'AI Fundamentals',
        'easy'
    ),
    (
        'What is the most common type of AI being deployed in businesses today?',
        '["Artificial General Intelligence (AGI)", "Supervised Learning", "Robot Process Automation", "Reinforcement Learning"]',
        1,
        'Supervised Learning is the most widely deployed form of AI, where models learn from labeled examples.',
        'AI Applications',
        'medium'
    ); 