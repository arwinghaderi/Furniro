import { products } from "../js/db/data.js"
import { getUrlParam, saveToLocalStorage, getFromLocalStorage, productDiscountCalculation } from "../js/func/utils.js"

const $ = document
const urlParamsId = getUrlParam("id")
let total
let cartProducts = []

const productSelectionByUser = products.find(product => { return product.id === +urlParamsId })

const addingPagePathDom = () => {
    const routeProduct = document.querySelector(".route-product")

    routeProduct.insertAdjacentHTML("afterbegin", `<div class="container"><div class= "route-product__waraper"><p class="route-product__path-name">Home</p><i class="fa-solid fa-angle-right fa-xs"></i><p class="route-product__path-name">Shop</p><i class="fa-solid fa-angle-right fa-xs"></i><div class="route-product__line-col line"></div><p class="route-product__product-name"> ${productSelectionByUser.productName}</p></></div >`)
}

const addingAllProductPhotos = () => {
    const wrapperMainImage = document.querySelector(".detailes-product-img-main__box")
    const wrapperSecoundImg = document.querySelector(".detailes-product-img-secound")

    wrapperMainImage.insertAdjacentHTML("afterbegin", `<img class="detailes-product-img-main___img" src="${productSelectionByUser.imgSecoundMain}" alt="main-product">`)

    wrapperSecoundImg.insertAdjacentHTML("afterbegin", ` <div class="detailes-product-img-secound__box  detailes-product-img-secound__box--active "><img class="detailes-product-img-secound__img" src =" ${productSelectionByUser.imgSecoundMain}" alt = "main-product" ></div ><div class="detailes-product-img-secound__box"><img class="detailes-product-img-secound__img" src="${productSelectionByUser.imgSecound1}"alt="detailes-product"></div><div class="detailes-product-img-secound__box"><img class="detailes-product-img-secound__img" src="${productSelectionByUser.imgSecound2} " alt="detailes-product"></div><div class="detailes-product-img-secound__box"><img class="detailes-product-img-secound__img" src="  ${productSelectionByUser.imgSecound3}"alt="detailes-product"></div><div class="detailes-product-img-secound__box"><img class="detailes-product-img-secound__img" src="  ${productSelectionByUser.imgSecound4} " alt="detailes-product"></div>`)

    const boxImagesSubProduct = document.querySelectorAll(".detailes-product-img-secound__box")
    const imgProductMain = document.querySelector(".detailes-product-img-main___img")

    selectionSecondaryProductsByUser(boxImagesSubProduct, imgProductMain)
}

