import { products } from "../js/db/data.js"
import { getUrlParam } from "../js/func/utils.js"


let $ = document

// **elment html Single Page Product 


const wrapperDetailesProducts = $.querySelector(".wrapper-Detailes-Products")


let keeperCartProduct = document.querySelector(".cart-Shop__products")
let keeperSubTotalBtn = document.querySelector(".cart-Shop__keeper__sub-btn")
let btnCurentInputNumberPlus = document.querySelector(".detailes-product-input__quantity__plus")
let btnCurentInputNumberMinus = document.querySelector(".detailes-product-input__quantity__minus")
let btnCurentInputNumber = document.querySelector(".detailes-product-input__quantity")
let subTotalPrice = document.querySelector(".sub-total-box__price")

let urlParamsId = getUrlParam("id")

let ProductSelectionByUser = products.find(function (params) {
    return params.id === +urlParamsId
})

const AddingPagePathDom = () => {
    const routeProduct = document.querySelector(".route-product")

    routeProduct.insertAdjacentHTML("afterbegin", `<div class="container"><div class= "route-product__waraper"><p class="route-product__path-name">Home</p><i class="fa-solid fa-angle-right fa-xs"></i><p class="route-product__path-name">Shop</p><i class="fa-solid fa-angle-right fa-xs"></i><div class="route-product__line-col line"></div><p class="route-product__product-name"> ${ProductSelectionByUser.productName}</p></></div >`)
}

const addingAllProductPhotos = () => {
    const imgMain = document.querySelector(".detailes-product-img-main__box")
    const imgSecoundContainer = document.querySelector(".detailes-product-img-secound")

    imgMain.insertAdjacentHTML("afterbegin", `<img class="detailes-product-img-main___img" src="${ProductSelectionByUser.imgSecoundMain}" alt="main-product">`)

    imgSecoundContainer.insertAdjacentHTML("afterbegin", ` <div class="detailes-product-img-secound__box  detailes-product-img-secound__box--active "><img class="detailes-product-img-secound__img" src =" ${ProductSelectionByUser.imgSecoundMain}" alt = "main-product" ></div ><div class="detailes-product-img-secound__box"><img class="detailes-product-img-secound__img" src="${ProductSelectionByUser.imgSecound1}"alt="detailes-product"></div><div class="detailes-product-img-secound__box"><img class="detailes-product-img-secound__img" src="${ProductSelectionByUser.imgSecound2} " alt="detailes-product"></div><div class="detailes-product-img-secound__box"><img class="detailes-product-img-secound__img" src="  ${ProductSelectionByUser.imgSecound3}"alt="detailes-product"></div><div class="detailes-product-img-secound__box"><img class="detailes-product-img-secound__img" src="  ${ProductSelectionByUser.imgSecound4} " alt="detailes-product"></div>`)
}

