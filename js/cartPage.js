import { getFromLocalStorage, productDiscountCalculation } from "../js/func/utils.js"

let $ = document
let productsCart = getFromLocalStorage("cartShopProducts")
let keeperProductPageCart = document.querySelector(".cart-shop-section__shop")
let total

const addingCartProductsTemplate = () => {
    if (productsCart) {
        productsCart.forEach(product => {
            total = productDiscountCalculation(+product.price, +product.discountPercent)

            keeperProductPageCart.insertAdjacentHTML("beforeend", ` <div class="cart-shop-section__details-product"><div div class= "cart-shop-section__box-img"><img class="cart-shop-section__img" src="${product.imgSecoundMain}  " alt="product Image"></div><span class="cart-shop-section__product-name"> ${product.productName} </span><span class="cart-shop-section__product-price"> Rs ${product.discount ? total.toLocaleString("en") : product.price.toLocaleString("en")} </span><div class="cart-shop-section__product-Quantity-box"><input class="cart-shop-section__product-Quantity" type="number" value="${product.count}"></div><span class="cart-shop-section__product-Subtotal"> Rs. ${product.discount ? total.toLocaleString("en") : product.price.toLocaleString("en")}</span><i class="fa-solid fa-trash fa-sm icon-delte"></i></div > `)
        });
    } else {
        keeperProductPageCart.insertAdjacentHTML("beforeend", `<div class="alert alert-danger"> <p>(:هیچ محصولی در سبد خرید شما وجود نداد</p> </div>`)
    }

}

window.addEventListener("load", () => {
    addingCartProductsTemplate()
})
