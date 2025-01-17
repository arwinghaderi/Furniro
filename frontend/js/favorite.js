import { addingProductsTemplate } from "./func/shared.js"
import { getToken } from "./func/utils.js"
import { showAuthenticationRequiredAlert } from "./func/utils.js"

const fetchGetFavoriteProduct = async () => {
    const token = getToken();

    if (!token) {
        return { cart: { items: [] } };
    }
    const headers = {
        'Content-Type': 'application/json',
    };

    if (token) {
        headers['authorization'] = `Bearer ${token}`;
    }

    try {
        const response = await fetch("https://furniro-6x7f.onrender.com/product/favorites/", {
            method: "GET",
            headers: headers
        })

        if (!response.ok) {
            return { cart: { items: [] } };
        }

        const favoriteData = await response.json()
        return favoriteData.data.favorites.items
    } catch (error) {
        showAuthenticationRequiredAlert()
    }
}

window.addEventListener("load", async () => {
    const favoriteProductContainer = document.querySelector('.favorite-product-container');

    if (favoriteProductContainer) {
        let productsFavorite = await fetchGetFavoriteProduct();
        let productsStructure = "row";
        addingProductsTemplate(productsFavorite, productsStructure, favoriteProductContainer);
    }
})

export default fetchGetFavoriteProduct