let $ = document

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


let productListArrays = [
    {
        id: 1, img: "images/image 1.jpg", productName: "Syltherine", productIntroduction: "Stylish cafe chair",
        price: 3500000, discountPercent: 30, newProduct: false, discount: true
        , poster: true, type: "chair"
    },

    {
        id: 2, img: "images/image 2.jpg", productName: "Leviosa", productIntroduction: "Stylish cafe chair",
        DiscountPrice: null, price: 2500000, discountPercent: 0, newProduct: false, discount: false
        , poster: false, type: "chair"
    },

    {
        id: 3, img: "images/image 3.jpg", productName: "Lolito", productIntroduction: "Luxury big sofa",
        DiscountPrice: 7000000, price: 14000000, discountPercent: 50, newProduct: false, discount: true
        , poster: true, type: "sofa"
    },

    {
        id: 4, img: "images/image 4.jpg", productName: "Respira", productIntroduction: "Outdoor bar table and stool",
        DiscountPrice: null, price: 500000, discountPercent: 0, newProduct: true, discount: false
        , poster: true, type: "table"
    },
    {
        id: 5, img: "images/image 1.jpg", productName: "Syltherine", productIntroduction: "Stylish cafe chair",
        DiscountPrice: 2500000, price: 3500000, discountPercent: 30, newProduct: false, discount: true
        , poster: true, type: "chair"
    },

    {
        id: 6, img: "images/image 2.jpg", productName: "Leviosa", productIntroduction: "Stylish cafe chair",
        DiscountPrice: null, price: 2500000, discountPercent: 0, newProduct: false, discount: false
        , poster: false, type: "chair"
    },

    {
        id: 7, img: "images/image 3.jpg", productName: "Lolito", productIntroduction: "Luxury big sofa",
        DiscountPrice: 7000000, price: 14000000, discountPercent: 50, newProduct: false, discount: true
        , poster: true, type: "sofa"
    },

    {
        id: 8, img: "images/image 4.jpg", productName: "Respira", productIntroduction: "Outdoor bar table and stool",
        DiscountPrice: null, price: 500000, discountPercent: 0, newProduct: true, discount: false
        , poster: true, type: "table"
    },

    {
        id: 9, img: "images/image 1.jpg", productName: "Syltherine", productIntroduction: "Stylish cafe chair",
        DiscountPrice: 2500000, price: 3500000, discountPercent: 30, newProduct: false, discount: true
        , poster: true, type: "chair"
    },

    {
        id: 10, img: "images/image 2.jpg", productName: "Leviosa", productIntroduction: "Stylish cafe chair",
        DiscountPrice: null, price: 2500000, discountPercent: 0, newProduct: false, discount: false
        , poster: false, type: "chair"
    },

    {
        id: 11, img: "images/image 3.jpg", productName: "Lolito", productIntroduction: "Luxury big sofa",
        DiscountPrice: 7000000, price: 14000000, discountPercent: 50, newProduct: false, discount: true
        , poster: true, type: "sofa"
    },

    {
        id: 12, img: "images/image 4.jpg", productName: "Respira", productIntroduction: "Outdoor bar table and stool",
        DiscountPrice: null, price: 500000, discountPercent: 0, newProduct: true, discount: false
        , poster: true, type: "table"
    },
    {
        id: 13, img: "images/image 1.jpg", productName: "Syltherine", productIntroduction: "Stylish cafe chair",
        DiscountPrice: 2500000, price: 3500000, discountPercent: 30, newProduct: false, discount: true
        , poster: true, type: "chair"
    },

    {
        id: 14, img: "images/image 2.jpg", productName: "Leviosa", productIntroduction: "Stylish cafe chair",
        DiscountPrice: null, price: 2500000, discountPercent: 0, newProduct: false, discount: false
        , poster: false, type: "chair"
    },

    {
        id: 15, img: "images/image 3.jpg", productName: "Lolito", productIntroduction: "Luxury big sofa",
        DiscountPrice: 7000000, price: 14000000, discountPercent: 50, newProduct: false, discount: true
        , poster: true, type: "sofa"
    },

    {
        id: 16, img: "images/image 4.jpg", productName: "Respira", productIntroduction: "Outdoor bar table and stool",
        DiscountPrice: null, price: 500000, discountPercent: 0, newProduct: true, discount: false
        , poster: true, type: "table"
    },
    {
        id: 17, img: "images/Image 5.png", productName: "Grifo", productIntroduction: "Night lamp",
        DiscountPrice: null, price: 1500000, discountPercent: 0, newProduct: false, discount: false
        , poster: false, type: "lamp"
    },
    {
        id: 18, img: "images/image 6.jpg", productName: "Muggo", productIntroduction: "Small mug",
        DiscountPrice: null, price: 150000, discountPercent: 0, newProduct: true, discount: false
        , poster: true, type: "mug"

    },
    {
        id: 19, img: "images/image 7.jpg", productName: "Pingky", productIntroduction: "Cute bed set",
        DiscountPrice: 7000000, price: 14000000, discountPercent: 25, newProduct: false, discount: true
        , poster: true, type: "mug"
    },

    {
        id: 20, img: "images/Images8.jpg", productName: "Potty", productIntroduction: "Minimalist flower pot",
        DiscountPrice: null, price: 500000, discountPercent: 0, newProduct: true, discount: false
        , poster: true, type: "pot"
    },

    {
        id: 21, img: "images/Image 5.png", productName: "Grifo", productIntroduction: "Night lamp",
        DiscountPrice: null, price: 1500000, discountPercent: 0, newProduct: false, discount: false
        , poster: false, type: "lamp"
    },
    {
        id: 22, img: "images/image 6.jpg", productName: "Muggo", productIntroduction: "Small mug",
        DiscountPrice: null, price: 150000, discountPercent: 0, newProduct: true, discount: false
        , poster: true, type: "mug"

    },
]
let rowProduct = document.querySelector(".row-container")




