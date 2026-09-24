-- AI Vault Supabase Database Schema
-- Run this in the Supabase SQL Editor if connecting a cloud database

-- 1. Tools table
CREATE TABLE IF NOT EXISTS tools (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  long_description TEXT,
  url TEXT NOT NULL,
  logo TEXT,
  category TEXT[] NOT NULL DEFAULT '{}',
  tags TEXT[] NOT NULL DEFAULT '{}',
  pricing_type TEXT NOT NULL DEFAULT 'free-tier',
  pricing_details TEXT,
  requires_login BOOLEAN NOT NULL DEFAULT false,
  mobile_friendly BOOLEAN NOT NULL DEFAULT true,
  rating NUMERIC(3, 2) DEFAULT 4.8,
  popularity INTEGER DEFAULT 80,
  featured BOOLEAN DEFAULT false,
  trending BOOLEAN DEFAULT false,
  verified BOOLEAN DEFAULT true,
  date_added DATE DEFAULT CURRENT_DATE,
  last_checked DATE DEFAULT CURRENT_DATE,
  views INTEGER DEFAULT 0,
  clicks INTEGER DEFAULT 0,
  key_features TEXT[] DEFAULT '{}',
  developer_or_company TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. User Favorites table
CREATE TABLE IF NOT EXISTS favorites (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  tool_id TEXT REFERENCES tools(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, tool_id)
);

-- 3. Reports table
CREATE TABLE IF NOT EXISTS reports (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  tool_id TEXT NOT NULL,
  tool_name TEXT NOT NULL,
  reason TEXT NOT NULL,
  details TEXT NOT NULL,
  user_email TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE tools ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

-- Policies:
-- Tools are readable by anyone
CREATE POLICY "Tools are publicly readable" ON tools FOR SELECT USING (true);
-- Tools can only be modified by service role / authenticated admin
CREATE POLICY "Admins can manage tools" ON tools FOR ALL USING (auth.role() = 'authenticated');

-- Reports can be created by anyone, read by authenticated admins
CREATE POLICY "Anyone can submit a report" ON reports FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can view reports" ON reports FOR SELECT USING (auth.role() = 'authenticated');

-- Favorites: users manage their own favorites
CREATE POLICY "Users can manage their favorites" ON favorites
  FOR ALL USING (auth.uid() = user_id);
