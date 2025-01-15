import { validation } from "./auth/utils.js";
import { getFromLocalStorage, showSwal } from "./func/utils.js";
const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const saveBtn = document.querySelector(".btn-submite")
const inputPassword = document.querySelector(".signUp-password")
const inputConfrimPassword = document.querySelector(".signUp-confirm")

const inputs = [

    {
        element: document.querySelector(".signUp-password"),
        regex: passwordRegex,
        validationEntries: {
            valid: document.querySelector(".password-validation-Valid"),
            invalid: document.querySelector(".password-validation-invalid")
        }
    },
    {
        element: document.querySelector(".signUp-confirm"),
        regex: passwordRegex,
        validationEntries: {
            valid: document.querySelector(".password-confrim-Valid"),
            invalid: document.querySelector(".password-confrim-invalid ")
        }
    },

]

const validateConfrimPassword = (password, confirmPassword) => {
    return password === confirmPassword
}

const checkFormValidity = () => {
    const passwordValue = inputPassword.value.trim();
    const confirmPasswordValue = inputConfrimPassword.value.trim();
    const isPasswordValid = passwordRegex.test(passwordValue);

    const isConfirmPasswordValid = passwordRegex.test(confirmPasswordValue) && validateConfrimPassword(passwordValue, confirmPasswordValue); saveBtn.disabled = !(isPasswordValid && isConfirmPasswordValid);
    if (!saveBtn.disabled) {
        saveBtn.innerHTML = "Save"
    } else {
        saveBtn.innerHTML = "⛔Forbidden..."
    }
};

inputs.forEach(input => {
    input.element.addEventListener('input', (event) => {
        const value = event.target.value.trim();
        validation(value, input.regex, input.validationEntries);
        checkFormValidity()
    });
});

saveBtn.addEventListener("click", () => {
    if (!saveBtn.disabled) {
        fetchResetPassword()
    }
})

const fetchResetPassword = async () => {
    const inputPasswordValue = inputPassword.value.trim()
    const inputConfrimPasswordValue = inputConfrimPassword.value.trim()
    const userToken = getFromLocalStorage("user-Token")
    saveBtn.innerHTML = "Loading..."

    if (!userToken) {
        showSwal(`Your session has expired or the verification token is missing. Please verify your email again to proceed.`, "error", "Correction of information", "../Pages/forgotStop1.html")
        localStorage.removeItem('user-Token');
        return false
    }

    const userInformation = {
        password: inputPasswordValue,
        confirmPassword: inputConfrimPasswordValue
    }

    try {
        const response = await fetch(`https://furniro-6x7f.onrender.com/auth/reset-password/${userToken}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'authorization': `Bearer ${userToken}`
            },
            body: JSON.stringify(userInformation)
        })
        const resetPasswordData = await response.json()

        if (!response.ok) {
            let message = resetPasswordData.error.message || "An unexpected error occurred."
            throw new Error(message)
        }
        
        showSwal(`Password reset successfully!`, "success", "Go to Login", "../Pages/auth.html");
        localStorage.removeItem('user-Token');
    } catch (error) {
        showSwal(`${error.message}`, "error", "Go verify code", "../Pages/forgotStop1.html")
    } finally {
        saveBtn.innerHTML = "⛔Forbidden..."
    }
}