const addingDetailesProduct = () => {
    if (ProductSelectionByUser) {
        let price = +ProductSelectionByUser.price
        let discountPercent = +ProductSelectionByUser.discountPercent
        let totalDiscount = (price * discountPercent) / 100
        let total = price - totalDiscount

        addingAllProductPhotos()
        AddingPagePathDom()

        wrapperDetailesProducts.insertAdjacentHTML('afterbegin',
            `${ProductSelectionByUser.discount ? `<h3 class="detailes-produc-Specifications__title"> ${ProductSelectionByUser.productIntroduction}</h3>
                <h5 class= "detailes-produc-Specifications__price-discount" > Rp ${ProductSelectionByUser.price.toLocaleString("en")}</h5>
                <h5 class="detailes-produc-Specifications__price">Rp  ${total.toLocaleString("en")} </h5>`
                :
                `<h3 class="detailes-produc-Specifications__title">${ProductSelectionByUser.productIntroduction}</h3>
                <h5 class= "detailes-produc-Specifications__price"> Rp ${ProductSelectionByUser.price.toLocaleString("en")}</h5>`}

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
          <p class="detailes-product__description">${ProductSelectionByUser.description}</p>
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
         <span class="detailes-product__Color__name">Color</span><div class="detailes-product__Color-btn-container"> <div data-color="${ProductSelectionByUser.color1}" class="detailes-product__Color-btn-box  detailes-product__size-btn--${ProductSelectionByUser.color1} detailes-product__Color-btn-box--active"> </div> <div data-color="${ProductSelectionByUser.color2}"  class="detailes-product__Color-btn-box detailes-product__size-btn--${ProductSelectionByUser.color2}"> </div><div data-color="${ProductSelectionByUser.color3}" class="detailes-product__Color-btn-box  detailes-product__size-btn--${ProductSelectionByUser.color3}"></div><div data-color="${ProductSelectionByUser.color4}"<div class="detailes-product__Color-btn-box  detailes-product__size-btn--${ProductSelectionByUser.color4}"></div></div>   
     </div> 

     <div class="detailes-product-btn">
         <div class="detailes-product-input__box-quantity">
             <div class="detailes-product-input__quantity-Container-input">
                 <span class="detailes-product-input__quantity__minus">-</span>
                 <input class="detailes-product-input__quantity" type="number" placeholder="1" value="1">
                 <span class="detailes-product-input__quantity__plus">+</span>
             </div>
         </div>
         <div class="detailes-product-btn__box-cart"><button class="detailes-product-btn__cart detailes-product-btn__cart--add-to-cart">Add To Cart</button></div>
         <div class="detailes-product-btn__box-Compare"><button  class="detailes-product-btn__Compare">+Compare</button></div>
     </div>
        `
        )
    }
    let iconStar = document.querySelectorAll(".btn-icon")
    let scoreStatus = document.querySelector(".detailes-produc-Specifications__status")

    productsScoreing(iconStar, scoreStatus)

}
addingDetailesProduct()

let cartArray = []

// **count Icon Cart
let countProductIcon = document.querySelector(".nav-bar__count-Procuct")
let valuecountProductIcon = +countProductIcon.innerHTML
function countIconCart(countProductIcon) {
    countProductIcon.classList.add("nav-bar__count-Procuct--active")
    countProductIcon.innerHTML = 0
    valuecountProductIcon++
    countProductIcon.innerHTML = valuecountProductIcon
}

function addBtnCart(btnAddToCart) {
    btnAddToCart.addEventListener("click", () => {
        setProductDom(ProductSelectionByUser.id)

    })
}

// **set Product Dom
function setProductDom(urlParamsId) {
    let findProduct = cartArray.find(function (productCart) {
        return productCart.id === urlParamsId
    })
    console.log(findProduct);
    if (findProduct) {
        findProduct.count++
        btnCurentInputNumber.value = findProduct.count
        setLocalStorgechangeInputCountProduct(findProduct.count)
        setLocalStorgeProductArrayCart(cartArray)
        setBtnAddToCart(cartArray)
        TotalCalculations(cartArray)
    }
    else {
        cartArray.push(ProductSelectionByUser)
        if (ProductSelectionByUser.count === null) {
            ProductSelectionByUser.count = 1
        }
        if (+btnCurentInputNumber.value === 11) {
            btnCurentInputNumber.value = 10
            alert("If you need more than 10 products, call the following number: 09309657845")
        }
        if (+btnCurentInputNumber.value === 0) {
            btnCurentInputNumber.value = 1
        }
        ProductSelectionByUser.count = btnCurentInputNumber.value
        setLocalStorgechangeInputCountProduct(ProductSelectionByUser.count)
        setBtnAddToCart(cartArray)
        setLocalStorgeProductArrayCart(cartArray)
        countIconCart(countProductIcon)
        TotalCalculations(cartArray)
    }
    if (window.innerWidth > 992) {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }
}


// **set Local Storge Product Array Cart

function setLocalStorgeProductArrayCart(cartArray) {
    localStorage.setItem("ProductArrayCart", JSON.stringify(cartArray))
    console.log(cartArray);
}

function getLocalStorgeProductArrayCart() {
    let getCartArray = JSON.parse(localStorage.getItem("ProductArrayCart"))
    if (getCartArray) {
        cartArray = getCartArray
        valuecountProductIcon = cartArray.length - 1
        countIconCart(countProductIcon)
    } else {
        cartArray = []
    }
    setBtnAddToCart(cartArray)
}
getLocalStorgeProductArrayCart()


