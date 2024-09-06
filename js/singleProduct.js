import { products } from "../js/db/data.js"


let $ = document




// **hamburger menu
const hamburger = $.querySelector(".hamburger")
const contenerMenuMobail = $.querySelector(".contener-menu-mobail ")

hamburger.addEventListener("click", function () {
    hamburger.classList.toggle("active")
    contenerMenuMobail.classList.toggle("contener-menu-mobail--active")
})


let menuLink = document.querySelectorAll(".list-menu-item__link")
menuLink.forEach(function (menuLink) {
    menuLink.addEventListener("click", function () {
        document.querySelector(".list-menu-item__link--active").classList.remove("list-menu-item__link--active")
        menuLink.classList.add("list-menu-item__link--active")
    })
})



// **elment html Single Page Product 
let routeProduct = document.querySelector(".route-product")
let imgSecoundContainer = document.querySelector(".detailes-product-img-secound")
let imgMain = document.querySelector(".detailes-product-img-main__box")
let detailesProducSpecifications = document.querySelector(".detailes-produc-Specifications")
let containerStarCustomerReview = document.querySelector(".detailes-produc-Specifications__customer-review-box")
let containerDescriptionProduct = document.querySelector(".detailes-product__description-box")
let containerBtnSiza = document.querySelector(".detailes-product__size-box")
let containerColorBtn = document.querySelector(".detailes-product__color-box")
let containerBtnProduct = document.querySelector(".detailes-product-btn")
let containerInformation = document.querySelector(".Supplementary-specifications__value-box")
let keeperCartProduct = document.querySelector(".cart-Shop__products")
let BtnAddToCart = document.querySelector(".detailes-product-btn__cart--add-to-cart")
let keeperSubTotalBtn = document.querySelector(".cart-Shop__keeper__sub-btn")
let btnCurentInputNumberPlus = document.querySelector(".detailes-product-input__quantity__plus")
let btnCurentInputNumberMinus = document.querySelector(".detailes-product-input__quantity__minus")
let btnCurentInputNumber = document.querySelector(".detailes-product-input__quantity")
let subTotalPrice = document.querySelector(".sub-total-box__price")

// **elment html cart page 



console.log(location);
// **location Search Params URL
let locationSearch = location.search
let locationSearchParams = new URLSearchParams(locationSearch)
let userIDParam = locationSearchParams.get("id")


// **location Find 
let locationFind = products.find(function (params) {
    return params.id === +userIDParam
})



