import { getFromLocalStorage } from "./utils.js";

let discountTemplate, newTemplate, discountPrice, element, randomIndex,
    randomImage, fullImagePath
const fragment = document.createDocumentFragment();

const addingProductsTemplate = (products, productsStructure = "row", productsWrapper) => {

    productsStructure = getFromLocalStorage("structure") || "row"
    
    productsWrapper.innerHTML = '';
    let fragment = document.createDocumentFragment();

    if (productsStructure === 'row') {
        if (products.length) {
            products.forEach((product) => {
                fragment.appendChild(addingProductsTemplateRow(product));
            });
        } else {
            productsWrapper.innerHTML = `
        <div class="container">
            <div class="empty-products box-shadow ">
                <h2>No Products Available</h2>
                <p>We're sorry, but there are no products available in this category at the moment.</p>
                <p>Please check back later or explore our other categories.</p>
                <img src="../images/images.png" alt="No products available" />
            </div>
        </div>
            `;
            return;
        }
    } else {
        if (products.length) {
            products.forEach((product) => {
                fragment.appendChild(addingProductsTemplateCol(product));
            });
        } else {
            productsWrapper.innerHTML = `
            <div class="container">
              <div class="empty-products box-shadow ">
                <h2>No Products Available</h2>
                <p>We're sorry, but there are no products available in this category at the moment.</p>
                <p>Please check back later or explore our other categories.</p>
                <img src="../images/images.png" alt="No products available" />
               </div>
            </div>
            `;
            return;
        }
    }

    productsWrapper.appendChild(fragment);
}

const addingProductsTemplateRow = (product) => {
    element = document.createElement("div")
    element.className = `col col-md-6 col-lg-4 col-xxl-3 product-main-box product-main-box__shop product-main-box__shop--show `
    element.setAttribute("data-aos", "zoom-in")
    element.setAttribute("data-aos-delay", "400")
    randomIndex = Math.floor(Math.random() * product.images.length);
    randomImage = product.images[randomIndex];
    fullImagePath = `https://furniro-6x7f.onrender.com${randomImage.path}`;

    discountTemplate = `<div class="Discount-product"><span class="Discount-product__number">${product.discountPercent}%</span></div>`
    newTemplate = ` <div class="new-product"><span class="Discount-product__number">NEW</span></div>`
    discountPrice = `</span > <span class="product-discountPrice ">Rp ${product.price.toLocaleString("en")}</span>`

    element.innerHTML = `<div class="product-box"  id="discount"><div   
     class="img-box-overlay"><img class="product__img product__img-col" src="${fullImagePath}" onerror="this.onerror=null;this.src='https://via.placeholder.com/200?text=Furniture+Store';"  alt="${product.name}" loading="lazy"><div class="product-overlay">
     <div class="box-add-btn-cart"><a href="/Pages/product.html?id=${product.slug}" class="box-add-btn-cart__text">Details Product</a></div> 
     <div class="product-overlay__options"> 
     <div class="option-overlay"> 
     <i class="fas fa-share-alt fa-flip-vertical  icon" ></i> 
     <span class="option-overlay__text">Share</span> </div> <div class="option-overlay"> 
     <i class="fas fa-exchange-alt  icon"></i>
     <span class="option-overlay__text">Compare</span></div> 
     <div class="option-overlay"><svg id="like" Button" onclick="toggleLike(this)" class=" icon heart-icon " fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon"> <path stroke-linecap="round" stroke-linejoin="round" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/> </svg>
     <span class="option-overlay__text">Like</span></div></div></div><div class="lable-product-box"> ${product.discountPercent ? discountTemplate : ""} ${product.isNewProduct ? newTemplate : ""}</div></div><div class="product-Introductions"><h3 class="product-name">  ${product.name.slice(0, 10)}...  </h3><p class="product-Introduction"> ${product.title}   </p><div class="product-price-box"> 
    <span class="product-price"> Rp  ${product.discountPercent ? product.priceAfterDiscount.toLocaleString("en") : product.price.toLocaleString("en")}   ${product.discountPercent ? discountPrice : ""}
    </div> </div></div>`
    fragment.append(element)

    return fragment
}

const addingProductsTemplateCol = (product) => {
    randomIndex = Math.floor(Math.random() * product.images.length);
    randomImage = product.images[randomIndex];
    fullImagePath = `https://furniro-6x7f.onrender.com${randomImage.path}`;

    element = document.createElement("div")
    element.className = `col col-lg-6  product-main-box product-main-box__shop product-main-box__shop--show `
    element.setAttribute("data-aos", "zoom-in")
    element.setAttribute("data-aos-delay", "400")

    discountTemplate = `<div class=" Discount-product--col"><span class="Discount-product__number">${product.discountPercent}%</span></div>`
    newTemplate = ` <div class="new-product"><span class="Discount-product__number">NEW</span></div>`
    discountPrice = `</span > <span class="product-discountPrice">Rp ${product.price.toLocaleString("en")}</span>`

    element.innerHTML = `<div class="product-box product-box-col"  id="discount"><div   
     class="img-box-overlay img-box-overlay-col "><img class="product__img product__img--col" src="${fullImagePath}" onerror="this.onerror=null;this.src='https://via.placeholder.com/200?text=Furniture+Store';"  alt="product img"><div class="product-overlay">
     <div class="box-add-btn-cart"><a href="/Pages/product.html?id=${product.slug
        }" class="box-add-btn-cart__text">Details Product</a></div> 
     <div class="product-overlay__options"> 
     <div class="option-overlay"> 
     <i class="fas fa-share-alt fa-flip-vertical  icon" ></i> 
     <span class="option-overlay__text">Share</span> </div> <div class="option-overlay"> 
     <i class="fas fa-exchange-alt  icon"></i>
     <span class="option-overlay__text">Compare</span></div> 
     <div class="option-overlay"><svg id="like" Button" onclick="toggleLike(this)" class=" icon heart-icon " fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon"> <path stroke-linecap="round" stroke-linejoin="round" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/> </svg>
     <span class="option-overlay__text">Like</span></div></div></div> <div class="lable-product-box"> ${product.discountPercent ? discountTemplate : ""} ${product.isNewProduct ? newTemplate : ""}</div></div><div class="product-Introductions product-Introductions-col "><h3 class="product-name product-name-col ">  ${product.name.slice(0, 8)}...  </h3><span class="product-Introduction product-Introduction-col">  ${product.title.slice(0, 10)}... </span><div class="product-price-box"> 
    <span class="product-price"> Rp  ${product.discountPercent ? product.priceAfterDiscount.toLocaleString("en") : product.price.toLocaleString("en")}   ${product.discountPercent ? discountPrice : ""}
    </div> </div></div>`
    fragment.append(element)

    return fragment
}

const toggleLike = (element) => {
    element.classList.toggle("heart-icon--active");
}

window.toggleLike = toggleLike

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
    return productsFilter
}
export { addingProductsTemplate, productsSorting }