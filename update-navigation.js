// Simple script to update navigation links for GitHub Pages deployment
// Run this in the browser console on your GitHub Pages site

function updateNavigationLinks() {
    // Update all navigation links to use the optimized files
    const links = document.querySelectorAll('a[href*=".html"]');
    
    links.forEach(link => {
        const href = link.getAttribute('href');
        
        // Update specific links to use GitHub optimized versions
        if (href === 'index.html') {
            link.setAttribute('href', 'index-github.html');
        } else if (href === 'login.html') {
            link.setAttribute('href', 'login-github.html');
        }
    });
    
    console.log('Navigation links updated for GitHub Pages');
}

// Run the update
updateNavigationLinks();
