// @ts-nocheck
"use strict";

/*
   Final Project Portfolio Website
   JavaScript Functionality
   Author: Peter Schorn
   Date: August 3, 2025

   Module 9: JavaScript Implementation
   Filename: portfolio.js
*/

// Module 9: DOM Manipulation and Event Handling
document.addEventListener('DOMContentLoaded', function() {
    console.log('Portfolio JavaScript loaded successfully!');

    // Initialize all interactive features
    initSmoothScrolling();
    initFormHandling();
    initAnimations();
    initImageGallery();
    initNavigationHighlight();
    loadGitHubStats();

    console.log('All 9 course modules have been integrated into this portfolio.');
});

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Form handling and validation
function initFormHandling() {
    // Budget range slider display update
    const budgetSlider = document.getElementById('budget');
    const budgetDisplay = document.getElementById('budget-display');

    if (budgetSlider && budgetDisplay) {
        budgetSlider.addEventListener('input', function() {
            budgetDisplay.textContent = `$${parseInt(this.value).toLocaleString()}`;
        });
    }

    // Form validation and submission
    const contactForm = document.getElementById('contact-form-element');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Simple form validation
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            if (validateForm(name, email, message)) {
                showSuccessMessage();
                this.reset();
                if (budgetDisplay) budgetDisplay.textContent = '$10,000';
            } else {
                showErrorMessage('Please fill in all required fields.');
            }
        });
    }
}

// Form validation helper
function validateForm(name, email, message) {
    if (!name || !email || !message) {
        return false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showErrorMessage('Please enter a valid email address.');
        return false;
    }

    return true;
}

// Success message display
function showSuccessMessage() {
    const message = document.createElement('div');
    message.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #2ecc71;
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 1000;
        animation: slideInRight 0.5s ease-out;
    `;
    message.textContent = 'Thank you for your message! I\'ll get back to you soon.';

    document.body.appendChild(message);

    setTimeout(() => {
        if (message.parentNode) {
            message.parentNode.removeChild(message);
        }
    }, 5000);
}

// Error message display
function showErrorMessage(text) {
    const message = document.createElement('div');
    message.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #e74c3c;
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 1000;
        animation: slideInRight 0.5s ease-out;
    `;
    message.textContent = text;

    document.body.appendChild(message);

    setTimeout(() => {
        if (message.parentNode) {
            message.parentNode.removeChild(message);
        }
    }, 3000);
}

// Fade-in animations
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);

    // Observe all cards for animation
    document.querySelectorAll('.card').forEach(card => {
        observer.observe(card);
    });
}

// Interactive image gallery with modal
function initImageGallery() {
    document.querySelectorAll('.gallery img').forEach(img => {
        img.addEventListener('click', function() {
            openImageModal(this.src, this.alt);
        });
    });
}

// Image modal functionality
function openImageModal(src, alt) {
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        cursor: pointer;
        animation: fadeIn 0.3s ease-out;
    `;

    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        position: relative;
        max-width: 90%;
        max-height: 90%;
        cursor: default;
    `;

    const modalImg = document.createElement('img');
    modalImg.src = src;
    modalImg.alt = alt;
    modalImg.style.cssText = `
        width: 100%;
        height: 100%;
        object-fit: contain;
        border-radius: 10px;
    `;

    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '×';
    closeBtn.style.cssText = `
        position: absolute;
        top: -40px;
        right: 0;
        background: white;
        border: none;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        font-size: 24px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
    `;

    modalContent.appendChild(modalImg);
    modalContent.appendChild(closeBtn);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    // Close modal events
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal(modal);
        }
    });

    closeBtn.addEventListener('click', () => {
        closeModal(modal);
    });

    // ESC key to close
    const escHandler = (e) => {
        if (e.key === 'Escape') {
            closeModal(modal);
            document.removeEventListener('keydown', escHandler);
        }
    };
    document.addEventListener('keydown', escHandler);
}

// Close modal helper
function closeModal(modal) {
    modal.style.animation = 'fadeOut 0.3s ease-out';
    setTimeout(() => {
        if (modal.parentNode) {
            modal.parentNode.removeChild(modal);
        }
    }, 300);
}

// Dynamic navigation highlighting
function initNavigationHighlight() {
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('nav a[href^="#"]');

        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Module 9: API Integration - GitHub Stats
async function loadGitHubStats() {
    try {
        // Note: This is a demonstration of API integration
        // In a real implementation, you would use the actual GitHub API
        console.log('GitHub API integration demo - loading user stats...');

        // Simulated API response for demonstration
        const mockData = {
            public_repos: 25,
            followers: 150,
            following: 75,
            created_at: '2019-12-01T00:00:00Z'
        };

        // Update GitHub stats if elements exist
        const statsElement = document.getElementById('github-stats');
        if (statsElement) {
            statsElement.innerHTML = `
                <div class="github-stats">
                    <p><strong>Public Repositories:</strong> ${mockData.public_repos}</p>
                    <p><strong>Followers:</strong> ${mockData.followers}</p>
                    <p><strong>Following:</strong> ${mockData.following}</p>
                    <p><small>Stats updated: ${new Date().toLocaleDateString()}</small></p>
                </div>
            `;
        }

        console.log('GitHub stats loaded successfully (demo data)');

    } catch (error) {
        console.log('GitHub API integration demo completed');
    }
}

// Utility function for debouncing scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Theme toggle functionality (bonus feature)
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-theme');
            localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
        });

        // Load saved theme
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-theme');
        }
    }
}

// Performance monitoring
function logPerformanceMetrics() {
    if ('performance' in window) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                console.log('Page Load Performance:');
                console.log(`DOM Content Loaded: ${perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart}ms`);
                console.log(`Page Load Complete: ${perfData.loadEventEnd - perfData.loadEventStart}ms`);
            }, 0);
        });
    }
}

// Initialize performance monitoring
logPerformanceMetrics();

// Export functions for testing (if in module environment)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        validateForm,
        showSuccessMessage,
        showErrorMessage,
        openImageModal,
        closeModal
    };
}
