import { addingProductsTemplate } from "../func/shared.js"
let filteredProductPagination

const productsWrapper = $.querySelector(".row-container")
const nextContainer = $.querySelector(".shop-products__Next")
const prevContainer = $.querySelector(".shop-products__prev")
const productsStructure = "row"

const paginationCalculations = (products, numberProductsShown, currentPage, resultShowProducts, wrapperPagination) => {
    wrapperPagination.innerHTML = ""
    nextContainer.innerHTML = ""
    prevContainer.innerHTML = ""

    let indexEnd, indexStart
    let copyProducts = [...products]

    indexEnd = numberProductsShown * currentPage
    indexStart = indexEnd - numberProductsShown

    resultShowProducts.innerHTML = `Showing  ${indexStart}  --   ${indexEnd > products.length ? products.length : indexEnd}   of  ${products.length}  results`

    let paginationProducts = copyProducts.slice(indexStart, indexEnd)

    let productsInformation = {
        products, numberProductsShown, currentPage, wrapperPagination, resultShowProducts
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
    paginationBox.className = "shop-products__pagination-box-btn"

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
        paginationBox.className = "shop-products__pagination-box-btn"
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

        filteredProductPagination = ProductsWithPaginationCalculations(productsInformation.products, productsInformation.resultShowProducts, productsInformation.wrapperPagination)

        paginationTemaplte.paginationBox.classList.add("shop-products__pagination-box--active")
        paginationTemaplte.paginationButton.classList.add("shop-product-button--active")

        addingProductsTemplate(filteredProductPagination, productsStructure, productsWrapper)
    })
    fragment.append(paginationTemaplte.paginationBox)
    productsInformation.wrapperPagination.append(fragment)
}

const addingPrevNextButtonTemplate = (productsInformation, numberOfPagesOfCourses) => {
    prevContainer.insertAdjacentHTML("afterbegin", `<div class="shop-products__prev-btn-box"><button class="shop-products__button-prev-text">Prev</button></div >`)

    nextContainer.insertAdjacentHTML("beforeend", `<div class="shop-products__next-btn-box"> <button class="shop-products__button-next-text">Next</button></div > `)

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

        filteredProductPagination = ProductsWithPaginationCalculations(productsInformation.products, productsInformation.resultShowProducts, productsInformation.wrapperPagination)

        addingProductsTemplate(filteredProductPagination, productsStructure, productsWrapper)
    })
}

const handlerPrevButtonByUser = (productsInformation, nextPrevTemaplte) => {
    nextPrevTemaplte.pervBtn.addEventListener("click", () => {
        productsInformation.currentPage--
        saveToLocalStorage("currentPage", productsInformation.currentPage)

        filteredProductPagination = ProductsWithPaginationCalculations(productsInformation.products, productsInformation.resultShowProducts, productsInformation.wrapperPagination)

        addingProductsTemplate(filteredProductPagination, productsStructure, productsWrapper)
    })
}

const saveToLocalStorage = (key, value) => {
    return localStorage.setItem(key, JSON.stringify(value))
}

const getFromLocalStorage = (key) => {
    return JSON.parse(localStorage.getItem(key))
}

const searchInProducts = (products, valueSearch, productsKey) => {
    let valueSearchLoewr = valueSearch.toLowerCase().trim()
    console.log(valueSearch);
    let searchProducts = products.filter((product) => product[productsKey].includes(valueSearchLoewr))

    if (valueSearch) {
        return searchProducts
    } else {
        return products
    }
}

const getCurrentPageAndShowCountProducts = (currentPage, showCountProducts) => {
    currentPage ? currentPage : currentPage = 1
    showCountProducts ? showCountProducts : showCountProducts = 8
}

const ProductsWithPaginationCalculations = (products, resultShowProducts, wrapperPagination) => {
    let filterProducts = getFromLocalStorage('FilteredProducts')
    let currentPage = getFromLocalStorage("currentPage")
    let showCountProducts = getFromLocalStorage("showCountProducts")

    getCurrentPageAndShowCountProducts(currentPage, showCountProducts)

    if (filterProducts) {
        let filteredProductsBasedPagination = paginationCalculations(products, showCountProducts, currentPage, resultShowProducts, wrapperPagination)
        return filteredProductsBasedPagination

    } else {
        console.log(currentPage, showCountProducts);
        let productsBasedPagination = paginationCalculations(products, showCountProducts, currentPage, resultShowProducts, wrapperPagination)
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
    const urlParams = new URLSearchParams(window.location.search)
    return urlParams.get(key)
}

const productDiscountCalculation = (price, discountPercent) => {
    let totalDiscount = (price * discountPercent) / 100
    let total = price - totalDiscount

    return total
}
const getCountProductsCart = () => {
    let iconCountProducts = document.querySelector(".nav-bar__count-Procuct")
    let countProducts = getFromLocalStorage("countProductToCart")

    if (countProducts) {
        iconCountProducts.classList.add("nav-bar__count-Procuct--active")
        iconCountProducts.innerHTML = countProducts
    } else {
        iconCountProducts.classList.add("nav-bar__count-Procuct--active")
        iconCountProducts.innerHTML = 0
    }
}

export {
    paginationCalculations,
    saveToLocalStorage,
    getFromLocalStorage,
    searchInProducts,
    ProductsWithPaginationCalculations,
    getCurrentPageAndShowCountProducts,
    calculateProductsShowMoreButton,
    getUrlParam,
    productDiscountCalculation,
    getCountProductsCart, selectionPaginationPageByUser
}