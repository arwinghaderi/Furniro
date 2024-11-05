const passwordBoxs = document.querySelectorAll('.togglePassword-box');
passwordBoxs.forEach((passwordBox) => {
    passwordBox.addEventListener("click", () => {
        const input = passwordBox.previousElementSibling
        const icon = passwordBox.firstElementChild
        const type = input.getAttribute("type") === "password" ? "text" : "password"
        input.setAttribute('type', type);

        if (type === "password") {
            icon.classList.add('fa-eye')
            icon.classList.remove('fa-eye-slash')
        } else {
            icon.classList.add('fa-eye-slash')
            icon.classList.remove('fa-eye')
        }
    })
})