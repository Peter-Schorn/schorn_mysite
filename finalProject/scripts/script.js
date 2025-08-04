// @ts-nocheck
"use strict";

/*
   Final Project Portfolio Website
   JavaScript Functionality
   Author: Peter Schorn

   Module 9: JavaScript Implementation
   Filename: portfolio.js
*/

document.addEventListener('DOMContentLoaded', function () {

    console.log('script.js JavaScript loaded successfully!');

    // Initialize all interactive features
    initFormHandling();

});

// Form handling and validation
function initFormHandling() {
    // Budget range slider display update
    const budgetSlider = document.getElementById('budget');
    const budgetDisplay = document.getElementById('budget-display');

    if (budgetSlider && budgetDisplay) {
        budgetSlider.addEventListener('input', function () {
            budgetDisplay.textContent = `$${parseInt(this.value).toLocaleString()}`;
        });
    }

}
