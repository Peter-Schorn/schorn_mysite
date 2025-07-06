// @ts-nocheck (disables TypeScript type-checking for this file)

"use strict";

/*
   New Perspectives on HTML5 and CSS3, 7th Edition
   Assignment 9.2 - Working with JavScript

   Event Timer
   Author: Peter Schorn
   Date: 07/05/2025

*/

/* Execute the function to run and display the countdown clock */

showClock();
// setInterval() calls the showClock() function every second
// to update the countdown clock and current time display
setInterval(showClock, 1_000);

/* Function to create and run the countdown clock */

function showClock() {

    // store the current date and time
    const thisDay = new Date();
    // get a string representation of the current date and time
    // in the user's local time zone
    const localDate = thisDay.toLocaleDateString();
    const localTime = thisDay.toLocaleTimeString();

    // display the current date and time in the "currentTime" element
    document.getElementById("currentTime").innerHTML =
        `<span>${localDate}</span><span>${localTime}</span>`;

    // get the next July 4th date
    const j4Date = nextJuly4(thisDay);

    // set the time to 9 p.m.
    j4Date.setHours(21);

    // calculate the hours, minutes, and seconds left until the date
    const days = (j4Date - thisDay) / (1000 * 60 * 60 * 24);
    const hrs = (days - Math.floor(days)) * 24;
    const mins = (hrs - Math.floor(hrs)) * 60;
    const secs = (mins - Math.floor(mins)) * 60;

    // display the time left in the countdown clock
    document.getElementById("dLeft").textContent = Math.floor(days);
    document.getElementById("hLeft").textContent = Math.floor(hrs);
    document.getElementById("mLeft").textContent = Math.floor(mins);
    document.getElementById("sLeft").textContent = Math.floor(secs);



}

function nextJuly4(currentDate) {
    const cYear = currentDate.getFullYear();
    const jDate = new Date("July 4, 2018");
    jDate.setFullYear(cYear);
    if (jDate - currentDate < 0) {
        jDate.setFullYear(cYear + 1);
    };
    return jDate;
}