const userScoringLogic = (iconsStar, userScoreingNumber, scoreStatus) => {
    iconsStar.forEach(function (icon, index) {
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

function productsScoreing(iconsStar, scoreStatus) {
    let userScoreingNumber
    iconsStar.forEach((icon, index) => {
        icon.addEventListener("click", function () {
            userScoreingNumber = index + 1

            userScoringLogic(iconsStar, userScoreingNumber, scoreStatus)
        })
    })
}

// **set Btn Size Active
function setBtnSize(btnSizeBox) {
    btnSizeBox.forEach(function (btnSizeBox) {
        btnSizeBox.addEventListener("click", function (e) {
            document.querySelector(".detailes-product__size-btn-box--active").classList.remove("detailes-product__size-btn-box--active")
            document.querySelector(".detailes-product__size-btn--active").classList.remove("detailes-product__size-btn--active")
            btnSizeBox.classList.add("detailes-product__size-btn-box--active")
            btnSizeBox.classList.add("detailes-product__size-btn--active")
        })
    })
}

// **set Btn color Active
function setBtncolor(btnColor, imgMainProduct) {
    btnColor.forEach(function (btnColor) {
        btnColor.addEventListener("click", function (e) {
            document.querySelector(".detailes-product__Color-btn-box--active").classList.remove("detailes-product__Color-btn-box--active")
            btnColor.classList.add("detailes-product__Color-btn-box--active")
            document.querySelector(".detailes-product-img-secound__box--active").classList.remove
            setImgProduct(e.target.dataset.color, imgMainProduct)
        })
    })
}



// **set Img Product Btn color
function setImgProduct(colorName, imgMainProduct) {
    imgMainProduct.setAttribute("src", "../images/product img " + colorName + " " + ProductSelectionByUser.type + ".webp")
}




// **set Input Number Plus Minus
// function setInputNumberPlusMinus() {
//     btnCurentInputNumberPlus.addEventListener("click", function (params) {
//         +btnCurentInputNumber.value++
//         if (+btnCurentInputNumber.value === 11) {
//             btnCurentInputNumber.value = 10
//             alert("If you need more than 10 products, call the following number: 09309657845")
//         }
//         setLocalStorgechangeInputCountProduct(btnCurentInputNumber.value)
//     })
//     btnCurentInputNumberMinus.addEventListener("click", function (params) {
//         +btnCurentInputNumber.value--
//         if (+btnCurentInputNumber.value === 0) {
//             btnCurentInputNumber.value = 1
//         }
//         setLocalStorgechangeInputCountProduct(btnCurentInputNumber.value)
//     })
// }
// setInputNumberPlusMinus()



// **Product counter local storge
// function setLocalStorgechangeInputCountProduct(btnCurentInputNumbervalue) {
//     localStorage.setItem("setCountProduct", JSON.stringify(btnCurentInputNumbervalue))
//     if (localStorage) {
//         ProductSelectionByUser.count = btnCurentInputNumbervalue
//     }
//     ProductSelectionByUser.count = btnCurentInputNumbervalue
// }

// function GetLocalStorgechangeInputCountProduct() {
//     let getCountProduct = JSON.parse(localStorage.getItem("setCountProduct"))
//     if (getCountProduct) {
//         ProductSelectionByUser.count = getCountProduct
//         btnCurentInputNumber.value = getCountProduct
//     } else {
//         ProductSelectionByUser.count = getCountProduct
//         btnCurentInputNumber.value = getCountProduct
//     }
//     setBtnAddToCart(cartArray)
// }
// window.addEventListener("load", GetLocalStorgechangeInputCountProduct)

// **set Img main Products

function setImgProducts(boxImgProduct, imgMainProduct) {
    boxImgProduct.forEach(function (boxImgProducts) {
        boxImgProducts.addEventListener("click", function (e) {
            document.querySelector(".detailes-product-img-secound__box--active").classList.remove("detailes-product-img-secound__box--active")
            boxImgProducts.classList.add("detailes-product-img-secound__box--active")
            let childeBoxImgProducts = boxImgProducts.children[0].getAttribute("src");
            imgMainProduct.setAttribute("src", childeBoxImgProducts)
        })
    })
}
//** */ Exit and entry of the shopping cart

let iconCart = document.querySelector(".icon-container__link--cart")
let cartShop = document.querySelector(".cart-Shop")
let wrapperCaverScreen = document.querySelector(".wrapper")
let iconExit = document.querySelector(".cart-Shop__icon-exit-head")

iconCart.addEventListener("click", function () {
    cartShop.classList.add("cart-Shop--active")
    wrapperCaverScreen.classList.add("wrapper--active")
})

iconExit.addEventListener("click", function () {
    cartShop.classList.remove("cart-Shop--active")
    wrapperCaverScreen.classList.remove("wrapper--active")
})


//** */ Shopping cart template
function setBtnAddToCart(cartArray) {
    keeperCartProduct.innerHTML = ""
    cartArray.forEach(function (product) {
        keeperSubTotalBtn.innerHTML = ""
        let price = +product.price
        let discountPercent = +product.discountPercent
        let totalDiscount = (price * discountPercent) / 100
        let total = price - totalDiscount
        product.discount === true ? keeperCartProduct.insertAdjacentHTML("afterbegin", '  <div class="products-keeper"><div class="products-keeper__box-img"><img class="products-keeper__img" src="' + product.imgSecoundMain + '"></div><div class="products-keeper-box-profile"><h6 class="products-keeper-box-profile__title">' + product.productName + '</h6><div class="box-calculation"><span class="box-calculation__number">' + product.count + '</span>   <span class="box-calculation__multiplication">X</span><span class="box-calculation__price">Rs ' + total.toLocaleString("en") + '</span></div></div><button onclick=" setBtnRemove(' + product.id + ')" class="products-keeper-product-delete-btn"><svg class="products-keeper-product-delete" width="20" height="20" viewBox="0 0 20 20"fill="none"><path fill-rule="evenodd" clip-rule="evenodd"d="M10 0C4.47727 0 0 4.47727 0 10C0 15.5227 4.47727 20 10 20C15.5227 20 20 15.5227 20 10C20 4.47727 15.5227 0 10 0ZM13.37 7.91545C13.5356 7.744 13.6272 7.51436 13.6252 7.276C13.6231 7.03764 13.5275 6.80963 13.3589 6.64107C13.1904 6.47252 12.9624 6.37691 12.724 6.37484C12.4856 6.37277 12.256 6.4644 12.0845 6.63L10 8.71455L7.91545 6.63C7.83159 6.54317 7.73128 6.47392 7.62037 6.42627C7.50946 6.37863 7.39016 6.35355 7.26946 6.3525C7.14875 6.35145 7.02904 6.37445 6.91731 6.42016C6.80559 6.46587 6.70409 6.53338 6.61873 6.61873C6.53338 6.70409 6.46587 6.80559 6.42016 6.91731C6.37445 7.02904 6.35145 7.14875 6.3525 7.26946C6.35355 7.39016 6.37863 7.50946 6.42627 7.62037C6.47392 7.73128 6.54317 7.83159 6.63 7.91545L8.71455 10L6.63 12.0845C6.54317 12.1684 6.47392 12.2687 6.42627 12.3796C6.37863 12.4905 6.35355 12.6098 6.3525 12.7305C6.35145 12.8513 6.37445 12.971 6.42016 13.0827C6.46587 13.1944 6.53338 13.2959 6.61873 13.3813C6.70409 13.4666 6.80559 13.5341 6.91731 13.5798C7.02904 13.6255 7.14875 13.6486 7.26946 13.6475C7.39016 13.6465 7.50946 13.6214 7.62037 13.5737C7.73128 13.5261 7.83159 13.4568 7.91545 13.37L10 11.2855L12.0845 13.37C12.256 13.5356 12.4856 13.6272 12.724 13.6252C12.9624 13.6231 13.1904 13.5275 13.3589 13.3589C13.5275 13.1904 13.6231 12.9624 13.6252 12.724C13.6272 12.4856 13.5356 12.256 13.37 12.0845L11.2855 10L13.37 7.91545Z"fill="#9F9F9F" /></svg></button></div>')
            : keeperCartProduct.insertAdjacentHTML("afterbegin", '  <div class="products-keeper"><div class="products-keeper__box-img"><img class="products-keeper__img" src="' + product.imgSecoundMain + '"></div><div class="products-keeper-box-profile"><h6 class="products-keeper-box-profile__title">' + product.productName + ' </h6>    <div class="box-calculation"><span class="box-calculation__number">' + product.count + '</span>   <span class="box-calculation__multiplication">X</span><span class="box-calculation__price">Rs ' + product.price.toLocaleString("en") + '</span></div></div> <button onclick=" setBtnRemove(' + product.id + ')" class="products-keeper-product-delete-btn"> <svg  class="products-keeper-product-delete" width="20" height="20" viewBox="0 0 20 20"fill="none"><path fill-rule="evenodd" clip-rule="evenodd"d="M10 0C4.47727 0 0 4.47727 0 10C0 15.5227 4.47727 20 10 20C15.5227 20 20 15.5227 20 10C20 4.47727 15.5227 0 10 0ZM13.37 7.91545C13.5356 7.744 13.6272 7.51436 13.6252 7.276C13.6231 7.03764 13.5275 6.80963 13.3589 6.64107C13.1904 6.47252 12.9624 6.37691 12.724 6.37484C12.4856 6.37277 12.256 6.4644 12.0845 6.63L10 8.71455L7.91545 6.63C7.83159 6.54317 7.73128 6.47392 7.62037 6.42627C7.50946 6.37863 7.39016 6.35355 7.26946 6.3525C7.14875 6.35145 7.02904 6.37445 6.91731 6.42016C6.80559 6.46587 6.70409 6.53338 6.61873 6.61873C6.53338 6.70409 6.46587 6.80559 6.42016 6.91731C6.37445 7.02904 6.35145 7.14875 6.3525 7.26946C6.35355 7.39016 6.37863 7.50946 6.42627 7.62037C6.47392 7.73128 6.54317 7.83159 6.63 7.91545L8.71455 10L6.63 12.0845C6.54317 12.1684 6.47392 12.2687 6.42627 12.3796C6.37863 12.4905 6.35355 12.6098 6.3525 12.7305C6.35145 12.8513 6.37445 12.971 6.42016 13.0827C6.46587 13.1944 6.53338 13.2959 6.61873 13.3813C6.70409 13.4666 6.80559 13.5341 6.91731 13.5798C7.02904 13.6255 7.14875 13.6486 7.26946 13.6475C7.39016 13.6465 7.50946 13.6214 7.62037 13.5737C7.73128 13.5261 7.83159 13.4568 7.91545 13.37L10 11.2855L12.0845 13.37C12.256 13.5356 12.4856 13.6272 12.724 13.6252C12.9624 13.6231 13.1904 13.5275 13.3589 13.3589C13.5275 13.1904 13.6231 12.9624 13.6252 12.724C13.6272 12.4856 13.5356 12.256 13.37 12.0845L11.2855 10L13.37 7.91545Z"fill="#9F9F9F"/></svg></button> </div></div >')
        keeperSubTotalBtn.insertAdjacentHTML("beforeend", '<div div class= "cart-Shop__btn-keeper-cart" ><div class="cart-Shop__btn-keeper__box-btn-cart"><button class="cart-Shop__btn-keeper__btn-cart">Cart</button></div><div class="cart-Shop__btn-keeper__box-btn"><button class="cart-Shop__btn-keeper__btn">Checkout</button></div><div class="cart-Shop__btn-keeper__box-btn"><button class="cart-Shop__btn-keeper__btn">Comparison</button></div></div> ')

    })
    TotalCalculations(cartArray)
}






// **total product price Calculations

function TotalCalculations(cartArray) {
    let priceTotal = 0
    cartArray.forEach(function (product) {
        let price = +product.price
        let discountPercent = +product.discountPercent
        let totalDiscount = (price * discountPercent) / 100
        let total = price - totalDiscount
        if (product.discount === true) {
            let priceProduct = total
            let countProduct = product.count
            priceTotal += countProduct * priceProduct
        } else {
            let priceProduct = product.price
            let countProduct = product.count
            priceTotal += countProduct * priceProduct
        }
    })
    subTotalPrice.innerHTML = "Rs. " + priceTotal.toLocaleString("en")
}


//** */ remove btn product  

function setBtnRemove(productId) {
    countProductIcon.innerHTML -= 1
    if (countProductIcon.innerHTML === -1) {
        countProductIcon.innerHTML = 0
    }
    cartArray = cartArray.filter(function (product) {
        console.log(product.id);
        return product.id !== productId
    })
    setBtnAddToCart(cartArray)
    TotalCalculations(cartArray)
    setLocalStorgeProductArrayCart(cartArray)
}

window.setBtnRemove = setBtnRemove;
