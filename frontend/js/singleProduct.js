import { products } from "../js/db/data.js"
import { getUrlParam, saveToLocalStorage, getFromLocalStorage, productDiscountCalculation, getCountProductsCart } from "../js/func/utils.js"

const $ = document
const urlParamsId = getUrlParam("id")
let total
let productsCart = []
let informationMenuItems = document.querySelectorAll(".product-infomation-menu__item")

informationMenuItems.forEach(infomationMenuItem => {
    infomationMenuItem.addEventListener("click", (event) => {
        document.querySelector(".product-infomation-menu__item--active").classList.remove("product-infomation-menu__item--active")
        infomationMenuItem.classList.add("product-infomation-menu__item--active")

        swapContent(event.target.dataset.set)
    })
})

const swapContent = (dataSetcontent) => {
    const content = document.querySelector(dataSetcontent)

    document.querySelector(".content--active").classList.remove('content--active')
    content.classList.add('content--active')
}

const productSelectionByUser = products.find(product => { return product.id === +urlParamsId })

const addingPagePathDom = () => {
    const routeProduct = document.querySelector(".route-product");
    const previousPaths = JSON.parse(localStorage.getItem('previousPaths')) || [];
    routeProduct.innerHTML = `<div class="loader" style="display: inline-grid; color: #000000;" ></div>`

    let extractedPart = previousPaths.map(path => {
        let part = path.split('/').pop().split('.')[0];
        return part === "index" ? "home" : part;
    })

    setTimeout(() => {
        routeProduct.innerHTML = ` <div class="container "> <div class="route-product__wrapper "> <a href="${previousPaths[1] || "https://furniroo-store.vercel.app/index.html"}" class="route-product__path-name">${extractedPart[1] || "Direct Entry"}</a> <i class="fa-solid fa-angle-right fa-xs"></i> <a href="${previousPaths[0] || "https://furniroo-store.vercel.app/index.html"}" class="route-product__path-name">${extractedPart[0] || "home"}</a> <i class="fa-solid fa-angle-right fa-xs"></i> <div class="route-product__line-col line"></div> <span class="route-product__product-name">${productSelectionByUser.productName}</span> </div> </div> `
    }, 6000)
};

const addingAllProductPhotos = () => {
    const wrapperMainImage = document.querySelector(".detailes-product-img-main__box")
    const wrapperSecoundImg = document.querySelector(".detailes-product-img-secound")

    wrapperMainImage.insertAdjacentHTML("afterbegin", `<img class="detailes-product-img-main___img" src="${productSelectionByUser.imgSecoundMain}" alt="main-product">`)

    wrapperSecoundImg.insertAdjacentHTML("afterbegin", ` <div class="detailes-product-img-secound__box   detailes-product-img-secound__box--active "><img class="detailes-product-img-secound__img" src =" ${productSelectionByUser.imgSecoundMain}" alt = "main-product" ></div ><div class="detailes-product-img-secound__box"><img class="detailes-product-img-secound__img" src="${productSelectionByUser.imgSecound1}"alt="detailes-product"></div><div class="detailes-product-img-secound__box"><img class="detailes-product-img-secound__img" src="${productSelectionByUser.imgSecound2} " alt="detailes-product"></div><div class="detailes-product-img-secound__box"><img class="detailes-product-img-secound__img" src="  ${productSelectionByUser.imgSecound3}"alt="detailes-product"></div><div class="detailes-product-img-secound__box"><img class="detailes-product-img-secound__img" src="  ${productSelectionByUser.imgSecound4} " alt="detailes-product"></div>`)

    const boxImagesSubProduct = document.querySelectorAll(".detailes-product-img-secound__box")
    const imgProductMain = document.querySelector(".detailes-product-img-main___img")

    selectionSecondaryProductsByUser(boxImagesSubProduct, imgProductMain)
}

const addingProductSpecifications = () => {
    const wrapperProductSpecifications = $.querySelector(".Supplementary-specifications__value-box");

    wrapperProductSpecifications.insertAdjacentHTML("afterbegin",
        `<span class="Supplementary-specifications__value">SS00${productSelectionByUser.id} </span><span class="Supplementary-specifications__value">${productSelectionByUser.type}  </span ><span class="Supplementary-specifications__value">Sofa, Chair, Home, Shop</span>  
            
            <div class="Supplementary-specifications__box-icon">
              <div class="box-Icon-social"><i class="fa-brands fa-facebook-f Icon-social"></i></div>
              <div class="box-Icon-social box-Icon-social--linkdin"><i class="fa-brands fa-linkedin-in Icon-social"></i></div>
              <div class="box-Icon-social"><i class="fa-brands fa-twitter Icon-social"></i></div>
            </div >`)
}

