-- Fitness Tracker Database Schema for Supabase (Idempotent Version)
-- Run in Supabase SQL Editor

-- ========================================
-- 1. Create user_profiles table
-- ========================================
CREATE TABLE IF NOT EXISTS user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    display_name TEXT,
    age INTEGER,
    height DECIMAL(5,2), -- in cm
    weight DECIMAL(5,2), -- in kg
    activity_level TEXT CHECK (activity_level IN ('sedentary', 'lightly_active', 'moderately_active', 'very_active', 'extremely_active')),
    goal_weight DECIMAL(5,2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ========================================
-- 2. Create exercises table
-- ========================================
CREATE TABLE IF NOT EXISTS exercises (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
    type TEXT NOT NULL,
    name TEXT NOT NULL,
    duration INTEGER,
    calories INTEGER,
    intensity TEXT CHECK (intensity IN ('low', 'moderate', 'high', 'very-high')),
    notes TEXT,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ========================================
-- 3. Create nutrition table
-- ========================================
CREATE TABLE IF NOT EXISTS nutrition (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
    meal TEXT NOT NULL CHECK (meal IN ('breakfast', 'lunch', 'dinner', 'snack')),
    food TEXT NOT NULL,
    quantity DECIMAL(10,2),
    unit TEXT,
    calories INTEGER,
    protein DECIMAL(10,2),
    carbs DECIMAL(10,2),
    fat DECIMAL(10,2),
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ========================================
-- 4. Create sleep table
-- ========================================
CREATE TABLE IF NOT EXISTS sleep (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
    bedtime TIME,
    wake_time TIME,
    duration DECIMAL(4,2), -- hours
    quality TEXT CHECK (quality IN ('excellent', 'good', 'fair', 'poor')),
    notes TEXT,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ========================================
-- 5. Create goals table
-- ========================================
CREATE TABLE IF NOT EXISTS goals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
    type TEXT NOT NULL CHECK (type IN ('calories', 'exercise', 'sleep', 'weight', 'water')),
    target DECIMAL(10,2) NOT NULL,
    current DECIMAL(10,2) DEFAULT 0,
    unit TEXT NOT NULL,
    deadline DATE,
    description TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ========================================
-- 6. Enable RLS on all tables
-- ========================================
ALTER TABLE IF EXISTS exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS nutrition ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS sleep ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS user_profiles ENABLE ROW LEVEL SECURITY;

-- ========================================
-- 7. Drop existing policies (if any)
-- ========================================
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM pg_policies WHERE policyname LIKE 'Users can %' AND tablename = 'exercises') THEN
        DROP POLICY IF EXISTS "Users can manage their exercises" ON exercises;
        DROP POLICY IF EXISTS "Users can insert exercises" ON exercises;
        DROP POLICY IF EXISTS "Users can update exercises" ON exercises;
        DROP POLICY IF EXISTS "Users can delete exercises" ON exercises;
    END IF;

    IF EXISTS (SELECT 1 FROM pg_policies WHERE policyname LIKE 'Users can %' AND tablename = 'nutrition') THEN
        DROP POLICY IF EXISTS "Users can manage their nutrition" ON nutrition;
        DROP POLICY IF EXISTS "Users can insert nutrition" ON nutrition;
        DROP POLICY IF EXISTS "Users can update nutrition" ON nutrition;
        DROP POLICY IF EXISTS "Users can delete nutrition" ON nutrition;
    END IF;

    IF EXISTS (SELECT 1 FROM pg_policies WHERE policyname LIKE 'Users can %' AND tablename = 'sleep') THEN
        DROP POLICY IF EXISTS "Users can manage their sleep" ON sleep;
        DROP POLICY IF EXISTS "Users can insert sleep" ON sleep;
        DROP POLICY IF EXISTS "Users can update sleep" ON sleep;
        DROP POLICY IF EXISTS "Users can delete sleep" ON sleep;
    END IF;

    IF EXISTS (SELECT 1 FROM pg_policies WHERE policyname LIKE 'Users can %' AND tablename = 'goals') THEN
        DROP POLICY IF EXISTS "Users can manage their goals" ON goals;
        DROP POLICY IF EXISTS "Users can insert goals" ON goals;
        DROP POLICY IF EXISTS "Users can update goals" ON goals;
        DROP POLICY IF EXISTS "Users can delete goals" ON goals;
    END IF;

    IF EXISTS (SELECT 1 FROM pg_policies WHERE policyname LIKE 'Users can %' AND tablename = 'user_profiles') THEN
        DROP POLICY IF EXISTS "Users can manage their profile" ON user_profiles;
        DROP POLICY IF EXISTS "Users can insert profile" ON user_profiles;
        DROP POLICY IF EXISTS "Users can update profile" ON user_profiles;
        DROP POLICY IF EXISTS "Users can delete profile" ON user_profiles;
    END IF;
END $$;

-- ========================================
-- 8. Create RLS policies
-- ========================================
-- Exercises
CREATE POLICY "Users can manage their exercises" ON exercises
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert exercises" ON exercises
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update exercises" ON exercises
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete exercises" ON exercises
  FOR DELETE USING (auth.uid() = user_id);

-- Nutrition
CREATE POLICY "Users can manage their nutrition" ON nutrition
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert nutrition" ON nutrition
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update nutrition" ON nutrition
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete nutrition" ON nutrition
  FOR DELETE USING (auth.uid() = user_id);

-- Sleep
CREATE POLICY "Users can manage their sleep" ON sleep
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert sleep" ON sleep
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update sleep" ON sleep
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete sleep" ON sleep
  FOR DELETE USING (auth.uid() = user_id);

-- Goals
CREATE POLICY "Users can manage their goals" ON goals
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert goals" ON goals
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update goals" ON goals
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete goals" ON goals
  FOR DELETE USING (auth.uid() = user_id);

-- User profiles
CREATE POLICY "Users can manage their profile" ON user_profiles
  FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can insert profile" ON user_profiles
  FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update profile" ON user_profiles
  FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can delete profile" ON user_profiles
  FOR DELETE USING (auth.uid() = id);

-- ========================================
-- 9. Indexes for performance
-- ========================================
CREATE INDEX IF NOT EXISTS idx_exercises_user_id ON exercises(user_id);
CREATE INDEX IF NOT EXISTS idx_exercises_date ON exercises(date);
CREATE INDEX IF NOT EXISTS idx_nutrition_user_id ON nutrition(user_id);
CREATE INDEX IF NOT EXISTS idx_nutrition_date ON nutrition(date);
CREATE INDEX IF NOT EXISTS idx_sleep_user_id ON sleep(user_id);
CREATE INDEX IF NOT EXISTS idx_sleep_date ON sleep(date);
CREATE INDEX IF NOT EXISTS idx_goals_user_id ON goals(user_id);
CREATE INDEX IF NOT EXISTS idx_goals_type ON goals(type);

-- ========================================
-- 10. Function to update updated_at
-- ========================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';

-- ========================================
-- 11. Drop and create triggers
-- ========================================
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'trigger_update_exercises_updated_at') THEN
        DROP TRIGGER trigger_update_exercises_updated_at ON exercises;
    END IF;
    IF EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'trigger_update_nutrition_updated_at') THEN
        DROP TRIGGER trigger_update_nutrition_updated_at ON nutrition;
    END IF;
    IF EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'trigger_update_sleep_updated_at') THEN
        DROP TRIGGER trigger_update_sleep_updated_at ON sleep;
    END IF;
    IF EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'trigger_update_goals_updated_at') THEN
        DROP TRIGGER trigger_update_goals_updated_at ON goals;
    END IF;
    IF EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'trigger_update_user_profiles_updated_at') THEN
        DROP TRIGGER trigger_update_user_profiles_updated_at ON user_profiles;
    END IF;
END $$;

-- Create triggers
CREATE TRIGGER trigger_update_exercises_updated_at BEFORE UPDATE ON exercises
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER trigger_update_nutrition_updated_at BEFORE UPDATE ON nutrition
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER trigger_update_sleep_updated_at BEFORE UPDATE ON sleep
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER trigger_update_goals_updated_at BEFORE UPDATE ON goals
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER trigger_update_user_profiles_updated_at BEFORE UPDATE ON user_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
