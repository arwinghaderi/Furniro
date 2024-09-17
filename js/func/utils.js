const paginationCalculations = (products, numberRow, currentPage, resultShowProducts) => {

    let indexEnd, indexStart
    let copyProducts = [...products]

    indexEnd = numberRow * currentPage
    indexStart = indexEnd - numberRow


    // resultShowProducts.innerHTML = "Showing" + indexStart + "-- " + indexEnd + " of" + products.length + " results"
    console.log(indexStart, indexEnd);
    let paginationProducts = copyProducts.slice(indexStart, indexEnd)

    console.log(paginationProducts);

    return paginationProducts
}


const saveToLocalStorage = (key, value) => {
    return localStorage.setItem(key, JSON.stringify(value))
}

const getFromLocalStorage = (key) => {
    return JSON.parse(localStorage.getItem(key))
}

const searchInProducts = (products, valueSearch, productsKey) => {
    let valueSearchLoewr = valueSearch.toLowerCase().trim()

    let searchProducts = products.filter((product) => product[productsKey].includes(valueSearchLoewr))

    return searchProducts
}




export { paginationCalculations, saveToLocalStorage, getFromLocalStorage, searchInProducts }