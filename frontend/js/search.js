const inputSearch = document.querySelector(".input-search");
const searchProductsContainer = document.querySelector(".search-product-container");
const wrapperPagination = document.querySelector(".shop-products__number-pagination");
let productsSearch = [];
let productsSearchPagination = {};

import { addingProductsTemplate } from "./func/shared.js"

const fetchProductsSearch = async (title = "", page = 1, limit = 4) => {

    searchProductsContainer.innerHTML = "";
    searchProductsContainer.classList.add("row-container--center");
    searchProductsContainer.classList.remove("row-container");
    wrapperPagination.innerHTML = "";
    searchProductsContainer.innerHTML = `<div class="loader-bars loader-products-search section-title"></div>`;
    document.querySelector('.loader-products-search').scrollIntoView({ behavior: "smooth", block: "start" });

    const response = await fetch(`https://furniro-6x7f.onrender.com/product/search?title=${title}&page=${page}&limit=${limit}`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const dataProductsSearch = await response.json();
    searchProductsContainer.classList.remove("row-container--center");
    return dataProductsSearch;
};

let debounceTimeout;

inputSearch.addEventListener("input", (event) => {
    const title = event.target.value;
    clearTimeout(debounceTimeout);

    debounceTimeout = setTimeout(() => {
        fetchProductsSearch(title).then(datas => {
            if (datas.length === 0) {
                searchProductsContainer.innerHTML = ` 
                    <div class="container">
                        <div class="empty-products box-shadow">
                            <h2>No Search Performed</h2>
                            <p>Please start by entering a keyword in the search box above.</p>
                            <p>You'll see the results here once you initiate a search.</p>
                            <img src="../images/images.png" alt="No search performed" />
                        </div>
                    </div>`
            } else {
                let productsSearch = datas.data.products
                let productsPagination = datas.data.pagination
                addingProductsTemplate(productsSearch, "row", searchProductsContainer)
                addingPaginationTemplate(title, productsPagination.page, wrapperPagination, productsPagination.totalPage, productsPagination.limit)
            }
        });
    }, 500);
});

const addingPaginationTemplate = (title = "", currentPage, wrapperPagination, totalPage, limit = 4) => {
    wrapperPagination.innerHTML = ""

    for (let counter = 1; counter < totalPage + 1; counter++) {
        wrapperPagination.insertAdjacentHTML('beforeend', `
            ${counter === Number(currentPage) ? `
            <li class="shop-products__pagination-box-btn box-shadow shop-products__pagination-box--active ">
                <a onclick="changePage('${title}',${counter}, ${limit})" class="shop-product-button shop-product-button--active">
                ${counter}
                </a>
            </li>
              ` : `
            <li class="shop-products__pagination-box-btn box-shadow ">
                <a onclick="changePage('${title}',${counter}, ${limit})" class="shop-product-button">
              ${counter}
                </a>    
            </li >
                `}
        `);
    }
};

const changePage = async (title = "", page, limit) => {
    const searchDatas = await fetchProductsSearch(title, page, limit);
    productsSearch = searchDatas.data.products;
    productsSearchPagination = searchDatas.data.pagination;

    addingProductsTemplate(productsSearch, "row", searchProductsContainer);
    addingPaginationTemplate(title, page, wrapperPagination, productsSearchPagination.totalPage, limit);
};

window.addEventListener("load", () => {

})

window.changePage = changePage;