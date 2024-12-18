import { showSwal } from "./func/utils.js";
import { saveToLocalStorage } from "./func/utils.js";

const confirmEmailBtn = document.querySelector(".Confirm-email-button")
const verifyCod = document.querySelector(".btn-submite")
const inputEmail = document.querySelector(".input-email")
const inputCode = document.querySelector(".input-code")
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const codeRegex = /^\d{5,6}$/
const timerElement = document.getElementById('timer');
let inputEmailValue, inputCodeValue
let isCodeSent = false
confirmEmailBtn.addEventListener("click", (event) => {
    event.preventDefault()
    inputEmailValue = inputEmail.value
    const isEmailValid = validateEmail(inputEmailValue)

    if (isEmailValid) {
        fetchGetCode(inputEmailValue)
        return false
    }
    showSwal("Email not valid...", "error", ' Correction of information', "../Pages/forgotStop1.html")
})

const validateEmail = (email) => {
    return emailRegex.test(email);
}
const validateCode = (code) => {
    return codeRegex.test(code);
}

const fetchGetCode = async (inputEmailValue) => {
    const userInformation = {
        email: inputEmailValue
    }
    confirmEmailBtn.innerHTML = "Loading..."

    try {
        const response = await fetch(`https://furniro-6x7f.onrender.com/auth/getCode`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userInformation)
        })

        const data = await response.json()

        if (!response.ok) {
            const message = data.error.message || "An unexpected error occurred.";
            throw new Error(message);
        }
        confirmEmailBtn.disabled = true;
        confirmEmailBtn.innerHTML = "⛔Forbidden";
        timerElement.style.display = 'inline';
        startTimer(60);
    } catch (error) {
        showSwal(`${error.message}`, "error", ' Correction of information', "../Pages/forgotStop1.html")
    } finally {
        if (!confirmEmailBtn.disabled) { confirmEmailBtn.innerHTML = "Send"; }
    }
}

let timerInterval;

const startTimer = (duration) => {
    let timeRemaining = duration;
    const countdown = () => {
        if (timeRemaining > 0) {
            timeRemaining--;
            timerElement.textContent = `Retry in ${Math.floor(timeRemaining / 60)}:${String(timeRemaining % 60).padStart(2, '0')}`;
            isCodeSent = true;
        } else {
            clearInterval(timerInterval);
            timerElement.style.display = 'none';
            verifyCod.disabled = true
            confirmEmailBtn.innerHTML = "Send";
            verifyCod.innerHTML = "⛔Forbidden..."
            confirmEmailBtn.disabled = false;
            isCodeSent = false
        }
    };
    countdown();
    timerInterval = setInterval(countdown, 1000);
};

inputCode.addEventListener("input", (event) => {
    if (isCodeSent) {
        inputCodeValue = event.target.value
        const isEmailValid = validateCode(inputCodeValue)

        if (isEmailValid) {
            verifyCod.disabled = false
            verifyCod.innerHTML = "Verify"
        } else {
            verifyCod.disabled = true
            verifyCod.innerHTML = "⛔Forbidden..."
        }
    }
})

const fetchVerifyCode = async () => {
    inputCodeValue = inputCode.value
    inputEmailValue = inputEmail.value
    verifyCod.innerHTML = "Loading..."

    const userInformation = {
        email: inputEmailValue,
        code: inputCodeValue
    }

    try {
        const response = await fetch("https://furniro-6x7f.onrender.com/auth/verifyCode", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userInformation)
        })
        const VerifyCodeData = await response.json()

        if (!response.ok) {
            let message = VerifyCodeData.error.message || "An unexpected error occurred."
            throw new Error(message)
        }

        saveToLocalStorage("user-Token", VerifyCodeData.data.userToken)
        showSwal(`You can now set your new password.`, "success", "Set New Password", "../Pages/forgotStop2.html")

    } catch (error) {
        showSwal(`${error.message}`, "error", ' Correction of information', "../Pages/forgotStop1.html")
    }
}

verifyCod.addEventListener("click", () => {
    fetchVerifyCode()
})