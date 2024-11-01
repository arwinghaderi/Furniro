const btnsAuth = document.querySelectorAll(".btn-Auth")
const formSignIn = document.querySelector(".form-signIn")
const signInTitle = document.querySelector(".signIn-title")
const signupNow = document.querySelector(".signup-now")
const btnSignUp = document.querySelector(".btn-signUp ")
const passwordBoxs = document.querySelectorAll('.togglePassword-box');

btnsAuth.forEach((btn) => {
    btn.addEventListener("click", (event) => {
        let dataset = event.target.dataset.auth

        document.querySelector(".btn-signIn--active").classList.remove("btn-signIn--active")

        btn.classList.add("btn-signIn--active")
        togglingAuthPage(dataset)
    })
})

const togglingAuthPage = (authData) => {
    if (authData === "signIn") {
        formSignIn.style.marginLeft = "0"
        signInTitle.style.marginLeft = "0"
    } else {
        formSignIn.style.marginLeft = `${-100}%`
        signInTitle.style.marginLeft = `${-50}%`
    }
}

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

signupNow.addEventListener("click", () => {
    formSignIn.style.marginLeft = `${-100}%`
    signInTitle.style.marginLeft = `${-50}%`
    document.querySelector(".btn-signIn--active").classList.remove("btn-signIn--active")
    btnSignUp.classList.add("btn-signIn--active")
})