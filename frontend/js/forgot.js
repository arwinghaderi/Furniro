const confirmEmailBtn = document.querySelector(".Confirm-email-button")
// const resendBtn = document.querySelector(".resend")
const inputEmail = document.querySelector(".input-email")
const verifyCod = document.querySelector(".btn-submite")
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const timerElement = document.getElementById('timer');


confirmEmailBtn.addEventListener("click", (event) => {
    event.preventDefault()

    fetchGetCode()
})

const validateEmail = (email) => {
    return emailRegex.test(email);
}

const fetchGetCode = () => {
    const inputEmailValue = inputEmail.value
    const isEmailValid = validateEmail(inputEmailValue)

    console.log(isEmailValid);

    if (isEmailValid) {
        console.log(inputEmailValue);
        confirmEmailBtn.disabled = true;
        verifyCod.disabled = false
        timerElement.style.display = 'inline';

        startTimer(30);
    }

}

let timerInterval;

const startTimer = (duration) => {
    let timeRemaining = duration;
    const countdown = () => {
        if (timeRemaining > 0) {
            timeRemaining--;
            console.log(timeRemaining);
            console.log(Math.floor(timeRemaining / 60), String(timeRemaining % 60));
            timerElement.textContent = `Resend Email in ${Math.floor(timeRemaining / 60)}:${String(timeRemaining % 60).padStart(2, '0')}`;
        } else {
            clearInterval(timerInterval);
            timerElement.style.display = 'none';
            verifyCod.disabled = true
            confirmEmailBtn.disabled = false;
        }
    };
    countdown();
    timerInterval = setInterval(countdown, 1000);
};

