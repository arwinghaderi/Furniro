const paginationCalculations = (products, numberProductsShown, currentPage, resultShowProducts, wrapperPagination) => {
    wrapperPagination.innerHTML = ""
    let indexEnd, indexStart
    let copyProducts = [...products]

    indexEnd = numberProductsShown * currentPage
    indexStart = indexEnd - numberProductsShown


    resultShowProducts.innerHTML = `Showing  ${indexStart}  --   ${indexEnd > products.length ? products.length : indexEnd}   of  ${products.length}  results`

    let paginationProducts = copyProducts.slice(indexStart, indexEnd)
    let numberOfPagesOfCourses = Math.ceil(products.length / numberProductsShown)

    for (let counter = 1; counter < numberOfPagesOfCourses + 1; counter++) {
        wrapperPagination.insertAdjacentHTML('beforeend', `
       
        ${counter === Number(currentPage) ? `
            <div div class="shop-products__pagination-box-btn shop-products__pagination-box--active" > <button class="shop-product-button shop-product-button--active">${counter}</button></div >
          ` : `
            <div class="shop-products__pagination-box-btn"><button class="shop-product-button">${counter}</button></div>
          `
            }
         
     
    `)
        // setBtnDom(i, products, wrapperPagination, currentPage)
    }
    return paginationProducts
}




// const addingPaginationTemplate = (counter, products, wrapperPagination, currentPage) => {

//     wrapperPagination.insertAdjacentHTML('beforeend', `
//         <li class="courses__pagination-item">
//         ${counter === Number(currentPage) ? `
//             <a onclick="addParamToUrl('page', ${counter})" class="courses__pagination-link courses__pagination-link--active">
//               ${counter}
//             </a>
//           ` : `
//             <a onclick="addParamToUrl('page', ${counter})" class="courses__pagination-link">
//               ${counter}
//             </a>
//           `
//         }

//         </li>
//     `)
// }

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

const ProductsWithPaginationCalculations = (products, resultShowProducts, wrapperPagination) => {
    let filterProducts = getFromLocalStorage('FilteredProducts')
    let currentPage = getFromLocalStorage("currentPage")
    let showCountProducts = getFromLocalStorage("showCountProducts")

    getCurrentPageAndShowCountProducts(currentPage, showCountProducts)

    if (filterProducts) {
        let filteredProductsBasedPagination = paginationCalculations(products, showCountProducts, currentPage, resultShowProducts, wrapperPagination)
        return filteredProductsBasedPagination

    } else {
        console.log(currentPage, showCountProducts);
        let productsBasedPagination = paginationCalculations(products, showCountProducts, currentPage, resultShowProducts, wrapperPagination)
        return productsBasedPagination
    }
}

const calculateProductsShowMoreButton = (products, curentItem, currentPage) => {
    let indexEnd = curentItem * currentPage
    let indexStart = indexEnd - indexEnd

    let productsShowMor = products.slice(indexStart, indexEnd);

    return productsShowMor
}

const getUrlParam = (key) => {
    const urlParams = new URLSearchParams(window.location.search)
    return urlParams.get(key)
}

const productDiscountCalculation = (price, discountPercent) => {
    let totalDiscount = (price * discountPercent) / 100
    let total = price - totalDiscount

    return total
}
const getCountProductsCart = () => {
    let iconCountProducts = document.querySelector(".nav-bar__count-Procuct")
    let countProducts = getFromLocalStorage("countProductToCart")

    if (countProducts) {
        iconCountProducts.classList.add("nav-bar__count-Procuct--active")
        iconCountProducts.innerHTML = countProducts
    } else {
        iconCountProducts.classList.add("nav-bar__count-Procuct--active")
        iconCountProducts.innerHTML = 0
    }
}

export {
    paginationCalculations,
    saveToLocalStorage,
    getFromLocalStorage,
    searchInProducts,
    ProductsWithPaginationCalculations,
    getCurrentPageAndShowCountProducts,
    calculateProductsShowMoreButton,
    getUrlParam,
    productDiscountCalculation,
    getCountProductsCart
}