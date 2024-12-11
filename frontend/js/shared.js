import { getingUaerInformation, checkingLoginStatus } from "./auth/utils.js"
import { showSwal } from "./func/utils.js"
import { getToken } from "./func/utils.js"
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
const navbarSuccessfullyRegisterLoading = $.querySelector(".navbar-successfully-Register-Loading")
const navbarDontRegisterText = $.querySelector(".navbar-dont-Register-text")


const fetchLogoutUser = async () => {
    const token = getToken()
    console.log(token);
    if (!token) {
        return false
    }

    const response = await fetch("https://furniro-6x7f.onrender.com/auth/log-out", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
        },
        credentials: "include"
    })
    const userData = await response.json()
    console.log(userData);
    return userData
}

const handleUserAuthentication = async () => {
    const isLogin = checkingLoginStatus();
    navbarSuccessfullyRegisterLoading.style.display = "flex";

    if (isLogin) {
        const userData = await getingUaerInformation();

        const fullName = userData.data.user.fullname;
        loginSuccessfully.style.display = "flex";
        dontLogin.style.display = "none";
        navbarSuccessfullyRegisterText.innerHTML = fullName;

    } else {
        navbarDontRegisterText.innerHTML = `Sign In/Sign Up`;
        dontLogin.style.display = "flex";
        loginSuccessfully.style.display = "none";
    }

    navbarSuccessfullyRegisterLoading.style.display = "none";
}

loginSuccessfully.addEventListener("click", async () => {


    Swal.fire({
        title: "Exit Account?",
        text: "Click here to securely log out of your account.",
        icon: "warning",
        customClass: { popup: 'custom-swal2' },
        showCancelButton: true,
        confirmButtonColor: "#B88E2F",
        cancelButtonColor: "red",
        confirmButtonText: "Log Out"
    }).then(async (result) => {
        if (result.isConfirmed) {
            const userData = await fetchLogoutUser();
            console.log(userData);
            // localStorage.removeItem('Access-Token');
            //   handleUserAuthentication()
            // Swal.fire({
            //     title: "Logged Out Successfully",
            //     text: "You have been logged out. Thank you for visiting. Have a great day!",
            //     icon: "success",
            //     customClass: { popup: 'custom-swal2' },
            //     confirmButtonText: 'ok',
            //     confirmButtonColor: "#B88E2F",
            // });
        }
    });
})

window.addEventListener("load", () => {
    handleUserAuthentication()
})