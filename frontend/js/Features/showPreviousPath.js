const displayPaths = () => {
    const previousPathElement = document.querySelector(".home-section-container-description__befor");
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
            loader.style.display = "none"
            let contentPath = referrer.includes(currentPath) ? "Same path" : extractedPart;
            previousPathElement.innerHTML = contentPath ? contentPath : "home"
            previousPathElement.setAttribute("href", referrer);
        }, 1500)
    } else {
        setTimeout(() => {
            loader.style.display = "none"
            previousPathElement.innerHTML = "Direct Entry";
        }, 1500)
    }
};

document.addEventListener("DOMContentLoaded", () => {
    displayPaths();
});