// **set Single Page Product Dom
function setSinglePageProductDom(locationFind) {
    if (locationFind) {
        let price = +locationFind.price
        let discountPercent = +locationFind.discountPercent
        let totalDiscount = (price * discountPercent) / 100
        let total = price - totalDiscount
        routeProduct.insertAdjacentHTML("afterbegin", '<div class="container"><div class= "route-product__waraper"><p class="route-product__path-name">Home</p><svg class="route-product__icon width=" 8 height = "14" viewBox = "0 0 8 14" fill = "none" ><path d="M0 12L5 7L0 2L1 0L8 7L1 14L0 12Z" fill="black" /></svg ><p class="route-product__path-name">Shop</p><svg class="route-product__icon width=" 8 height = "14" viewBox = "0 0 8 14" fill = "none" ><path d="M0 12L5 7L0 2L1 0L8 7L1 14L0 12Z" fill="black" /></svg ><div class="route-product__line-col line"></div><p class="route-product__product-name">' + locationFind.productName + '</p></ ></div > ')
        imgSecoundContainer.insertAdjacentHTML("afterbegin", '  <div class="detailes-product-img-secound__box  detailes-product-img-secound__box--active "><img class="detailes-product-img-secound__img" src ="' + locationFind.imgSecoundMain + '" alt = "main-product" ></div ><div class="detailes-product-img-secound__box"><img class="detailes-product-img-secound__img" src="' + locationFind.imgSecound1 + '"alt="detailes-product"></div><div class="detailes-product-img-secound__box"><img class="detailes-product-img-secound__img" src="' + locationFind.imgSecound2 + '" alt="detailes-product"></div><div class="detailes-product-img-secound__box"><img class="detailes-product-img-secound__img" src="' + locationFind.imgSecound3 + '"alt="detailes-product"></div><div class="detailes-product-img-secound__box"><img class="detailes-product-img-secound__img" src=" ' + locationFind.imgSecound4 + '" alt="detailes-product"></div>')
        imgMain.insertAdjacentHTML("afterbegin", '  <img class="detailes-product-img-main___img" src="' + locationFind.imgSecoundMain + '" alt="main-product">')
        locationFind.discount == true ? detailesProducSpecifications.insertAdjacentHTML("afterbegin", '<h3 class="detailes-produc-Specifications__title">' + locationFind.productIntroduction + '</h3><h5 class= "detailes-produc-Specifications__price-discount" >' + "Rp " + locationFind.price.toLocaleString("en") + '</h5 ><h5 class="detailes-produc-Specifications__price">' + "Rp " + total.toLocaleString("en") + '</h5>') : detailesProducSpecifications.insertAdjacentHTML("afterbegin", '<h3 class="detailes-produc-Specifications__title">' + locationFind.productIntroduction + '</h3><h5 class= "detailes-produc-Specifications__price" >' + "Rp " + locationFind.price.toLocaleString("en") + '</h5>')
        containerStarCustomerReview.insertAdjacentHTML("afterbegin", ' <div class="detailes-produc-Specifications__score"><svg data-star="1" class= "detailes-product-Specifications__star   " width = "25" height = "25"viewBox = "0 0 18 18" fill = "white" fill = "white" stroke = "#FFC700" ><path d="M9 1.11803L11.5528 6.22361L11.6725 6.46295L11.938 6.49614L16.993 7.12801L13.5068 11.0372L13.347 11.2165L13.387 11.4533L14.343 17.1125L9.22361 14.5528L9 14.441L8.77639 14.5528L3.65861 17.1117L4.62289 11.454L4.66338 11.2164L4.50277 11.0368L1.00842 7.12784L6.06202 6.49614L6.32754 6.46295L6.44721 6.22361L9 1.11803Z" /></svg ><svg data-star="2" class="detailes-product-Specifications__star" width="25" height="25"viewBox="0 0 18 18" fill="white" fill="white" stroke="#FFC700"><path class="detailes-product-Specifications__star-path"d="M9 1.11803L11.5528 6.22361L11.6725 6.46295L11.938 6.49614L16.993 7.12801L13.5068 11.0372L13.347 11.2165L13.387 11.4533L14.343 17.1125L9.22361 14.5528L9 14.441L8.77639 14.5528L3.65861 17.1117L4.62289 11.454L4.66338 11.2164L4.50277 11.0368L1.00842 7.12784L6.06202 6.49614L6.32754 6.46295L6.44721 6.22361L9 1.11803Z" /></svg><svg data-star="3" class="detailes-product-Specifications__star" width="25" height="25"viewBox="0 0 18 18" fill="white" fill="white" stroke="#FFC700"><path class="detailes-product-Specifications__star-path"d="M9 1.11803L11.5528 6.22361L11.6725 6.46295L11.938 6.49614L16.993 7.12801L13.5068 11.0372L13.347 11.2165L13.387 11.4533L14.343 17.1125L9.22361 14.5528L9 14.441L8.77639 14.5528L3.65861 17.1117L4.62289 11.454L4.66338 11.2164L4.50277 11.0368L1.00842 7.12784L6.06202 6.49614L6.32754 6.46295L6.44721 6.22361L9 1.11803Z" /></svg><svg data-star="4" class="detailes-product-Specifications__star" width="25" height="25"viewBox="0 0 18 18" fill="white" fill="white" stroke="#FFC700"><path class="detailes-product-Specifications__star-path"d="M9 1.11803L11.5528 6.22361L11.6725 6.46295L11.938 6.49614L16.993 7.12801L13.5068 11.0372L13.347 11.2165L13.387 11.4533L14.343 17.1125L9.22361 14.5528L9 14.441L8.77639 14.5528L3.65861 17.1117L4.62289 11.454L4.66338 11.2164L4.50277 11.0368L1.00842 7.12784L6.06202 6.49614L6.32754 6.46295L6.44721 6.22361L9 1.11803Z" /></svg>  <svg data-star="5" class="detailes-product-Specifications__star" width="25" height="25"viewBox = "0 0 18 18" fill = "white" fill = "white" stroke = "#FFC700" ><path class="detailes-product-Specifications__star-path"' +
            'd="M9 1.11803L11.5528 6.22361L11.6725 6.46295L11.938 6.49614L16.993 7.12801L13.5068 11.0372L13.347 11.2165L13.387 11.4533L14.343 17.1125L9.22361 14.5528L9 14.441L8.77639 14.5528L3.65861 17.1117L4.62289 11.454L4.66338 11.2164L4.50277 11.0368L1.00842 7.12784L6.06202 6.49614L6.32754 6.46295L6.44721 6.22361L9 1.11803Z" /></svg > </div ><div class="detailes-produc-Specifications__line line"></div><p class="detailes-produc-Specifications__status">0 Customer Review</p>')
        containerDescriptionProduct.insertAdjacentHTML("afterbegin", '<p class="detailes-product__description">' + locationFind.description + '</p > ')
        containerBtnSiza.insertAdjacentHTML("afterbegin", ' <span class="detailes-product__size__name">Size</span><div class= "detailes-product__size-btn-container" ><div class="detailes-product__size-btn-box  detailes-product__size-btn-box--active"><butuon class="detailes-product__size-btn  detailes-product__size-btn--active">L</butuon></div><div class="detailes-product__size-btn-box"><butuon class="detailes-product__size-btn">XL</butuon></div><div class="detailes-product__size-btn-box"><butuon class="detailes-product__size-btn">XS</butuon></div></div> ')
        containerColorBtn.insertAdjacentHTML("afterbegin", '  <span class="detailes-product__Color__name">Color</span><div class="detailes-product__Color-btn-container"> <div data-color="' + locationFind.color1 + '" class="detailes-product__Color-btn-box  detailes-product__size-btn--' + locationFind.color1 + ' detailes-product__Color-btn-box--active"> </div> <div data-color="' + locationFind.color2 + '"  class="detailes-product__Color-btn-box detailes-product__size-btn--' + locationFind.color2 + '"> </div><div data-color="' + locationFind.color3 + '" class="detailes-product__Color-btn-box  detailes-product__size-btn--' + locationFind.color3 + '"></div><div data-color="' + locationFind.color4 + '"<div class="detailes-product__Color-btn-box  detailes-product__size-btn--' + locationFind.color4 + '"></div>  </div >')
        containerBtnProduct.insertAdjacentHTML("beforeend", '<div  class="detailes-product-btn__box-cart"><button class="detailes-product-btn__cart detailes-product-btn__cart--add-to-cart">Add To Cart</button></div><div class="detailes-product-btn__box-Compare"> <button class="detailes-product-btn__Compare">+Compare</button></div>')
        containerInformation.insertAdjacentHTML("afterbegin", '<span class="Supplementary-specifications__value">SS00' + locationFind.id + '</span><span class="Supplementary-specifications__value">' + locationFind.type + '</span ><span class="Supplementary-specifications__value">Sofa, Chair, Home, Shop</span>   <div class="Supplementary-specifications__box-icon"><svg class= "Supplementary-specifications__icon" width = "20" height = "20"viewBox = "0 0 20 20" fill = "none" ><path fill-rule="evenodd" clip-rule="evenodd"d="M0 10.0558C0 15.0275 3.61083 19.1617 8.33333 20V12.7775H5.83333V10H8.33333V7.7775C8.33333 5.2775 9.94417 3.88917 12.2225 3.88917C12.9442 3.88917 13.7225 4 14.4442 4.11083V6.66667H13.1667C11.9442 6.66667 11.6667 7.2775 11.6667 8.05583V10H14.3333L13.8892 12.7775H11.6667V20C16.3892 19.1617 20 15.0283 20 10.0558C20 4.525 15.5 0 10 0C4.5 0 0 4.525 0 10.0558Z"fill="black" /></svg ><svg class="Supplementary-specifications__icon" width="20" height="20"viewBox="0 0 20 20" fill="none"><path fill-rule="evenodd" clip-rule="evenodd"' +
            'd = "M0.833252 2.36501C0.833252 1.95879 0.994624 1.5692 1.28187 1.28196C1.56911 0.994717 1.9587 0.833346 2.36492 0.833346H17.6333C17.8346 0.833017 18.034 0.872398 18.22 0.949234C18.4061 1.02607 18.5752 1.13885 18.7176 1.28113C18.8601 1.4234 18.973 1.59237 19.0501 1.77835C19.1271 1.96434 19.1667 2.1637 19.1666 2.36501V17.6333C19.1668 17.8347 19.1273 18.0341 19.0504 18.2202C18.9735 18.4063 18.8606 18.5754 18.7183 18.7178C18.5759 18.8602 18.4069 18.9731 18.2209 19.0502C18.0348 19.1272 17.8354 19.1668 17.6341 19.1667H2.36492C2.16371 19.1667 1.96447 19.127 1.77858 19.05C1.5927 18.973 1.42381 18.8601 1.28157 18.7178C1.13933 18.5755 1.02653 18.4065 0.949604 18.2206C0.87268 18.0347 0.833143 17.8354 0.833252 17.6342V2.36501ZM8.08992 7.82335H10.5724V9.07001C10.9308 8.35335 11.8474 7.70835 13.2249 7.70835C15.8658 7.70835 16.4916 9.13585 16.4916 11.755V16.6067H13.8191V12.3517C13.8191 10.86 13.4608 10.0183 12.5508 10.0183C11.2883 10.0183 10.7633 10.9258 10.7633 12.3517V16.6067H8.08992V7.82335ZM3.50659 16.4925H6.17992V7.70835H3.50659V16.4917V16.4925ZM6.56242 4.84335C6.56746 5.07224 6.52673 5.29983 6.44262 5.51277C6.35851 5.72571 6.23271 5.91971 6.07261 6.08337C5.91251 6.24704 5.72133 6.37707 5.5103 6.46585C5.29926 6.55463 5.07262 6.60036 4.84367 6.60036C4.61472 6.60036 4.38808 6.55463 4.17704 6.46585C3.966 6.37707 3.77483 6.24704 3.61473 6.08337C3.45463 5.91971 3.32883 5.72571 3.24472 5.51277C3.16061 5.29983 3.11988 5.07224 3.12492 4.84335C3.13481 4.39406 3.32024 3.9665 3.64149 3.65225C3.96274 3.338 4.39427 3.16203 4.84367 3.16203C5.29307 3.16203 5.7246 3.338 6.04585 3.65225C6.3671 3.9665 6.55253 4.39406 6.56242 4.84335Z"fill="black" /></svg><svg class="Supplementary-specifications__icon" width="23" height="23"viewBox="0 0 23 23" fill="none">' +
            '<path d="M11.5 0.5625C5.45996 0.5625 0.5625 5.45996 0.5625 11.5C0.5625 17.54 5.45996 22.4375 11.5 22.4375C17.54 22.4375 22.4375 17.54 22.4375 11.5C22.4375 5.45996 17.54 0.5625 11.5 0.5625ZM16.7563 8.80713C16.7637 8.92187 16.7637 9.0415 16.7637 9.15869C16.7637 12.7427 14.0342 16.8711 9.04639 16.8711C7.5083 16.8711 6.08252 16.4243 4.88135 15.6553C5.10107 15.6797 5.31104 15.6895 5.53565 15.6895C6.80518 15.6895 7.97217 15.2598 8.90234 14.5322C7.71094 14.5078 6.70996 13.7266 6.36816 12.6523C6.78564 12.7134 7.16162 12.7134 7.59131 12.6035C6.97785 12.4789 6.42645 12.1457 6.0308 11.6606C5.63515 11.1755 5.41965 10.5684 5.4209 9.94238V9.9082C5.77979 10.1108 6.20215 10.2354 6.64404 10.2524C6.27256 10.0049 5.96791 9.66946 5.75711 9.27595C5.5463 8.88244 5.43585 8.443 5.43555 7.99658C5.43555 7.49121 5.56738 7.02979 5.8042 6.62939C6.48511 7.46762 7.33479 8.15318 8.29801 8.64152C9.26123 9.12986 10.3164 9.41004 11.395 9.46387C11.0117 7.62061 12.3887 6.12891 14.0439 6.12891C14.8252 6.12891 15.5283 6.45605 16.0239 6.9834C16.6367 6.86865 17.2227 6.63916 17.7451 6.33154C17.5425 6.95898 17.1177 7.48877 16.5537 7.82324C17.1006 7.76465 17.6279 7.61328 18.1162 7.40088C17.7476 7.94287 17.2861 8.42383 16.7563 8.80713Z"fill="black" /></svg></div >')

        let iconStar = document.querySelectorAll(".detailes-product-Specifications__star")
        let statusScore = document.querySelector(".detailes-produc-Specifications__status")
        let btnSizeBox = document.querySelectorAll(".detailes-product__size-btn-box")
        let btnColor = document.querySelectorAll(".detailes-product__Color-btn-box ")
        let boxImgProduct = document.querySelectorAll(".detailes-product-img-secound__box")
        let imgMainProduct = document.querySelector(".detailes-product-img-main___img")
        let btnAddToCart = document.querySelector(".detailes-product-btn__box-cart")
        setScoreProduct(iconStar, statusScore)
        setBtnSize(btnSizeBox)
        setBtncolor(btnColor, imgMainProduct)
        setImgProducts(boxImgProduct, imgMainProduct)
        addBtnCart(btnAddToCart)
    }
}
setSinglePageProductDom(locationFind)


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
        setProductDom(locationFind.id)

    })
}

