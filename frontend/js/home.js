import { products } from "../js/db/data.js"
import { addingProductsTemplate } from "./func/shared.js"
import {
    getFromLocalStorage,
    calculateProductsShowMoreButton,
    getCountProductsCart
} from "./func/utils.js"

let productsWrapper = document.querySelector(".row-container")
let productsStructure = 'row'
let productsShowMore
let countProduct = 8
let currentPage = 1

const addingProductsByUser = (products) => {
    productsShowMore = getFromLocalStorage("pageHomeProducts")

    productsShowMore = calculateProductsShowMoreButton(products, countProduct, currentPage);
    addingProductsTemplate(productsShowMore, productsStructure, productsWrapper)
}

window.addEventListener('load', () => {
    if (getFromLocalStorage("pageHomeProducts")) {
        addingProductsByUser(products)
    } else {
        addingProductsByUser(products)
    }
    getCountProductsCart()
})
