# Google OAuth Setup Guide for Fitness Tracker

This guide will help you set up Google OAuth authentication for your Fitness Tracker website.

## Prerequisites

- A Google account
- Access to Google Cloud Console
- Your website domain (for production) or localhost (for development)

## Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a project" at the top
3. Click "New Project"
4. Enter project name: "Fitness Tracker"
5. Click "Create"

## Step 2: Enable Google+ API

1. In the Google Cloud Console, go to "APIs & Services" > "Library"
2. Search for "Google+ API" or "Google Identity"
3. Click on "Google Identity" or "Google+ API"
4. Click "Enable"

## Step 3: Configure OAuth Consent Screen

1. Go to "APIs & Services" > "OAuth consent screen"
2. Choose "External" user type (unless you have a Google Workspace)
3. Click "Create"
4. Fill in the required fields:
   - **App name**: Fitness Tracker
   - **User support email**: Your email
   - **Developer contact information**: Your email
5. Click "Save and Continue"
6. Skip "Scopes" for now, click "Save and Continue"
7. Add test users (your email) if needed
8. Click "Save and Continue"

## Step 4: Create OAuth 2.0 Credentials

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth 2.0 Client IDs"
3. Choose "Web application"
4. Enter a name: "Fitness Tracker Web Client"
5. Add authorized JavaScript origins:
   - For development: `http://localhost:3000`, `http://127.0.0.1:3000`
   - For production: `https://yourdomain.com`
6. Add authorized redirect URIs:
   - For development: `http://localhost:3000/login.html`
   - For production: `https://yourdomain.com/login.html`
7. Click "Create"
8. Copy the **Client ID** (you'll need this)

## Step 5: Update Your Code

1. Open `login.html`
2. Find this line:
   ```javascript
   const GOOGLE_CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID';
   ```
3. Replace `YOUR_GOOGLE_CLIENT_ID` with your actual Client ID from Step 4

4. Also update this line in the HTML:
   ```html
   data-client_id="YOUR_GOOGLE_CLIENT_ID"
   ```

## Step 6: Test the Authentication

1. Open `login.html` in your browser
2. Click "Sign in with Google"
3. Complete the OAuth flow
4. You should be redirected to the dashboard

## Step 7: Deploy to Production

When deploying to production:

1. Update the authorized origins and redirect URIs in Google Cloud Console
2. Add your production domain
3. Update the Client ID in your code if needed
4. Test the authentication flow on your live site

## Security Considerations

- Never commit your Client ID to public repositories
- Use environment variables for production
- Consider implementing server-side token verification
- Set up proper CORS policies
- Use HTTPS in production

## Troubleshooting

### Common Issues:

1. **"This app isn't verified"**
   - This is normal for development
   - Click "Advanced" > "Go to Fitness Tracker (unsafe)"

2. **"Error 400: redirect_uri_mismatch"**
   - Check that your redirect URI in Google Console matches your actual URL

3. **"Error 403: access_denied"**
   - Make sure you've added your email as a test user
   - Check that the OAuth consent screen is properly configured

4. **JavaScript errors**
   - Make sure the Google Sign-In script is loading
   - Check browser console for errors
   - Verify your Client ID is correct

## Additional Features

You can extend the authentication by:

1. **Adding more scopes** (profile, email, etc.)
2. **Implementing server-side verification**
3. **Adding user roles and permissions**
4. **Storing user data in a database**
5. **Adding social login options** (Facebook, Twitter, etc.)

## Support

If you encounter issues:

1. Check the [Google Identity documentation](https://developers.google.com/identity)
2. Review the browser console for errors
3. Verify your Google Cloud Console configuration
4. Test with a fresh browser session

---

**Note**: This setup is for development and basic production use. For enterprise applications, consider implementing additional security measures and server-side token verification.
