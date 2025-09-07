# Fitness Tracker - Troubleshooting Guide

## 🚨 Common Issues and Solutions

### 1. CSS Not Loading / No Colors or Animations

**Problem**: The site appears plain with no styling, colors, or animations.

**Solutions**:

#### A. Check File Paths
- Ensure all HTML files reference CSS correctly: `href="css/style.css"`
- Verify the `css/` folder exists and contains `style.css`

#### B. GitHub Pages Jekyll Issue
- Added `.nojekyll` file to prevent Jekyll processing
- This file is now included in your project

#### C. Browser Cache
- Clear browser cache (Ctrl+F5 or Cmd+Shift+R)
- Try incognito/private browsing mode

#### D. Test CSS Loading
- Visit: `https://paintedstork28.github.io/fitness-tracker/test.html`
- If this page shows colors and styling, CSS is working
- If not, there's a file path or loading issue

### 2. Google OAuth Not Working

**Problem**: Google sign-in button doesn't work or shows errors.

**Required Configuration**:

#### A. Google Cloud Console
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to **APIs & Services** → **Credentials**
3. Find your OAuth 2.0 Client ID: `570507553631-of04ve8iuh0u1404meiqlns85p6shcd2.apps.googleusercontent.com`
4. Click to edit it
5. Add these URLs:

**Authorized JavaScript Origins**:
```
https://paintedstork28.github.io
```

**Authorized Redirect URIs**:
```
https://skomlyzhbhnqvfncgxhx.supabase.co/auth/v1/callback
```

#### B. Supabase Dashboard
1. Go to [Supabase Dashboard](https://supabase.com/dashboard/project/skomlyzhbhnqvfncgxhx)
2. Navigate to **Authentication** → **Providers**
3. Enable **Google** provider
4. Add your Google OAuth credentials:
   - **Client ID**: `570507553631-of04ve8iuh0u1404meiqlns85p6shcd2.apps.googleusercontent.com`
   - **Client Secret**: (Get from Google Cloud Console)

5. Go to **Authentication** → **URL Configuration**
6. Set these URLs:
   - **Site URL**: `https://paintedstork28.github.io/fitness-tracker`
   - **Redirect URLs**: 
     - `https://paintedstork28.github.io/fitness-tracker/index.html`
     - `https://paintedstork28.github.io/fitness-tracker/login.html`

### 3. Database Issues

**Problem**: Data not saving or loading.

**Solution**:
1. Go to Supabase Dashboard → **SQL Editor**
2. Run the `database-schema.sql` file
3. This creates all necessary tables and security policies

### 4. Debugging Steps

#### A. Check Browser Console
1. Open your site: `https://paintedstork28.github.io/fitness-tracker`
2. Press F12 to open Developer Tools
3. Go to **Console** tab
4. Look for any error messages
5. Check **Network** tab for failed requests

#### B. Test Individual Components
1. **CSS Test**: Visit `test.html` page
2. **Auth Test**: Try clicking Google sign-in button
3. **Database Test**: Check if data saves after login

#### C. Common Error Messages

**"Failed to fetch"**:
- Check Supabase URL and key in `js/supabase-config.js`
- Verify internet connection

**"OAuth error"**:
- Check Google Cloud Console redirect URLs
- Verify Supabase Google provider settings

**"Permission denied"**:
- Run database schema SQL
- Check RLS policies are enabled

### 5. File Structure Verification

Your project should have this structure:
```
fitness-tracker/
├── .nojekyll
├── index.html
├── login.html
├── test.html
├── css/
│   └── style.css
├── js/
│   ├── supabase-config.js
│   └── script.js
└── [other HTML files]
```

### 6. Quick Fixes

#### A. Force CSS Reload
Add this to any HTML file to force CSS reload:
```html
<link rel="stylesheet" href="css/style.css?v=2">
```

#### B. Check Supabase Connection
Open browser console and look for:
```
Supabase URL: https://skomlyzhbhnqvfncgxhx.supabase.co
Supabase initialized: true
```

#### C. Verify Google OAuth
In browser console, click sign-in button and look for:
```
Sign in with Google clicked
Attempting Google sign in...
```

### 7. Emergency Fallback

If nothing works, try this minimal test:

1. Create a simple `index.html` with just:
```html
<!DOCTYPE html>
<html>
<head>
    <title>Test</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <h1 style="color: var(--primary);">Test</h1>
</body>
</html>
```

2. If this shows colored text, CSS is working
3. If not, there's a fundamental file loading issue

### 8. Contact Information

If issues persist:
1. Check browser console for specific error messages
2. Verify all URLs match exactly (no trailing slashes)
3. Ensure all files are uploaded to GitHub
4. Wait 5-10 minutes after changes for GitHub Pages to update

---

**Most Common Fix**: Clear browser cache and check Google OAuth redirect URLs! 🔧
