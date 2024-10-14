import { getFromLocalStorage, productDiscountCalculation, saveToLocalStorage, getCountProductsCart } from "../js/func/utils.js"

let $ = document
let total, element
let productsCart = getFromLocalStorage("cartShopProducts")
const fragment = document.createDocumentFragment()

const addingCartProductsTemplate = (productsCart) => {
    let keeperProductCart = document.querySelector(".product-cart")

    keeperProductCart.innerHTML = ""

    if (productsCart && productsCart.length) {
        productsCart.forEach(product => {
            total = productDiscountCalculation(+product.price, +product.discountPercent)
            element = document.createElement("div")

            element.innerHTML = `<div class="cart-shop-section__details-product"><div div class="cart-shop-section__box-img"><img class="cart-shop-section__img" src="${product.imgSecoundMain}  " alt="product Image"></div><span class="cart-shop-section__product-name"> ${product.productName} </span><span class="cart-shop-section__product-price"> Rs ${product.discount ? total.toLocaleString("en") : product.price.toLocaleString("en")} </span><div class="cart-shop-section__product-Quantity-box"><input min="1" max="10" oninput="selectionNumberProductsByUser(event,${product.id})" class="cart-shop-section__product-Quantity" type="number" value="${product.count}"></div><span class="cart-shop-section__product-Subtotal"> Rs. ${product.discount ? total.toLocaleString("en") : product.price.toLocaleString("en")}</span><i onclick="removeProductByUser(${product.id})"  class="fa-solid fa-trash fa-sm icon-delte"></i></div > `
            fragment.append(element)
        });
        keeperProductCart.append(fragment)
    } else {
        keeperProductCart.insertAdjacentHTML("beforeend", `<div div class="alert alert-danger" > <p>(:هیچ محصولی در سبد خرید شما وجود نداد</p> </div > `)
    }
}

const selectionNumberProductsByUser = (event, productId) => {
    let product = productsCart.find(productcart => { return productcart.id === productId })

    !event.target.value === 0 ? event.target.value = product.count : event.target.value

    product.count = event.target.value

    saveToLocalStorage("selectedCountProduct", product.count)
    calculationTotalCart()
}

const calculationTotalCart = () => {
    const TotalPrice = document.querySelector(".cart-shop-section__total-price")
    const subTotalPrice = document.querySelector(".cart-shop-section__sub-total-price")

    let priceTotal = 0
    let priceProduct, countProduct, priceSubTotal

    subTotalPrice.innerHTML = ""
    TotalPrice.innerHTML = ""

    if (productsCart && productsCart.length) {
        productsCart.forEach(product => {
            element = document.createElement("div")
            total = productDiscountCalculation(+product.price, +product.discountPercent)

            product.discount ? priceProduct = +total : priceProduct = +product.price
            product.count < 1 ? product.count = 1 : product.count
            product.count > 10 ? product.count = 10 : product.count
            countProduct = +product.count

            priceTotal += countProduct * priceProduct
            priceSubTotal = priceProduct * countProduct
            element.innerHTML = `<p class="subTotal-Calculate" > ${product.productName}  = Rs.${priceSubTotal.toLocaleString("en")}</p >`
            fragment.append(element)
        })
        TotalPrice.innerHTML = `Rs.${priceTotal.toLocaleString("en")} `
        subTotalPrice.append(fragment)
    } else {
        TotalPrice.innerHTML = `Rs.0`
        subTotalPrice.innerHTML = `Rs.0`
    }
}

window.addEventListener("load", () => {
    addingCartProductsTemplate(productsCart)
    calculationTotalCart()
    getCountProductsCart()
})

const removeProductByUser = (productId) => {
    let iconCountProducts = document.querySelector(".nav-bar__count-Product")

    productsCart = productsCart.filter(product => {
        return product.id !== productId
    })
    productsCart.length ? productsCart.length : productsCart.length + 1
    iconCountProducts.innerHTML = productsCart.length

    saveToLocalStorage("countProductToCart", productsCart.length)
    saveToLocalStorage("cartShopProducts", productsCart)
    calculationTotalCart()
    addingCartProductsTemplate(productsCart)
}

window.selectionNumberProductsByUser = selectionNumberProductsByUser;
window.removeProductByUser = removeProductByUser