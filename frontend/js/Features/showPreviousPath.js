const displayPaths = () => {
    const previousPathElement = document.querySelector(".home-section-container-description__befor");
    console.log(previousPathElement);
    const loader = document.querySelector(".loader-Paths")
    const referrer = document.referrer;
    const currentPath = window.location.pathname;
    let extractedPart;

    loader.style.color = "#000000"
    loader.style.display = "inline-grid"

    if (referrer) {
        extractedPart = referrer.split('/').pop().split('.')[0];
        extractedPart = extractedPart === "index" ? "home" : extractedPart;

        setTimeout(() => {
            let contentPath = referrer.includes(currentPath) ? "Same path" : extractedPart;
            loader.style.display = "none"
            previousPathElement.textContent = contentPath ? contentPath : "home"
            previousPathElement.setAttribute("href", referrer);
        }, 2500)
    } else {
        previousPathElement.textContent = "Direct Entry";
    }
};

document.addEventListener("DOMContentLoaded", () => {
    displayPaths();
});
