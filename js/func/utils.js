import { products } from "../db/data.js";

const paginationCalculations = (numberRow, currentPage, resultShowProducts) => {
    let indexEnd, indexStart
    let copyProducts = [...products]

    indexEnd = numberRow * currentPage
    indexStart = indexEnd - numberRow

    resultShowProducts.innerHTML = "Showing" + indexStart + "-- " + indexEnd + " of" + products.length + " results"
    let paginationProducts = copyProducts.slice(indexStart, indexEnd)

    return paginationProducts
}


const saveToLocalStorage = (key, value) => {
    return localStorage.setItem(key, JSON.stringify(value))
}

const getFromLocalStorage = (key) => {
    return JSON.parse(localStorage.getItem(key))
}

const searchInProducts = (products, valueSearch, productsKey) => {
    let valueSearchLoewr = valueSearch.toLowerCase()


    let searchProducts = products.filter((product) => product[productsKey].includes(valueSearchLoewr))

    console.log(searchProducts);

    return searchProducts

}




export { paginationCalculations, saveToLocalStorage, getFromLocalStorage, searchInProducts }