const addingDetailesProduct = () => {
    if (productSelectionByUser) {
        const wrapperDetailesProducts = $.querySelector(".wrapper-Detailes-Products")
        total = productDiscountCalculation(+productSelectionByUser.price, +productSelectionByUser.discountPercent)

        addingAllProductPhotos()
        addingPagePathDom()

        wrapperDetailesProducts.insertAdjacentHTML('afterbegin',
            `${productSelectionByUser.discount ? `<h3 class="detailes-produc-Specifications__title"> ${productSelectionByUser.productIntroduction}</h3>
                <h5 class= "detailes-produc-Specifications__price-discount" > Rp ${productSelectionByUser.price.toLocaleString("en")}</h5>
                <h5 class="detailes-produc-Specifications__price">Rp  ${total.toLocaleString("en")} </h5>`
                :
                `<h3 class="detailes-produc-Specifications__title">${productSelectionByUser.productIntroduction}</h3>
                <h5 class= "detailes-produc-Specifications__price"> Rp ${productSelectionByUser.price.toLocaleString("en")}</h5>`}

        <div class="detailes-produc-Specifications__customer-review-box">
            <div class="detailes-produc-Specifications__score">
               <button class="btn-icon"><i class="fa-regular detailes-product-Specifications__star fa-star"></i></button>
               <button class="btn-icon"><i class="fa-regular detailes-product-Specifications__star fa-star"></i></button>
               <button class="btn-icon"><i class="fa-regular detailes-product-Specifications__star fa-star"></i></button>
               <button class="btn-icon"><i class="fa-regular detailes-product-Specifications__star fa-star"></i></button>
               <button class="btn-icon"><i class="fa-regular detailes-product-Specifications__star fa-star"></i></button>
            </div>
            <div class="detailes-produc-Specifications__line line"></div>
            <p class="detailes-produc-Specifications__status">0 Customer Review</p>  
        </div>   

        <div class="detailes-product__description-box">
          <p class="detailes-product__description">${productSelectionByUser.description}</p>
        </div>

        <div class="detailes-product__size-box">
            <span class="detailes-product__size__name">Size</span>
          <div class= "detailes-product__size-btn-container">
            <div class="detailes-product__size-btn-box  detailes-product__size-btn-box--active"><butuon class="detailes-product__size-btn  detailes-product__size-btn--active">L</butuon></div>
            <div class="detailes-product__size-btn-box"><butuon class="detailes-product__size-btn">XL</butuon></div>
            <div class="detailes-product__size-btn-box"><butuon class="detailes-product__size-btn">XS</butuon></div>
          </div> 
        </div>

     <div class="detailes-product__color-box">
         <span class="detailes-product__Color__name">Color</span><div class="detailes-product__Color-btn-container"> <div data-color="${productSelectionByUser.color1}" class="detailes-product__Color-btn-box  detailes-product__size-btn--${productSelectionByUser.color1} detailes-product__Color-btn-box--active"> </div> <div data-color="${productSelectionByUser.color2}"  class="detailes-product__Color-btn-box detailes-product__size-btn--${productSelectionByUser.color2}"> </div><div data-color="${productSelectionByUser.color3}" class="detailes-product__Color-btn-box  detailes-product__size-btn--${productSelectionByUser.color3}"></div><div data-color="${productSelectionByUser.color4}"<div class="detailes-product__Color-btn-box  detailes-product__size-btn--${productSelectionByUser.color4}"></div></div>   
     </div> 

     <div class="detailes-product-btn">
         <div class="detailes-product-input__box-quantity">
             <div class="detailes-product-input__quantity-Container-input">
                 <span class="detailes-product-input__quantity__minus">-</span>
                 <input class="detailes-product-input__quantity" type="number" min="1" max="10"  value="1" placeholder="1" >
                 <span class="detailes-product-input__quantity__plus">+</span>
             </div>
         </div>
         <div class="detailes-product-btn__box-cart"><button class="detailes-product-btn__cart detailes-product-btn__cart--add-to-cart">Add To Cart</button></div>
         <div class="detailes-product-btn__box-Compare"><button  class="detailes-product-btn__Compare">+Compare</button></div>
     </div>
        `
        )
    }
    const iconsStar = document.querySelectorAll(".btn-icon")
    const scoreStatus = document.querySelector(".detailes-produc-Specifications__status")

    const productsSizeButtons = document.querySelectorAll(".detailes-product__size-btn-box")

    const ProductsColorButton = document.querySelectorAll(".detailes-product__Color-btn-box ")

    const btnAddProductCount = document.querySelector(".detailes-product-input__quantity__plus")
    const btnReduceNumberProduct = document.querySelector(".detailes-product-input__quantity__minus")
    const productCountInput = document.querySelector(".detailes-product-input__quantity")
    const imgProductMain = document.querySelector(".detailes-product-img-main___img")

    const btnAddToCart = document.querySelector(".detailes-product-btn__box-cart")

    productsScoreing(iconsStar, scoreStatus)
    selctingProductsSizing(productsSizeButtons)
    selctingProductsColor(ProductsColorButton, imgProductMain)
    selectingcountproductByUser(btnAddProductCount, btnReduceNumberProduct, productCountInput)
    addingProductToCart(btnAddToCart, productCountInput)
}

let iconCountProducts = document.querySelector(".nav-bar__count-Procuct")
let countProducts = +iconCountProducts.innerHTML

const countIconCart = () => {
    countProducts++
    iconCountProducts.classList.add("nav-bar__count-Procuct--active")
    iconCountProducts.innerHTML = countProducts
    saveToLocalStorage("countProductToCart", countProducts)
}