// **set Product Dom
function setProductDom(userIDParam) {
    let findProduct = cartArray.find(function (productCart) {
        return productCart.id === userIDParam
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
        cartArray.push(locationFind)
        if (locationFind.count === null) {
            locationFind.count = 1
        }
        if (+btnCurentInputNumber.value === 11) {
            btnCurentInputNumber.value = 10
            alert("If you need more than 10 products, call the following number: 09309657845")
        }
        if (+btnCurentInputNumber.value === 0) {
            btnCurentInputNumber.value = 1
        }
        locationFind.count = btnCurentInputNumber.value
        setLocalStorgechangeInputCountProduct(locationFind.count)
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
    console.log(getCartArray);
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



// **set Score Product
function setScoreProduct(iconStar, statusScore) {
    iconStar.forEach(function (icon, i) {
        icon.addEventListener("click", function (e) {
            let curentStar = i + 1
            iconStar.forEach(function (icons, j) {
                if (curentStar >= j + 1) {
                    icons.classList.add("detailes-produc-Specifications__star--active")
                    statusScore.innerHTML = curentStar + "  of" + ' 5 Customer Review';
                } else {
                    icons.classList.remove("detailes-produc-Specifications__star--active")
                }
            })
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
    imgMainProduct.setAttribute("src", "../images/product img " + colorName + " " + locationFind.type + ".webp")
}




// **set Input Number Plus Minus
function setInputNumberPlusMinus() {
    btnCurentInputNumberPlus.addEventListener("click", function (params) {
        +btnCurentInputNumber.value++
        if (+btnCurentInputNumber.value === 11) {
            btnCurentInputNumber.value = 10
            alert("If you need more than 10 products, call the following number: 09309657845")
        }
        setLocalStorgechangeInputCountProduct(btnCurentInputNumber.value)
    })
    btnCurentInputNumberMinus.addEventListener("click", function (params) {
        +btnCurentInputNumber.value--
        if (+btnCurentInputNumber.value === 0) {
            btnCurentInputNumber.value = 1
        }
        setLocalStorgechangeInputCountProduct(btnCurentInputNumber.value)
    })
}
setInputNumberPlusMinus()



// **Product counter local storge
function setLocalStorgechangeInputCountProduct(btnCurentInputNumbervalue) {
    localStorage.setItem("setCountProduct", JSON.stringify(btnCurentInputNumbervalue))
    if (localStorage) {
        locationFind.count = btnCurentInputNumbervalue
    }
    locationFind.count = btnCurentInputNumbervalue
}

function GetLocalStorgechangeInputCountProduct() {
    let getCountProduct = JSON.parse(localStorage.getItem("setCountProduct"))
    if (getCountProduct) {
        locationFind.count = getCountProduct
        btnCurentInputNumber.value = getCountProduct
    } else {
        locationFind.count = getCountProduct
        btnCurentInputNumber.value = getCountProduct
    }
    setBtnAddToCart(cartArray)
}
window.addEventListener("load", GetLocalStorgechangeInputCountProduct)

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
