
import { showSwal, storeAccessTokenWithExpiry, setSecureCookie } from "../func/utils.js"
import { validation } from "./utils.js"

const btnsAuth = document.querySelectorAll(".btn-Auth")
const formSignIn = document.querySelector(".form-signIn")
const signInTitle = document.querySelector(".signIn-title")
const signupNow = document.querySelector(".signup-now")
const btnSignUp = document.querySelector(".btn-signUp ")

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

signupNow.addEventListener("click", () => {
    formSignIn.style.marginLeft = `${-100}%`
    signInTitle.style.marginLeft = `${-50}%`
    document.querySelector(".btn-signIn--active").classList.remove("btn-signIn--active")
    btnSignUp.classList.add("btn-signIn--active")
})

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const fullNameRegex = /^[A-Za-z._\-\s]+$/;
const btnSignIn = document.querySelector(".btn-signIn-register")
const loginEmailInput = document.querySelector(".signIn-Email")
const loginPasswordInput = document.querySelector(".signIn-password")
const signUpPassword = document.querySelector(".signUp-password")
const signUpConfirmPassword = document.querySelector(".signUp-confirm")
const signUpEmail = document.querySelector(".signUp-Email")
const signUpFullName = document.querySelector(".signUp-fullName")
const btnRegister = document.querySelector(".btn-Register")

const inputs = [
    {
        element: document.querySelector(".signIn-Email"),
        regex: emailRegex,
        validationEntries: {
            valid: document.querySelector(".Email-signin-Valid"),
            invalid: document.querySelector(".Email-signin-invalid ")
        }
    },
    {
        element: document.querySelector(".signIn-password"),
        regex: passwordRegex,
        validationEntries: {
            valid: document.querySelector(".password-validation-Valid"),
            invalid: document.querySelector('.password-validation-invalid')
        }
    },
    {
        element: document.querySelector(".signUp-Email"),
        regex: emailRegex,
        validationEntries: {
            valid: document.querySelector(".Email-signUp-Valid"),
            invalid: document.querySelector(".Email-signUp-InValid")
        }
    },
    {
        element: document.querySelector(".signUp-confirm"),
        regex: passwordRegex,
        validationEntries: {
            valid: document.querySelector(".password-confrim-Valid"),
            invalid: document.querySelector(".password-confrim-invalid")
        }
    },
    {
        element: document.querySelector(".signUp-fullName"),
        regex: fullNameRegex,
        validationEntries: {
            valid: document.querySelector(".fullName-signUp-Valid"),
            invalid: document.querySelector(".fullName-signUp-InValid ")
        }
    },
]

inputs.forEach(input => {
    input.element.addEventListener('input', (event) => {
        const value = event.target.value.trim();
        validation(value, input.regex, input.validationEntries);
        checkFormValidityLogin()
        checkFormValidityRegister()
    });
});

const passwordCheckerContaine = document.querySelector('.password-checker-container');
const checkPassword = (PasswordValue) => {
    const progressBar = document.getElementById('passwordProgressBar');

    const criteria = [
        { class: '.length', regex: /.{8,}/ },
        { class: '.uppercase', regex: /[A-Z]/ },
        { class: '.lowercase', regex: /[a-z]/ },
        { class: '.number', regex: /\d/ },
        { class: '.special', regex: /[@$!%*?&]/ }
    ];

    let validCount = 0;

    criteria.forEach(criterion => {
        const element = document.querySelector(criterion.class);

        if (criterion.regex.test(PasswordValue)) {
            element.classList.add('valid');
            validCount++;
        } else {
            element.classList.remove('valid');
        }
    });

    const progressPercentage = (validCount / criteria.length) * 100;
    progressBar.dataset.target = Number(progressPercentage)
    updateProgress(progressBar)
}

signUpPassword.addEventListener("input", (event) => {
    checkPassword(event.target.value)
})

signUpPassword.addEventListener("blur", () => {
    passwordCheckerContaine.classList.remove("password-checker-container--active")
})

signUpPassword.addEventListener("focus", () => {
    passwordCheckerContaine.classList.add("password-checker-container--active")
})

const updateProgress = (progressBar) => {
    const targetWidth = Number(progressBar.dataset.target);
    const currentWidth = Number(progressBar.style.width.slice(0, -1));
    const step = 1;

    if (currentWidth < targetWidth) {
        progressBar.style.width = `${(currentWidth + step)}%`;
        progressBar.textContent = `${Math.round(currentWidth + step)}%`;

        setTimeout(() => updateProgress(progressBar), 75);
    } else {
        progressBar.style.width = `${Math.round(targetWidth)}%`;
        progressBar.textContent = `${targetWidth.toFixed(0)}%`;
        progressBar.style.backgroundColor = targetWidth === 100 ? 'green' : 'red';
    }
}

const clearLoginInputs = (inputs) => {
    inputs.forEach(input => {
        if (input.element.classList.contains("signIn-Email") || input.element.classList.contains("signIn-password")) {
            input.element.value = "";
            input.validationEntries.valid.style.display = "none";
            input.validationEntries.invalid.style.display = "none";
        }
    });
};

