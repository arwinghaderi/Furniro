import { getToken } from "../func/utils.js";

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

export const loginErrorMessages = {
    401: 'Invalid email or password. Please check your credentials and try again.',
    403: 'Access denied. Please contact support if you believe this is an error.',
    404: 'Email not found. Please sign up.',
    500: 'Server error. Please try again later.',
    502: 'Bad gateway. Please try again later.',
    503: 'Service unavailable. Please try again later.',
    504: 'Gateway timeout. Please try again later.'
};

export const registerErrorMessages = {
    400: 'Bad Request. Please check your input and try again.',
    409: 'Email already exists. Please use a different email or login.',
    500: 'Server error. Please try again later.'
};

export const errorMessagesLogout = {
    400: 'Request failed: refreshToken is missing. Redirecting to login.',
    403: 'Unauthorized access. Redirecting to login.',
    404: 'User not found. Redirecting to login.',
    500: 'Internal server error. Please try again later.',
    default: 'An unexpected error occurred. Redirecting to login.'
};

export const getDefaultErrorMessage = () => 'An error occurred. Please try again later.';

export const checkingLoginStatus = () => {
    const userInfos = localStorage.getItem("Access-Token");
    return userInfos ? true : false;
};

export const getingUaerInformation = async () => {
    const token = getToken()
    if (!token) {
        return false
    }

    const response = await fetch(`https://furniro-6x7f.onrender.com/auth/me`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
        }
    })

    const data = await response.json()
    return data
}
