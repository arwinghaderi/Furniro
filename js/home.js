import { products, images } from "../js/db/data.js"

let $ = document

const hamburger = $.querySelector(".hamburger")
const contenerMenuMobail = $.querySelector(".contener-menu-mobail ")
let menuLink = document.querySelectorAll(".list-menu-item__link")

hamburger.addEventListener("click", function () {
    hamburger.classList.toggle("active")
    contenerMenuMobail.classList.toggle("contener-menu-mobail--active")
})

menuLink.forEach(function (menuLink) {
    menuLink.addEventListener("click", function () {
        document.querySelector(".list-menu-item__link--active").classList.remove("list-menu-item__link--active")
        menuLink.classList.add("list-menu-item__link--active")
    })
})


let rowProduct = document.querySelector(".row-container")
//** set Product templet Dom

function setProductsDom(products) {

    products.forEach(function (product) {

        if (product.discount === true) {
            let price = +product.price
            let discountPercent = +product.discountPercent
            let totalDiscount = (price * discountPercent) / 100
            let total = price - totalDiscount
            rowProduct.insertAdjacentHTML('beforeend', '   <div class="col col-lg-3 product-main-box"><div class="product-box"><div  ' +
                'class="img-box-overlay"><img class="product__img" src="' + product.img + '" alt="product1"><div class="product-overlay">' +
                '<div class="box-add-btn-cart"><a href = "../Furniro/Pages/product.html?id=' + product.id + '" class="box-add-btn-cart__text">Details Product</a></div>' +
                ' <div class="product-overlay__options">' +
                ' <div class="option-overlay">' +
                '+ <svg width="12" height="14" viewBox="0 0 12 14" fill="none" >' +
                '+<path d="M10 9.66671C9.47467 9.66671 9 9.87337 8.644 10.2047L3.94 7.46671C3.97333 7.31337 4 7.16004 4 7.00004C4 6.84004 3.97333 6.68671 3.94 6.53337L8.64 3.79337C9 4.12671 9.47333 4.33337 10 4.33337C11.1067 4.33337 12 3.44004 12 2.33337C12 1.22671 11.1067 0.333374 10 0.333374C8.89333 0.333374 8 1.22671 8 2.33337C8 2.49337 8.02667 2.64671 8.06 2.80004L3.36 5.54004C3 5.20671 2.52667 5.00004 2 5.00004C0.893333 5.00004 0 5.89337 0 7.00004C0 8.10671 0.893333 9.00004 2 9.00004C2.52667 9.00004 3 8.79337 3.36 8.46004L8.05867 11.2054C8.02112 11.3563 8.00143 11.5112 8 11.6667C8 12.0623 8.1173 12.4489 8.33706 12.7778C8.55682 13.1067 8.86918 13.3631 9.23463 13.5145C9.60009 13.6658 10.0022 13.7054 10.3902 13.6283C10.7781 13.5511 11.1345 13.3606 11.4142 13.0809C11.6939 12.8012 11.8844 12.4448 11.9616 12.0569C12.0387 11.6689 11.9991 11.2668 11.8478 10.9013C11.6964 10.5359 11.44 10.2235 11.1111 10.0038C10.7822 9.784 10.3956 9.66671 10 9.66671Z" fill="white"/></svg>' +
                '<span class="option-overlay__text">Share</span> </div> <div class="option-overlay">' +
                '<svg class="option-overlay-Compare" width="14" height="14"viewBox="0 0 14 14" fill="none">' +
                '<path d="M9.08004 6L10.08 7L13.52 3.55L10 0L9.00004 1L10.8 2.8H1.00004V4.2H10.82L9.08004 6ZM4.86004 8L3.86004 7L0.420044 10.5L3.91004 14L4.91004 13L3.10004 11.2H13V9.8H3.10004L4.86004 8Z" fill="white" /></svg>' +
                ' <span class="option-overlay__text">Compare</span></div>' +
                ' <div class="option-overlay"><svg class="option-overlay-Like" width="16" height="15" viewBox="0 0 16 15" fill="none">' +
                ' <path d="M7.99973 13.0361C-5.33333 5.66669 3.99999 -2.33331 7.99973 2.72539C12 -2.33331 21.3333 5.66669 7.99973 13.0361Z"stroke="white" stroke-width="1.8" /> </svg>' +
                ' <span class="option-overlay__text">Like</span></div></div></div> </div> <div  class="Discount-product">' +
                ' <span class="Discount-product__number">' + "-" + product.discountPercent + "%" + '</span></div><div class="product-Introductions"><h3 class="product-name">' + product.productName + '</h3>' +
                ' <p class="product-Introduction">' + product.productIntroduction + '</p><div class="product-price-box">' +
                '<span class="product-price">' + "Rp " + total.toLocaleString("en") + '</span><span class="product-discountPrice">' + "Rp" + product.price + '</span>' +
                '</div> </div></div></div> ')
        }

        product.newProduct === true ? rowProduct.insertAdjacentHTML('beforeend', '   <div class="col col-lg-3 product-main-box"><div class="product-box"><div  ' +
            'class="img-box-overlay"><img class="product__img" src="' + product.img + '" alt="product1"><div class="product-overlay">' +
            '<div class="box-add-btn-cart"><a href="../Furniro/Pages/product.html?id=' + product.id + '" class="box-add-btn-cart__text">Details Product</a></div>' +
            ' <div class="product-overlay__options">' +
            ' <div class="option-overlay">' +
            '+ <svg width="12" height="14" viewBox="0 0 12 14" fill="none" >' +
            '+<path d="M10 9.66671C9.47467 9.66671 9 9.87337 8.644 10.2047L3.94 7.46671C3.97333 7.31337 4 7.16004 4 7.00004C4 6.84004 3.97333 6.68671 3.94 6.53337L8.64 3.79337C9 4.12671 9.47333 4.33337 10 4.33337C11.1067 4.33337 12 3.44004 12 2.33337C12 1.22671 11.1067 0.333374 10 0.333374C8.89333 0.333374 8 1.22671 8 2.33337C8 2.49337 8.02667 2.64671 8.06 2.80004L3.36 5.54004C3 5.20671 2.52667 5.00004 2 5.00004C0.893333 5.00004 0 5.89337 0 7.00004C0 8.10671 0.893333 9.00004 2 9.00004C2.52667 9.00004 3 8.79337 3.36 8.46004L8.05867 11.2054C8.02112 11.3563 8.00143 11.5112 8 11.6667C8 12.0623 8.1173 12.4489 8.33706 12.7778C8.55682 13.1067 8.86918 13.3631 9.23463 13.5145C9.60009 13.6658 10.0022 13.7054 10.3902 13.6283C10.7781 13.5511 11.1345 13.3606 11.4142 13.0809C11.6939 12.8012 11.8844 12.4448 11.9616 12.0569C12.0387 11.6689 11.9991 11.2668 11.8478 10.9013C11.6964 10.5359 11.44 10.2235 11.1111 10.0038C10.7822 9.784 10.3956 9.66671 10 9.66671Z" fill="white"/></svg>' +
            '<span class="option-overlay__text">Share</span> </div> <div class="option-overlay">' +
            '<svg class="option-overlay-Compare" width="14" height="14"viewBox="0 0 14 14" fill="none">' +
            '<path d="M9.08004 6L10.08 7L13.52 3.55L10 0L9.00004 1L10.8 2.8H1.00004V4.2H10.82L9.08004 6ZM4.86004 8L3.86004 7L0.420044 10.5L3.91004 14L4.91004 13L3.10004 11.2H13V9.8H3.10004L4.86004 8Z" fill="white" /></svg>' +
            ' <span class="option-overlay__text">Compare</span></div>' +
            ' <div class="option-overlay"><svg class="option-overlay-Like" width="16" height="15" viewBox="0 0 16 15" fill="none">' +
            ' <path d="M7.99973 13.0361C-5.33333 5.66669 3.99999 -2.33331 7.99973 2.72539C12 -2.33331 21.3333 5.66669 7.99973 13.0361Z"stroke="white" stroke-width="1.8" /> </svg>' +
            ' <span class="option-overlay__text">Like</span></div></div></div> </div> <div  class="Discount-product Discount-product--green ">' +
            ' <span class="Discount-product__number">NEW</span></div><div class="product-Introductions"><h3 class="product-name">' + product.productName + '</h3>' +
            ' <p class="product-Introduction">' + product.productIntroduction + '</p><div class="product-price-box">' +
            '<span class="product-price">' + product.price.toLocaleString("en") + '</span>' +
            '</div> </div></div></div> ') : product.poster === false ? rowProduct.insertAdjacentHTML('beforeend', '   <div class="col col-lg-3 product-main-box"><div class="product-box "><div  ' +
                'class="img-box-overlay"><img class="product__img" src="' + product.img + '" alt="product1"><div class="product-overlay">' +
                '<div class="box-add-btn-cart"><a href="../Furniro/Pages/product.html?id=' + product.id + '" class="box-add-btn-cart__text">Details Product</a></div>' +
                ' <div class="product-overlay__options">' +
                ' <div class="option-overlay">' +
                '+ <svg width="12" height="14" viewBox="0 0 12 14" fill="none" >' +
                '+<path d="M10 9.66671C9.47467 9.66671 9 9.87337 8.644 10.2047L3.94 7.46671C3.97333 7.31337 4 7.16004 4 7.00004C4 6.84004 3.97333 6.68671 3.94 6.53337L8.64 3.79337C9 4.12671 9.47333 4.33337 10 4.33337C11.1067 4.33337 12 3.44004 12 2.33337C12 1.22671 11.1067 0.333374 10 0.333374C8.89333 0.333374 8 1.22671 8 2.33337C8 2.49337 8.02667 2.64671 8.06 2.80004L3.36 5.54004C3 5.20671 2.52667 5.00004 2 5.00004C0.893333 5.00004 0 5.89337 0 7.00004C0 8.10671 0.893333 9.00004 2 9.00004C2.52667 9.00004 3 8.79337 3.36 8.46004L8.05867 11.2054C8.02112 11.3563 8.00143 11.5112 8 11.6667C8 12.0623 8.1173 12.4489 8.33706 12.7778C8.55682 13.1067 8.86918 13.3631 9.23463 13.5145C9.60009 13.6658 10.0022 13.7054 10.3902 13.6283C10.7781 13.5511 11.1345 13.3606 11.4142 13.0809C11.6939 12.8012 11.8844 12.4448 11.9616 12.0569C12.0387 11.6689 11.9991 11.2668 11.8478 10.9013C11.6964 10.5359 11.44 10.2235 11.1111 10.0038C10.7822 9.784 10.3956 9.66671 10 9.66671Z" fill="white"/></svg>' +
                '<span class="option-overlay__text">Share</span> </div> <div class="option-overlay">' +
                '<svg class="option-overlay-Compare" width="14" height="14"viewBox="0 0 14 14" fill="none">' +
                '<path d="M9.08004 6L10.08 7L13.52 3.55L10 0L9.00004 1L10.8 2.8H1.00004V4.2H10.82L9.08004 6ZM4.86004 8L3.86004 7L0.420044 10.5L3.91004 14L4.91004 13L3.10004 11.2H13V9.8H3.10004L4.86004 8Z" fill="white" /></svg>' +
                ' <span class="option-overlay__text">Compare</span></div>' +
                ' <div class="option-overlay"><svg class="option-overlay-Like" width="16" height="15" viewBox="0 0 16 15" fill="none">' +
                ' <path d="M7.99973 13.0361C-5.33333 5.66669 3.99999 -2.33331 7.99973 2.72539C12 -2.33331 21.3333 5.66669 7.99973 13.0361Z"stroke="white" stroke-width="1.8" /> </svg>' +
                ' <span class="option-overlay__text">Like</span></div></div></div> </div><div class="product-Introductions"><h3 class="product-name">' + product.productName + '</h3>' +
                ' <p class="product-Introduction"> ' + product.productIntroduction + '</p><div class="product-price-box">' +
                '<span class="product-price">' + product.price.toLocaleString("en") + '</span>' +
                '</div> </div></div></div> ') : console.log("no product");
    })
}


