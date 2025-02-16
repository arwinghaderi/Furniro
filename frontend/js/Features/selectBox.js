const customSelected = document.querySelector(".custom-selected")
const selectContainer = document.querySelector(".select-container")
const customOptions = document.querySelector(".custom-options")
const arrow = document.querySelector(".arrow-down");
const optionsList = document.querySelectorAll('.option');

// selectContainer.addEventListener("click", () => {
//     customOptions.classList.remove('custom-options--hide');

//     customOptions.classList.toggle("custom-options--active")
//     arrow.classList.toggle("arrow-down--open")
// })

optionsList.forEach((option) => {
    option.addEventListener('click', () => {
        customSelected.innerHTML = option.innerHTML;

        document.querySelector(".option--active").classList.remove("option--active")
        option.classList.add('option--active');

        customOptions.classList.remove('custom-options--active');
        arrow.classList.remove("arrow-down--open")
    });
});