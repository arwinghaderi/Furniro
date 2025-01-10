import { addingProductsTemplate, productsSorting } from "../js/func/shared.js"
// import { products } from "../js/db/data.js"


import {
    saveToLocalStorage,
    getFromLocalStorage,
    searchInProducts,
    getCountProductsCart, selectionPaginationPageByUser, showSwal, getUrlParam
} from "./func/utils.js"

let $ = document
let shopFilterbox = $.querySelector(".shop-filter")
let boxFilterSelect = $.querySelector(".select-container")
let iconFilter = $.querySelector(".shop-filter__svg-icon--filter")

iconFilter.addEventListener("click", function (event) {
    event.preventDefault();
    shopFilterbox.classList.toggle("shop-filter--active");
    boxFilterSelect.classList.toggle("box-filter__select--active");
    fetchCategory()
});

const productsWrapper = $.querySelector(".row-container")
const wrapperPagination = $.querySelector(".shop-products__number-pagination")
const numberShowProduct = $.querySelector(".shop-filter__input--number")
const resultShowProducts = document.querySelector(".shop-filter__result-text")
const nextContainer = $.querySelector(".shop-products__Next")
const prevContainer = $.querySelector(".shop-products__prev")
const customSelected = document.querySelector(".custom-selected")



let productsStructure = 'row'

let paginationTool = { wrapperPagination, resultShowProducts, nextContainer, prevContainer, productsWrapper, productsStructure }

const fetchProducts = async (page = 1, limit = 4, category = '', title = '') => {
    productsWrapper.innerHTML = `<div class="loader-products section-title"></div>`
    document.querySelector('.loader-products').scrollIntoView({ behavior: "smooth", block: "start" });
    try {
        const url = new URL(`https://furniro-6x7f.onrender.com/product/`);
        url.searchParams.append('page', page);
        url.searchParams.append('limit', limit);

        if (category) {
            url.searchParams.append('category', category);
        }
        if (title) {
            url.searchParams.append('title', title);
        }

        const response = await fetch(url);

        if (!response.ok) {
            let message = "An unexpected error occurred. Refresh the page."
            throw new Error(message)
        }
        const dataProducts = await response.json();

        const indexEnd = dataProducts.data.pagination.limit * dataProducts.data.pagination.page
        const products = dataProducts.data.pagination.totalProducts
        const indexStart = (dataProducts.data.pagination.limit * dataProducts.data.pagination.page) - dataProducts.data.pagination.limit

        paginationTool.resultShowProducts.innerHTML = `Showing  ${indexStart}  --   ${indexEnd > products ? products : indexEnd}   of  ${products}  results`

        return dataProducts

    } catch (error) {
        showSwal(`${error.message}`, "error", "Refresh the page.", "../Pages/shop.html")
    } finally {

    }

}

const addingPaginationTemplate = (currentPage, paginationTool, totalPage, limit = 4, userSearchValue = "") => {
    paginationTool.wrapperPagination.innerHTML = ""
    paginationTool.nextContainer.innerHTML = ""
    paginationTool.prevContainer.innerHTML = ""

    for (let counter = 1; counter < totalPage + 1; counter++) {
        paginationTool.wrapperPagination.insertAdjacentHTML('beforeend', `
            ${counter === Number(currentPage) ? `
            <li class="shop-products__pagination-box-btn box-shadow shop-products__pagination-box--active ">
                <a onclick="addParamToUrl('page',${counter},${limit},'${String(userSearchValue)}'})" class="shop-product-button shop-product-button--active">
                ${counter}
                </a>
            </li>
              ` : `
            <li class="shop-products__pagination-box-btn box-shadow ">
                <a onclick="addParamToUrl('page',${counter},${limit},'${String(userSearchValue)}')" class="shop-product-button">
              ${counter}
                </a>    
            </li >
                `
            }
    `)
    }
}


const addParamToUrl = async (param, value, limit, userSearchValue) => {
    console.log(limit);
    let url = new URL(location.href);
    let searchParams = url.searchParams;

    searchParams.set(param, value);
    const activeOption = document.querySelector(".option--active");
    const categoryId = activeOption ? activeOption.getAttribute("data-id") : null;

    if (categoryId) {
        searchParams.set('category', categoryId);
    }

    url.search = searchParams.toString();
    history.pushState(null, '', url);
    console.log(value, limit, categoryId, userSearchValue);
    const dataProducts = await fetchProducts(value, limit, categoryId, userSearchValue);

    console.log(dataProducts.data.pagination.limit);
    addingProductsTemplate(dataProducts.data.products, paginationTool.productsStructure, paginationTool.productsWrapper)
    addingPaginationTemplate(dataProducts.data.pagination.page, paginationTool, dataProducts.data.pagination.totalPage, limit, userSearchValue)
    addingPrevNextButtonTemplate(dataProducts.data.pagination.page, dataProducts.data.pagination.totalPage, limit, userSearchValue)
}

