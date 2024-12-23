const previousPathElement = document.querySelector(".home-section-container-description__befor");

const displayPaths = () => {
    const referrer = document.referrer;
    const currentPath = window.location.pathname;
    previousPathElement.innerHTML = "Loading...";
    let extractedPart;

    if (referrer) {
        extractedPart = referrer.split('/').pop().split('.')[0];
        extractedPart = extractedPart === "index" ? "home" : extractedPart;

        setTimeout(() => {
            let contentPath = referrer.includes(currentPath) ? "Same path" : extractedPart;
            previousPathElement.textContent = contentPath ? contentPath : "home"
            previousPathElement.setAttribute("href", referrer);
        }, 1000)
    } else {
        previousPathElement.textContent = "Direct Entry";
    }
};

document.addEventListener("DOMContentLoaded", () => {
    displayPaths();
});
