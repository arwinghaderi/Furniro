import { getToken } from "./func/utils.js";
import { showAuthenticationRequiredAlert } from "./func/utils.js";

const fetchOrderStatus = async () => {
    const token = getToken();
    if (!token) {
        showAuthenticationRequiredAlert();
        return false
    }

    try {
        const response = await fetch(`https://furniro-6x7f.onrender.com/checkoute`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`
            }
        });

        const orderStatusData = await response.json();

        if (response.ok && orderStatusData.success) {
            return orderStatusData.data.checkoutList;
        } else {
            return [];
        }
    } catch (error) {
        return [];
    }
};

const fragment = document.createDocumentFragment();

const addingCartProductsTemplate = async () => {
    let productImage, imageUrl, discountTemplate, subtotal;
    const keeperProductCart = document.querySelector(".product-cart");
    keeperProductCart.classList.add("center")
    keeperProductCart.innerHTML = `<div class="loader-bars loader-cart-page-products section-title"></div>`;
    document.querySelector('.loader-cart-page-products').scrollIntoView({ behavior: "smooth", block: "start" });

    const orderStatusData = await fetchOrderStatus();
    const orderStatus = orderStatusData.orderStatus || ""
    const oerderStatusProductsItems = orderStatusData.productItems || []
    keeperProductCart.classList.remove("center")

    keeperProductCart.innerHTML = "";
    if (oerderStatusProductsItems.length) {
        oerderStatusProductsItems.forEach(item => {
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
                        <span class="cart-shop-section__product-Subtotal">Rs. ${subtotal.toLocaleString("en")}</span>
                    <div class="cart-shop-section__product-Quantity-box">
                        <span class="cart-shop-section__product-Subtotal">${item.quantity}</span>
                    </div>
                      <div class="Product-shipping-status-box ${orderStatus === 'processing' ? 'status-processing' : orderStatus === 'sent' ? 'status-sent' : orderStatus === 'delivered' ? 'status-delivered' : 'status-processing'}" >
                <span>${orderStatus}</span>
    </div>
                </div>`;
            fragment.append(element);
        });

        keeperProductCart.append(fragment);
    } else {
        keeperProductCart.insertAdjacentHTML("beforeend", `
        <div class="empty-products box-shadow">
           <h2>No Orders Yet</h2> <p>It looks like you haven't placed any orders yet.</p>
           <p>Browse our products and place your first order to get started.</p>
            <img src="../images/images.png" alt="No products available onerror="this.onerror=null;this.src='https://via.placeholder.com/200?text=Furniture+Store';"">
        </div>
        `);
    }
};

window.addEventListener("load", () => {
    addingCartProductsTemplate();
})