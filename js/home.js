import { products, images } from "../js/db/data.js"
import { addingProductsTemplate } from "./func/shared.js"
import {
    saveToLocalStorage,
    getFromLocalStorage,
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



//** set Btn Show Mor

let curentItem = 8
let curentPage = 2
let btnShowMor = document.querySelector(".show-more")
let Loder = document.querySelector(".show-more__loder")
function setBtnShowMor(products) {
    let indexEnd = curentItem * curentPage
    let indexStart = indexEnd - indexEnd
    console.log(curentItem, curentPage);
    let productsSlice = products.slice(indexStart, indexEnd);
    addingProductsTemplate(productsSlice, productsStructure, productsWrapper)
    btnShowMor.addEventListener("click", function () {
        btnShowMor.style.display = "none"
        Loder.style.display = "block"
        let interval = setInterval(function () {
            productsWrapper.innerHTML = ""
            Loder.style.display = "none"
            btnShowMor.style.display = "block"
            curentPage++
            indexEnd = curentItem * curentPage
            indexStart = indexEnd - indexEnd
            console.log(indexStart, indexEnd);
            productsSlice = products.slice(indexStart, indexEnd);
            console.log(productsSlice);
            console.log(curentItem, curentPage);
            addingProductsTemplate(productsSlice, productsStructure, productsWrapper)
            if (curentItem <= curentItem + 8) {
                clearInterval(interval)
            }
            if (indexEnd >= products.length) {
                btnShowMor.style.display = "none"
            }
            saveToLocalStorage("pageHomeProducts", productsSlice)
            saveToLocalStorage("CurrentPageShowMore", curentPage)
        }, 3000)
    })
}
setBtnShowMor(products)


const getingCurrentProductsPage = (products) => {
    curentPage = getFromLocalStorage("CurrentPageShowMore")
    if (curentPage) {
        curentPage = curentPage
    }
    else {
        curentPage = 1
    }
    addingProductsTemplate(products, productsStructure, productsWrapper)
}
getingCurrentProductsPage(products)


function getItemLocalStoreg(products) {
    console.log(products);
    let getItem = JSON.parse(localStorage.getItem("productArrayHome"))

    if (getItem) {
        if (products.length === getItem.length) {
            btnShowMor.style.display = "none"
        }
        if (products.length < getItem.length + curentItem) {
            productsWrapper.innerHTML = ""
        }
        products = getItem
    }
    else {
        products = []
    }
    addingProductsTemplate(products, productsStructure, productsWrapper)
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




