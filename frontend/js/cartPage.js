import { fetchGetCartProducts, getCountProductsCart } from "./Features/cartQuantityDisplay.js"
import { showDeleteConfirmation, getToken, showSwal, showAuthenticationRequiredAlert } from "./func/utils.js";
import { checkingLoginStatus } from "./auth/utils.js";

const fragment = document.createDocumentFragment();

const addingCartProductsTemplate = async () => {
    const token = getToken();

    let productImage, imageUrl, discountTemplate, subtotal;
    const keeperProductCart = document.querySelector(".product-cart");
    keeperProductCart.classList.add("center")
    keeperProductCart.innerHTML = `<div class="loader-bars loader-cart-page-products section-title"></div>`;
    document.querySelector('.loader-cart-page-products').scrollIntoView({ behavior: "smooth", block: "start" });

    const dataCartProduct = await fetchGetCartProducts();
    const cartProductsItems = dataCartProduct.cart.items;
    keeperProductCart.classList.remove("center")

    keeperProductCart.innerHTML = "";
    if (cartProductsItems.length) {
        cartProductsItems.forEach(item => {
            discountTemplate = `<div class="Discount-product-cart"><span class="Discount-product__number">${item.product.discountPercent}%</span></div>`;
            subtotal = item.product.priceAfterDiscount ? item.product.priceAfterDiscount * item.quantity : item.product.price * item.quantity;
            productImage = item.product.images.find(image => image.hexColorCode === item.color);
            imageUrl = productImage ? `https://furniro-6x7f.onrender.com${productImage.path}` : `https://furniro-6x7f.onrender.com${item.product.images[0].path}`;
            const element = document.createElement("div");

            element.innerHTML = `
                <div class="cart-shop-section__details-product">
                    <div class="cart-shop-section__box-img">
                        <div class="lable-product-box-cart">${item.product.discountPercent ? discountTemplate : ""}</div>
                        <img class="cart-shop-section__img" onerror="this.onerror=null;this.src='https://via.placeholder.com/200?text=Furniture+Store';" src="${imageUrl}" alt="product Image">
                    </div>
                    <div class="cart-shop-section-infomation">
                        <span class="cart-shop-section__product-name">${item.product.name.slice(0, 10)}...</span>
                        <div class="cart-detailes_container">
                            <div class="box-shadow color-box" style="background-color:${item.color}; width: 2.5rem; height: 2.5rem; border-radius: 100%;"></div>
                            <div class="detailes-product__size-btn-box-cart detailes-product__size-btn-box-cart--active">
                                <span class="detailes-product__size-btn-cart detailes-product__size-btn-cart--active">${item.size}</span>
                            </div>
                        </div>
                    </div>
                    <span class="cart-shop-section__product-price">Rs ${item.product.discountPercent ? item.product.priceAfterDiscount.toLocaleString("en") : item.product.price.toLocaleString("en")}</span>
                    <div class="cart-shop-section__product-Quantity-box">
                        <input oninput="fetchProductUpdate(this,'${item._id}','${token}')" min="1" max="5"  class="cart-shop-section__product-Quantity" type="number" value="${item.quantity}">
                    </div>
                    <span class="cart-shop-section__product-Subtotal">Rs. ${subtotal.toLocaleString("en")}</span>
                    <i onclick="removeProductByUser(this,'${item._id}','${token}')" class="fa-solid fa-trash fa-sm icon-delete"></i>
                </div>`;
            fragment.append(element);
        });

        keeperProductCart.append(fragment);
    } else {
        keeperProductCart.insertAdjacentHTML("beforeend", `
            <div class="empty-products box-shadow">
                <h2>Your Cart is Empty</h2>
                <p>It looks like you haven't added any products to your cart yet.</p>
                <p>Browse our products and add some amazing products to your cart.</p>
                <img src="../images/images.png" alt="No products available" onerror="this.onerror=null;this.src='https://via.placeholder.com/200?text=Furniture+Store';">
            </div>
        `);
    }
};

const calculationTotalCart = async () => {
    const TotalPrice = document.querySelector(".cart-shop-section__total-price");
    const subTotalPrice = document.querySelector(".cart-shop-section__sub-total-price");
    subTotalPrice.innerHTML = "Loading...";
    TotalPrice.innerHTML = "Loading...";

    const dataCartProduct = await fetchGetCartProducts();
    const cartProductsTotal = dataCartProduct.cart.total;

    subTotalPrice.innerHTML = "";
    TotalPrice.innerHTML = "";

    if (cartProductsTotal) {
        const element = document.createElement("div");

        element.innerHTML = `<p class="subTotal-Calculate">Rs. ${cartProductsTotal.allDiscount.toLocaleString("en")}</p>`;
        fragment.append(element);

        TotalPrice.innerHTML = `Rs. ${cartProductsTotal.allPrice.toLocaleString("en")}`;
        subTotalPrice.append(fragment);
    } else {
        TotalPrice.innerHTML = `Rs.0`;
        subTotalPrice.innerHTML = `Rs.0`;
    }
};

const deleteProductAndUpdateCart = async (element, productId, token) => {
    let isLogin = checkingLoginStatus()
    if (!isLogin) {
        showAuthenticationRequiredAlert()
        return
    }
    element.classList.add("icon-delete--pending")

    try {
        const response = await fetch(`https://furniro-6x7f.onrender.com/cart/${productId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`,
                'accept': 'application/json'
            },
        });

        if (!response.ok) {
            showAuthenticationRequiredAlert();
        }

        const result = await response.json();

        showSwal(result.data.message, "success", "OK", "#");
    } catch (error) {
        showSwal("You need to authenticate first.", "error", "Try Again", '#');
    } finally {
        element.classList.remove("icon-delete--pending")
    }

    addingCartProductsTemplate()
    getCountProductsCart()
    calculationTotalCart()
};

const removeProductByUser = async (element, productId, token) => {
    if (!productId && !token) {
        return false
    }
    showDeleteConfirmation(element, productId, token, deleteProductAndUpdateCart)
}

const fetchProductUpdate = async (element, productId, token) => {
    const isLogin = checkingLoginStatus()
    if (!isLogin) {
        showAuthenticationRequiredAlert()
        return
    }

    element.classList.add("quantity-input--pending")

    const value = element.value > 5 ? 5 : element.value < 1 ? 1 : element.value;

    const productQuantity = {
        quantity: value
    }

    try {
        const response = await fetch(`https://furniro-6x7f.onrender.com/cart/${productId}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`,
                'accept': 'application/json'
            },
            body: JSON.stringify(productQuantity)
        })


        if (!response.ok) {
            showAuthenticationRequiredAlert()
            if (response.status === 500) {
                let message = "An unexpected error occurred."
                throw new Error(message)
            }
        }
        addingCartProductsTemplate()
        calculationTotalCart()
    } catch (error) {
        showSwal(error.message, "error", "Try Again", location.reload());
    } finally {
        element.classList.remove("quantity-input--pending")
    }
}

window.addEventListener("load", () => {
    calculationTotalCart();
    addingCartProductsTemplate();
})

window.removeProductByUser = removeProductByUser;
window.fetchProductUpdate = fetchProductUpdate;