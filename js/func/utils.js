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
    let value = JSON.parse(localStorage.getItem(key))
    return value
}


export { paginationCalculations, saveToLocalStorage, getFromLocalStorage }