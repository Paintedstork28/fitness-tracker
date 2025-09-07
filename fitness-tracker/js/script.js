// Fitness Tracker - Interactive JavaScript Features

// Global data storage (in a real app, this would be a database)
let fitnessData = {
    exercises: [],
    nutrition: [],
    sleep: [],
    goals: []
};

// Authentication state
let currentUser = null;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    checkAuthentication();
    initializeApp();
    loadSampleData();
    setupEventListeners();
    updateDashboard();
});

// Initialize the application
function initializeApp() {
    // Set current date for forms
    const today = new Date().toISOString().split('T')[0];
    const dateInputs = document.querySelectorAll('input[type="date"]');
    dateInputs.forEach(input => {
        if (!input.value) {
            input.value = today;
        }
    });

    // Set current time for sleep forms
    const timeInputs = document.querySelectorAll('input[type="time"]');
    timeInputs.forEach(input => {
        if (input.id === 'bedtime' && !input.value) {
            input.value = '22:30';
        }
        if (input.id === 'wake-time' && !input.value) {
            input.value = '06:00';
        }
    });

    // Initialize navigation
    initializeNavigation();
    
    // Add user menu if authenticated
    if (currentUser) {
        addUserMenuToNavigation();
    }
    
    // Initialize charts
    initializeCharts();
}

// Load sample data for demonstration
function loadSampleData() {
    // Sample exercise data
    fitnessData.exercises = [
        { type: 'cardio', name: 'Morning Run', duration: 30, calories: 280, intensity: 'high', time: '07:00', date: new Date().toISOString().split('T')[0] },
        { type: 'strength', name: 'Push-ups', duration: 15, calories: 120, intensity: 'moderate', time: '12:30', date: new Date().toISOString().split('T')[0] },
        { type: 'flexibility', name: 'Yoga', duration: 45, calories: 150, intensity: 'low', time: '18:00', date: new Date().toISOString().split('T')[0] }
    ];

    // Sample nutrition data
    fitnessData.nutrition = [
        { meal: 'breakfast', food: 'Oatmeal with Berries', quantity: 1, unit: 'cup', calories: 300, protein: 12, carbs: 55, fat: 6, date: new Date().toISOString().split('T')[0] },
        { meal: 'lunch', food: 'Grilled Chicken Salad', quantity: 1, unit: 'serving', calories: 450, protein: 35, carbs: 15, fat: 25, date: new Date().toISOString().split('T')[0] },
        { meal: 'dinner', food: 'Salmon Fillet', quantity: 6, unit: 'oz', calories: 350, protein: 40, carbs: 0, fat: 20, date: new Date().toISOString().split('T')[0] }
    ];

    // Sample sleep data
    fitnessData.sleep = [
        { bedtime: '22:30', wakeTime: '06:00', quality: 'good', date: new Date().toISOString().split('T')[0], notes: 'Fell asleep quickly' },
        { bedtime: '23:00', wakeTime: '06:30', quality: 'excellent', date: getYesterday(), notes: 'Deep sleep, felt refreshed' },
        { bedtime: '22:45', wakeTime: '05:45', quality: 'fair', date: getTwoDaysAgo(), notes: 'Woke up once during night' }
    ];

    // Sample goals
    fitnessData.goals = [
        { type: 'calories', target: 2200, current: 1850, unit: 'calories' },
        { type: 'exercise', target: 5, current: 3, unit: 'exercises' },
        { type: 'sleep', target: 8, current: 7.5, unit: 'hours' },
        { type: 'weight', target: 1.5, current: 2.3, unit: 'lbs' }
    ];
}

// Setup event listeners
function setupEventListeners() {
    // Exercise form
    const exerciseForm = document.getElementById('exercise-form');
    if (exerciseForm) {
        exerciseForm.addEventListener('submit', handleExerciseSubmit);
    }

    // Nutrition form
    const nutritionForm = document.getElementById('nutrition-form');
    if (nutritionForm) {
        nutritionForm.addEventListener('submit', handleNutritionSubmit);
    }

    // Sleep form
    const sleepForm = document.getElementById('sleep-form');
    if (sleepForm) {
        sleepForm.addEventListener('submit', handleSleepSubmit);
    }

    // Goals form
    const goalsForm = document.getElementById('goals-form');
    if (goalsForm) {
        goalsForm.addEventListener('submit', handleGoalsSubmit);
    }

    // Auto-calculate sleep duration
    const bedtimeInput = document.getElementById('bedtime');
    const wakeTimeInput = document.getElementById('wake-time');
    if (bedtimeInput && wakeTimeInput) {
        bedtimeInput.addEventListener('change', calculateSleepDuration);
        wakeTimeInput.addEventListener('change', calculateSleepDuration);
    }
}

