import { showAuthenticationRequiredAlert, getToken } from "./func/utils.js";
import { addingProductsTemplate } from "./func/shared.js";

const favoriteProductContainer = document.querySelector('.favorite-product-container');
const wrapperPagination = document.querySelector(".shop-products__number-pagination");
let productsStructure = "row";
let productsFavorite = [];
let productsFavoritePagination = {};

const fetchGetFavoriteProduct = async (page = 1, limit = 4) => {
    const token = getToken();
    favoriteProductContainer.innerHTML = "";
    favoriteProductContainer.classList.add("row-container--center");
    favoriteProductContainer.classList.remove("row-container");
    wrapperPagination.innerHTML = "";
    favoriteProductContainer.innerHTML = `<div class="loader-bars loader-products-favorite section-title"></div>`;
    document.querySelector('.loader-products-favorite').scrollIntoView({ behavior: "smooth", block: "start" });

    if (!token) {
        return { data: { favorites: [] } };
    }
    const headers = {
        'Content-Type': 'application/json',
    };

    if (token) {
        headers['authorization'] = `Bearer ${token}`;
    }

    try {
        const response = await fetch(`https://furniro-6x7f.onrender.com/product/favorites?page=${page}&limit=${limit}`, {
            method: "GET",
            headers: headers
        });

        if (!response.ok) {
            return { data: { favorites: [] } };
        }

        const favoriteData = await response.json();
        favoriteProductContainer.classList.remove("row-container--center");
        favoriteProductContainer.classList.add("row-container");
        addingProductsTemplate(favoriteData.data.favorites, productsStructure, favoriteProductContainer);
        addingPaginationTemplate(page, wrapperPagination, favoriteData.data.pagination.totalPage, limit);
        return favoriteData;
    } catch (error) {
        showAuthenticationRequiredAlert();
    }
};

const addingPaginationTemplate = (currentPage, wrapperPagination, totalPage, limit = 4) => {
    wrapperPagination.innerHTML = "";

    for (let counter = 1; counter < totalPage + 1; counter++) {
        wrapperPagination.insertAdjacentHTML('beforeend', `
            ${counter === Number(currentPage) ? `
            <li class="shop-products__pagination-box-btn box-shadow shop-products__pagination-box--active ">
                <a onclick="changePage(${counter}, ${limit})" class="shop-product-button shop-product-button--active">
                ${counter}
                </a>
            </li>
              ` : `
            <li class="shop-products__pagination-box-btn box-shadow ">
                <a onclick="changePage(${counter}, ${limit})" class="shop-product-button">
              ${counter}
                </a>    
            </li >
                `}
        `);
    }
};

const changePage = async (page, limit) => {
    const favoriteData = await fetchGetFavoriteProduct(page, limit);
    productsFavorite = favoriteData.data.favorites;
    productsFavoritePagination = favoriteData.data.pagination;

    addingProductsTemplate(productsFavorite, productsStructure, favoriteProductContainer);
    addingPaginationTemplate(page, wrapperPagination, productsFavoritePagination.totalPage, limit);
};

window.addEventListener("load", async () => {
    if (favoriteProductContainer) {
        const limit = 4;
        const favoriteData = await fetchGetFavoriteProduct(1, limit);

        productsFavorite = favoriteData.data.favorites;
        productsFavoritePagination = favoriteData.data.pagination;

        changePage(productsFavoritePagination.page, productsFavoritePagination.limit);
    }
});

export default fetchGetFavoriteProduct;
window.changePage = changePage;