const addingDetailesProduct = () => {
    if (productSelectionByUser) {
        const wrapperDetailesProducts = $.querySelector(".wrapper-Detailes-Products")
        total = productDiscountCalculation(+productSelectionByUser.price, +productSelectionByUser.discountPercent)

        addingAllProductPhotos()
        addingPagePathDom()
        addingProductSpecifications()

        wrapperDetailesProducts.insertAdjacentHTML('afterbegin',
            `${productSelectionByUser.discount ? `<h3 class="detailes-produc-Specifications__title section-title"> ${productSelectionByUser.productIntroduction}</h3>
                <h5 class= "detailes-produc-Specifications__price-discount section-title" > Rp ${productSelectionByUser.price.toLocaleString("en")}</h5>
                <h5 class="detailes-produc-Specifications__price section-title">Rp  ${total.toLocaleString("en")} </h5>`
                :
                `<h3 class="detailes-produc-Specifications__title section-title">${productSelectionByUser.productIntroduction}</h3>
                <h5 class= "detailes-produc-Specifications__price section-title"> Rp ${productSelectionByUser.price.toLocaleString("en")}</h5>`}

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

let iconCountProducts = document.querySelector(".nav-bar__count-Product")

const countIconCart = () => {
    iconCountProducts.classList.add("nav-bar__count-Product--active")
    iconCountProducts.innerHTML = productsCart.length
    saveToLocalStorage("countProductToCart", productsCart.length)
}

const addingProductToCart = (btnAddToCart, productCountInput) => {
    btnAddToCart.addEventListener("click", () => {
        logicAddingProductToCart(productSelectionByUser.id, productCountInput)
    })
}

const logicAddingProductToCart = (urlParamsId, productCountInput) => {
    let product = productsCart.find(cartproduct => { return cartproduct.id === urlParamsId })

    if (product) {
        product.count === productCountInput.value ? productCountInput.value++ : productCountInput.value
        product.count = productCountInput.value

        saveToLocalStorage("selectedCountProduct", product.count)
        saveToLocalStorage("cartShopProducts", productsCart)
        addingProductTemplateToCart(productsCart)
        calculationTotalCart(productsCart)
    }
    else {
        productsCart.push(productSelectionByUser)
        !productCountInput.value ? productCountInput.value = 1 : productCountInput.value
        productSelectionByUser.count = productCountInput.value

        saveToLocalStorage("selectedCountProduct", productSelectionByUser.count)
        saveToLocalStorage("cartShopProducts", productsCart)
        addingProductTemplateToCart(productsCart)
        countIconCart()
        calculationTotalCart(productsCart)
    }
    if (window.innerWidth > 992) {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }
}

const getingproductsCartByUser = () => {
    let getproductsCart = getFromLocalStorage("cartShopProducts")

    if (getproductsCart) {
        productsCart = getproductsCart
    } else {
        productsCart = []
    }
    addingProductTemplateToCart(productsCart)
}

window.addEventListener("load", () => {
    addingDetailesProduct()
    getCountProductsCart()
    getingproductsCartByUser()
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
    addingProductTemplateToCart(productsCart)
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

const addingProductTemplateToCart = (productsCart) => {
    const keeperCartProduct = document.querySelector(".cart-Shop__products")
    keeperCartProduct.innerHTML = ""

    productsCart.forEach(product => {
        total = productDiscountCalculation(+product.price, +product.discountPercent)

        keeperCartProduct.insertAdjacentHTML("afterbegin",
            `<div class="products-keeper"><div class="products-keeper__box-img"><img class="products-keeper__img" src="${product.imgSecoundMain}"></div><div class="products-keeper-box-profile"><h6 class="products-keeper-box-profile__title section-title">${product.productName} </h6><div class="box-calculation"><span class="box-calculation__number">${product.count}</span>   <span class="box-calculation__multiplication">X</span><span class="box-calculation__price">Rs ${product.discount ? total.toLocaleString("en") : product.price.toLocaleString("en")} </span></div></div><button onclick=" removeProductByUserByUser(${product.id})" class="products-keeper-product-delete-btn"><div class="box-remove-product"> <i class="fas fa-times icon-close "></i></div></button></div>`)
    })
    calculationTotalCart(productsCart)
}

const calculationTotalCart = (productsCart) => {
    const subTotalPrice = document.querySelector(".sub-total-box__price")
    let priceTotal = 0
    let priceProduct, countProduct
    productsCart.forEach(product => {
        total = productDiscountCalculation(+product.price, +product.discountPercent)

        product.discount ? priceProduct = +total : priceProduct = +product.price
        countProduct = +product.count

        priceTotal += countProduct * priceProduct
    })
    subTotalPrice.innerHTML = "Rs. " + priceTotal.toLocaleString("en")
}

const removeProductByUserByUser = (productId) => {
    productsCart = productsCart.filter(product => {
        return product.id !== productId
    })
    productsCart.length ? productsCart.length : productsCart.length + 1
    iconCountProducts.innerHTML = productsCart.length

    saveToLocalStorage("countProductToCart", productsCart.length)
    saveToLocalStorage("cartShopProducts", productsCart)
    calculationTotalCart(productsCart)
    addingProductTemplateToCart(productsCart)
}

window.removeProductByUserByUser = removeProductByUserByUser;