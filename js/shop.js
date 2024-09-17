import { addingProductsTemplate, productsSorting } from "../js/func/shared.js"
import { products } from "../js/db/data.js"
import { paginationCalculations, saveToLocalStorage, getFromLocalStorage, searchInProducts } from "./func/utils.js"

let $ = document

const hamburger = $.querySelector(".hamburger")
const contenerMenuMobail = $.querySelector(".contener-menu-mobail ")
hamburger.addEventListener("click", function () {
    hamburger.classList.toggle("active")
    contenerMenuMobail.classList.toggle("contener-menu-mobail--active")
})

let menuLink = $.querySelectorAll(".list-menu-item__link")
menuLink.forEach(function (menuLink) {
    menuLink.addEventListener("click", function () {
        $.querySelector(".list-menu-item__link--active").classList.remove("list-menu-item__link--active")
        menuLink.classList.add("list-menu-item__link--active")
    })
})


//** */ boxFilter
let shopFilterbox = $.querySelector(".shop-filter")
let boxFilterSelect = $.querySelector(".box-filter__select")
let iconFilter = $.querySelector(".shop-filter__svg-icon--filter")

iconFilter.addEventListener("click", function (event) {
    event.preventDefault()
    shopFilterbox.classList.toggle("shop-filter--active")
    boxFilterSelect.classList.toggle("box-filter__select--active")
})



let productsWrapper = $.querySelector(".row-container")
let containerPagination = $.querySelector(".shop-products__number-pagination")
let numberShowProduct = $.querySelector(".shop-filter__input--number")
let numberRowUser;
let btnFilter = $.querySelectorAll(".box-filter__btn")
let boxBtnFilter = $.querySelectorAll(".box-filter__btn-box")
let numberRow = 8
// numberProductsShown
let currentPage = 1
let resultShowProducts = document.querySelector(".shop-filter__result-text")

let productsBasedPagination = paginationCalculations(numberRow, currentPage, resultShowProducts)


let productsStructure = 'row'


let productsFilter = []


//**optionSelect */

let optionSelect = $.querySelector(".box-filter__select")


optionSelect.addEventListener('change', function (event) {
    let optionActive = event.target.value

    let productsFilter = productsSorting(products, optionActive)
    addingProductsTemplate(productsFilter, productsStructure, productsWrapper)
    saveToLocalStorage("optionActiveSelectBox", optionActive)
})




//**FilterArray */
// function productsFilterSetting(target) {
//     console.log(target);
//     switch (target) {
//         case 'new':
//             let filterProductsNew = products.filter(function (product) {
//                 return product.newProduct === true
//             })
//             console.log(filterProductsNew);
//             currentPage = 1
//      c
//             setpagination(filterProductsNew)
//             setinputNumberRow(filterProductsNew);
//             // gridSystm1col(filterProductsNew)
//             setBtnNextPrev(filterProductsNew)
//             saveToLocalStorage("FilteredProducts", filterProductsNew)
//             saveToLocalStorage("currentPage", currentPage)
//             productsFilter.push(filterProductsNew)
//             break;
//         case 'discount':
//             let filterProductsDiscunt = products.filter(function (product) {
//                 return product.discount === true
//             })
//             currentPage = 1
//             addingProductsTemplate(filterProductsDiscunt, productsStructure, productsWrapper)
//             setpagination(filterProductsDiscunt)
//             setinputNumberRow(filterProductsDiscunt);
//             // gridSystm1col(filterProductsDiscunt)
//             setBtnNextPrev(filterProductsDiscunt)
//             saveToLocalStorage("FilteredProducts", filterProductsDiscunt)
//             saveToLocalStorage("currentPage", currentPage)
//             productsFilter.push(filterProductsDiscunt)
//             break
//         case 'All':
//             currentPage = 1
//             addingProductsTemplate(products, productsStructure, productsWrapper)
//             setpagination(products)
//             setinputNumberRow(products)
//             // gridSystm1col(products)
//             setBtnNextPrev(products)
//             saveToLocalStorage("FilteredProducts", products)
//             saveToLocalStorage("currentPage", currentPage)
//             productsFilter.push(products)
//             break
//         default:
//             let filterProducts = products.filter(function (product) {
//                 return product.type === target
//             })
//             currentPage = 1
//             addingProductsTemplate(filterProducts, productsStructure, productsWrapper)
//             setpagination(filterProducts)
//             setinputNumberRow(filterProducts)
//             setBtnNextPrev(filterProducts)

//             saveToLocalStorage("FilteredProducts", filterProducts)
//             saveToLocalStorage("currentPage", currentPage)
//             productsFilter.push(filterProducts)
//             break;
//     }
// }


