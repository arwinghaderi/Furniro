import { validation } from "./auth/utils.js";
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

// const validatePassword = (password) => {
//     return passwordRegex.test(password);
// }

const validateConfrimPassword = (password, confirmPassword) => {
    return password === confirmPassword
}

const checkFormValidity = () => {
    const passwordValue = inputPassword.value.trim();
    const confirmPasswordValue = inputConfrimPassword.value.trim();
    const isPasswordValid = passwordRegex.test(passwordValue);

    const isConfirmPasswordValid = passwordRegex.test(confirmPasswordValue) && validateConfrimPassword(passwordValue, confirmPasswordValue); saveBtn.disabled = !(isPasswordValid && isConfirmPasswordValid);
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

    }
})