const getCountProductsCart = () => {
    countProducts = getFromLocalStorage("countProductToCart")

    if (countProducts) {
        iconCountProducts.classList.add("nav-bar__count-Procuct--active")
        iconCountProducts.innerHTML = countProducts
    } else {
        iconCountProducts.classList.add("nav-bar__count-Procuct--active")
        iconCountProducts.innerHTML = 0
    }
}

const addingProductToCart = (btnAddToCart, productCountInput) => {
    btnAddToCart.addEventListener("click", () => {
        logicAddingProductToCart(productSelectionByUser.id, productCountInput)
    })
}

const logicAddingProductToCart = (urlParamsId, productCountInput) => {
    let product = cartProducts.find(cartproduct => { return cartproduct.id === urlParamsId })

    if (product) {
        product.count === productCountInput.value ? productCountInput.value++ : productCountInput.value
        product.count = productCountInput.value

        saveToLocalStorage("selectedCountProduct", product.count)
        saveToLocalStorage("cartShopProducts", cartProducts)
        addingProductTemplateToCart(cartProducts)
        calculationTotalCart(cartProducts)
    }
    else {
        cartProducts.push(productSelectionByUser)
        !productCountInput.value ? productCountInput.value = 1 : productCountInput.value
        productSelectionByUser.count = productCountInput.value

        saveToLocalStorage("selectedCountProduct", productSelectionByUser.count)
        saveToLocalStorage("cartShopProducts", cartProducts)
        addingProductTemplateToCart(cartProducts)
        countIconCart()
        calculationTotalCart(cartProducts)
    }
    if (window.innerWidth > 992) {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }
}

const getingCartProductsByUser = () => {
    let getCartProducts = getFromLocalStorage("cartShopProducts")

    if (getCartProducts) {
        cartProducts = getCartProducts
    } else {
        cartProducts = []
    }
    addingProductTemplateToCart(cartProducts)
}

window.addEventListener("load", () => {
    addingDetailesProduct()
    getCountProductsCart()
    getingCartProductsByUser()
})

const userScoringLogic = (iconsStar, userScoreingNumber, scoreStatus) => {
    iconsStar.forEach((icon, index) => {
        if (userScoreingNumber >= index + 1) {
            icon.firstChild.classList.add("fa-solid")
            icon.firstChild.classList.remove("fa-regular")
            scoreStatus.innerHTML = userScoreingNumber + "  of" + ' 5 Customer Review';
        } else {
            icon.firstChild.classList.add("fa-regular")
            icon.firstChild.classList.remove("fa-solid")
        }
    })
}

const productsScoreing = (iconsStar, scoreStatus) => {
    let userScoreingNumber
    iconsStar.forEach((icon, index) => {
        icon.addEventListener("click", () => {
            userScoreingNumber = index + 1

            userScoringLogic(iconsStar, userScoreingNumber, scoreStatus)
        })
    })
}

const selctingProductsSizing = (productsSizeButtons) => {
    productsSizeButtons.forEach(button => {
        button.addEventListener("click", () => {

            document.querySelector(".detailes-product__size-btn-box--active").classList.remove("detailes-product__size-btn-box--active")
            document.querySelector(".detailes-product__size-btn--active").classList.remove("detailes-product__size-btn--active")

            button.classList.add("detailes-product__size-btn-box--active")
            button.classList.add("detailes-product__size-btn--active")
        })
    })
}

const selctingProductsColor = (ProductsColorButton, imgProductMain) => {
    ProductsColorButton.forEach(button => {

        button.addEventListener("click", event => {

            document.querySelector(".detailes-product__Color-btn-box--active").classList.remove("detailes-product__Color-btn-box--active")
            button.classList.add("detailes-product__Color-btn-box--active")
            document.querySelector(".detailes-product-img-secound__box--active").classList.remove

            setMainImage(event.target.dataset.color, imgProductMain)
        })
    })
}

const setMainImage = (colorName, imgProductMain) => {
    imgProductMain.setAttribute("src", "../images/product img " + colorName + " " + productSelectionByUser.type + ".webp")
}

