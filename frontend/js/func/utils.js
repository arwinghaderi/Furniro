import { addingProductsTemplate } from "../func/shared.js"
let filteredProductPagination
const $ = document

const paginationCalculations = (products, numberProductsShown, currentPage, paginationTool) => {
    paginationTool.wrapperPagination.innerHTML = ""
    paginationTool.nextContainer.innerHTML = ""
    paginationTool.prevContainer.innerHTML = ""

    let indexEnd, indexStart
    let copyProducts = [...products]

    indexEnd = numberProductsShown * currentPage
    indexStart = indexEnd - numberProductsShown

    paginationTool.resultShowProducts.innerHTML = `Showing  ${indexStart}  --   ${indexEnd > products.length ? products.length : indexEnd}   of  ${products.length}  results`

    let paginationProducts = copyProducts.slice(indexStart, indexEnd)

    let productsInformation = {
        products, numberProductsShown, currentPage, paginationTool,
    }
    calculationNumberOfPaginationPages(productsInformation)
    return paginationProducts
}

const calculationNumberOfPaginationPages = (productsInformation) => {

    let numberOfPagesOfCourses = Math.ceil(productsInformation.products.length / productsInformation.numberProductsShown)
    addingPrevNextButtonTemplate(productsInformation, numberOfPagesOfCourses)

    for (let counter = 1; counter < numberOfPagesOfCourses + 1; counter++) {
        addingPaginationTemplate(productsInformation, counter)
    }
}

const addingPaginationTemplate = (productsInformation, counter) => {
    const paginationBox = $.createElement("div")
    paginationBox.className = "shop-products__pagination-box-btn box-shadow"

    const paginationButton = $.createElement("button")
    paginationButton.className = "shop-product-button"

    paginationButton.innerHTML = counter

    const paginationTemaplte = {
        paginationButton, paginationBox, counter
    }

    if (counter === Number(productsInformation.currentPage)) {
        paginationBox.classList.add("shop-products__pagination-box--active")
        paginationButton.classList.add("shop-product-button--active")
    } else {
        paginationBox.className = "shop-products__pagination-box-btn box-shadow"
        paginationButton.className = "shop-product-button"
    }
    paginationBox.append(paginationButton)
    selectionPaginationPageByUser(productsInformation, paginationTemaplte)
}

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

const addingPrevNextButtonTemplate = (productsInformation, numberOfPagesOfCourses) => {
    productsInformation.paginationTool.prevContainer.insertAdjacentHTML("afterbegin", `<div class="shop-products__prev-btn-box box-shadow"><button class="shop-products__button-prev-text">Prev</button></div >`)

    productsInformation.paginationTool.nextContainer.insertAdjacentHTML("beforeend", `<div class="shop-products__next-btn-box box-shadow"> <button class="shop-products__button-next-text">Next</button></div > `)

    let nextBtn = $.querySelector(".shop-products__next-btn-box")
    let pervBtn = $.querySelector(".shop-products__prev-btn-box")

    if (numberOfPagesOfCourses === 1) {
        nextBtn.style.display = "none"
        pervBtn.style.display = "none"
    } else {
        nextBtn.style.display = "flex"
        pervBtn.style.display = "flex"
    }

    const nextPrevTemaplte = { nextBtn, pervBtn }

    productsInformation.currentPage === 1 ? pervBtn.style.display = "none" : pervBtn.style.display = "flex"
    productsInformation.currentPage === numberOfPagesOfCourses ? nextBtn.style.display = "none" : nextBtn.style.display = "flex"

    handlerNextButtonByUser(productsInformation, nextPrevTemaplte)
    handlerPrevButtonByUser(productsInformation, nextPrevTemaplte)
}

const handlerNextButtonByUser = (productsInformation, nextPrevTemaplte) => {
    nextPrevTemaplte.nextBtn.addEventListener("click", () => {
        productsInformation.currentPage++
        saveToLocalStorage("currentPage", productsInformation.currentPage)

        filteredProductPagination = ProductsWithPaginationCalculations(productsInformation.products, productsInformation.paginationTool)

        addingProductsTemplate(filteredProductPagination, productsInformation.paginationTool.productsStructure, productsInformation.paginationTool.productsWrapper)
    })
}

const handlerPrevButtonByUser = (productsInformation, nextPrevTemaplte) => {
    nextPrevTemaplte.pervBtn.addEventListener("click", () => {
        productsInformation.currentPage--
        saveToLocalStorage("currentPage", productsInformation.currentPage)

        filteredProductPagination = ProductsWithPaginationCalculations(productsInformation.products, productsInformation.paginationTool)

        addingProductsTemplate(filteredProductPagination, productsInformation.paginationTool.productsStructure, productsInformation.paginationTool.productsWrapper)
    })
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

const ProductsWithPaginationCalculations = (products, paginationTool) => {
    let filterProducts = getFromLocalStorage('FilteredProducts')
    let currentPage = getFromLocalStorage("currentPage")
    let showCountProducts = getFromLocalStorage("showCountProducts")

    getCurrentPageAndShowCountProducts(currentPage, showCountProducts)

    if (filterProducts) {
        let filteredProductsBasedPagination = paginationCalculations(products, showCountProducts, currentPage, paginationTool)
        return filteredProductsBasedPagination

    } else {
        let productsBasedPagination = paginationCalculations(products, showCountProducts, currentPage, paginationTool)
        return productsBasedPagination
    }
}

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
    document.cookie = `${name} = ${value} ${expires} ${secure}  ${sameSite}; path=/ `
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

export {
    saveToLocalStorage, getFromLocalStorage, searchInProducts,
    ProductsWithPaginationCalculations,
    getCurrentPageAndShowCountProducts,
    calculateProductsShowMoreButton, getUrlParam,
    productDiscountCalculation, getCountProductsCart,
    selectionPaginationPageByUser, showSwal,
    getToken, storeAccessTokenWithExpiry,
    setSecureCookie, getCookieValue,
    deleteCookie, handleError, showSwalAndReload
}