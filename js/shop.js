import { addingProductsTemplate, productsSorting } from "../js/func/shared.js"
import { products } from "../js/db/data.js"
import {
    paginationCalculations,
    saveToLocalStorage,
    getFromLocalStorage,
    searchInProducts,
    ProductsWithPaginationCalculations,
    getCurrentPageAndShowCountProducts
} from "./func/utils.js"

let $ = document

const hamburger = $.querySelector(".hamburger")
const contenerMenuMobail = $.querySelector(".contener-menu-mobail ")
hamburger.addEventListener("click", function () {
    hamburger.classList.toggle("active")
    contenerMenuMobail.classList.toggle("contener-menu-mobail--active")
})

let menuLink = $.querySelectorAll(".list-menu-item__link")
menuLink.forEach(function (menuLink) {
    menuLink.addEventListener("click", function () {
        $.querySelector(".list-menu-item__link--active").classList.remove("list-menu-item__link--active")
        menuLink.classList.add("list-menu-item__link--active")
    })
})

let shopFilterbox = $.querySelector(".shop-filter")
let boxFilterSelect = $.querySelector(".box-filter__select")
let iconFilter = $.querySelector(".shop-filter__svg-icon--filter")

iconFilter.addEventListener("click", function (event) {
    event.preventDefault()
    shopFilterbox.classList.toggle("shop-filter--active")
    boxFilterSelect.classList.toggle("box-filter__select--active")
})



const productsWrapper = $.querySelector(".row-container")
const containerPagination = $.querySelector(".shop-products__number-pagination")
const numberShowProduct = $.querySelector(".shop-filter__input--number")
const resultShowProducts = document.querySelector(".shop-filter__result-text")
let filteredProductPagination, productsBasedPagination, filterProducts

let numberProductsShown = 8
let currentPage = 1
let productsStructure = 'row'

const optionSelect = $.querySelector(".box-filter__select")

optionSelect.addEventListener('change', function (event) {
    currentPage = 1
    saveToLocalStorage("currentPage", currentPage)

    let optionActive = event.target.value
    saveToLocalStorage("optionActiveSelectBox", optionActive)

    const productsFilter = productsSorting(products, optionActive)
    saveToLocalStorage("FilteredProducts", productsFilter)

    filteredProductPagination = ProductsWithPaginationCalculations(productsFilter, resultShowProducts)

    setpagination(productsFilter)
    addingActiveOptionInSelectBoxByUser()
    addingProductsTemplate(filteredProductPagination, productsStructure, productsWrapper)
})



const ChangeInputPlaceholderToUserChange = () => {
    numberProductsShown = getFromLocalStorage("showCountProducts")
    numberShowProduct.setAttribute("placeholder", numberProductsShown)
}

numberShowProduct.addEventListener("input", function () {
    numberProductsShown = parseInt(this.value)

    numberProductsShown < 1 || numberProductsShown > products.length ? this.value = 8 : this.value

    if (this.value) {
        saveToLocalStorage("showCountProducts", parseInt(this.value))
        addingProductsFilteredbyUser()
        ChangeInputPlaceholderToUserChange()
    } else {
        return false
    }
})

function setpagination(products) {
    containerPagination.innerHTML = ""
    let numberpagination = Math.ceil(products.length / numberProductsShown)
    for (let i = 1; i < numberpagination + 1; i++) {
        setBtnDom(i, products)
    }
}
//**setBtnDom
function setBtnDom(i, products) {
    let divelmnt = $.createElement("div")
    divelmnt.className = "shop-products__pagination-box-btn"

    let btnElm = $.createElement("button")
    btnElm.className = "shop-product-button"

    btnElm.innerHTML = i

    divelmnt.append(btnElm)

    if (i === currentPage) {
        divelmnt.classList.add("shop-products__pagination-box--active")
        btnElm.classList.add("shop-product-button--active")
    }


    btnElm.addEventListener("click", function () {
        console.log(currentPage, i);
        currentPage = i

        filteredProductPagination = paginationCalculations(products, numberProductsShown, currentPage, resultShowProducts)

        saveToLocalStorage("currentPage", currentPage)
        addingProductsTemplate(filteredProductPagination, productsStructure, productsWrapper)

        let btnActive = $.querySelector(".shop-product-button.shop-product-button--active")
        let btnDivActive = $.querySelector(".shop-products__pagination-box-btn.shop-products__pagination-box--active")
        btnActive.classList.remove("shop-product-button--active")
        btnDivActive.classList.remove("shop-products__pagination-box--active")
        divelmnt.classList.add("shop-products__pagination-box--active")
        btnElm.classList.add("shop-product-button--active")
        let divBtnPrev = $.querySelector(".shop-products__prev-btn-box")
        let nextDivElem = $.querySelector(".shop-products__next-btn-box")
        let numberpagination = Math.ceil(products.length / numberProductsShown)
        if (currentPage === numberpagination) {
            nextDivElem.style.display = "none"
        }
        if (currentPage > 1) {
            divBtnPrev.style.display = "flex"
        }
        if (currentPage === 1) {
            divBtnPrev.style.display = "none"
        }
        if (currentPage < numberpagination) {
            nextDivElem.style.display = "flex"
        }
        if (numberpagination === 1) {
            nextDivElem.style.display = "none"
            divBtnPrev.style.display = "none"
        }
    })
    containerPagination.append(divelmnt)

}

