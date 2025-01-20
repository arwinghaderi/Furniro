import { getToken, showSwal, showAuthenticationRequiredAlert } from "./func/utils.js";
import { fetchGetCartProducts } from "./Features/cartQuantityDisplay.js";


const formInputs = {
    firstName: document.querySelector("#first-name"),
    lastName: document.querySelector("#last-name"),
    address: document.querySelector("#address"),
    zipCode: document.querySelector("#zip-code"),
    phone: document.querySelector("#phone"),
    email: document.querySelector("#email")
};

const placeOrderBtn = document.querySelector("#placeOrderBtn");
const regexPatterns = {
    name: /^[a-zA-Z\s]+$/,
    address: /^[a-zA-Z0-9\s,.-]+$/,
    zipCode: /^\d{10}$/,
    phone: /^(\+98|0)?9\d{9}$/,
    email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
};

const validateField = (value, regex) => {
    return regex.test(value.trim());
};

const validateInputs = () => {
    const { firstName, lastName, address, zipCode, phone, email } = formInputs;
    return (
        validateField(firstName.value, regexPatterns.name) &&
        validateField(lastName.value, regexPatterns.name) &&
        validateField(address.value, regexPatterns.address) &&
        validateField(zipCode.value, regexPatterns.zipCode) &&
        validateField(phone.value, regexPatterns.phone) &&
        validateField(email.value, regexPatterns.email)
    );
};

const setPlaceOrderBtnState = () => {
    if (validateInputs()) {
        placeOrderBtn.disabled = false;
        placeOrderBtn.innerHTML = "Place order"
        placeOrderBtn.classList.remove("Place-order-btn--forbidden")
    } else {
        placeOrderBtn.disabled = true;
        placeOrderBtn.innerHTML = "forbidden⛔"
        placeOrderBtn.classList.add("Place-order-btn--forbidden")
    }
};

Object.values(formInputs).forEach(input => {
    input.addEventListener('input', setPlaceOrderBtnState);
});

const handleServerResponse = (status) => {
    const responseMessages = {
        404: "Your cart is empty.",
        400: "Invalid input data. Please check your information.",
        500: "Server error. Please try again later.",
        default: "An error occurred. Please try again."
    };
    return responseMessages[status] || responseMessages.default;
};

const fetchPlaceOrder = async () => {
    let token = getToken();

    if (!token) {
        showAuthenticationRequiredAlert()
        return false;
    }
    placeOrderBtn.innerHTML = "Loading..."

    const userInformation = {
        firstName: formInputs.firstName.value.trim(),
        lastName: formInputs.lastName.value.trim(),
        postallCode: formInputs.zipCode.value.trim(),
        fullAddress: formInputs.address.value.trim(),
        phone: formInputs.phone.value.trim(),
        email: formInputs.email.value.trim()
    };

    try {
        const response = await fetch("https://furniro-6x7f.onrender.com/checkoute", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'authorization': `Bearer ${token}`
            },
            body: JSON.stringify(userInformation)
        });

        const message = handleServerResponse(response.status);

        if (!response.ok) {
            response.status === 400 ? showSwal(message, "error", "Go to Shop", '../Pages/shop.html') : showSwal(message, "error", "Try Again", '#')
            return
        }

        showSwal("Thank you for your order! Your order has been successfully placed.", "success", "OK", '#');
    } catch (error) {
        showSwal("An unexpected error occurred. Please try again.", "error", "Try Again", '../Pages/checkOut.html');
    } finally {
        placeOrderBtn.innerHTML = "forbidden⛔"
        placeOrderBtn.classList.add("Place-order-btn--forbidden")
    }
};

placeOrderBtn.addEventListener("click", (e) => {
    e.preventDefault();
    fetchPlaceOrder();
});

const checkOutProductsDetails = async () => {
    const checkOutDetailsRight = document.querySelector(".checkOut-details-right");
    checkOutDetailsRight.insertAdjacentHTML("beforeend", `
             <p class="total-price">Loading...</p>
            <p class="total-price">Loading...</p>
            `)

    checkOutDetailsRight.innerHTML = ""
    const getCartProducts = await fetchGetCartProducts();
    const cartProductsTotal = getCartProducts.cart.total;

    if (cartProductsTotal) {
        checkOutDetailsRight.insertAdjacentHTML("beforeend", `
             <p class="total-price">Rs.${cartProductsTotal.allDiscount.toLocaleString("en")}</p>
            <p class="total-price">Rs.${cartProductsTotal.allPrice.toLocaleString("en")}</p>
            `)
    } else {
        checkOutDetailsRight.insertAdjacentHTML("beforeend", `
             <p class="total-price section-title">Rs.0</p>
            <p class="total-price section-title">Rs.0</p>
            `)
    }
};

checkOutProductsDetails()