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
export { paginationCalculations }
