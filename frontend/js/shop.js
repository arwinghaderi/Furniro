import { addingProductsTemplate } from "../js/func/shared.js"
import {
    saveToLocalStorage,
    getFromLocalStorage, saveStructureState, getSavedStructure,
    showSwal, saveFilterState, getFilterState, getToken
} from "./func/utils.js"

let $ = document
let shopFilterbox = $.querySelector(".shop-filter")
let boxFilterSelect = $.querySelector(".select-container")
let iconFilter = $.querySelector(".shop-filter__svg-icon--filter")

const productsWrapper = $.querySelector(".row-container")
const wrapperPagination = $.querySelector(".shop-products__number-pagination")
const numberShowProduct = $.querySelector(".shop-filter__input--number")
const resultShowProducts = document.querySelector(".shop-filter__result-text")
const nextContainer = $.querySelector(".shop-products__Next")
const prevContainer = $.querySelector(".shop-products__prev")
const customSelected = document.querySelector(".custom-selected")

let productsStructure = 'row'

let paginationTool = { wrapperPagination, resultShowProducts, nextContainer, prevContainer, productsWrapper, productsStructure }

iconFilter.addEventListener("click", function (event) {
    event.preventDefault();
    shopFilterbox.classList.toggle("shop-filter--active");
    boxFilterSelect.classList.toggle("box-filter__select--active");
    fetchCategory();
    setActiveOptionUsingObserver()
});

const setActiveOptionUsingObserver = () => {
    const savedState = getFilterState();
    let { categoryId } = savedState;

    if (categoryId) {
        const observer = new MutationObserver((mutationsList, observer) => {

            const activeOption = document.querySelector(`.custom-options .option[data-id="${categoryId}"]`) || document.querySelector(".option");

            if (activeOption) {
                const previousActiveOption = document.querySelector(".option--active");
                if (previousActiveOption) {
                    previousActiveOption.classList.remove("option--active");
                }

                activeOption.classList.add('option--active');
                customSelected.innerHTML = activeOption.innerHTML;
                customOptions.classList.remove('custom-options--active');
                observer.disconnect();
            }
        });
        observer.observe(document.querySelector('.custom-options'), { childList: true, subtree: true });
    }
};

const updateActiveClass = categoryId => {
    const activeOption = document.querySelector(`.custom-options .option[data-id="${categoryId}"]`);
    if (activeOption) {
        const previousActiveOption = document.querySelector(".option--active");
        if (previousActiveOption) {
            previousActiveOption.classList.remove("option--active");
        }
        activeOption.classList.add("option--active"); customSelected.innerHTML = activeOption.innerHTML;
    }
};

const fetchProducts = async (page = 1, limit = 4, category = '', title = '') => {
    let token = getToken();

    productsWrapper.classList.add("row-container--center");
    productsWrapper.classList.remove("row-container");
    wrapperPagination.innerHTML = "";
    nextContainer.innerHTML = "";
    prevContainer.innerHTML = "";
    productsWrapper.innerHTML = `<div class="loader-bars loader-products section-title"></div>`;

    document.querySelector('.loader-products').scrollIntoView({ behavior: "smooth", block: "start" });
    paginationTool.resultShowProducts.innerHTML = ` <div class="section-title">Loading...</div>`;

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

        const headers = {
            'Content-Type': 'application/json',
        };
        if (token) {
            headers['authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(url, {
            method: "GET",
            headers: headers
        });

        if (!response.ok) {
            let message = "An unexpected error occurred. Refresh the page.";
            throw new Error(message);
        }
        const dataProducts = await response.json();

        paginationTool.resultShowProducts.innerHTML = "";

        const indexEnd = dataProducts.data.pagination.limit * dataProducts.data.pagination.page;
        const products = dataProducts.data.pagination.totalProducts;
        const indexStart = (dataProducts.data.pagination.limit * dataProducts.data.pagination.page) - dataProducts.data.pagination.limit;

        paginationTool.resultShowProducts.innerHTML = `Showing ${indexStart} -- ${indexEnd > products ? products : indexEnd} of ${products} results`;
        productsWrapper.classList.remove("row-container--center");
        productsWrapper.classList.add("row-container");

        console.log("Is Favorite:", dataProducts.data.products[0]?.isFavorite);

        return dataProducts;
    } catch (error) {
        showSwal(`${error.message}`, "error", "Refresh the page.", "../Pages/shop.html");
    }
};

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
    let url = new URL(location.href);
    let searchParams = url.searchParams;
    searchParams.set(param, value);
    url.search = searchParams.toString();

    const savedState = getFilterState();
    let { categoryIdLocal } = savedState;

    const activeOption = document.querySelector(".option--active");
    const categoryId = activeOption ? activeOption.getAttribute("data-id") : categoryIdLocal;

    saveFilterState(categoryId, value, limit, userSearchValue);

    const dataProducts = await fetchProducts(value, limit, categoryId, userSearchValue);

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
    const optionsList = document.querySelectorAll(".option");
    const customOptions = document.querySelector(".custom-options");

    optionsList.forEach((option) => {
        option.addEventListener('click', async () => {
            customSelected.innerHTML = option.innerHTML;
            const activeOption = document.querySelector(".option--active");

            if (activeOption) {
                activeOption.classList.remove("option--active");
            }
            option.classList.add('option--active');

            let currentPage = getFromLocalStorage("currentPage") || 1

            customOptions.classList.add('custom-options--hide');

            const categoryId = option.getAttribute('data-id');

            const limit = getFromLocalStorage("showCountProducts") || 4

            saveFilterState(categoryId, currentPage, limit, "");

            const productsFilter = await fetchProducts(1, limit, categoryId, "");

            addingProductsTemplate(productsFilter.data.products, productsStructure, productsWrapper);
            addingPaginationTemplate(productsFilter.data.pagination.page, paginationTool, productsFilter.data.pagination.totalPage, productsFilter.data.pagination.limit);
            addingPrevNextButtonTemplate(currentPage, productsFilter.data.pagination.totalPage, productsFilter.data.pagination.limit);
            updateActiveClass(categoryId)
        });
    });
}

