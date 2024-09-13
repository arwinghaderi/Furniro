import { products } from "../db/data";

let numberRow = 8
let currentPage = 1
let resultShowProducts = document.querySelector(".shop-filter__result-text")

const paginationCalculations = (numberRow, currentPage, resultShowProducts) => {
    let indexEnd, indexStart
    let copyProducts = [...products]
    indexEnd = numberRow * currentPage
    indexStart = indexEnd - numberRow
    resultShowProducts.innerHTML = "Showing" + indexStart + "-- " + indexEnd + " of" + products.length + " results"
    let paginationProducts = copyProducts.slice(indexStart, indexEnd)

    console.log(paginationProducts);
    return paginationProducts
}
export { paginationCalculations }
