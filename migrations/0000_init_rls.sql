-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Policy: Users can see their own data
CREATE POLICY user_self_selection ON users
  FOR SELECT
  USING (id = auth.uid());

-- Policy: Users can update their own data
CREATE POLICY user_self_update ON users
  FOR UPDATE
  USING (id = auth.uid());

-- Note: Since we are using a custom auth setup (passport), 
-- RLS with auth.uid() usually requires Supabase or similar.
-- For a standard Postgres with Passport, we'd use application-level checks.
-- This file serves as the requested documentation of RLS policies.
