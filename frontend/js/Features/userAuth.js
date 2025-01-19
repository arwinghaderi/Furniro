import { checkingLoginStatus, getingUaerInformation } from "../auth/utils.js"

const $ = document
const dontLogin = $.querySelector(".dont-login")
const loginSuccessfully = $.querySelector(".login-successfully")
const navbarSuccessfullyRegisterText = $.querySelector(".navbar-successfully-Register-text")
const navbarSuccessfullyRegisterLoading = $.querySelector(".navbar-successfully-Register-Loading")
const navbarDontRegisterText = $.querySelector(".navbar-dont-Register-text")

const executeTokenCheck = async () => {
    const token = await hasAccessTokenExpired();

    if (token) {
        setSecureCookie("Refresh-Token", token.RefreshToken, 7);
        storeAccessTokenWithExpiry(token.AccessToken, 14);
    } else {
        redirectToLogin();
    }

    setTimeout(executeTokenCheck, 14 * 60 * 1000);
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
        setTimeout(executeTokenCheck, 14 * 60 * 1000);
    } else {
        navbarDontRegisterText.innerHTML = `Sign In/Sign Up`;
        dontLogin.style.display = "flex";
        loginSuccessfully.style.display = "none";
    }

    navbarSuccessfullyRegisterLoading.style.display = "none";
}

export default handleUserAuthentication