const addingPrevNextButtonTemplate = (currentPage = 1, numberOfPagesOfHouses, limit, userSearchValue) => {

    if (!numberOfPagesOfHouses || numberOfPagesOfHouses < 1) {
        return false
    }

    nextContainer.innerHTML = ""
    prevContainer.innerHTML = ""

    paginationTool.nextContainer.insertAdjacentHTML("beforeend", `<div  class="shop-products__next-btn-box box-shadow" > <a class="shop-products__button-next-text">Next</a> </div> `)

    paginationTool.prevContainer.insertAdjacentHTML("afterbegin", `<div class="shop-products__prev-btn-box box-shadow" > <a class="shop-products__button-prev-text">Prev</a></ div> `)


    let nextBtn = $.querySelector(".shop-products__next-btn-box")
    let pervBtn = $.querySelector(".shop-products__prev-btn-box")

    if (numberOfPagesOfHouses === 1) {
        nextBtn.style.display = "none"
        pervBtn.style.display = "none"
    } else {
        nextBtn.style.display = "flex"
        pervBtn.style.display = "flex"
    }

    const nextPrevTemaplte = { nextBtn, pervBtn }

    currentPage === 1 ? pervBtn.style.display = "none" : pervBtn.style.display = "flex"
    currentPage === numberOfPagesOfHouses ? nextBtn.style.display = "none" : nextBtn.style.display = "flex"

    handlerNextButtonByUser(currentPage, nextPrevTemaplte, limit, userSearchValue)
    handlerPrevButtonByUser(currentPage, nextPrevTemaplte, limit, userSearchValue)
}

const handlerNextButtonByUser = (currentPage, nextPrevTemaplte, limit, userSearchValue) => {
    nextPrevTemaplte.nextBtn.addEventListener("click", async () => {
        currentPage++;
        await addParamToUrl('page', currentPage, limit, userSearchValue);
    })
}

const handlerPrevButtonByUser = (currentPage, nextPrevTemaplte, limit, userSearchValue) => {
    nextPrevTemaplte.pervBtn.addEventListener("click", async () => {
        currentPage--;
        await addParamToUrl('page', currentPage, limit, userSearchValue);
    })
}

// saveToLocalStorage("currentPage", dataProducts.data.pagination.page)
// saveToLocalStorage("totalPage", dataProducts.data.pagination.totalPage)
// saveToLocalStorage("showCountProducts", dataProducts.data.pagination.limit)
// saveToLocalStorage("products", dataProducts.data.products)


// **سلکت باکس
// const optionSelect = $.querySelector(".box-filter__select")

// optionSelect.addEventListener('change', async event => {
//     // currentPage = 1;
//     // saveToLocalStorage("currentPage", currentPage);

//     const optionActive = event.target.value;
//     // saveToLocalStorage("optionActiveSelectBox", optionActive);
//     // addingActiveOptionInSelectBoxByUser();

//     // numberProductsShown = 8;
//     // saveToLocalStorage("showCountProducts", numberProductsShown);
//     // ChangeInputPlaceholderToUserChange();

//     let currentPage = 1
//     let numberProductsShown = 4
//     console.log(optionActive);
//     // فراخوانی داده‌ها از API با استفاده از پارامتر category
//     const productsFilter = await fetchProducts(currentPage, numberProductsShown, optionActive);
//     // saveToLocalStorage("FilteredProducts", productsFilter.data.products);


//     console.log(productsFilter.data.products);
//     addingProductsTemplate(productsFilter.data.products, productsStructure, productsWrapper);

//     // به‌روزرسانی قالب صفحه‌بندی
//     addingPaginationTemplate(productsFilter.data.pagination.page, paginationTool, productsFilter.data.pagination.totalPage);
//     addingPrevNextButtonTemplate(currentPage, productsFilter.data.pagination.totalPage);
// });
const customOptions = document.querySelector(".custom-options");

