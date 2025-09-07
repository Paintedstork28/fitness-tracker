# Supabase Setup Guide for Fitness Tracker

This guide will help you set up Supabase for your Fitness Tracker application.

## Prerequisites

- A Supabase account (free at [supabase.com](https://supabase.com))
- Your Fitness Tracker project files

## Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/sign in
2. Click "New Project"
3. Choose your organization
4. Enter project details:
   - **Name**: `fitness-tracker`
   - **Database Password**: Choose a strong password (save this!)
   - **Region**: Choose closest to your users
5. Click "Create new project"
6. Wait for the project to be created (2-3 minutes)

## Step 2: Get Your Project Credentials

1. In your Supabase dashboard, go to **Settings** > **API**
2. Copy the following values:
   - **Project URL** (looks like: `https://your-project-id.supabase.co`)
   - **Anon public key** (starts with `eyJ...`)

## Step 3: Update Your Configuration

1. Open `js/supabase-config.js`
2. Replace the placeholder values:

```javascript
const SUPABASE_URL = 'https://your-project-id.supabase.co';
const SUPABASE_ANON_KEY = 'eyJ...your-anon-key...';
```

## Step 4: Set Up the Database

1. In your Supabase dashboard, go to **SQL Editor**
2. Click "New Query"
3. Copy and paste the entire contents of `database-schema.sql`
4. Click "Run" to execute the SQL

This will create:
- All necessary tables (exercises, nutrition, sleep, goals, user_profiles)
- Row Level Security (RLS) policies
- Indexes for performance
- Triggers for automatic timestamps

## Step 5: Configure Google OAuth

1. In your Supabase dashboard, go to **Authentication** > **Providers**
2. Find **Google** and click to configure
3. You'll need to set up Google OAuth (see the original Google OAuth setup guide)
4. Once you have your Google Client ID and Secret:
   - **Client ID**: Enter your Google Client ID
   - **Client Secret**: Enter your Google Client Secret
5. Click "Save"

## Step 6: Configure Redirect URLs

1. In **Authentication** > **URL Configuration**
2. Add your site URLs:
   - **Site URL**: `https://your-username.github.io/fitness-tracker` (for GitHub Pages)
   - **Redirect URLs**: 
     - `https://your-username.github.io/fitness-tracker/index.html`
     - `http://localhost:3000/index.html` (for local development)

## Step 7: Test Your Setup

1. Open `login.html` in your browser
2. Click "Sign in with Google"
3. Complete the OAuth flow
4. You should be redirected to the dashboard

## Step 8: Deploy to GitHub Pages

1. Push your code to GitHub
2. Go to your repository settings
3. Scroll to "Pages" section
4. Select source: "Deploy from a branch"
5. Choose "main" branch and "/ (root)" folder
6. Click "Save"
7. Your site will be available at `https://your-username.github.io/fitness-tracker`

## Database Schema Overview

### Tables Created:

1. **exercises** - User exercise logs
   - id, user_id, type, name, duration, calories, intensity, notes, date

2. **nutrition** - Food intake logs
   - id, user_id, meal, food, quantity, unit, calories, protein, carbs, fat, date

3. **sleep** - Sleep tracking data
   - id, user_id, bedtime, wake_time, duration, quality, notes, date

4. **goals** - User fitness goals
   - id, user_id, type, target, current, unit, deadline, description

5. **user_profiles** - Additional user information
   - id, display_name, age, height, weight, activity_level, goal_weight

### Security Features:

- **Row Level Security (RLS)**: Users can only access their own data
- **Automatic user_id**: All data is automatically linked to the authenticated user
- **Data validation**: Database constraints ensure data integrity

## Features Enabled:

✅ **Real-time Authentication**: Google OAuth with Supabase
✅ **Data Persistence**: All data stored in PostgreSQL database
✅ **User Isolation**: Each user only sees their own data
✅ **Real-time Updates**: Data syncs across devices
✅ **Automatic Backups**: Supabase handles database backups
✅ **Scalable**: Handles growth automatically

## Troubleshooting

### Common Issues:

1. **"Invalid API key"**
   - Check that your SUPABASE_URL and SUPABASE_ANON_KEY are correct
   - Make sure there are no extra spaces or quotes

2. **"OAuth error"**
   - Verify your Google OAuth setup
   - Check that redirect URLs match exactly
   - Ensure Google OAuth is enabled in Supabase

3. **"Permission denied"**
   - Make sure RLS policies are set up correctly
   - Check that the user is authenticated

4. **"Table doesn't exist"**
   - Run the database schema SQL again
   - Check that all tables were created successfully

### Getting Help:

1. Check the [Supabase Documentation](https://supabase.com/docs)
2. Visit the [Supabase Community](https://github.com/supabase/supabase/discussions)
3. Check browser console for error messages

## Next Steps

Once your setup is working:

1. **Customize the UI**: Modify colors, fonts, and layout
2. **Add Features**: Implement charts, analytics, or social features
3. **Mobile App**: Use Supabase with React Native or Flutter
4. **Advanced Features**: Add real-time notifications, data export, etc.

## Cost Information

- **Supabase Free Tier**: 
  - 50,000 monthly active users
  - 500MB database space
  - 2GB bandwidth
  - Perfect for personal projects and small apps

- **GitHub Pages**: Always free for public repositories

**Total Cost**: $0/month for most use cases!

---

Your Fitness Tracker is now a production-ready application with real user management, data persistence, and professional authentication! 🎉
