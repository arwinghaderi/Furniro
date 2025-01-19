import { getToken } from "../func/utils.js";
import { showAuthenticationRequiredAlert } from "../func/utils.js";

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

const fetchGetFavoriteProduct = async (page = 1, limit = 4) => {
    const token = getToken();

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
        const favoriteData = await response.json();

        if (!response.ok) {
            return { data: { favorites: [] } };
        }

        return favoriteData;
    } catch (error) {
        showAuthenticationRequiredAlert();
    }
};

const getCountProductsFavorite = async () => {
    const iconCountProductsFavorite = document.querySelector(".nav-bar__count-Product-favorite");
    iconCountProductsFavorite.classList.add("nav-bar__count-Product-favorite--active");
    iconCountProductsFavorite.innerHTML = "⏳";
    iconCountProductsFavorite.classList.add("spinner");

    try {
        const favoriteData = await fetchGetFavoriteProduct(1, 4);
        const totalProductsFavorite = favoriteData?.data?.pagination?.totalFavorites || 0;

        setTimeout(() => {
            iconCountProductsFavorite.classList.remove("spinner");
            iconCountProductsFavorite.innerHTML = totalProductsFavorite;
        }, 1500);
    } catch (error) {
        console.log(error);
        iconCountProductsFavorite.innerHTML = "0";
    }
};

window.addEventListener("DOMContentLoaded", () => {
    getCountProductsCart();
    getCountProductsFavorite()

})

export { getCountProductsCart, fetchGetCartProducts, getCountProductsFavorite };