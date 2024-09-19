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


//** */ boxFilter
let shopFilterbox = $.querySelector(".shop-filter")
let boxFilterSelect = $.querySelector(".box-filter__select")
let iconFilter = $.querySelector(".shop-filter__svg-icon--filter")

iconFilter.addEventListener("click", function (event) {
    event.preventDefault()
    shopFilterbox.classList.toggle("shop-filter--active")
    boxFilterSelect.classList.toggle("box-filter__select--active")
})



let productsWrapper = $.querySelector(".row-container")
let containerPagination = $.querySelector(".shop-products__number-pagination")
let numberShowProduct = $.querySelector(".shop-filter__input--number")
let numberRowUser;
let btnFilter = $.querySelectorAll(".box-filter__btn")
let boxBtnFilter = $.querySelectorAll(".box-filter__btn-box")
let resultShowProducts = document.querySelector(".shop-filter__result-text")

let numberRow = 8
// numberProductsShown
let currentPage = 1
let productsStructure = 'row'

//**optionSelect */

let optionSelect = $.querySelector(".box-filter__select")

optionSelect.addEventListener('change', function (event) {
    currentPage = 1
    saveToLocalStorage("currentPage", currentPage)

    let optionActive = event.target.value
    saveToLocalStorage("optionActiveSelectBox", optionActive)

    const productsFilter = productsSorting(products, optionActive)
    saveToLocalStorage("FilteredProducts", productsFilter)

    const filteredProductPagination = ProductsWithPaginationCalculations(productsFilter, resultShowProducts)

    setpagination(productsFilter)
    addingActiveOptionInSelectBoxByUser()
    addingProductsTemplate(filteredProductPagination, productsStructure, productsWrapper)
})



function showProductsCountByUser() {
    numberShowProduct.addEventListener("input", function () {
        let number = parseInt(this.value);
        number < 1 || number > products.length || number == null ? this.value = 8 : this.value
        numberShowProduct.setAttribute("placeholder", this.value)

        
        saveToLocalStorage("showCountProducts", parseInt(this.value))
    })
}
showProductsCountByUser()

function setpagination(products) {
    containerPagination.innerHTML = ""
    let numberpagination = Math.ceil(products.length / numberRow)
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

        let filteredProductPagination = paginationCalculations(products, numberRow, currentPage, resultShowProducts)

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
        let numberpagination = Math.ceil(products.length / numberRow)
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
    let numberpagination = Math.ceil(productArrayFilter.length / numberRow)
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
        let numberpagination = Math.ceil(products.length / numberRow)
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


function addingActiveOptionInSelectBoxByUser() {
    let data = getFromLocalStorage("optionActiveSelectBox")
    if (data) {
        optionSelect.value = data
    }
    else {
        optionSelect.value = "All"
    }
}

function addingProductsFilteredbyUser() {
    let filterProducts = getFromLocalStorage('FilteredProducts')
    currentPage = getFromLocalStorage('currentPage')
    numberRow = getFromLocalStorage("showCountProducts")

    getCurrentPageAndShowCountProducts(currentPage, numberRow)

    if (filterProducts) {
        const filteredProductPagination = ProductsWithPaginationCalculations(filterProducts, resultShowProducts)

        setpagination(filterProducts)
        addingActiveOptionInSelectBoxByUser()
        addingProductsTemplate(filteredProductPagination, productsStructure, productsWrapper)
    }
    else {
        const productsBasedPagination = ProductsWithPaginationCalculations(products, resultShowProducts)

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
    const productsBasedPagination = ProductsWithPaginationCalculations(products, resultShowProducts)

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
    const productsBasedPagination = ProductsWithPaginationCalculations(products, resultShowProducts)

    if (event.target.value === "") {
        addingProductsTemplate(productsBasedPagination, productsStructure, productsWrapper)
        setpagination(products)
    } else {
        handlingProductsBasedOnUserSearch(productsSearchResult)
    }
})

const handlingProductsBasedOnUserSearch = (productsSearchResult) => {
    if (productsSearchResult.length) {
        currentPage = 1
        saveToLocalStorage("currentPage", currentPage)
        let productsSearchPagination = ProductsWithPaginationCalculations(productsSearchResult, resultShowProducts)
        addingProductsTemplate(productsSearchPagination, productsStructure, productsWrapper)
        setpagination(productsSearchResult)
    } else {
        productsWrapper.innerHTML = `<div class="alert alert-danger">هیچ محصولی برای این جستوجوی  شما  وجود ندارد :/</div>`
        setpagination(productsSearchResult)
    }
}

window.addEventListener('load', function () {
    if (getFromLocalStorage('currentPage') && getFromLocalStorage('showCountProducts')) {
        currentPage = getFromLocalStorage('currentPage')
        addingProductsFilteredbyUser()
    } else {
        saveToLocalStorage("currentPage", currentPage)
        saveToLocalStorage("showCountProducts", numberRow)
        addingProductsFilteredbyUser()
    }
})
