import { getToken, handleError } from "../func/utils.js";

const setDisplay = (element, display) => {
    element.style.display = display
}

export const validation = (value, regex, input) => {
    const isEmailValid = regex.test(value);

    if (!value) {
        setDisplay(input.valid, "none")
        setDisplay(input.invalid, "none")
    } else {
        setDisplay(input.valid, isEmailValid ? "flex" : "none")
        setDisplay(input.invalid, isEmailValid ? "none" : "flex")
    }
}

export const registerErrorMessages = {
    400: 'Bad Request. Please check your input and try again.',
    409: 'Email already exists. Please use a different email or login.',
    500: 'Server error. Please try again later.',
    default: { message: "An unexpected error occurred. Please try again later." }

};
const errorMessagesyUserInformation = {
    401: { message: "You have been logged out. Invalid or missing token. Please log in again." },
    403: { message: "Your session has expired. Please log in again." },
    404: { message: "The requested user could not be found. Please check your information and try again." },
    default: { message: "An unexpected error occurred. Please try again later." }
};
export const errorMessagesLogout = {
    400: 'Request failed: refreshToken is missing. Redirecting to login.',
    403: 'Unauthorized access. Redirecting to login.',
    404: 'User not found. Redirecting to login.',
    500: 'Internal server error. Please try again later.',
    default: 'An unexpected error occurred. Redirecting to login.'
};

export const checkingLoginStatus = () => {
    const userInfos = localStorage.getItem("Access-Token");
    return userInfos ? true : false;
};

export const getingUaerInformation = async () => {
    const token = getToken();
    if (!token) {
        return false;
    }

    try {
        const response = await fetch(`https://furniro-6x7f.onrender.com/auth/me`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw response
        }

        const data = await response.json();
        return data;

    } catch (error) {
        handleError(error, errorMessagesyUserInformation);
    }
};
