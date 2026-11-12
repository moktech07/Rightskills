-- RightSkills Supabase Database Schema

-- Profiles table for user tracking
CREATE TABLE IF NOT EXISTS profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    avatar_url TEXT,
    bio TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Skills table
CREATE TABLE IF NOT EXISTS skills (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    owner_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    author TEXT NOT NULL,
    version TEXT NOT NULL,
    license TEXT NOT NULL,
    security_grade CHAR(1) CHECK (security_grade IN ('A', 'B', 'C', 'D', 'F')),
    test_score INTEGER CHECK (test_score >= 0 AND test_score <= 100),
    jobs TEXT[] NOT NULL,
    target_apps TEXT[] NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Stacks table
CREATE TABLE IF NOT EXISTS stacks (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    owner_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    icon TEXT,
    jobs TEXT[] NOT NULL,
    skills TEXT[] NOT NULL,
    popularity INTEGER DEFAULT 0,
    rating NUMERIC(3,2) DEFAULT 0.00,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Reviews table
CREATE TABLE IF NOT EXISTS reviews (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    skill_id TEXT REFERENCES skills(id) ON DELETE CASCADE,
    reviewer_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    type TEXT CHECK (type IN ('human', 'agent')) NOT NULL,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5) NOT NULL,
    author_name TEXT,
    agent_name TEXT,
    confidence NUMERIC(3,2),
    helpful_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_skills_owner_id ON skills(owner_id);
CREATE INDEX IF NOT EXISTS idx_skills_created_at ON skills(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_stacks_owner_id ON stacks(owner_id);
CREATE INDEX IF NOT EXISTS idx_stacks_created_at ON stacks(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_reviews_skill_id ON reviews(skill_id);
CREATE INDEX IF NOT EXISTS idx_reviews_reviewer_id ON reviews(reviewer_id);
CREATE INDEX IF NOT EXISTS idx_reviews_created_at ON reviews(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE stacks ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Profiles are public for read" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update their own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert their own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Skills policies
CREATE POLICY "Skills are public for read" ON skills FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create skills" ON skills FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Users can update their own skills" ON skills FOR UPDATE USING (auth.uid() = owner_id);
CREATE POLICY "Users can delete their own skills" ON skills FOR DELETE USING (auth.uid() = owner_id);

-- Stacks policies
CREATE POLICY "Stacks are public for read" ON stacks FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create stacks" ON stacks FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Users can update their own stacks" ON stacks FOR UPDATE USING (auth.uid() = owner_id);
CREATE POLICY "Users can delete their own stacks" ON stacks FOR DELETE USING (auth.uid() = owner_id);

-- Reviews policies
CREATE POLICY "Reviews are public for read" ON reviews FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create reviews" ON reviews FOR INSERT WITH CHECK (auth.role() = 'authenticated' AND auth.uid() = reviewer_id);
CREATE POLICY "Users can update their own reviews" ON reviews FOR UPDATE USING (auth.uid() = reviewer_id);
CREATE POLICY "Users can delete their own reviews" ON reviews FOR DELETE USING (auth.uid() = reviewer_id);