//** set Btn Show Mor

let curentItem = 8
let curentPage = 1
let btnShowMor = document.querySelector(".show-more")
let Loder = document.querySelector(".show-more__loder")
function setBtnShowMor(products) {
    let indexEnd = curentItem * curentPage
    let indexStart = indexEnd - indexEnd
    console.log(indexStart, indexEnd);
    let productsSlice = products.slice(indexStart, indexEnd);
    setProductsDom(productsSlice)
    btnShowMor.addEventListener("click", function () {
        btnShowMor.style.display = "none"
        Loder.style.display = "block"
        let interval = setInterval(function () {
            rowProduct.innerHTML = ""
            Loder.style.display = "none"
            btnShowMor.style.display = "block"
            curentPage++
            indexEnd = curentItem * curentPage
            indexStart = indexEnd - indexEnd
            console.log(indexStart, indexEnd);
            productsSlice = products.slice(indexStart, indexEnd);
            console.log(productsSlice);
            setProductsDom(productsSlice)
            if (curentItem <= curentItem + 8) {
                clearInterval(interval)
            }
            if (indexEnd >= products.length) {
                btnShowMor.style.display = "none"
            }
            setLocalStoreg(productsSlice)
            setLocalStoregCurrentPage(curentPage)
        }, 3000)
    })
}
setBtnShowMor(products)



