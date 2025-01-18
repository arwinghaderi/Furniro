import {
    getFromLocalStorage,
    showAuthenticationRequiredAlert,
} from "./func/utils.js"

import { addingProductsTemplate } from "./func/shared.js"

import { getToken } from "./func/utils.js"

let productsWrapper = document.querySelector(".row-container")
let productsStructure = 'row'
let productsShowMore

let productsHomeContainer = document.querySelector(".products-home-container")

const addingProductsByUser = () => {
    productsShowMore = getFromLocalStorage("pageHomeProducts")

    // addingProductsTemplate(productsShowMore, productsStructure, productsWrapper)
}

const fetchGetProducts = async () => {
    let token = getToken();
    try {
        const url = new URL(`https://furniro-6x7f.onrender.com/`);

        console.log(url);

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
        const lastFourProducts = dataProducts.data.products.slice(0, 4)
        addingProductsTemplate(lastFourProducts, "row", productsHomeContainer)
    } catch (error) {
        showSwal(`${error.message}`, "error", "Refresh the page.", "../Pages/shop.html");
    }
}

window.addEventListener("load", () => {
    fetchGetProducts()
})