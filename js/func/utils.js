const paginationCalculations = (products, numberRow, currentPage, resultShowProducts) => {

    let indexEnd, indexStart
    let copyProducts = [...products]

    indexEnd = numberRow * currentPage
    indexStart = indexEnd - numberRow


    resultShowProducts.innerHTML = `Showing  ${indexStart}  --   ${indexEnd > products.length ? products.length : indexEnd}   of  ${products.length}  results`

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
    let valueSearchLoewr = valueSearch.toLowerCase().trim()
    console.log(valueSearch);
    let searchProducts = products.filter((product) => product[productsKey].includes(valueSearchLoewr))

    if (valueSearch) {
        return searchProducts
    } else {
        return products
    }
}

const getCurrentPageAndShowCountProducts = (currentPage, showCountProducts) => {
    currentPage ? currentPage : currentPage = 1
    showCountProducts ? showCountProducts : showCountProducts = 8
}

const ProductsWithPaginationCalculations = (products, resultShowProducts) => {
    let filterProducts = getFromLocalStorage('FilteredProducts')
    let currentPage = getFromLocalStorage("currentPage")
    let showCountProducts = getFromLocalStorage("showCountProducts")

    getCurrentPageAndShowCountProducts(currentPage, showCountProducts)

    if (filterProducts) {
        let filteredProductsBasedPagination = paginationCalculations(products, showCountProducts, currentPage, resultShowProducts)
        return filteredProductsBasedPagination

    } else {
        console.log(currentPage, showCountProducts);
        let productsBasedPagination = paginationCalculations(products, showCountProducts, currentPage, resultShowProducts)
        return productsBasedPagination
    }
}

const calculateProductsShowMoreButton = (products, curentItem, currentPage) => {
    console.log(products);
    let indexEnd = curentItem * currentPage
    let indexStart = indexEnd - indexEnd
  
    let productsShowMor = products.slice(indexStart, indexEnd);

    return productsShowMor
}

export {
    paginationCalculations,
    saveToLocalStorage,
    getFromLocalStorage,
    searchInProducts,
    ProductsWithPaginationCalculations,
    getCurrentPageAndShowCountProducts,
    calculateProductsShowMoreButton
}