//** set Local Storeg CurrentPag Show mor
function setLocalStoregCurrentPage(curentPage) {
    localStorage.setItem("curentPageHome", JSON.stringify(curentPage))
}


function getItemLocalStoregCurrentPage(products) {
    let curentPageLocal = JSON.parse(localStorage.getItem("curentPageHome"))
    console.log(curentPageLocal);
    if (curentPageLocal) {

        curentPage = curentPageLocal
    }
    else {
        products = []
    }
    setProductsDom(products)
}
getItemLocalStoregCurrentPage(products)

function setLocalStoreg(products) {
    localStorage.setItem("productArrayHome", JSON.stringify(products))
}


function getItemLocalStoreg(products) {
    console.log(products);
    let getItem = JSON.parse(localStorage.getItem("productArrayHome"))
    console.log(getItem);
    if (getItem) {
        if (products.length === getItem.length) {
            btnShowMor.style.display = "none"
        }
        if (products.length < getItem.length + curentItem) {
            rowProduct.innerHTML = ""
        }
        products = getItem
    }
    else {
        products = []
    }
    setProductsDom(products)
}
window.addEventListener('load', function name(params) {
    getItemLocalStoreg(products)
})




// ** SLaider

let slaiderImg = document.querySelectorAll(".slaider-img")
let customInputRadio = document.querySelectorAll(".custom-input-radio")
let slaiderPaginationParent = document.querySelector(".slaider-pagination-container")
let checkmarkInput = document.querySelectorAll(".checkmark-input")
let imgSlaiderTitle = document.querySelector(".box-contant-img-slaider__title")
let slaiderbtnright = document.querySelector("#slaider-btn-right")
let boxContantImgIntroduction = document.querySelector(".box-contant-img-slaider__introduction")