//**setinputNumberRow
function setinputNumberRow(products) {
    numberShowProduct.addEventListener("keydown", function (event) {
        if (event.keyCode === 13) {
            let numberRowUser = +event.target.value
            saveToLocalStorage("showCountProducts", numberRowUser)
            console.log(numberRow);
            if (numberRowUser > 0 && numberRowUser < 49) {
                numberRow = numberRowUser
                currentPage = 1
                addingProductsTemplate(products, productsStructure, productsWrapper)
                setpagination(products)
                // gridSystm1col(products)
                setBtnNextPrev(products)
                saveToLocalStorage("FilteredProducts", products)
                saveToLocalStorage("currentPage", currentPage)
            } else {
                alert("please select a number and above zero")
            }


        }

    })
}

//**setpagination
function setpagination(products) {
    containerPagination.innerHTML = ""
    let numberpagination = Math.ceil(products.length / numberRow)
    for (let i = 1; i < numberpagination + 1; i++) {
        setBtnDom(i, products)
    }
}
//**setBtnDom
function setBtnDom(i, products) {
    let divelmnt = $.createElement("div")
    divelmnt.className = "shop-products__pagination-box-btn"

    let btnElm = $.createElement("button")
    btnElm.className = "shop-product-button"

    btnElm.innerHTML = i

    divelmnt.append(btnElm)

    if (i === currentPage) {
        divelmnt.classList.add("shop-products__pagination-box--active")
        btnElm.classList.add("shop-product-button--active")
    }


    btnElm.addEventListener("click", function () {
        currentPage = i
        // addingProductsTemplate(products, productsStructure, productsWrapper)

        let btnActive = $.querySelector(".shop-product-button.shop-product-button--active")
        let btnDivActive = $.querySelector(".shop-products__pagination-box-btn.shop-products__pagination-box--active")
        btnActive.classList.remove("shop-product-button--active")
        btnDivActive.classList.remove("shop-products__pagination-box--active")
        divelmnt.classList.add("shop-products__pagination-box--active")
        btnElm.classList.add("shop-product-button--active")
        let divBtnPrev = $.querySelector(".shop-products__prev-btn-box")
        let nextDivElem = $.querySelector(".shop-products__next-btn-box")
        let numberpagination = Math.ceil(products.length / numberRow)
        if (currentPage === numberpagination) {
            nextDivElem.style.display = "none"
        }
        if (currentPage > 1) {
            divBtnPrev.style.display = "flex"
        }
        if (currentPage === 1) {
            divBtnPrev.style.display = "none"
        }
        if (currentPage < numberpagination) {
            nextDivElem.style.display = "flex"
        }
        if (numberpagination === 1) {
            nextDivElem.style.display = "none"
            divBtnPrev.style.display = "none"
        }
        saveToLocalStorage("currentPage", currentPage)
    })
    containerPagination.append(divelmnt)
}

//** SetBtnNextPrev*/
let nextContainer = $.querySelector(".shop-products__Next")
let prevContainer = $.querySelector(".shop-products__prev")
function setBtnNextPrev(products) {
    nextContainer.innerHTML = ""
    prevContainer.innerHTML = ""
    for (let i = 1; i < 2; i++) {
        setBtnNextPrevDom(products)
    }
}
function setBtnNextPrevDom(productArrayFilter) {
    prevContainer.insertAdjacentHTML("afterbegin", '<div class="shop-products__prev-btn-box">     <button class="shop-products__button-prev-text">Prev</button></div > ')
    nextContainer.insertAdjacentHTML("beforeend", ' <div class="shop-products__next-btn-box"> <button class="shop-products__button-next-text">Next</button></div > ')
    let nextDivElem = $.querySelector(".shop-products__next-btn-box")
    let divBtnPrev = $.querySelector(".shop-products__prev-btn-box")
    let numberpagination = Math.ceil(productArrayFilter.length / numberRow)
    if (numberpagination === 1) {
        nextDivElem.style.display = "none"
        divBtnPrev.style.display = "none"
    }
    if (currentPage === 1) {
        divBtnPrev.style.display = "none"
    }
    if (currentPage === numberpagination) {
        nextDivElem.style.display = "none"
    }
    nextDivElem.addEventListener("click", function () {
        currentPage++
        if (currentPage === numberpagination) {
            nextDivElem.style.display = "none"
        }
        if (currentPage > 1) {
            divBtnPrev.style.display = "flex"
        }
        addingProductsTemplate(productArrayFilter, productsStructure, productsWrapper)

        setpagination(productArrayFilter)
        saveToLocalStorage("currentPage", currentPage)
    })
    divBtnPrev.addEventListener("click", function (event) {
        event.preventDefault()
        currentPage--
        let numberpagination = Math.ceil(products.length / numberRow)
        if (currentPage === 1) {
            divBtnPrev.style.display = "none"
        } if (currentPage < numberpagination) {
            nextDivElem.style.display = "flex"
        }
        addingProductsTemplate(productArrayFilter, productsStructure, productsWrapper)
        setpagination(productArrayFilter)
        saveToLocalStorage("currentPage", currentPage)
    })
}

