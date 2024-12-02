import { getingUaerInformation, checkingLoginStatus } from "./auth/utils.js"
const $ = document
const hamburger = $.querySelector(".hamburger")
const contenerMenuMobail = $.querySelector(".contener-menu-mobail")
const menuLink = $.querySelectorAll(".list-menu-item__link")

hamburger.addEventListener("click", function () {
    hamburger.classList.toggle("active")
    contenerMenuMobail.classList.toggle("contener-menu-mobail--active")
})

menuLink.forEach(function (menuLink) {
    menuLink.addEventListener("click", function () {
        $.querySelector(".list-menu-item__link--active").classList.remove("list-menu-item__link--active")
        menuLink.classList.add("list-menu-item__link--active")
    })
})
const dontLogin = $.querySelector(".dont-login")
const loginSuccessfully = $.querySelector(".login-successfully")
const navbarSuccessfullyRegisterText = $.querySelector(".navbar-successfully-Register-text")
const navbarDontRegisterText = $.querySelector(".navbar-dont-Register-text")


const handleUserAuthentication = () => {
    const isLogin = checkingLoginStatus()
    if (isLogin) {
        getingUaerInformation().then((data) => {
            const email = data.payload.email
            const username = email.split('@')[0]

            loginSuccessfully.style.display = "flex"
            dontLogin.style.display = "none"
            navbarSuccessfullyRegisterText.innerHTML = username
        })
    } else {
        navbarDontRegisterText.innerHTML = `sign In/sign Up`
        dontLogin.style.display = "flex"
        loginSuccessfully.style.display = "none"
    }

}

loginSuccessfully.addEventListener("click", () => {
    Swal.fire({
        title: "Exit Account?",
        text: "Click here to securely log out of your account.",
        icon: "warning",
        customClass: { popup: 'custom-swal2' },
        showCancelButton: true,
        confirmButtonColor: "#B88E2F",
        cancelButtonColor: "red",
        confirmButtonText: "Log Out"
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.removeItem('Access-Token');
            handleUserAuthentication()

            Swal.fire({
                title: "Logged Out Successfully",
                text: "You have been logged out. Thank you for visiting. Have a great day!",
                icon: "success",
                customClass: { popup: 'custom-swal2' },
                confirmButtonText: 'ok',
                confirmButtonColor: "#B88E2F",
            });
        }
    });
})

window.addEventListener("load", () => {
    handleUserAuthentication()
})