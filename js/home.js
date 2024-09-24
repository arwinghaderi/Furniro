import { products, images, } from "../js/db/data.js"
import { addingProductsTemplate } from "./func/shared.js"
import {
    saveToLocalStorage,
    getFromLocalStorage,
    calculateProductsShowMoreButton
} from "./func/utils.js"
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


let productsWrapper = document.querySelector(".row-container")
let productsStructure = 'row'
let productsShowMore
let countProduct = 8
let currentPage = 1
let btnShowMor = document.querySelector(".show-more")

const settingShowMoreButton = () => {
    let Loder = document.querySelector(".show-more__loder")
    btnShowMor.addEventListener("click", function () {
        btnShowMor.style.display = "none"
        Loder.style.display = "block"

        let interval = setInterval(() => {
            productsWrapper.innerHTML = ""
            Loder.style.display = "none"
            btnShowMor.style.display = "block"
            currentPage++

            productsShowMore = calculateProductsShowMoreButton(products, countProduct, currentPage)
            addingProductsTemplate(productsShowMore, productsStructure, productsWrapper)

            countProduct <= countProduct + 8 ? clearInterval(interval) : interval
            productsShowMore.length === products.length ? btnShowMor.style.display = "none" : btnShowMor.style.display = "block"

            saveToLocalStorage("pageHomeProducts", productsShowMore)
            saveToLocalStorage("CurrentPageShowMore", currentPage)
        }, 3000)
    })
}
settingShowMoreButton()

const getingCurrentPageOfProducts = () => {
    currentPage = getFromLocalStorage("CurrentPageShowMore")
    if (currentPage) {
        currentPage = currentPage
    }
    else {
        currentPage = 1
    }
    return currentPage
}

const addingProductsByUser = (products) => {
    productsShowMore = getFromLocalStorage("pageHomeProducts")
    currentPage = getingCurrentPageOfProducts()

    if (productsShowMore) {
        productsShowMore = calculateProductsShowMoreButton(productsShowMore, countProduct, currentPage)

        products.length === productsShowMore.length ? btnShowMor.style.display = "none" : btnShowMor.style.display = "block"
        products.length < productsShowMore.length + countProduct ? productsWrapper.innerHTML = "" : addingProductsTemplate(productsShowMore, productsStructure, productsWrapper)

        addingProductsTemplate(productsShowMore, productsStructure, productsWrapper)
    }
    else {
        productsShowMore = calculateProductsShowMoreButton(products, countProduct, currentPage);
        addingProductsTemplate(productsShowMore, productsStructure, productsWrapper)
    }
}

window.addEventListener('load', function name(params) {
    if (getFromLocalStorage("pageHomeProducts")) {
        addingProductsByUser(products)
    } else {
        addingProductsByUser(products)
    }
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




