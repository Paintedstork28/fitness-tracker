# 🏋️ Fitness Tracker

A modern, responsive fitness tracking application built with HTML, CSS, and JavaScript, featuring Google OAuth authentication via Supabase.

## ✨ Features

- 🔐 **Google OAuth Authentication** - Secure login with Google accounts
- 📊 **Dashboard** - Track your daily fitness progress
- 🏃 **Exercise Tracking** - Log and monitor your workouts
- 🍎 **Nutrition Logging** - Track your meals and calories
- 😴 **Sleep Monitoring** - Record your sleep patterns
- 🎯 **Goal Setting** - Set and track your fitness goals

## 🚀 Live Demo

Visit the live application: [Your GitHub Pages URL]

## 🛠️ Technology Stack

- **Frontend:** HTML5, CSS3, JavaScript (ES6+)
- **Authentication:** Supabase Auth with Google OAuth
- **Database:** Supabase (PostgreSQL)
- **Hosting:** GitHub Pages
- **Icons:** Font Awesome

## 📁 Project Structure

```
fitness-tracker/
├── login.html              # Authentication page
├── index.html              # Main dashboard
├── exercises.html          # Exercise tracking
├── nutrition.html          # Nutrition logging
├── sleep.html              # Sleep monitoring
├── goals.html              # Goal setting
├── about.html              # About page
├── js/
│   ├── auth.js             # Authentication utility
│   ├── supabase-config.js  # Supabase configuration
│   └── script.js           # Main application logic
├── css/
│   └── style.css           # Application styles
└── .nojekyll               # GitHub Pages configuration
```

## 🔧 Setup & Installation

### Prerequisites
- A Supabase account
- Google OAuth credentials
- GitHub account

### Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/fitness-tracker.git
   cd fitness-tracker
   ```

2. **Start a local server:**
   ```bash
   python3 -m http.server 8000
   ```

3. **Open in browser:**
   ```
   http://localhost:8000
   ```

### Supabase Configuration

1. Create a new Supabase project
2. Enable Google OAuth in Authentication settings
3. Update the Supabase URL and API key in the JavaScript files
4. Set up the database schema using `database-schema.sql`

## 🚀 Deployment

This project is configured for GitHub Pages deployment:

1. Push your code to a GitHub repository
2. Enable GitHub Pages in repository settings
3. Select "Deploy from a branch" → "main" → "/ (root)"
4. Your site will be available at `https://yourusername.github.io/repository-name`

## 📝 Database Schema

The application uses the following main tables:
- `user_profiles` - User information and preferences
- `exercises` - Exercise logs and activities
- `nutrition` - Meal and calorie tracking
- `sleep` - Sleep duration and quality
- `goals` - User-defined fitness goals

See `database-schema.sql` for the complete schema.

## 🔐 Authentication

The app uses Supabase Auth with Google OAuth for secure user authentication. Users can:
- Sign in with their Google account
- Maintain persistent sessions across pages
- Sign out securely

## 🎨 Design

- **Responsive Design** - Works on desktop, tablet, and mobile
- **Modern UI** - Clean, intuitive interface
- **Accessibility** - Semantic HTML and proper contrast ratios
- **Performance** - Optimized loading and minimal dependencies

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Supabase](https://supabase.com/) for authentication and database
- [Font Awesome](https://fontawesome.com/) for icons
- [Google](https://developers.google.com/identity) for OAuth integration

---

**Happy Tracking! 🏃‍♀️💪**
