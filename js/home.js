import { products} from "../js/db/data.js"
import { addingProductsTemplate } from "./func/shared.js"
import {
    saveToLocalStorage,
    getFromLocalStorage,
    calculateProductsShowMoreButton
} from "./func/utils.js"
let $ = document

const hamburger = $.querySelector(".hamburger")
const contenerMenuMobail = $.querySelector(".contener-menu-mobail ")
let menuLink = document.querySelectorAll(".list-menu-item__link")

hamburger.addEventListener("click", function () {
    hamburger.classList.toggle("active")
    contenerMenuMobail.classList.toggle("contener-menu-mobail--active")
})

menuLink.forEach(function (menuLink) {
    menuLink.addEventListener("click", function () {
        document.querySelector(".list-menu-item__link--active").classList.remove("list-menu-item__link--active")
        menuLink.classList.add("list-menu-item__link--active")
    })
})


let productsWrapper = document.querySelector(".row-container")
let productsStructure = 'row'
let productsShowMore
let countProduct = 8
let currentPage = 1
let btnShowMor = document.querySelector(".show-more")

const settingShowMoreButton = () => {
    let Loder = document.querySelector(".show-more__loder")
    btnShowMor.addEventListener("click", function () {
        btnShowMor.style.display = "none"
        Loder.style.display = "block"

        let interval = setInterval(() => {
            productsWrapper.innerHTML = ""
            Loder.style.display = "none"
            btnShowMor.style.display = "block"
            currentPage++

            productsShowMore = calculateProductsShowMoreButton(products, countProduct, currentPage)
            addingProductsTemplate(productsShowMore, productsStructure, productsWrapper)

            countProduct <= countProduct + 8 ? clearInterval(interval) : interval
            productsShowMore.length === products.length ? btnShowMor.style.display = "none" : btnShowMor.style.display = "block"

            saveToLocalStorage("pageHomeProducts", productsShowMore)
            saveToLocalStorage("CurrentPageShowMore", currentPage)
        }, 3000)
    })
}
settingShowMoreButton()

const getingCurrentPageOfProducts = () => {
    currentPage = getFromLocalStorage("CurrentPageShowMore")
    if (currentPage) {
        currentPage = currentPage
    }
    else {
        currentPage = 1
    }
    return currentPage
}

const addingProductsByUser = (products) => {
    productsShowMore = getFromLocalStorage("pageHomeProducts")
    currentPage = getingCurrentPageOfProducts()

    if (productsShowMore) {
        productsShowMore = calculateProductsShowMoreButton(productsShowMore, countProduct, currentPage)

        products.length === productsShowMore.length ? btnShowMor.style.display = "none" : btnShowMor.style.display = "block"
        products.length < productsShowMore.length + countProduct ? productsWrapper.innerHTML = "" : addingProductsTemplate(productsShowMore, productsStructure, productsWrapper)

        addingProductsTemplate(productsShowMore, productsStructure, productsWrapper)
    }
    else {
        productsShowMore = calculateProductsShowMoreButton(products, countProduct, currentPage);
        addingProductsTemplate(productsShowMore, productsStructure, productsWrapper)
    }
}

window.addEventListener('load', function name(params) {
    if (getFromLocalStorage("pageHomeProducts")) {
        addingProductsByUser(products)
    } else {
        addingProductsByUser(products)
    }
})