// Navigation functionality
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-links a');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Set active navigation link
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Handle exercise form submission
function handleExerciseSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const exercise = {
        type: document.getElementById('exercise-type').value,
        name: document.getElementById('exercise-name').value,
        duration: parseInt(document.getElementById('duration').value),
        calories: parseInt(document.getElementById('calories-burned').value) || 0,
        intensity: document.getElementById('intensity').value,
        notes: document.getElementById('notes').value,
        time: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
        date: new Date().toISOString().split('T')[0]
    };

    fitnessData.exercises.push(exercise);
    updateExerciseTable();
    updateDashboard();
    showSuccessMessage('Exercise logged successfully!');
    e.target.reset();
}

// Handle nutrition form submission
function handleNutritionSubmit(e) {
    e.preventDefault();
    
    const nutrition = {
        meal: document.getElementById('meal-type').value,
        food: document.getElementById('food-name').value,
        quantity: parseFloat(document.getElementById('quantity').value),
        unit: document.getElementById('unit').value,
        calories: parseInt(document.getElementById('calories').value),
        protein: parseFloat(document.getElementById('protein').value) || 0,
        carbs: parseFloat(document.getElementById('carbs').value) || 0,
        fat: parseFloat(document.getElementById('fat').value) || 0,
        date: new Date().toISOString().split('T')[0]
    };

    fitnessData.nutrition.push(nutrition);
    updateNutritionDisplay();
    updateDashboard();
    showSuccessMessage('Food logged successfully!');
    e.target.reset();
}

// Handle sleep form submission
function handleSleepSubmit(e) {
    e.preventDefault();
    
    const sleep = {
        bedtime: document.getElementById('bedtime').value,
        wakeTime: document.getElementById('wake-time').value,
        quality: document.getElementById('sleep-quality').value,
        notes: document.getElementById('sleep-notes').value,
        date: document.getElementById('sleep-date').value
    };

    // Calculate sleep duration
    const duration = calculateSleepDuration();
    sleep.duration = duration;

    fitnessData.sleep.push(sleep);
    updateSleepDisplay();
    updateDashboard();
    showSuccessMessage('Sleep data logged successfully!');
    e.target.reset();
}

// Handle goals form submission
function handleGoalsSubmit(e) {
    e.preventDefault();
    
    const goal = {
        type: document.getElementById('goal-type').value,
        target: parseFloat(document.getElementById('goal-target').value),
        unit: document.getElementById('goal-unit').value,
        deadline: document.getElementById('goal-deadline').value,
        description: document.getElementById('goal-description').value,
        current: 0
    };

    fitnessData.goals.push(goal);
    updateGoalsDisplay();
    showSuccessMessage('Goal added successfully!');
    e.target.reset();
}

// Calculate sleep duration
function calculateSleepDuration() {
    const bedtime = document.getElementById('bedtime');
    const wakeTime = document.getElementById('wake-time');
    
    if (bedtime && wakeTime && bedtime.value && wakeTime.value) {
        const bedtimeDate = new Date(`2000-01-01T${bedtime.value}`);
        let wakeTimeDate = new Date(`2000-01-01T${wakeTime.value}`);
        
        // Handle overnight sleep
        if (wakeTimeDate <= bedtimeDate) {
            wakeTimeDate.setDate(wakeTimeDate.getDate() + 1);
        }
        
        const duration = (wakeTimeDate - bedtimeDate) / (1000 * 60 * 60); // hours
        return Math.round(duration * 10) / 10; // Round to 1 decimal place
    }
    return 0;
}

