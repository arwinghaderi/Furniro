import { showSwal } from "./func/utils.js";

const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#Email");
const subjectInput = document.querySelector("#Subject");
const messagInput = document.querySelector("#Message");
const submitBtn = document.querySelector(".submit-btn");


const fetchContactUs = async () => {
    const loader = document.querySelector(".lodaer-contact")

    const userContactInformation = {
        name: nameInput.value,
        email: emailInput.value,
        subject: subjectInput.value,
        message: messagInput.value
    };

    loader.style.display = "inline-grid"
    submitBtn.style.display = "none"

    try {
        const response = await fetch(`https://furniro-6x7f.onrender.com/concat/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userContactInformation)
        })

        const dataContact = await response.json()

        if (!response.ok) {
            const message = dataContact.error.message || "An unexpected error occurred.";
            throw new Error(message)
        }

        showSwal(`Your message was sent successfully`, "success", "ok", "#")
    } catch (error) {
        showSwal(`${error.message}`, "error", ' Correction of information', "#")
    } finally {
        nameInput.value = ""
        emailInput.value = ""
        subjectInput.value = ""
        messagInput.value = ""
        loader.style.display = "flex"
        submitBtn.disabled = true
        submitBtn.style.display = "flex"
        submitBtn.innerHTML = "🚫 Forbidden"
    }
}

submitBtn.addEventListener("click", (event) => {
    event.preventDefault();
    fetchContactUs();
});

const regexPatterns = {
    name: /^[a-zA-Z\s]{2,20}$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    subject: /^[a-zA-Z0-9\s]{5,20}$/,
    message: /^.{10,1000}$/
};

const validateInput = (input, regex) => regex.test(input.value);

const checkFormValidity = () => {
    const isFormValid = validateInput(nameInput, regexPatterns.name) &&
        validateInput(emailInput, regexPatterns.email) &&
        validateInput(subjectInput, regexPatterns.subject) &&
        validateInput(messagInput, regexPatterns.message);

    submitBtn.disabled = !isFormValid;

    submitBtn.disabled ? submitBtn.innerHTML = "🚫 Forbidden" : submitBtn.innerHTML = "Submit"

}

[nameInput, emailInput, subjectInput, messagInput].forEach(input => {
    input.addEventListener("input", checkFormValidity);
});

checkFormValidity()