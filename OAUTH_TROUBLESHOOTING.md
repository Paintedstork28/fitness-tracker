# OAuth Troubleshooting Guide for Fitness Tracker

## Current Configuration

### Supabase Configuration:
- **Supabase URL**: `https://skomlyzhbhnqvfncgxhx.supabase.co`
- **Redirect URL**: `https://paintedstork28.github.io/fitness-tracker/index.html`

### Google Cloud Console Required Settings:

## 1. Authorized JavaScript Origins
Add these to your Google Cloud Console OAuth 2.0 Client:
```
https://paintedstork28.github.io
https://skomlyzhbhnqvfncgxhx.supabase.co
```

## 2. Authorized Redirect URIs
Add these to your Google Cloud Console OAuth 2.0 Client:
```
https://skomlyzhbhnqvfncgxhx.supabase.co/auth/v1/callback
https://paintedstork28.github.io/fitness-tracker/index.html
```

## 3. Supabase Dashboard Configuration

### In Supabase Dashboard:
1. Go to **Authentication** > **Providers**
2. Find **Google** and click **Configure**
3. Enable Google provider
4. Add your **Google Client ID**: `570507553631-of04ve8iuh0u1404meiqlns85p6shcd2.apps.googleusercontent.com`
5. Add your **Google Client Secret** (get this from Google Cloud Console)
6. Set **Redirect URL** to: `https://skomlyzhbhnqvfncgxhx.supabase.co/auth/v1/callback`

## Common Issues and Solutions

### Issue 1: "supabase is not defined"
**Symptoms**: Console shows "supabase is not defined" error
**Solutions**:
1. Check if Supabase script is loading: Look for `https://unpkg.com/@supabase/supabase-js@2` in Network tab
2. Clear browser cache and hard refresh (Ctrl+F5)
3. Check browser console for script loading errors

### Issue 2: "redirect_uri_mismatch"
**Symptoms**: Google OAuth shows "Error 400: redirect_uri_mismatch"
**Solutions**:
1. Verify redirect URIs in Google Cloud Console match exactly:
   - `https://skomlyzhbhnqvfncgxhx.supabase.co/auth/v1/callback`
2. Check for trailing slashes or typos
3. Make sure you're using HTTPS (not HTTP)

### Issue 3: "This app isn't verified"
**Symptoms**: Google shows "This app isn't verified" warning
**Solutions**:
1. This is normal for development
2. Click "Advanced" > "Go to Fitness Tracker (unsafe)"
3. For production, submit your app for verification

### Issue 4: "access_denied"
**Symptoms**: Google OAuth shows "Error 403: access_denied"
**Solutions**:
1. Add your email as a test user in Google Cloud Console
2. Check OAuth consent screen configuration
3. Make sure the app is not in restricted mode

### Issue 5: Supabase Provider Not Configured
**Symptoms**: OAuth flow doesn't start or fails immediately
**Solutions**:
1. Go to Supabase Dashboard > Authentication > Providers
2. Enable Google provider
3. Add Client ID and Client Secret
4. Save configuration

## Step-by-Step Fix

### Step 1: Google Cloud Console Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project
3. Go to **APIs & Services** > **Credentials**
4. Click on your OAuth 2.0 Client ID
5. Add these **Authorized JavaScript origins**:
   ```
   https://paintedstork28.github.io
   https://skomlyzhbhnqvfncgxhx.supabase.co
   ```
6. Add these **Authorized redirect URIs**:
   ```
   https://skomlyzhbhnqvfncgxhx.supabase.co/auth/v1/callback
   https://paintedstork28.github.io/fitness-tracker/index.html
   ```
7. Click **Save**

### Step 2: Get Google Client Secret
1. In Google Cloud Console, go to **APIs & Services** > **Credentials**
2. Click on your OAuth 2.0 Client ID
3. Copy the **Client Secret** (not the Client ID)

### Step 3: Configure Supabase
1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project: `skomlyzhbhnqvfncgxhx`
3. Go to **Authentication** > **Providers**
4. Find **Google** and click **Configure**
5. Enable the provider
6. Add:
   - **Client ID**: `570507553631-of04ve8iuh0u1404meiqlns85p6shcd2.apps.googleusercontent.com`
   - **Client Secret**: (paste from Step 2)
7. Click **Save**

### Step 4: Test the Flow
1. Clear browser cache
2. Go to `https://paintedstork28.github.io/fitness-tracker/`
3. Should redirect to login page
4. Click "Sign in with Google"
5. Complete OAuth flow
6. Should redirect to dashboard

## Debug Steps

### Check Browser Console
1. Open Developer Tools (F12)
2. Go to **Console** tab
3. Look for errors related to:
   - Supabase initialization
   - OAuth flow
   - Network requests

### Check Network Tab
1. Open Developer Tools (F12)
2. Go to **Network** tab
3. Try to sign in
4. Look for failed requests to:
   - `supabase.co`
   - `googleapis.com`
   - `accounts.google.com`

### Verify URLs
Make sure these URLs are accessible:
- ✅ `https://paintedstork28.github.io/fitness-tracker/`
- ✅ `https://skomlyzhbhnqvfncgxhx.supabase.co`
- ✅ `https://unpkg.com/@supabase/supabase-js@2`

## Quick Test

Run this in your browser console on the login page:
```javascript
// Test Supabase initialization
console.log('Supabase URL:', SUPABASE_URL);
console.log('Supabase client:', supabase);

// Test Google OAuth
try {
    const user = await SupabaseAuth.getCurrentUser();
    console.log('Current user:', user);
} catch (error) {
    console.error('Auth test failed:', error);
}
```

## Still Having Issues?

If you're still experiencing problems:

1. **Check Supabase Dashboard**: Make sure Google provider is enabled and configured
2. **Verify Google Cloud Console**: Double-check all URLs and credentials
3. **Clear Everything**: Clear browser cache, cookies, and local storage
4. **Test in Incognito**: Try in a private/incognito browser window
5. **Check Browser Console**: Look for specific error messages

## Contact Information

If you need further assistance, provide:
1. Browser console error messages
2. Network tab failed requests
3. Screenshots of Google Cloud Console configuration
4. Screenshots of Supabase provider configuration
