import { getToken } from "../func/utils.js";
import fetchGetFavoriteProduct from "../favorite.js";

const fetchGetCartProducts = async () => {
    const token = getToken();

    if (!token) {
        return { cart: { items: [] } };
    }

    try {
        const response = await fetch("https://furniro-6x7f.onrender.com/cart/", {
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`
            },
        });
        if (!response.ok) {
            return { data: { cart: { items: [] } } };
        }
        const dataCartProduct = await response.json();
        return dataCartProduct.data;
    } catch (error) {
        return { cart: { items: [] } };
    }
};

const getCountProductsCart = async () => {
    const iconCountProducts = document.querySelector(".nav-bar__count-Product");
    iconCountProducts.classList.add("nav-bar__count-Product--active");
    iconCountProducts.innerHTML = "⏳";
    iconCountProducts.classList.add("spinner");

    const response = await fetchGetCartProducts();
    const productCount = response.cart ? response.cart.items.length : 0;

    setTimeout(() => {
        iconCountProducts.classList.remove("spinner");
        iconCountProducts.innerHTML = ""
        iconCountProducts.innerHTML = productCount;
    }, 1500); // 
};

const getCountProductsFavorite = async () => {
    const iconCountProductsFavorite = document.querySelector(".nav-bar__count-Product-favorite");
    iconCountProductsFavorite.classList.add("nav-bar__count-Product-favorite--active");
    iconCountProductsFavorite.innerHTML = "⏳";
    iconCountProductsFavorite.classList.add("spinner");

    const response = await fetchGetFavoriteProduct();
    const productCount = response.length ? response.length : 0;

    setTimeout(() => {
        iconCountProductsFavorite.classList.remove("spinner");
        iconCountProductsFavorite.innerHTML = ""
        iconCountProductsFavorite.innerHTML = productCount;
    }, 1500);
};

window.addEventListener("DOMContentLoaded", () => {
    getCountProductsCart();
    getCountProductsFavorite()

})

export { getCountProductsCart, fetchGetCartProducts, getCountProductsFavorite };