const fetchCategory = async () => {
    customOptions.innerHTML = `<div class="option" >Loading...</div>`

    try {
        const response = await fetch("https://furniro-6x7f.onrender.com/category/")
        const categoryData = await response.json()

        if (!response.ok) {
            customOptions.insertAdjacentHTML("beforeend", `<div class="option">No categories found.</div>`);
        }
        customOptions.innerHTML = '';

        categoryData.data.categories.map((categorie, index) => {
            const activeClass = index === 0 ? 'option--active' : '';

            customOptions.insertAdjacentHTML("beforeend", `<div  class="option ${activeClass}" data-id="${categorie._id}"> ${categorie.title}</div > `);
        })
        addClickEventToOptions()
    } catch (error) {
        showSwal(`No categories found`, "error", "Refresh the page.", "../Pages/shop.html")
        customOptions.insertAdjacentHTML("beforeend", `<div class="option">No categories found.</div>`);
    }
}

const addClickEventToOptions = () => {
    const optionsList = document.querySelectorAll(".custom-options .option");

    optionsList.forEach((option) => {
        option.addEventListener('click', async () => {
            customSelected.innerHTML = option.innerHTML;
            const activeOption = document.querySelector(".option--active");

            if (activeOption) {
                activeOption.classList.remove("option--active");
            }

            option.classList.add("option--active");
            customOptions.classList.remove('custom-options--active');
            arrow.classList.remove("arrow-down--open");

            const categoryId = option.getAttribute('data-id');


            const limit = getFromLocalStorage("showCountProducts") || 4

            const productsFilter = await fetchProducts(1, limit, categoryId);

            let currentPage = 1
            addingProductsTemplate(productsFilter.data.products, productsStructure, productsWrapper);
            addingPaginationTemplate(productsFilter.data.pagination.page, paginationTool, productsFilter.data.pagination.totalPage, productsFilter.data.pagination.limit);
            addingPrevNextButtonTemplate(currentPage, productsFilter.data.pagination.totalPage, productsFilter.data.pagination.limit);
        });
    });
}

// const ChangeInputPlaceholderToUserChange = () => {
//     numberProductsShown = getFromLocalStorage("showCountProducts")
//     numberShowProduct.value = numberProductsShown
//     numberShowProduct.setAttribute("placeholder", numberProductsShown)
// }

numberShowProduct.addEventListener("input", async (event) => {
    let numberProductsShown = parseInt(event.target.value);
    numberProductsShown = numberProductsShown || 4

    if (numberProductsShown < 1 || numberProductsShown > 14) {
        numberProductsShown = 4
        event.target.value = 4
    } else {
        Number(event.target.value);
    }


    if (event.target) {
        let currentPage = 1;
        // saveToLocalStorage("currentPage", currentPage);
        saveToLocalStorage("showCountProducts", event.target.value);
        const activeOption = document.querySelector(".option--active");

        const newCategoryId = activeOption ? activeOption.getAttribute("data-id") : null;
        const userSearchValue = document.querySelector(".shop-filter__input--text").value || ""


        const productsFilter = await fetchProducts(currentPage, numberProductsShown, newCategoryId, userSearchValue);


        // saveToLocalStorage("FilteredProducts", productsFilter.data.products);

        addingProductsTemplate(productsFilter.data.products, productsStructure, productsWrapper);

        addingPaginationTemplate(productsFilter.data.pagination.page, paginationTool, productsFilter.data.pagination.totalPage, numberProductsShown, userSearchValue);

        addingPrevNextButtonTemplate(currentPage, productsFilter.data.pagination.totalPage, productsFilter.data.pagination.limit, userSearchValue);

        // ChangeInputPlaceholderToUserChange();
    }
    return false;

});



const addingActiveOptionInSelectBoxByUser = () => {
    let data = getFromLocalStorage("optionActiveSelectBox")
    if (data) {
        customSelected.value = data
    }
    else {
        customSelected.value = "All"
    }
}

// const addingProductsFilteredbyUser = () => {
//     filterProducts = getFromLocalStorage('FilteredProducts')
//     currentPage = getFromLocalStorage('currentPage')
//     numberProductsShown = getFromLocalStorage("showCountProducts")

//     getCurrentPageAndShowCountProducts(currentPage, numberProductsShown)

//     if (filterProducts) {
//         filteredProductPagination = ProductsWithPaginationCalculations(filterProducts, paginationTool)