numberShowProduct.addEventListener("input", async (event) => {
    let numberProductsShown = parseInt(event.target.value);
    const savedState = getFilterState();

    numberProductsShown = numberProductsShown || 4

    if (numberProductsShown < 1 || numberProductsShown > 14) {
        numberProductsShown = 4
        event.target.value = 4
    } else {
        Number(event.target.value);
    }


    if (event.target) {
        let currentPage = 1;

        saveToLocalStorage("showCountProducts", event.target.value);

        let { categoryId } = savedState;
        const userSearchValue = document.querySelector(".shop-filter__input--text").value || ""

        const productsFilter = await fetchProducts(currentPage, numberProductsShown, categoryId, userSearchValue);

        saveFilterState(categoryId, currentPage, numberProductsShown, userSearchValue);

        addingProductsTemplate(productsFilter.data.products, productsStructure, productsWrapper);

        addingPaginationTemplate(productsFilter.data.pagination.page, paginationTool, productsFilter.data.pagination.totalPage, numberProductsShown, userSearchValue);

        addingPrevNextButtonTemplate(currentPage, productsFilter.data.pagination.totalPage, productsFilter.data.pagination.limit, userSearchValue);
    }
    return false;

});

const structhreIcons = document.querySelectorAll(".shop-filter__svg-icon")
structhreIcons.forEach((icon) => {
    icon.addEventListener("click", () => {
        document.querySelector(".shop-filter__svg-icon--active").classList.remove("shop-filter__svg-icon--active");

        icon.classList.add("shop-filter__svg-icon--active");

        saveStructureState(icon.id);

        addingTemplatesBasedOnProductStructure(icon.id);
    });
});

const setActiveStructure = () => {
    const savedStructure = getSavedStructure();
    if (savedStructure) {
        const activeIcon = document.getElementById(savedStructure);
        if (activeIcon) {
            document.querySelector(".shop-filter__svg-icon--active").classList.remove("shop-filter__svg-icon--active");
            activeIcon.classList.add("shop-filter__svg-icon--active");
        }
    }
};

const addingTemplatesBasedOnProductStructure = (target) => {
    saveToLocalStorage("structure", target)

    if (target === "row") {
        productsStructure = "row"
        initializeFilters()
    } else {
        productsStructure = "col"
        initializeFilters()
    }
}

const searchInput = $.querySelector(".shop-filter__input--text")
searchInput.addEventListener("input", async (event) => {
    let userSearchValue = event.target.value
    const limit = $.querySelector(".shop-filter__input--number").value || 4
    let currentPage = 1;

    if (event.target.value === "") {
        let categoryId = "675988fecccbf76836e8b6e1"

        const productsSearchUser = await fetchProducts(currentPage, limit, categoryId, userSearchValue);
        setActiveOptionUsingObserver()
        addingProductsTemplate(productsSearchUser.data.products, productsStructure, productsWrapper);
        saveFilterState(categoryId, currentPage, limit, event.target.value);
        addingPaginationTemplate(productsSearchUser.data.pagination.page, paginationTool, productsSearchUser.data.pagination.totalPage, limit);
        addingPrevNextButtonTemplate(currentPage, productsSearchUser.data.pagination.totalPage, productsSearchUser.data.pagination.limit);
        updateActiveClass(categoryId)
    } else {
        const productsSearchUser = await fetchProducts(currentPage, limit, "", userSearchValue);

        saveFilterState("", currentPage, limit, event.target.value);

        addingProductsTemplate(productsSearchUser.data.products, productsStructure, productsWrapper);

        addingPaginationTemplate(productsSearchUser.data.pagination.page, paginationTool, productsSearchUser.data.pagination.totalPage, limit, userSearchValue);

        addingPrevNextButtonTemplate(currentPage, productsSearchUser.data.pagination.totalPage, productsSearchUser.data.pagination.limit, userSearchValue);
    }
})

const initializeFilters = async () => {
    setActiveStructure();
    const savedState = getFilterState();

    let { categoryId, currentPage, limit, searchValue } = savedState;

    if (!categoryId || !currentPage > 1) {
        categoryId = getAllProducts();
    }

    let productsFilter = await fetchProducts(currentPage || 1, limit || 4, categoryId, searchValue);
    fetchCategory()
    setActiveOptionUsingObserver();
    addingProductsTemplate(productsFilter.data.products, productsStructure, productsWrapper);
    addingPaginationTemplate(
        productsFilter.data.pagination.page,
        paginationTool,
        productsFilter.data.pagination.totalPage,
        limit,
        searchValue
    );
    addingPrevNextButtonTemplate(
        productsFilter.data.pagination.page,
        productsFilter.data.pagination.totalPage,
        limit,
        searchValue
    );
};

document.addEventListener('DOMContentLoaded', initializeFilters);

const getAllProducts = () => {
    fetchProducts().then(product => {
        let products = product.data.products
        addingProductsTemplate(products, productsStructure, productsWrapper)
        addingPaginationTemplate(product.data.pagination.page, paginationTool, product.data.pagination.totalPage)

        let currentPage = 1
        addingPrevNextButtonTemplate(currentPage, product.data.pagination.totalPage, product.data.pagination.limit);

    })
}

window.addParamToUrl = addParamToUrl