// Update exercise table
function updateExerciseTable() {
    const tbody = document.getElementById('exercise-list');
    if (!tbody) return;

    tbody.innerHTML = '';
    
    const todayExercises = fitnessData.exercises.filter(ex => ex.date === new Date().toISOString().split('T')[0]);
    
    todayExercises.forEach(exercise => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${exercise.name}</td>
            <td>${exercise.type}</td>
            <td>${exercise.duration} min</td>
            <td>${exercise.calories}</td>
            <td>${exercise.intensity}</td>
            <td>${exercise.time}</td>
        `;
        tbody.appendChild(row);
    });
}

// Update nutrition display
function updateNutritionDisplay() {
    // This would update the nutrition tables and charts
    // For now, we'll just log the data
    console.log('Nutrition data updated:', fitnessData.nutrition);
}

// Update sleep display
function updateSleepDisplay() {
    // This would update the sleep history table
    console.log('Sleep data updated:', fitnessData.sleep);
}

// Update goals display
function updateGoalsDisplay() {
    // This would update the goals overview
    console.log('Goals data updated:', fitnessData.goals);
}

// Update dashboard with current data
function updateDashboard() {
    // Update calories
    const totalCalories = fitnessData.nutrition
        .filter(n => n.date === new Date().toISOString().split('T')[0])
        .reduce((sum, n) => sum + n.calories, 0);
    
    const caloriesElement = document.getElementById('calories-consumed');
    if (caloriesElement) {
        caloriesElement.textContent = totalCalories.toLocaleString();
    }

    // Update exercises
    const todayExercises = fitnessData.exercises.filter(ex => ex.date === new Date().toISOString().split('T')[0]);
    const exercisesElement = document.getElementById('exercises-completed');
    if (exercisesElement) {
        exercisesElement.textContent = todayExercises.length;
    }

    // Update sleep
    const lastSleep = fitnessData.sleep[fitnessData.sleep.length - 1];
    const sleepElement = document.getElementById('sleep-hours');
    if (sleepElement && lastSleep) {
        sleepElement.textContent = lastSleep.duration || '7.5';
    }
}

// Initialize charts (placeholder)
function initializeCharts() {
    // In a real application, you would use a charting library like Chart.js
    // For now, we'll just add some basic interactivity to chart placeholders
    
    const chartPlaceholders = document.querySelectorAll('.chart-placeholder');
    chartPlaceholders.forEach(placeholder => {
        placeholder.addEventListener('click', function() {
            this.style.background = 'var(--primary-color)';
            this.style.color = 'white';
            this.innerHTML = '<i class="fas fa-chart-line" style="font-size: 3rem; margin-right: 1rem;"></i>Chart would load here';
            
            setTimeout(() => {
                this.style.background = 'var(--light-color)';
                this.style.color = 'var(--text-secondary)';
                this.innerHTML = '<i class="fas fa-chart-line" style="font-size: 3rem; margin-right: 1rem;"></i>Weekly Progress Chart';
            }, 2000);
        });
    });
}

// Show success message
function showSuccessMessage(message) {
    // Create a temporary success message
    const successDiv = document.createElement('div');
    successDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--success-color);
        color: white;
        padding: 1rem 2rem;
        border-radius: 0.5rem;
        box-shadow: var(--shadow-lg);
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
    `;
    successDiv.textContent = message;
    
    document.body.appendChild(successDiv);
    
    setTimeout(() => {
        successDiv.remove();
    }, 3000);
}

// Utility functions
function getYesterday() {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return yesterday.toISOString().split('T')[0];
}

function getTwoDaysAgo() {
    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
    return twoDaysAgo.toISOString().split('T')[0];
}

// Progress calculation functions
function calculateProgress(current, target) {
    if (target === 0) return 0;
    return Math.min((current / target) * 100, 100);
}

function getProgressStatus(percentage) {
    if (percentage >= 100) return 'exceeded';
    if (percentage >= 80) return 'on-track';
    return 'behind';
}

// Data persistence (localStorage)
function saveData() {
    localStorage.setItem('fitnessData', JSON.stringify(fitnessData));
}

function loadData() {
    const saved = localStorage.getItem('fitnessData');
    if (saved) {
        fitnessData = JSON.parse(saved);
    }
}

// Auto-save data
setInterval(saveData, 30000); // Save every 30 seconds

// Load saved data on startup
loadData();

// Form validation
function validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.style.borderColor = 'var(--danger-color)';
            isValid = false;
        } else {
            field.style.borderColor = 'var(--border-color)';
        }
    });
    
    return isValid;
}