//         // showProductsCount(filterProducts)
//         // addingActiveOptionInSelectBoxByUser()
//         addingProductsTemplate(filteredProductPagination, productsStructure, productsWrapper)
//     }
//     else {
//         const products = getFromLocalStorage('products')
//         console.log(products);
//         console.log(products);

//         // saveToLocalStorage("FilteredProducts", products)

//         // showProductsCount(products)
//         productsBasedPagination = ProductsWithPaginationCalculations(products, paginationTool)
//         addingProductsTemplate(productsBasedPagination, productsStructure, productsWrapper)
//     }
// }

const structhreIcons = document.querySelectorAll(".shop-filter__svg-icon")
structhreIcons.forEach((icon) => {
    icon.addEventListener("click", () => {

        document.querySelector(".shop-filter__svg-icon--active").classList.remove("shop-filter__svg-icon--active")

        icon.classList.add("shop-filter__svg-icon--active")

        addingTemplatesBasedOnProductStructure(icon.id)
    })
})

const addingTemplatesBasedOnProductStructure = (target) => {
    // filterProducts = getFromLocalStorage('FilteredProducts')
    saveToLocalStorage("structure", target)

    if (target === "row") {
        productsStructure = "row"
        fetchProducts().then(product => {
            let currentPage = 1

            let products = product.data.products
            addingProductsTemplate(products, productsStructure, productsWrapper)

            addingPaginationTemplate(product.data.pagination.page, paginationTool, product.data.pagination.totalPage, product.data.pagination.limit, "");

            addingPrevNextButtonTemplate(currentPage, product.data.pagination.totalPage, product.data.pagination.limit, "");

        })

    } else {
        productsStructure = "col"
        fetchProducts().then(product => {
            let currentPage = 1

            let products = product.data.products
            addingProductsTemplate(products, productsStructure, productsWrapper)

            addingPaginationTemplate(product.data.pagination.page, paginationTool, product.data.pagination.totalPage, product.data.pagination.limit, "");

            addingPrevNextButtonTemplate(currentPage, product.data.pagination.totalPage, product.data.pagination.limit, "");

        })
    }
}

const searchInput = $.querySelector(".shop-filter__input--text")
searchInput.addEventListener("input", async (event) => {

    let userSearchValue = event.target.value
    const limit = $.querySelector(".shop-filter__input--number").value || 4

    if (userSearchValue) {
        let currentPage = 1;
        // saveToLocalStorage("currentPage", currentPage);

        if (userSearchValue === "") {

            const productsSearchUser = await fetchProducts(currentPage, limit, "", userSearchValue);
            addingProductsTemplate(productsSearchUser.data.products, productsStructure, productsWrapper);

            addingPaginationTemplate(productsSearchUser.data.pagination.page, paginationTool, productsSearchUser.data.pagination.totalPage, limit);

            addingPrevNextButtonTemplate(currentPage, productsSearchUser.data.pagination.totalPage, productsSearchUser.data.pagination.limit);
        } else {


            saveToLocalStorage("userSearchValue", userSearchValue);
            const productsSearchUser = await fetchProducts(currentPage, limit, "", userSearchValue);
            // saveToLocalStorage("FilteredProducts", productsFilter.data.products);

            // const filteredProductPagination = ProductsWithPaginationCalculations(productsFilter.data.products, paginationTool);
            addingProductsTemplate(productsSearchUser.data.products, productsStructure, productsWrapper);

            addingPaginationTemplate(productsSearchUser.data.pagination.page, paginationTool, productsSearchUser.data.pagination.totalPage, limit, userSearchValue);

            addingPrevNextButtonTemplate(currentPage, productsSearchUser.data.pagination.totalPage, productsSearchUser.data.pagination.limit, userSearchValue);

        }
    }

})


window.addEventListener('load', function () {
    if (getFromLocalStorage('currentPage') && getFromLocalStorage('showCountProducts')) {
        currentPage = getFromLocalStorage('currentPage')
        ChangeInputPlaceholderToUserChange()
        addingProductsFilteredbyUser()
    } else {
        fetchProducts().then(product => {
            let products = product.data.products
            addingProductsTemplate(products, productsStructure, productsWrapper)
            addingPaginationTemplate(product.data.pagination.page, paginationTool, product.data.pagination.totalPage)

            let currentPage = 1
            addingPrevNextButtonTemplate(currentPage, product.data.pagination.totalPage, product.data.pagination.limit);

        })
    }
})




window.addParamToUrl = addParamToUrl
window.selectionPaginationPageByUser = selectionPaginationPageByUser;