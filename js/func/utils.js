const paginationCalculations = (products, numberProductsShown, currentPage, resultShowProducts, wrapperPagination) => {
    wrapperPagination.innerHTML = ""
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
    paginationTemaplte.btnElm.addEventListener("click", () => {
        const productsWrapper = $.querySelector(".row-container")
        let productsStructure = "row"

        productsInformation.currentPage = paginationTemaplte.counter
        saveToLocalStorage("currentPage", productsInformation.currentPage)

        let filteredProductPagination = ProductsWithPaginationCalculations(productsInformation.products, productsInformation.resultShowProducts, productsInformation.wrapperPagination)

        paginationTemaplte.divelmnt.classList.add("shop-products__pagination-box--active")
        paginationTemaplte.btnElm.classList.add("shop-product-button--active")

        addingProductsTemplate(filteredProductPagination, productsStructure, productsWrapper)

        fragment.append(paginationTemaplte.divelmnt)
    })
    productsInformation.wrapperPagination.append(fragment)
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