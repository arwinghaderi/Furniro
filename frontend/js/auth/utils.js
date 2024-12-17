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

const errorMessagesyUserInformation = {
    401: "You have been logged out. Invalid or missing token. Please log in again.",
    403: "Your session has expired. Please log in again.",
    404: "The requested user could not be found. Please check your information and try again.",
    default: "An unexpected error occurred."
}

export const errorMessagesLogout = {
    400: 'Request failed: refreshToken is missing. Redirecting to login.',
    403: 'Unauthorized access. Redirecting to login.',
    404: 'User not found. Redirecting to login.',
    500: 'Internal server error. Please try again later.',
    default: 'An unexpected error occurred.'
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
