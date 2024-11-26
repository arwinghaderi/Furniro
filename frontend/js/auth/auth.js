
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

const signInEmail = document.querySelector(".signIn-Email")
const signInPassword = document.querySelector(".signIn-password")
const btnSignIn = document.querySelector(".btn-signIn-register")

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8}$/;


const gettingUserInformation = () => {
    const userInformation = {
        email: signInEmail.value.trim(),
        password: signInPassword.value.trim()
    }

    let isEmailValid = validateEmail(userInformation.email)
    let isPasswordValid = validatePassword(userInformation.password)

    return { isEmailValid, isPasswordValid }
}




const validateEmail = (email) => {
    console.log(email);
    return emailRegex.test(email);
}
const validatePassword = (password) => {
    console.log(password);
    return passwordRegex.test(password);
}


btnSignIn.addEventListener("click", (event) => {
    event.preventDefault()
    const { isEmailValid, isPasswordValid } = gettingUserInformation()


    console.log(isEmailValid, isPasswordValid);

    if (isEmailValid && isPasswordValid) {
        console.log("ثبت شد ");
    } else {
        console.log("ثبت نشد ");
    }
})