function addingShowProductCountbyUser(products) {
    let data = getFromLocalStorage("showCountProducts")
    if (data) {
        numberRow = +data
    }
    else {
        numberRow = 8
    }
    // addingProductsTemplate(products, productsStructure, productsWrapper)
    setpagination(products)
    setBtnNextPrev(products)
}

function addingCurrentPageByUser(productsFilter) {
    let data = getFromLocalStorage("currentPage")
    if (currentPage) {
        currentPage = data
    }
    else {
        currentPage = 1
    }
    addingProductsTemplate(productsFilter, productsStructure, productsWrapper)
    setpagination(productsFilter)
    setinputNumberRow(productsFilter)
    setBtnNextPrev(productsFilter)
}

//**SET LOCAL STROGE OptionActive*/


function addingActiveOptionInSelectBoxByUser(productsFilter) {
    let data = getFromLocalStorage("optionActiveSelectBox")
    if (data) {
        optionSelect.value = data
    }
    else {
        optionSelect.value = []
    }

    addingProductsTemplate(productsFilter, productsStructure, productsWrapper)
    setpagination(productsFilter)
    setinputNumberRow(productsFilter)
    setBtnNextPrev(productsFilter)
}


function addingProductsFilteredbyUser(productsFilter) {
    let data = getFromLocalStorage('FilteredProducts')
    if (data) {
        productsFilter = data
    }
    else {
        productsFilter = []
    }
    addingProductsTemplate(productsFilter, productsStructure, productsWrapper)
    setpagination(productsFilter)
    setinputNumberRow(productsFilter)
    setBtnNextPrev(productsFilter)
}

//** gridSystm1col */


const structhreIcons = document.querySelectorAll(".shop-filter__svg-icon")

structhreIcons.forEach((icon) => {
    icon.addEventListener("click", (event) => {

        document.querySelector(".shop-filter__svg-icon--active").classList.remove("shop-filter__svg-icon--active")

        icon.classList.add("shop-filter__svg-icon--active")

        insetTemplateHtml(icon.id)
    })
})


const insetTemplateHtml = (target) => {

    if (target === "row") {
        productsStructure = "row"
        addingProductsTemplate(productsBasedPagination, productsStructure, productsWrapper)

    } else {
        productsStructure = "col"
        addingProductsTemplate(productsBasedPagination, productsStructure, productsWrapper)
    }


}

//** searchInput*/
let searchInput = $.querySelector(".shop-filter__input--text")
// function searchProducts(products) {
//     searchInput.addEventListener("keyup", function (e) {
//         if (e.keyCode === 13) {

//             let valueInputSearch = searchInput.value.trim()
//             let findProductType = products.filter(function (params) {
//                 return params.type === valueInputSearch
//             })
//             console.log(findProductType, valueInputSearch);
//             if (findProductType.length > 0) {
//                 currentPage = 1
//                 addingProductsTemplate(findProductType, productsStructure, productsWrapper)
//                 setpagination(findProductType)
//                 setinputNumberRow(findProductType);
//                 setinputNumberRow(findProductType)
//                 setBtnNextPrev(findProductType)
//                 searchInput.value = ""
//             } else {
//                 alert("Your search is not found. Please search carefully")
//             }
//         }
//     })
// }

searchInput.addEventListener("input", (event) => {
    let copyProducts = [...products]

    let productsSearchResult = searchInProducts(copyProducts, event.target.value, "productIntroduction")

    if (productsSearchResult.length) {
        addingProductsTemplate(productsSearchResult, productsStructure, productsWrapper)
    } else {
        productsWrapper.innerHTML = `<div class="alert alert-danger">هیچ دوره‌ای برای این جستوجوی  شما  وجود ندارد :/</div>`
    }
})
// searchProducts(products)


console.log(optionSelect.value);

// if (optionSelect.value === "All") {
//     if (currentPage === null) {
//         currentPage = 1
//     } else {
//         currentPage = currentPage
//     }
//     console.log(productsBasedPagination);



//     setpagination(productsBasedPagination)
//     setinputNumberRow(productsBasedPagination)
//     setBtnNextPrev(productsBasedPagination)
//     saveToLocalStorage("FilteredProducts", productsBasedPagination)
//     saveToLocalStorage("currentPage", currentPage)
//     addingCurrentPageByUser(productsBasedPagination)
// };









window.addEventListener('load', function () {


    addingActiveOptionInSelectBoxByUser(productsFilter)
    addingProductsFilteredbyUser(productsFilter)
    addingCurrentPageByUser(productsFilter)
    addingShowProductCountbyUser(products)



    addingProductsTemplate(productsBasedPagination, productsStructure, productsWrapper)
}) 
