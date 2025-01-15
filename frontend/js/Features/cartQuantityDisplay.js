import { getToken } from "../func/utils.js";

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

window.addEventListener("DOMContentLoaded", () => {
    getCountProductsCart();
})

export { getCountProductsCart, fetchGetCartProducts };