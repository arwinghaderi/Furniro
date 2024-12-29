import { productDiscountCalculation } from "../func/utils.js"

let total, discountTemplate, newTemplate, discountPrice, element
const fragment = document.createDocumentFragment();

const addingProductsTemplate = (products, productsStructure = "row", productsWrapper, pageRoute) => {
    let fragment
    if (productsStructure === 'row') {
        productsWrapper.innerHTML = '';
        products.forEach(function (product) {
            fragment = addingProductsTemplateRow(product)
        })
    } else {
        productsWrapper.innerHTML = '';
        products.forEach(function (product) {
            fragment = addingProductsTemplateCol(product)
        })
    }
    productsWrapper.append(fragment)
}

const addingProductsTemplateRow = (product) => {
    element = document.createElement("div")
    element.className = `col col-lg-3 product-main-box product-main-box__shop product-main-box__shop--show `
    element.setAttribute("data-aos", "zoom-in")
    element.setAttribute("data-aos-delay", "400")

    discountTemplate = `<div class="Discount-product"><span class="Discount-product__number">${product.discountPercent}%</span></div>`
    newTemplate = ` <div class="Discount-product Discount-product--green "><span class="Discount-product__number">NEW</span></div>`
    discountPrice = `</span > <span class="product-discountPrice ">Rp ${product.price}</span>`

    total = productDiscountCalculation(+product.price, +product.discountPercent)

    element.innerHTML = `<div class="product-box"  id="discount"><div   
     class="img-box-overlay"><img class="product__img product__img-col" src="${product.img}" alt="product img"><div class="product-overlay">
     <div class="box-add-btn-cart"><a href="/Pages/product.html?id=${product.id}" class="box-add-btn-cart__text">Details Product</a></div> 
     <div class="product-overlay__options"> 
     <div class="option-overlay"> 
     <i class="fas fa-share-alt fa-flip-vertical  icon" ></i> 
     <span class="option-overlay__text">Share</span> </div> <div class="option-overlay"> 
     <i class="fas fa-exchange-alt  icon"></i>
     <span class="option-overlay__text">Compare</span></div> 
     <div class="option-overlay"><svg id="likeButton" onclick="toggleLike(this)" class=" icon heart-icon " fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon"> <path stroke-linecap="round" stroke-linejoin="round" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/> </svg>
     <span class="option-overlay__text">Like</span></div></div></div> ${product.discount ? discountTemplate : product.newProduct ? newTemplate : ""}</div><div class="product-Introductions"><h3 class="product-name">  ${product.productName}  </h3><p class="product-Introduction"> ${product.productIntroduction}   </p><div class="product-price-box"> 
    <span class="product-price"> Rp  ${total.toLocaleString("en")}   ${product.discount ? discountPrice : ""}
    </div> </div></div>`
    fragment.append(element)

    return fragment
}

const toggleLike = (element) => {
    element.classList.toggle("heart-icon--active");
}
window.toggleLike = toggleLike

const addingProductsTemplateCol = (product) => {

    element = document.createElement("div")
    element.className = `col col-lg-12 product-main-box product-main-box__shop product-main-box__shop--show `
    element.setAttribute("data-aos", "zoom-in")
    element.setAttribute("data-aos-delay", "400")

    discountTemplate = `<div class="Discount-product"><span class="Discount-product__number">${product.discountPercent}%</span></div>`
    newTemplate = ` <div class="Discount-product Discount-product--green "><span class="Discount-product__number">NEW</span></div>`
    discountPrice = `</span > <span class="product-discountPrice">Rp ${product.price}</span>`

    total = productDiscountCalculation(+product.price, +product.discountPercent)

    element.innerHTML = `<div class="product-box product-box-col"  id="discount"><div   
     class="img-box-overlay img-box-overlay-col "><img class="product__img" src="${product.img}" alt="product img"><div class="product-overlay">
     <div class="box-add-btn-cart"><a href="/Pages/product.html?id=${product.id}" class="box-add-btn-cart__text">Details Product</a></div> 
     <div class="product-overlay__options"> 
     <div class="option-overlay"> 
     <i class="fas fa-share-alt fa-flip-vertical  icon" ></i> 
     <span class="option-overlay__text">Share</span> </div> <div class="option-overlay"> 
     <i class="fas fa-exchange-alt  icon"></i>
     <span class="option-overlay__text">Compare</span></div> 
     <div class="option-overlay"><i class="fa-regular fa-heart icon"></i>
     <span class="option-overlay__text">Like</span></div></div></div> ${product.discount ? discountTemplate : product.newProduct ? newTemplate : ""}</div><div class="product-Introductions product-Introductions-col "><h3 class="product-name product-name-col ">  ${product.productName}  </h3><p class="product-Introduction product-Introduction-col"> ${product.productIntroduction}   </p><div class="product-price-box"> 
    <span class="product-price"> Rp  ${total.toLocaleString("en")}   ${product.discount ? discountPrice : ""}
    </div> </div></div>`
    fragment.append(element)

    return fragment
}

const productsSorting = (products, target) => {
    let productsFilter = []
    switch (target) {
        case 'new':
            productsFilter = products.filter((product => product.newProduct === true))
            break;
        case 'discount':
            productsFilter = products.filter((product => product.discount === true))
            break
        case 'All':
            productsFilter = products
            break
        default:
            productsFilter = products.filter((product => product.type === target))
            break;
    }
    console.log("sortings");
    return productsFilter
}
export { addingProductsTemplate, productsSorting }