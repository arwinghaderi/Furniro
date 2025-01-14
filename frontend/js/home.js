import {
    getFromLocalStorage,
} from "./func/utils.js"

let productsWrapper = document.querySelector(".row-container")
let productsStructure = 'row'
let productsShowMore


const addingProductsByUser = () => {
    productsShowMore = getFromLocalStorage("pageHomeProducts")

    // addingProductsTemplate(productsShowMore, productsStructure, productsWrapper)
}

window.addEventListener('load', () => {
    // if (getFromLocalStorage("pageHomeProducts")) {
    //     addingProductsByUser(products)
    // } else {
    //     addingProductsByUser(products)
    // }
    // getCountProductsCart()
})
