const customSelected = document.querySelector(".custom-selected")
const customOptions = document.querySelector(".custom-options")
const arrow = document.querySelector(".arrow-down");
const optionsList = document.querySelectorAll('.option');

customSelected.addEventListener("click", () => {
    customOptions.classList.toggle("custom-options--active")
    arrow.classList.toggle("arrow-down--open")
})

optionsList.forEach((option) => {
    option.addEventListener('click', () => {
        customSelected.innerHTML = option.innerHTML;
        customOptions.classList.remove('custom-options--active');
        arrow.classList.remove("arrow-down--open")
    });
});