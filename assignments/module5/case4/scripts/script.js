const navIconContainer = /** @type {HTMLElement} */ (
    document.querySelector(".nav-icon-container")
);
const navList = /** @type {HTMLElement} */ (
    document.querySelector(".nav-icon-container+ul")
);

navIconContainer.addEventListener("click", (event) => {
    navList.style;
    const display = getComputedStyle(navList).display;
    console.log(
        `clicked nav-icon-container; navList display: ${display}`
    );
    if (display == "none") {
        navList.style.display = "block";
        console.log("navList.style.display set to block");
    }
    else {
        navList.style.display = "none";
        console.log("navList.style.display set to none");
    }
});