// **next item slader

let indexArrayImg = 0
function nextItem() {
    indexArrayImg++
    if (indexArrayImg === images.length) {
        indexArrayImg = 0
        slaiderImg[0].setAttribute("src", images[indexArrayImg].img)
    }
    slaiderImg[0].setAttribute("src", images[indexArrayImg].img)
    document.querySelector(".checkmark-input--active").classList.remove("checkmark-input--active")
    document.querySelector(".custom-input-radio--active").classList.remove("custom-input-radio--active")
    customInputRadio[indexArrayImg].classList.add("custom-input-radio--active")
    checkmarkInput[indexArrayImg].classList.add("checkmark-input--active")
    if (indexArrayImg === 0) {
        let indexResult = indexArrayImg + 4
        boxContantImgIntroduction.innerHTML = "0" + indexResult + "___" + images[indexArrayImg].introduction
    } else {
        boxContantImgIntroduction.innerHTML = "0" + indexArrayImg + "___" + images[indexArrayImg].introduction
    }
    indexArrayImg++
    if (indexArrayImg === images.length) {
        indexArrayImg = 0
        slaiderImg[1].setAttribute("src", images[indexArrayImg].img)
    }

    slaiderImg[1].setAttribute("src", images[indexArrayImg].img)
    imgSlaiderTitle.innerHTML = images[indexArrayImg].Title
    indexArrayImg++
    if (indexArrayImg === images.length) {
        indexArrayImg = 0
        slaiderImg[2].setAttribute("src", images[indexArrayImg].img)
    }
    slaiderImg[2].setAttribute("src", images[indexArrayImg].img)


    indexArrayImg++
    if (indexArrayImg === images.length) {
        indexArrayImg = 0
        slaiderImg[3].setAttribute("src", images[indexArrayImg].img)
    }
    slaiderImg[3].setAttribute("src", images[indexArrayImg].img)


    indexArrayImg++
    if (indexArrayImg === images.length) {
        indexArrayImg = 0
        slaiderImg[3].setAttribute("src", images[indexArrayImg].img)
    }
}
slaiderbtnright.addEventListener("click", nextItem);

