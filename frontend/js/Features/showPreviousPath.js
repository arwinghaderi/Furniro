const previousPathElement = document.querySelector(".home-section-container-description__befor");

const displayPaths = () => {
    const referrer = document.referrer;
    const currentPath = window.location.pathname;
    previousPathElement.innerHTML = "Loading...";
    let extractedPart;

    if (referrer) {
        extractedPart = referrer.split('/').pop().split('.')[0];
        extractedPart = extractedPart === "index" ? "home" : extractedPart;

        previousPathElement.textContent = referrer.includes(currentPath) ? "Same path" : extractedPart;
    } else {
        previousPathElement.textContent = "Direct Entry";
    }
};

document.addEventListener("DOMContentLoaded", () => {
    displayPaths();
});


