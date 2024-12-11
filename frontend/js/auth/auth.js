
import { showSwal, saveToLocalStorage, } from "../func/utils.js"
import { getDefaultErrorMessage, loginErrorMessages, registerErrorMessages, validation } from "./utils.js"

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
const btnSignIn = document.querySelector(".btn-signIn-register")
const loginEmailInput = document.querySelector(".signIn-Email")
const loginPasswordInput = document.querySelector(".signIn-password")
const signUpPassword = document.querySelector(".signUp-password")
const signUpConfirmPassword = document.querySelector(".signUp-confirm")
const signUpEmail = document.querySelector(".signUp-Email")
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
]

inputs.forEach(input => {
    input.element.addEventListener('input', (event) => {
        const value = event.target.value.trim();
        validation(value, input.regex, input.validationEntries);
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

btnSignIn.addEventListener("click", async (event) => {
    event.preventDefault()


    const { isEmailValid, isPasswordValid } = getingUserLoginInformation(loginEmailInput, loginPasswordInput)

    if (isEmailValid && isPasswordValid) {
        fetchAndSendLoginData()
    } else {
        showSwal("Your information is not correct.", "error", ' Correction of information', "../../Pages/auth.html")
    }
})

const fetchAndSendLoginData = async () => {
    const showMoreLoder = document.querySelector(".show-more__loder")
    showMoreLoder.style.display = 'flex';

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
        if (!response.ok) {
            const message = loginErrorMessages[response.status] || getDefaultErrorMessage();
            throw new Error(message);
        }
        const data = await response.json();
        const email = data.payload.email
        const username = email.split('@')[0]
        saveToLocalStorage("Access-Token", data.payload.access_token)
        showSwal(`Your login was successful. Welcome ${username} .`, "success", "Go to HomePage", "../../index.html")
    } catch (error) {
        showSwal(`${error.message}`, "error", ' Correction of information', "../../Pages/auth.html")
    } finally {
        showMoreLoder.style.display = 'none';
    }
};

btnRegister.addEventListener("click", async (event) => {
    event.preventDefault()
    const { isEmailValid, isPasswordValid, isConfirmPassword } = getingUserRegistrationInformation(signUpEmail, signUpPassword, signUpConfirmPassword)

    if (isEmailValid && isPasswordValid && isConfirmPassword) {
        fetchAndSendRegisterData()
    } else {
        showSwal("Your email or password or password confirmation is invalid.", "error", "Correction of information", "../../Pages/auth.html")
    }
})

const fetchAndSendRegisterData = async () => {
    const showMoreLoder = document.querySelector(".loder-sign-up")
    showMoreLoder.style.display = 'flex';
    let userSignUpInformation = {
        email: signUpEmail.value,
        password: signUpPassword.value
    }
    try {

        let response = await fetch("http://localhost:3000/user/api/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userSignUpInformation)
        })

        if (!response.ok) {
            const message = registerErrorMessages[response.status] || getDefaultErrorMessage()
            throw new Error(message)
        }

        const data = await response.json()
        showSwal("Registration was successful. Please enter your information in the login section.", "success", "Login", "../../Pages/auth.html")

    } catch (error) {
        showSwal(`${error.message}`, "error", "Correction of information", "../../Pages/auth.html")
    } finally {
        showMoreLoder.style.display = 'none';
    }
}