//** set Product templet Dom

function setProductDom(productListArrays) {

    productListArrays.forEach(function (product) {

        if (product.discount === true) {
            let price = +product.price
            let discountPercent = +product.discountPercent
            let totalDiscount = (price * discountPercent) / 100
            let total = price - totalDiscount
            rowProduct.insertAdjacentHTML('beforeend', '   <div class="col col-lg-3 product-main-box"><div class="product-box"><div  ' +
                'class="img-box-overlay"><img class="product__img" src="' + product.img + '" alt="product1"><div class="product-overlay">' +
                '<div class="box-add-btn-cart"><a href="product.html?id=' + product.id + '" class="box-add-btn-cart__text">Details Product</a></div>' +
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
            '<div class="box-add-btn-cart"><a href="product.html?id=' + product.id + '" class="box-add-btn-cart__text">Details Product</a></div>' +
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
                '<div class="box-add-btn-cart"><a href="product.html?id=' + product.id + '" class="box-add-btn-cart__text">Details Product</a></div>' +
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
function setBtnShowMor(productListArrays) {
    let indexEnd = curentItem * curentPage
    let indexStart = indexEnd - indexEnd
    console.log(indexStart, indexEnd);
    let productListArraysSlice = productListArrays.slice(indexStart, indexEnd);
    setProductDom(productListArraysSlice)
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
            productListArraysSlice = productListArrays.slice(indexStart, indexEnd);
            console.log(productListArraysSlice);
            setProductDom(productListArraysSlice)
            if (curentItem <= curentItem + 8) {
                clearInterval(interval)
            }
            if (indexEnd >= productListArrays.length) {
                btnShowMor.style.display = "none"
            }
            setLocalStoreg(productListArraysSlice)
            setLocalStoregCurrentPage(curentPage)
        }, 3000)
    })
}
setBtnShowMor(productListArrays)



//** set Local Storeg CurrentPag Show mor
function setLocalStoregCurrentPage(curentPage) {
    localStorage.setItem("curentPageHome", JSON.stringify(curentPage))
}


function getItemLocalStoregCurrentPage(productListArrays) {
    let curentPageLocal = JSON.parse(localStorage.getItem("curentPageHome"))
    console.log(curentPageLocal);
    if (curentPageLocal) {

        curentPage = curentPageLocal
    }
    else {
        productListArrays = []
    }
    setProductDom(productListArrays)
}
getItemLocalStoregCurrentPage(productListArrays)

function setLocalStoreg(productListArrays) {
    localStorage.setItem("productArrayHome", JSON.stringify(productListArrays))
}


function getItemLocalStoreg(productListArrays) {
    console.log(productListArrays);
    let getItem = JSON.parse(localStorage.getItem("productArrayHome"))
    console.log(getItem);
    if (getItem) {
        if (productListArrays.length === getItem.length) {
            btnShowMor.style.display = "none"
        }
        if (productListArrays.length < getItem.length + curentItem) {
            rowProduct.innerHTML = ""
        }
        productListArrays = getItem
    }
    else {
        productListArrays = []
    }
    setProductDom(productListArrays)
}
window.addEventListener('load', function name(params) {
    getItemLocalStoreg(productListArrays)
})




// ** SLaider

let slaiderImg = document.querySelectorAll(".slaider-img")
let customInputRadio = document.querySelectorAll(".custom-input-radio")
let slaiderPaginationParent = document.querySelector(".slaider-pagination-container")
let checkmarkInput = document.querySelectorAll(".checkmark-input")
let imgSlaiderTitle = document.querySelector(".box-contant-img-slaider__title")
let slaiderbtnright = document.querySelector("#slaider-btn-right")
let boxContantImgIntroduction = document.querySelector(".box-contant-img-slaider__introduction")


let listArrayimg = [
    { id: 1, introduction: "Second bedroom", Title: "pleasant", img: "images/Rectangle 24.jpg" },
    { id: 2, introduction: "bed Room", Title: "Inner Peace", img: "images/Rectangle 25.jpg" },
    { id: 3, introduction: "work room", Title: "cute", img: "images/Rectangle 26.jpg" },
    { id: 4, introduction: "kitchen", Title: "centralized", img: "images/Rectangle 25.jpg" },

]


// **next item slader

let indexArrayImg = 0
function nextItem() {
    indexArrayImg++
    if (indexArrayImg === listArrayimg.length) {
        indexArrayImg = 0
        slaiderImg[0].setAttribute("src", listArrayimg[indexArrayImg].img)
    }
    slaiderImg[0].setAttribute("src", listArrayimg[indexArrayImg].img)
    document.querySelector(".checkmark-input--active").classList.remove("checkmark-input--active")
    document.querySelector(".custom-input-radio--active").classList.remove("custom-input-radio--active")
    customInputRadio[indexArrayImg].classList.add("custom-input-radio--active")
    checkmarkInput[indexArrayImg].classList.add("checkmark-input--active")
    if (indexArrayImg === 0) {
        let indexResult = indexArrayImg + 4
        boxContantImgIntroduction.innerHTML = "0" + indexResult + "___" + listArrayimg[indexArrayImg].introduction
    } else {
        boxContantImgIntroduction.innerHTML = "0" + indexArrayImg + "___" + listArrayimg[indexArrayImg].introduction
    }
    indexArrayImg++
    if (indexArrayImg === listArrayimg.length) {
        indexArrayImg = 0
        slaiderImg[1].setAttribute("src", listArrayimg[indexArrayImg].img)
    }

    slaiderImg[1].setAttribute("src", listArrayimg[indexArrayImg].img)
    imgSlaiderTitle.innerHTML = listArrayimg[indexArrayImg].Title
    indexArrayImg++
    if (indexArrayImg === listArrayimg.length) {
        indexArrayImg = 0
        slaiderImg[2].setAttribute("src", listArrayimg[indexArrayImg].img)
    }
    slaiderImg[2].setAttribute("src", listArrayimg[indexArrayImg].img)


    indexArrayImg++
    if (indexArrayImg === listArrayimg.length) {
        indexArrayImg = 0
        slaiderImg[3].setAttribute("src", listArrayimg[indexArrayImg].img)
    }
    slaiderImg[3].setAttribute("src", listArrayimg[indexArrayImg].img)


    indexArrayImg++
    if (indexArrayImg === listArrayimg.length) {
        indexArrayImg = 0
        slaiderImg[3].setAttribute("src", listArrayimg[indexArrayImg].img)
    }
}
slaiderbtnright.addEventListener("click", nextItem);

setInterval(nextItem, 5000)


//** pagination--Slaider*/ 

customInputRadio.forEach(function (params, ind) {
    params.addEventListener("click", function () {
        indexArrayImg = ind
        indexArrayImg++
        if (indexArrayImg === listArrayimg.length) {
            indexArrayImg = 0
            slaiderImg[0].setAttribute("src", listArrayimg[ind].img)
        }
        slaiderImg[0].setAttribute("src", listArrayimg[ind].img)


        if (indexArrayImg === 0) {
            let indexResult = indexArrayImg + 4
            boxContantImgIntroduction.innerHTML = "0" + indexResult + "___" + listArrayimg[indexArrayImg].introduction
        } else {
            boxContantImgIntroduction.innerHTML = "0" + indexArrayImg + "___" + listArrayimg[indexArrayImg].introduction
        }
        imgSlaiderTitle.innerHTML = listArrayimg[indexArrayImg].Title

        indexArrayImg++
        if (indexArrayImg === listArrayimg.length) {
            indexArrayImg = 0
            slaiderImg[1].setAttribute("src", listArrayimg[indexArrayImg].img)
        }
        slaiderImg[1].setAttribute("src", listArrayimg[indexArrayImg].img)


        indexArrayImg++
        if (indexArrayImg === listArrayimg.length) {
            indexArrayImg = 0
            slaiderImg[2].setAttribute("src", listArrayimg[indexArrayImg].img)
        }
        slaiderImg[2].setAttribute("src", listArrayimg[indexArrayImg].img)


        indexArrayImg++
        if (indexArrayImg === listArrayimg.length) {
            indexArrayImg = 0
            slaiderImg[3].setAttribute("src", listArrayimg[indexArrayImg].img)
        }
        slaiderImg[3].setAttribute("src", listArrayimg[indexArrayImg].img)


        indexArrayImg++
        if (indexArrayImg === listArrayimg.length) {
            indexArrayImg = 0
            slaiderImg[3].setAttribute("src", listArrayimg[indexArrayImg].img)
        }
        slaiderImg[1].setAttribute("src", listArrayimg[indexArrayImg].img)


        document.querySelector(".checkmark-input--active").classList.remove("checkmark-input--active")
        document.querySelector(".custom-input-radio--active").classList.remove("custom-input-radio--active")
        params.classList.add("custom-input-radio--active")
        checkmarkInput[ind].classList.add("checkmark-input--active")
    })
})