const selectingcountproductByUser = (btnAddProductCount, btnReduceNumberProduct, productCountInput) => {
    btnAddProductCount.addEventListener("click", () => {
        +productCountInput.value++

        if (+productCountInput.value === 11) {
            productCountInput.value = 10
            alert("اگر بیشتر از 10 محصول نیاز دارید  به شماره مورد نظر تماس بگیرید :09308064108")
        }
        saveToLocalStorage("selectedCountProduct", productCountInput.value)
    })

    btnReduceNumberProduct.addEventListener("click", () => {
        +productCountInput.value--

        !+productCountInput.value ? productCountInput.value = 1 : +productCountInput.value

        saveToLocalStorage("selectedCountProduct", productCountInput.value)
    })
    getProductCountByUser(productCountInput)
}

const getProductCountByUser = (productCountInput) => {
    let countProduct = getFromLocalStorage("selectedCountProduct")

    if (countProduct) {
        productSelectionByUser.count = countProduct
        productCountInput.value = countProduct
    } else {
        productSelectionByUser.count = countProduct
        productCountInput.value = countProduct
    }
    addingProductTemplateToCart(cartProducts)
}

const selectionSecondaryProductsByUser = (boxImagesSubProduct, imgProductMain) => {
    boxImagesSubProduct.forEach(boxImgProduct => {

        boxImgProduct.addEventListener("click", () => {
            document.querySelector(".detailes-product-img-secound__box--active").classList.remove("detailes-product-img-secound__box--active")
            boxImgProduct.classList.add("detailes-product-img-secound__box--active")

            const childOfImgBox = boxImgProduct.firstChild.getAttribute("src");
            imgProductMain.setAttribute("src", childOfImgBox)
        })
    })
}

let iconCart = document.querySelector(".icon-container__link--cart")
let cartShop = document.querySelector(".cart-Shop")
let wrapperCaverScreen = document.querySelector(".wrapper")
let iconExit = document.querySelector(".cart-Shop__icon-exit-head")

iconCart.addEventListener("click", () => {
    cartShop.classList.add("cart-Shop--active")
    wrapperCaverScreen.classList.add("wrapper--active")
})

iconExit.addEventListener("click", () => {
    cartShop.classList.remove("cart-Shop--active")
    wrapperCaverScreen.classList.remove("wrapper--active")
})

const addingProductTemplateToCart = (cartProducts) => {
    const keeperCartProduct = document.querySelector(".cart-Shop__products")
    keeperCartProduct.innerHTML = ""

    cartProducts.forEach(product => {
        total = productDiscountCalculation(+product.price, +product.discountPercent)

        keeperCartProduct.insertAdjacentHTML("afterbegin",
            `<div class="products-keeper"><div class="products-keeper__box-img"><img class="products-keeper__img" src="${product.imgSecoundMain}"></div><div class="products-keeper-box-profile"><h6 class="products-keeper-box-profile__title">${product.productName} </h6><div class="box-calculation"><span class="box-calculation__number">${product.count}</span>   <span class="box-calculation__multiplication">X</span><span class="box-calculation__price">Rs ${product.discount ? total.toLocaleString("en") : product.price.toLocaleString("en")} </span></div></div><button onclick=" removeProduct(${product.id})" class="products-keeper-product-delete-btn"><div class="box-remove-product"> <i class="fas fa-times icon-close "></i></div></button></div>`)
    })
    calculationTotalCart(cartProducts)
}

const calculationTotalCart = (cartProducts) => {
    const subTotalPrice = document.querySelector(".sub-total-box__price")
    let priceTotal = 0
    let priceProduct, countProduct
    cartProducts.forEach(product => {
        total = productDiscountCalculation(+product.price, +product.discountPercent)

        product.discount ? priceProduct = +total : priceProduct = +product.price
        countProduct = +product.count

        priceTotal += countProduct * priceProduct
    })
    subTotalPrice.innerHTML = "Rs. " + priceTotal.toLocaleString("en")
}

const removeProduct = (productId) => {
    cartProducts = cartProducts.filter(product => {
        return product.id !== productId
    })
    cartProducts.length ? cartProducts.length : cartProducts.length + 1
    iconCountProducts.innerHTML--

    saveToLocalStorage("countProductToCart", cartProducts.length)
    saveToLocalStorage("cartShopProducts", cartProducts)
    calculationTotalCart(cartProducts)
    addingProductTemplateToCart(cartProducts)
}
window.removeProduct = removeProduct;