// Add form validation to all forms
document.addEventListener('DOMContentLoaded', function() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            if (!validateForm(this)) {
                e.preventDefault();
                showErrorMessage('Please fill in all required fields.');
            }
        });
    });
});

// Show error message
function showErrorMessage(message) {
    const errorDiv = document.createElement('div');
    errorDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--danger-color);
        color: white;
        padding: 1rem 2rem;
        border-radius: 0.5rem;
        box-shadow: var(--shadow-lg);
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
    `;
    errorDiv.textContent = message;
    
    document.body.appendChild(errorDiv);
    
    setTimeout(() => {
        errorDiv.remove();
    }, 3000);
}

// Responsive features
function handleResize() {
    const nav = document.querySelector('nav');
    if (window.innerWidth <= 768) {
        nav.classList.add('mobile-nav');
    } else {
        nav.classList.remove('mobile-nav');
    }
}

window.addEventListener('resize', handleResize);
handleResize(); // Initial call

// Authentication Functions
function checkAuthentication() {
    const userData = localStorage.getItem('fitnessUser');
    const authToken = localStorage.getItem('fitnessAuthToken');
    
    if (!userData || !authToken) {
        // Not authenticated, redirect to login
        if (window.location.pathname !== '/login.html' && !window.location.pathname.includes('login.html')) {
            window.location.href = 'login.html';
            return false;
        }
    } else {
        // User is authenticated
        try {
            currentUser = JSON.parse(userData);
            
            // Check if token is still valid (basic check)
            const loginTime = new Date(currentUser.loginTime);
            const now = new Date();
            const hoursSinceLogin = (now - loginTime) / (1000 * 60 * 60);
            
            if (hoursSinceLogin > 24) {
                // Token expired, clear and redirect to login
                logout();
                return false;
            }
            
            // Update user display
            updateUserDisplay();
            return true;
        } catch (error) {
            // Invalid user data, clear and redirect
            logout();
            return false;
        }
    }
    return false;
}

function updateUserDisplay() {
    if (!currentUser) return;
    
    // Update user info in navigation
    const userMenu = document.getElementById('user-menu');
    if (userMenu) {
        userMenu.innerHTML = `
            <div class="user-info">
                <img src="${currentUser.picture}" alt="${currentUser.name}" class="user-avatar">
                <span class="user-name">${currentUser.name}</span>
                <i class="fas fa-chevron-down"></i>
            </div>
            <div class="user-dropdown">
                <a href="#" onclick="logout()">
                    <i class="fas fa-sign-out-alt"></i> Sign Out
                </a>
            </div>
        `;
    }
    
    // Update welcome message on dashboard
    const welcomeMessage = document.querySelector('.welcome-message');
    if (welcomeMessage) {
        welcomeMessage.textContent = `Welcome back, ${currentUser.name.split(' ')[0]}!`;
    }
}

function logout() {
    // Clear authentication data
    localStorage.removeItem('fitnessUser');
    localStorage.removeItem('fitnessAuthToken');
    currentUser = null;
    
    // Redirect to login page
    window.location.href = 'login.html';
}

// Add user menu to navigation
function addUserMenuToNavigation() {
    const nav = document.querySelector('.nav-links');
    if (nav && currentUser) {
        const userMenuItem = document.createElement('li');
        userMenuItem.innerHTML = `
            <div class="user-menu" id="user-menu">
                <div class="user-info">
                    <img src="${currentUser.picture}" alt="${currentUser.name}" class="user-avatar">
                    <span class="user-name">${currentUser.name}</span>
                    <i class="fas fa-chevron-down"></i>
                </div>
                <div class="user-dropdown">
                    <a href="#" onclick="logout()">
                        <i class="fas fa-sign-out-alt"></i> Sign Out
                    </a>
                </div>
            </div>
        `;
        nav.appendChild(userMenuItem);
    }
}

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        calculateProgress,
        getProgressStatus,
        calculateSleepDuration,
        checkAuthentication,
        logout
    };
}