//** SetBtnNextPrev*/
let nextContainer = $.querySelector(".shop-products__Next")
let prevContainer = $.querySelector(".shop-products__prev")
function setBtnNextPrev(products) {
    nextContainer.innerHTML = ""
    prevContainer.innerHTML = ""
    for (let i = 1; i < 2; i++) {
        setBtnNextPrevDom(products)
    }
}
function setBtnNextPrevDom(productArrayFilter) {
    prevContainer.insertAdjacentHTML("afterbegin", '<div class="shop-products__prev-btn-box">     <button class="shop-products__button-prev-text">Prev</button></div > ')
    nextContainer.insertAdjacentHTML("beforeend", ' <div class="shop-products__next-btn-box"> <button class="shop-products__button-next-text">Next</button></div > ')
    let nextDivElem = $.querySelector(".shop-products__next-btn-box")
    let divBtnPrev = $.querySelector(".shop-products__prev-btn-box")
    let numberpagination = Math.ceil(productArrayFilter.length / numberProductsShown)
    if (numberpagination === 1) {
        nextDivElem.style.display = "none"
        divBtnPrev.style.display = "none"
    }
    if (currentPage === 1) {
        divBtnPrev.style.display = "none"
    }
    if (currentPage === numberpagination) {
        nextDivElem.style.display = "none"
    }
    nextDivElem.addEventListener("click", function () {
        currentPage++
        if (currentPage === numberpagination) {
            nextDivElem.style.display = "none"
        }
        if (currentPage > 1) {
            divBtnPrev.style.display = "flex"
        }
        addingProductsTemplate(productArrayFilter, productsStructure, productsWrapper)

        setpagination(productArrayFilter)
        saveToLocalStorage("currentPage", currentPage)
    })
    divBtnPrev.addEventListener("click", function (event) {
        event.preventDefault()
        currentPage--
        let numberpagination = Math.ceil(products.length / numberProductsShown)
        if (currentPage === 1) {
            divBtnPrev.style.display = "none"
        } if (currentPage < numberpagination) {
            nextDivElem.style.display = "flex"
        }
        addingProductsTemplate(productArrayFilter, productsStructure, productsWrapper)
        setpagination(productArrayFilter)
        saveToLocalStorage("currentPage", currentPage)
    })
}


const addingActiveOptionInSelectBoxByUser = () => {
    let data = getFromLocalStorage("optionActiveSelectBox")
    if (data) {
        optionSelect.value = data
    }
    else {
        optionSelect.value = "All"
    }
}

const addingProductsFilteredbyUser = () => {
    filterProducts = getFromLocalStorage('FilteredProducts')
    currentPage = getFromLocalStorage('currentPage')
    numberProductsShown = getFromLocalStorage("showCountProducts")

    getCurrentPageAndShowCountProducts(currentPage, numberProductsShown)

    if (filterProducts) {
        filteredProductPagination = ProductsWithPaginationCalculations(filterProducts, resultShowProducts)

        setpagination(filterProducts)
        addingActiveOptionInSelectBoxByUser()
        addingProductsTemplate(filteredProductPagination, productsStructure, productsWrapper)
    }
    else {
        productsBasedPagination = ProductsWithPaginationCalculations(products, resultShowProducts)

        saveToLocalStorage("FilteredProducts", products)
        setpagination(products)
        addingProductsTemplate(productsBasedPagination, productsStructure, productsWrapper)
    }
}

const structhreIcons = document.querySelectorAll(".shop-filter__svg-icon")
structhreIcons.forEach((icon) => {
    icon.addEventListener("click", (event) => {

        document.querySelector(".shop-filter__svg-icon--active").classList.remove("shop-filter__svg-icon--active")

        icon.classList.add("shop-filter__svg-icon--active")

        addingTemplatesBasedOnProductStructure(icon.id)
    })
})

const addingTemplatesBasedOnProductStructure = (target) => {
    productsBasedPagination = ProductsWithPaginationCalculations(products, resultShowProducts)

    if (target === "row") {
        productsStructure = "row"
        addingProductsTemplate(productsBasedPagination, productsStructure, productsWrapper)
    } else {
        productsStructure = "col"
        addingProductsTemplate(productsBasedPagination, productsStructure, productsWrapper)
    }
}

const searchInput = $.querySelector(".shop-filter__input--text")
searchInput.addEventListener("input", (event) => {
    let copyProducts = [...products]

    let productsSearchResult = searchInProducts(copyProducts, event.target.value, "productIntroduction")
    productsBasedPagination = ProductsWithPaginationCalculations(products, resultShowProducts)

    if (event.target.value === "") {
        addingProductsTemplate(productsBasedPagination, productsStructure, productsWrapper)
        setpagination(products)
        optionSelect.value = "All"
        addingActiveOptionInSelectBoxByUser()
    } else {
        handlingProductsBasedOnUserSearch(productsSearchResult)
    }
})

const handlingProductsBasedOnUserSearch = (productsSearchResult) => {
    if (productsSearchResult.length) {
        currentPage = 1
        saveToLocalStorage("currentPage", currentPage)
        let productsSearchPagination = ProductsWithPaginationCalculations(productsSearchResult, resultShowProducts)
        setpagination(productsSearchResult)
        addingProductsTemplate(productsSearchPagination, productsStructure, productsWrapper)
    } else {
        productsWrapper.innerHTML = `<div class="alert alert-danger">هیچ محصولی برای این جستوجوی  شما  وجود ندارد :/</div>`
        resultShowProducts.innerHTML = ""
        setpagination(productsSearchResult)
    }
}

window.addEventListener('load', function () {
    if (getFromLocalStorage('currentPage') && getFromLocalStorage('showCountProducts')) {
        currentPage = getFromLocalStorage('currentPage')
        ChangeInputPlaceholderToUserChange()
        addingProductsFilteredbyUser()
    } else {
        saveToLocalStorage("currentPage", currentPage)
        saveToLocalStorage("showCountProducts", numberProductsShown)
        ChangeInputPlaceholderToUserChange()
        addingProductsFilteredbyUser()
    }
})
