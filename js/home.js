import { products, images } from "../js/db/data.js"
import { addingProductsTemplate } from "./func/shared.js"
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
                '  <i class="fas fa-share-alt fa-flip-vertical  icon" ></i>' +
                '<span class="option-overlay__text">Share</span> </div> <div class="option-overlay">' +
                '<i class="fas fa-exchange-alt  icon" ></i>' +
                ' <span class="option-overlay__text">Compare</span></div>' +
                ' <div class="option-overlay"> <i class="fa-regular fa-heart icon"></i>' +
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
            ' <i class="fas fa-share-alt fa-flip-vertical  icon" ></i>' +
            '<span class="option-overlay__text">Share</span> </div> <div class="option-overlay">' +
            '<i class="fas fa-exchange-alt  icon" ></i>' +
            ' <span class="option-overlay__text">Compare</span></div>' +
            ' <div class="option-overlay"><i class="fa-regular fa-heart icon"></i>' +
            ' <span class="option-overlay__text">Like</span></div></div></div> </div> <div  class="Discount-product Discount-product--green ">' +
            ' <span class="Discount-product__number">NEW</span></div><div class="product-Introductions"><h3 class="product-name">' + product.productName + '</h3>' +
            ' <p class="product-Introduction">' + product.productIntroduction + '</p><div class="product-price-box">' +
            '<span class="product-price">' + product.price.toLocaleString("en") + '</span>' +
            '</div> </div></div></div> ') : product.poster === false ? rowProduct.insertAdjacentHTML('beforeend', '   <div class="col col-lg-3 product-main-box"><div class="product-box "><div  ' +
                'class="img-box-overlay"><img class="product__img" src="' + product.img + '" alt="product1"><div class="product-overlay">' +
                '<div class="box-add-btn-cart"><a href="../Furniro/Pages/product.html?id=' + product.id + '" class="box-add-btn-cart__text">Details Product</a></div>' +
                ' <div class="product-overlay__options">' +
                ' <div class="option-overlay">' +
                '  <i class="fas fa-share-alt fa-flip-vertical  icon" ></i> ' +
                '<span class="option-overlay__text">Share</span> </div> <div class="option-overlay">' +
                ' <i class="fas fa-exchange-alt  icon" ></i>  ' +
                ' <span class="option-overlay__text">Compare</span></div>' +
                ' <div class="option-overlay"> <i class="fa-regular fa-heart icon"></i>  ' +
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




