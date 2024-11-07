import { addingProductsTemplate, productsSorting } from "../js/func/shared.js"
import { products } from "../js/db/data.js"
import {
    saveToLocalStorage,
    getFromLocalStorage,
    searchInProducts,
    ProductsWithPaginationCalculations,
    getCurrentPageAndShowCountProducts,
    getCountProductsCart, selectionPaginationPageByUser
} from "./func/utils.js"

let $ = document
let shopFilterbox = $.querySelector(".shop-filter")
let boxFilterSelect = $.querySelector(".box-filter__select")
let iconFilter = $.querySelector(".shop-filter__svg-icon--filter")

iconFilter.addEventListener("click", function (event) {
    event.preventDefault()
    shopFilterbox.classList.toggle("shop-filter--active")
    boxFilterSelect.classList.toggle("box-filter__select--active")
})

const productsWrapper = $.querySelector(".row-container")
const wrapperPagination = $.querySelector(".shop-products__number-pagination")
const numberShowProduct = $.querySelector(".shop-filter__input--number")
const resultShowProducts = document.querySelector(".shop-filter__result-text")
const nextContainer = $.querySelector(".shop-products__Next")
const prevContainer = $.querySelector(".shop-products__prev")

let filteredProductPagination, productsBasedPagination, filterProducts
let numberProductsShown = 8
let currentPage = 1
let productsStructure = 'row'
let paginationTool = { wrapperPagination, resultShowProducts, nextContainer, prevContainer, productsWrapper, productsStructure }

const optionSelect = $.querySelector(".box-filter__select")

optionSelect.addEventListener('change', event => {
    currentPage = 1
    saveToLocalStorage("currentPage", currentPage)

    const optionActive = event.target.value
    saveToLocalStorage("optionActiveSelectBox", optionActive)
    addingActiveOptionInSelectBoxByUser()

    numberProductsShown = 8
    saveToLocalStorage("showCountProducts", numberProductsShown)
    ChangeInputPlaceholderToUserChange()

    const productsFilter = productsSorting(products, optionActive)
    saveToLocalStorage("FilteredProducts", productsFilter)

    filteredProductPagination = ProductsWithPaginationCalculations(productsFilter, paginationTool)

    showProductsCount(productsFilter)

    addingProductsTemplate(filteredProductPagination, productsStructure, productsWrapper)
})

const ChangeInputPlaceholderToUserChange = () => {
    numberProductsShown = getFromLocalStorage("showCountProducts")
    numberShowProduct.value = numberProductsShown
    numberShowProduct.setAttribute("placeholder", numberProductsShown)
}

const showProductsCount = (products) => {
    numberShowProduct.addEventListener("input", function () {
        numberProductsShown = parseInt(this.value)

        numberProductsShown < 1 || numberProductsShown > products.length ? this.value = 8 : this.value

        if (this.value) {
            currentPage = 1
            saveToLocalStorage("currentPage", currentPage)

            saveToLocalStorage("showCountProducts", parseInt(this.value))
            addingProductsFilteredbyUser()
            ChangeInputPlaceholderToUserChange()
        } else {
            return false
        }
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
        filteredProductPagination = ProductsWithPaginationCalculations(filterProducts, paginationTool)

        showProductsCount(filterProducts)
        addingActiveOptionInSelectBoxByUser()
        addingProductsTemplate(filteredProductPagination, productsStructure, productsWrapper)
    }
    else {
        productsBasedPagination = ProductsWithPaginationCalculations(products, paginationTool)

        saveToLocalStorage("FilteredProducts", products)

        showProductsCount(products)
        addingProductsTemplate(productsBasedPagination, productsStructure, productsWrapper)
    }
}

const structhreIcons = document.querySelectorAll(".shop-filter__svg-icon")
structhreIcons.forEach((icon) => {
    icon.addEventListener("click", () => {

        document.querySelector(".shop-filter__svg-icon--active").classList.remove("shop-filter__svg-icon--active")

        icon.classList.add("shop-filter__svg-icon--active")

        addingTemplatesBasedOnProductStructure(icon.id)
    })
})

const addingTemplatesBasedOnProductStructure = (target) => {
    filterProducts = getFromLocalStorage('FilteredProducts')
    productsBasedPagination = ProductsWithPaginationCalculations(filterProducts, paginationTool)

    if (target === "row") {
        productsStructure = "row"
        addingProductsTemplate(productsBasedPagination, productsStructure, productsWrapper)
        showProductsCount(products)
    } else {
        productsStructure = "col"
        addingProductsTemplate(productsBasedPagination, productsStructure, productsWrapper)
        showProductsCount(products)
    }
}

const searchInput = $.querySelector(".shop-filter__input--text")
searchInput.addEventListener("input", (event) => {
    let copyProducts = [...products]

    let productsSearchResult = searchInProducts(copyProducts, event.target.value, "productIntroduction")
    productsBasedPagination = ProductsWithPaginationCalculations(products, paginationTool)

    if (event.target.value === "") {
        addingProductsTemplate(productsBasedPagination, productsStructure, productsWrapper)

        optionSelect.value = "All"
    } else {
        handlingProductsBasedOnUserSearch(productsSearchResult, event.target.value)
    }
})

const handlingProductsBasedOnUserSearch = (productsSearchResult, serachValue) => {
    let productsSearchPagination
    if (productsSearchResult.length) {
        currentPage = 1
        saveToLocalStorage("currentPage", currentPage)
        optionSelect.value = serachValue

        numberProductsShown = 8
        saveToLocalStorage("showCountProducts", numberProductsShown)
        ChangeInputPlaceholderToUserChange()

        productsSearchPagination = ProductsWithPaginationCalculations(productsSearchResult, paginationTool)
        saveToLocalStorage("FilteredProducts", productsSearchResult)

        showProductsCount(productsSearchResult)
        addingProductsTemplate(productsSearchPagination, productsStructure, productsWrapper)
    } else {
        productsSearchPagination = ProductsWithPaginationCalculations(productsSearchResult, paginationTool)
        addingProductsTemplate(productsSearchPagination, productsStructure, productsWrapper)

        productsWrapper.innerHTML = `<div class="alert alert-danger">هیچ محصولی برای این جستوجوی  شما  وجود ندارد :/</div>`
        resultShowProducts.innerHTML = ""
        nextContainer.innerHTML = ""
        prevContainer.innerHTML = ""
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
    getCountProductsCart()
})
window.selectionPaginationPageByUser = selectionPaginationPageByUser;