setInterval(nextItem, 5000)


//** pagination--Slaider*/ 

customInputRadio.forEach(function (params, ind) {
    params.addEventListener("click", function () {
        indexArrayImg = ind
        indexArrayImg++
        if (indexArrayImg === images.length) {
            indexArrayImg = 0
            slaiderImg[0].setAttribute("src", images[ind].img)
        }
        slaiderImg[0].setAttribute("src", images[ind].img)


        if (indexArrayImg === 0) {
            let indexResult = indexArrayImg + 4
            boxContantImgIntroduction.innerHTML = "0" + indexResult + "___" + images[indexArrayImg].introduction
        } else {
            boxContantImgIntroduction.innerHTML = "0" + indexArrayImg + "___" + images[indexArrayImg].introduction
        }
        imgSlaiderTitle.innerHTML = images[indexArrayImg].Title

        indexArrayImg++
        if (indexArrayImg === images.length) {
            indexArrayImg = 0
            slaiderImg[1].setAttribute("src", images[indexArrayImg].img)
        }
        slaiderImg[1].setAttribute("src", images[indexArrayImg].img)


        indexArrayImg++
        if (indexArrayImg === images.length) {
            indexArrayImg = 0
            slaiderImg[2].setAttribute("src", images[indexArrayImg].img)
        }
        slaiderImg[2].setAttribute("src", images[indexArrayImg].img)


        indexArrayImg++
        if (indexArrayImg === images.length) {
            indexArrayImg = 0
            slaiderImg[3].setAttribute("src", images[indexArrayImg].img)
        }
        slaiderImg[3].setAttribute("src", images[indexArrayImg].img)


        indexArrayImg++
        if (indexArrayImg === images.length) {
            indexArrayImg = 0
            slaiderImg[3].setAttribute("src", images[indexArrayImg].img)
        }
        slaiderImg[1].setAttribute("src", images[indexArrayImg].img)


        document.querySelector(".checkmark-input--active").classList.remove("checkmark-input--active")
        document.querySelector(".custom-input-radio--active").classList.remove("custom-input-radio--active")
        params.classList.add("custom-input-radio--active")
        checkmarkInput[ind].classList.add("checkmark-input--active")
    })
})