const clearSignUpInputs = (inputs) => {
    inputs.forEach(input => {
        const isSignUpInput = input.element.classList.contains("signUp-Email") ||
            input.element.classList.contains("signUp-confirm") ||
            input.element.classList.contains("signUp-fullName");

        if (isSignUpInput) {
            input.element.value = "";
            input.validationEntries.valid.style.display = "none";
            input.validationEntries.invalid.style.display = "none";
        }
    });
};

const getingUserLoginInformation = (loginEmailInput, loginPasswordInput) => {
    const userInformation = {
        email: loginEmailInput.value.trim(),
        password: loginPasswordInput.value.trim()
    }

    let isEmailValid = validateEmail(userInformation.email)
    let isPasswordValid = validatePassword(userInformation.password)

    return { isEmailValid, isPasswordValid }
}

const getingUserRegistrationInformation = (signUpEmail, signUpPassword, signUpConfirm) => {
    const userInformation = {
        email: signUpEmail.value.trim(),
        password: signUpPassword.value.trim(),
        confirmPassword: signUpConfirm.value.trim()
    }

    let isEmailValid = validateEmail(userInformation.email)
    let isPasswordValid = validatePassword(userInformation.password)
    let isConfirmPassword = validateConfrimPassword(userInformation.password, userInformation.confirmPassword)

    return { isEmailValid, isPasswordValid, isConfirmPassword }
}

const validateEmail = (email) => {
    return emailRegex.test(email);
}

const validatePassword = (password) => {
    return passwordRegex.test(password);
}

const validateConfrimPassword = (password, confirmPassword) => {
    return password === confirmPassword
}

const checkFormValidityLogin = () => {
    const { isEmailValid, isPasswordValid } = getingUserLoginInformation(loginEmailInput, loginPasswordInput)
    if (isEmailValid && isPasswordValid) {
        btnSignIn.disabled = false
        btnSignIn.innerHTML = "sign in"
    } else {
        btnSignIn.disabled = true
        btnSignIn.innerHTML = "🚫Forbidden"
    }
}

const checkFormValidityRegister = () => {
    const { isEmailValid, isPasswordValid, isConfirmPassword } = getingUserRegistrationInformation(signUpEmail, signUpPassword, signUpConfirmPassword)

    if (isEmailValid && isPasswordValid && isConfirmPassword) {
        btnRegister.disabled = false
        btnRegister.innerHTML = "Sign up"
    } else {
        btnRegister.disabled = true
        btnRegister.innerHTML = " 🚫Forbidden"
    }
}

btnSignIn.addEventListener("click", async (event) => {
    event.preventDefault()
    fetchAndSendLoginData()
})

const fetchAndSendLoginData = async () => {
    btnSignIn.innerHTML = `<div class="loader lodaer-sign-in"></div>`

    const userInformation = {
        email: loginEmailInput.value.trim(),
        password: loginPasswordInput.value.trim()
    }

    try {
        let response = await fetch("https://furniro-6x7f.onrender.com/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userInformation),
        })

        const loginData = await response.json();

        if (!response.ok) {
            const message = loginData.error.message || "An unexpected error occurred.";
            throw new Error(message);
        }
        const fullName = loginData.data.user.fullname

        setSecureCookie("Refresh-Token", loginData.data.refreshToken, 7)
        storeAccessTokenWithExpiry(loginData.data.accessToken, 14)
        showSwal(`Your login was successful. Welcome ${fullName} .`, "success", "Go to HomePage", window.history.back ? window.history.back() : "../../index.html")
    } catch (error) {
        showSwal(`${error.message}`, "error", ' Correction of information', "#")
    } finally {
        btnSignIn.disabled = true
        btnSignIn.innerHTML = '🚫Forbidden';
        clearLoginInputs(inputs)
    }
};

btnRegister.addEventListener("click", async (event) => {
    event.preventDefault()
    fetchAndSendRegisterData()
})

const fetchAndSendRegisterData = async () => {
    btnRegister.innerHTML = `<div class="loader lodaer-sign-up"></div>`

    let userSignUpInformation = {
        fullname: signUpFullName.value,
        email: signUpEmail.value,
        password: signUpPassword.value,
        confirmPassword: signUpConfirmPassword.value
    }

    try {

        let response = await fetch("https://furniro-6x7f.onrender.com/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userSignUpInformation)
        })

        const registerData = await response.json()
        if (!response.ok) {
            const message = registerData.error.message || "An unexpected error occurred.";
            throw new Error(message);
        }

        setSecureCookie("Refresh-Token", registerData.data.refreshToken, 7)
        storeAccessTokenWithExpiry(registerData.data.accessToken, 14)
        const fullName = registerData.data.user.fullname

        showSwal(`Your registration has been successfully completed. Welcome. ${fullName} .`, "success", "Go to HomePage", window.history.back ? window.history.back() : "../../index.html")

    } catch (error) {
        showSwal(`${error.message}`, "error", "Correction of information", "#")
    } finally {
        btnRegister.innerHTML = "🚫Forbidden"
        btnRegister.disabled = true
        clearSignUpInputs(inputs)
    }
}

window.addEventListener("load", () => {
    checkFormValidityLogin()
})