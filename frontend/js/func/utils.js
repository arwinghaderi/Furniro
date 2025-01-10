import { addingProductsTemplate } from "../func/shared.js"
let filteredProductPagination
const $ = document

// const addingPaginationTemplate = (productsInformation, counter) => {



// const paginationBox = $.createElement("div")
// paginationBox.className = "shop-products__pagination-box-btn box-shadow"

// const paginationButton = $.createElement("button")
// paginationButton.className = "shop-product-button"

// paginationButton.innerHTML = counter


// if (counter === Number(productsInformation.currentPage)) {
//     paginationBox.classList.add("shop-products__pagination-box--active")
//     paginationButton.classList.add("shop-product-button--active")
// } else {
//     paginationBox.className = "shop-products__pagination-box-btn box-shadow"
//     paginationButton.className = "shop-product-button"
// }
// paginationButton.setAttribute('onclick', `addParamToUrl('page', ${counter})`);
// paginationBox.append(paginationButton)



// const paginationTemaplte = {
//     paginationButton, paginationBox, counter
// }
// selectionPaginationPageByUser(productsInformation, paginationTemaplte)
// }

const selectionPaginationPageByUser = (productsInformation, paginationTemaplte) => {
    const fragment = document.createDocumentFragment();

    paginationTemaplte.paginationButton.addEventListener("click", () => {
        productsInformation.currentPage = paginationTemaplte.counter
        saveToLocalStorage("currentPage", productsInformation.currentPage)

        filteredProductPagination = ProductsWithPaginationCalculations(productsInformation.products, productsInformation.paginationTool)

        paginationTemaplte.paginationBox.classList.add("shop-products__pagination-box--active")
        paginationTemaplte.paginationButton.classList.add("shop-product-button--active")

        addingProductsTemplate(filteredProductPagination, productsInformation.paginationTool.productsStructure, productsInformation.paginationTool.productsWrapper)
    })
    fragment.append(paginationTemaplte.paginationBox)
    productsInformation.paginationTool.wrapperPagination.append(fragment)
}







const saveToLocalStorage = (key, value) => {
    return localStorage.setItem(key, JSON.stringify(value))
}

const getFromLocalStorage = (key) => {
    return JSON.parse(localStorage.getItem(key))
}

const searchInProducts = (products, SearchValue, productsKey) => {
    let SearchValueLoewr = SearchValue.toLowerCase().trim()
    let searchProducts = products.filter((product) => product[productsKey].includes(SearchValueLoewr))

    if (SearchValue) {
        return searchProducts
    } else {
        return products
    }
}

const getCurrentPageAndShowCountProducts = (currentPage, showCountProducts) => {
    currentPage ? currentPage : currentPage = 1
    showCountProducts ? showCountProducts : showCountProducts = 8
}

// const ProductsWithPaginationCalculations = (paginationTool) => {
//     let filterProducts = getFromLocalStorage('FilteredProducts')
//     let currentPage = getFromLocalStorage("currentPage")
//     let showCountProducts = getFromLocalStorage("showCountProducts")
//     let totalPage = getFromLocalStorage("totalPage")

//     getCurrentPageAndShowCountProducts(currentPage, showCountProducts)

//     if (filterProducts) {
//         let filteredProductsBasedPagination = paginationCalculations(currentPage, paginationTool, totalPage)
//         return filteredProductsBasedPagination

//     } else {
//         let productsBasedPagination = paginationCalculations(currentPage, paginationTool, totalPage)
//         return productsBasedPagination
//     }
// }

const calculateProductsShowMoreButton = (products, curentItem, currentPage) => {
    let indexEnd = curentItem * currentPage
    let indexStart = indexEnd - indexEnd

    let productsShowMor = products.slice(indexStart, indexEnd);

    return productsShowMor
}

const getUrlParam = (key) => {
    const urlParams = new URLSearchParams(location.search)
    return urlParams.get(key)
}

const productDiscountCalculation = (price, discountPercent) => {
    let totalDiscount = (price * discountPercent) / 100
    let total = price - totalDiscount

    return total
}

const getCountProductsCart = () => {
    let iconCountProducts = document.querySelector(".nav-bar__count-Product")
    let countProducts = getFromLocalStorage("countProductToCart")

    if (countProducts) {
        iconCountProducts.classList.add("nav-bar__count-Product--active")
        iconCountProducts.innerHTML = countProducts

    } else {
        iconCountProducts.classList.add("nav-bar__count-Product--active")
        iconCountProducts.innerHTML = 0
    }
}

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


export {
    saveToLocalStorage, getFromLocalStorage, searchInProducts,
    saveFilterState, getFilterState,
    getCurrentPageAndShowCountProducts,
    calculateProductsShowMoreButton, getUrlParam,
    productDiscountCalculation, getCountProductsCart,
    selectionPaginationPageByUser, showSwal,
    getToken, storeAccessTokenWithExpiry,
    setSecureCookie, getCookieValue,
    deleteCookie, handleError, showSwalAndReload,
}