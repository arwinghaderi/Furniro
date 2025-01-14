const saveToLocalStorage = (key, value) => {
    return localStorage.setItem(key, JSON.stringify(value))
}
const getFromLocalStorage = (key) => {
    return JSON.parse(localStorage.getItem(key))
}

const getUrlParam = (key) => {
    const urlParams = new URLSearchParams(location.search)
    return urlParams.get(key)
}

// const getCountProductsCart = () => {
//     let iconCountProducts = document.querySelector(".nav-bar__count-Product")
//     let countProducts = getFromLocalStorage("countProductToCart")

//     if (countProducts) {
//         iconCountProducts.classList.add("nav-bar__count-Product--active")
//         iconCountProducts.innerHTML = countProducts

//     } else {
//         iconCountProducts.classList.add("nav-bar__count-Product--active")
//         iconCountProducts.innerHTML = 0
//     }
// }

const showSwal = async (title, icon, confirmButtonText, url) => {
    await swal.fire({
        title: title,
        icon: icon,
        confirmButtonText: confirmButtonText,
        confirmButtonColor: "#B88E2F",
    }).then((result) => {
        if (result.isConfirmed) {
            location.href = url
        }
    })
}

const showSwalAndReload = (message, type) => {
    Swal.fire({
        title: message,
        icon: type,
        timer: 7000,
        timerProgressBar: true,
        showConfirmButton: false,

    }).then(() => {
        location.reload();
    });
    Swal.getPopup().addEventListener('mouseover', () => { Swal.stopTimer(); })
    Swal.getPopup().addEventListener('mouseout', () => { Swal.resumeTimer(); })
};

const getToken = () => {
    const userToken = JSON.parse(localStorage.getItem("Access-Token"));
    return userToken ? userToken : null
};

const storeAccessTokenWithExpiry = (accessToken, expiresInMinutes) => {
    const expiresInMilliseconds = expiresInMinutes * 60 * 1000;
    const expiryTime = Date.now() + expiresInMilliseconds;
    saveToLocalStorage("Access-Token", accessToken)
    saveToLocalStorage("Access-Token-Expiry", expiryTime)
}

const setSecureCookie = (name, value, days) => {
    let expires = "";

    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();

    const secure = "; Secure";
    const httpOnly = "; HttpOnly";
    const sameSite = "; SameSite=Strict";
    document.cookie = `${name} = ${value} ${expires} ${secure}  ${sameSite}; path =/ `
    document.cookie = `Refresh-Token-Expiry=${expires}; path=/; ${secure} ${sameSite}`;
}

const getCookieValue = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);

    if (parts.length === 2) {
        return parts.pop().split(';').shift();
    }
    return null;
};

const deleteCookie = (name) => {
    document.cookie = name + '=; Max-Age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;';
}

const handleError = (error, errorMessages) => {
    let message = errorMessages.default;

    if (error && error.status) {
        message = errorMessages[error.status] || errorMessages.default;
    }

    Swal.fire({
        title: "Error",
        text: message,
        icon: "error",
        customClass: { popup: 'custom-swal2' },
        showCancelButton: true,
        confirmButtonText: 'Login Again',
        cancelButtonText: 'Go to Home Page',
        confirmButtonColor: "#B88E2F",
        cancelButtonColor: "#d33",
    }).then((result) => {
        if (result.isConfirmed) {
            location.href = '../../Pages/auth.html';
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            location.href = '../../index.html';
        }
        localStorage.removeItem('Access-Token');
        localStorage.removeItem('Access-Token-Expiry');
        deleteCookie("Refresh-Token")
        deleteCookie('Refresh-Token-Expiry');
    });
};

const saveFilterState = (categoryId, currentPage, limit, searchValue) => {
    localStorage.setItem('filterState', JSON.stringify({ categoryId, currentPage, limit, searchValue }));
};

const getFilterState = () => {
    return JSON.parse(localStorage.getItem('filterState') || '{}');
};

const saveStructureState = (id) => {
    localStorage.setItem("productStructure", id);
};

const getSavedStructure = () => {
    return localStorage.getItem("productStructure");
};

const errorMessagesForCart = {
    400: "Invalid request or exceeded quantity limit.",
    401: "Unauthorized. Token not found.",
    403: "Unauthorized, token expired or invalid.",
    404: "User or product not found.",
};

const showDeleteConfirmation = (productId, token, deleteFunction) => {
    Swal.fire({
        title: "Are you sure?",
        text: "Do you really want to remove this item from the cart?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, keep it',
        confirmButtonColor: "#B88E2F",
        cancelButtonColor: "#28a745",
    }).then((result) => {
        if (result.isConfirmed) {
            deleteFunction(productId, token);
        }
    });
};

export {
    saveToLocalStorage, getFromLocalStorage,
    saveFilterState, getFilterState,
    getUrlParam, showDeleteConfirmation,
    showSwal, errorMessagesForCart,
    getToken, storeAccessTokenWithExpiry, getSavedStructure,
    setSecureCookie, getCookieValue, saveStructureState,
    deleteCookie, handleError, showSwalAndReload,
}