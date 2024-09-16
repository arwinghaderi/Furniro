function addingProductsTemplate(products, productsStructure, productsWrapper) {
    productsWrapper.innerHTML = '';
    // const content = element.innerHTML;
    console.log(productsStructure);
    if (productsStructure === 'row') {
        products.forEach(function (product) {
            let discountTemplate = `<div class="Discount-product"><span class="Discount-product__number">${product.discountPercent}%</span></div>`
            let newTemplate = ` <div class="Discount-product Discount-product--green "><span class="Discount-product__number">NEW</span></div>`
            let discountPrice = `</span > <span class="product-discountPrice">Rp ${product.price}</span>`

            let price = +product.price
            let discountPercent = +product.discountPercent
            let totalDiscount = (price * discountPercent) / 100
            let total = price - totalDiscount

            productsWrapper.insertAdjacentHTML("beforeend", `<div class="col col-lg-3 product-main-box product-main-box__shop product-main-box__shop--show "><div class="product-box"  id="discount"><div   
     class="img-box-overlay"><img class="product__img" src="${product.img}" alt="product img"><div class="product-overlay"> 
     <div class="box-add-btn-cart"><a href="../Pages/product.html?id= ${product.id} " class="box-add-btn-cart__text">Details Product</a></div> 
     <div class="product-overlay__options"> 
     <div class="option-overlay"> 
     <i class="fas fa-share-alt fa-flip-vertical  icon" ></i> 
     <span class="option-overlay__text">Share</span> </div> <div class="option-overlay"> 
     <i class="fas fa-exchange-alt  icon"></i>
     <span class="option-overlay__text">Compare</span></div> 
     <div class="option-overlay"><i class="fa-regular fa-heart icon"></i>
     <span class="option-overlay__text">Like</span></div></div></div> ${product.discount ? discountTemplate : product.newProduct ? newTemplate : ""}</div><div class="product-Introductions"><h3 class="product-name">  ${product.productName}  </h3><p class="product-Introduction"> ${product.productIntroduction}   </p><div class="product-price-box"> 
    <span class="product-price"> Rp  ${total.toLocaleString("en")}   ${product.discount ? discountPrice : ""}
    </div> </div></div></div>  `)
        })
    } else {
        products.forEach(function (product) {
            let discountTemplate = `<div class="Discount-product"><span class="Discount-product__number">${product.discountPercent}%</span></div>`
            let newTemplate = ` <div class="Discount-product Discount-product--green "><span class="Discount-product__number">NEW</span></div>`
            let discountPrice = `</span > <span class="product-discountPrice">Rp ${product.price}</span>`

            let price = +product.price
            let discountPercent = +product.discountPercent
            let totalDiscount = (price * discountPercent) / 100
            let total = price - totalDiscount

            productsWrapper.insertAdjacentHTML("beforeend", `<div class="col col-lg-12 product-main-box product-main-box__shop product-main-box__shop--show "><div class="product-box"  id="discount"><div   
     class="img-box-overlay"><img class="product__img" src="${product.img}" alt="product img"><div class="product-overlay"> 
     <div class="box-add-btn-cart"><a href="../Pages/product.html?id= ${product.id} " class="box-add-btn-cart__text">Details Product</a></div> 
     <div class="product-overlay__options"> 
     <div class="option-overlay"> 
     <i class="fas fa-share-alt fa-flip-vertical  icon" ></i> 
     <span class="option-overlay__text">Share</span> </div> <div class="option-overlay"> 
     <i class="fas fa-exchange-alt  icon"></i>
     <span class="option-overlay__text">Compare</span></div> 
     <div class="option-overlay"><i class="fa-regular fa-heart icon"></i>
     <span class="option-overlay__text">Like</span></div></div></div> ${product.discount ? discountTemplate : product.newProduct ? newTemplate : ""}</div><div class="product-Introductions"><h3 class="product-name">  ${product.productName}  </h3><p class="product-Introduction"> ${product.productIntroduction}   </p><div class="product-price-box"> 
    <span class="product-price"> Rp  ${total.toLocaleString("en")}   ${product.discount ? discountPrice : ""}
    </div> </div></div></div>  `)
        })

    }
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

            break
        default:
            productsFilter = products.filter((product => product.type === target))
            break;
    }
    console.log("sortings");
    return productsFilter
}
export { addingProductsTemplate, productsSorting }