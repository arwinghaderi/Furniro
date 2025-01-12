import { getUrlParam, saveToLocalStorage, getFromLocalStorage, showSwal } from "../js/func/utils.js"
import { addingDetailesProduct, addingProductsTemplate } from "./func/shared.js"


const $ = document
const urlParamsSlug = getUrlParam("slug")
let total
let productsCart = []
let informationMenuItems = document.querySelectorAll(".product-infomation-menu__item")
const fetchProductsDetails = async () => {
    try {
        const response = await fetch(`https://furniro-6x7f.onrender.com/product/${urlParamsSlug}`)

        if (!response.ok) {
            const message = "Product not found" || "An unexpected error occurred."
            throw new Error(message)
        }

        const detailsProductData = await response.json()
        console.log(detailsProductData);
        return detailsProductData
    } catch (error) {
        showSwal(`${error.message}`, "error", "Back to Shop", "../Pages/shop.html")
    }

}


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

const addingPagePathDom = () => {
    const routeProduct = document.querySelector(".route-product");
    const previousPaths = JSON.parse(localStorage.getItem('previousPaths')) || [];
    routeProduct.innerHTML = `<div class="loader" style="display: inline-grid; color: #000000;" ></div>`

    let extractedPart = previousPaths.map(path => {
        let part = path.split('/').pop().split('.')[0];
        return part === "index" ? "home" : part;
    })
    console.log(extractedPart);
    fetchProductsDetails().then((ProductsDetails) => {
        setTimeout(() => {
            routeProduct.innerHTML = ` <div class="container "> <div class="route-product__wrapper "> <a href="${previousPaths[1] || "https://furniroo-store.vercel.app/index.html"}" class="route-product__path-name">${extractedPart[1] || "Direct Entry"}</a> <i class="fa-solid fa-angle-right fa-xs"></i> <a href="${previousPaths[0] || "https://furniroo-store.vercel.app/index.html"}" class="route-product__path-name">${extractedPart[0] || "home"}</a> <i class="fa-solid fa-angle-right fa-xs"></i> <div class="route-product__line-col line"></div> <span class="route-product__product-name">${ProductsDetails.data.product[0].name}</span> </div> </div> `
        }, 3500)
    })
};

const addingAllProductPhotos = () => {
    const wrapperMainImage = document.querySelector(".detailes-product-img-main__box");
    const wrapperSecoundImg = document.querySelector(".detailes-product-img-secound");

    fetchProductsDetails().then((ProductsDetails) => {
        let images = ProductsDetails.data.product[0].images;

        wrapperMainImage.insertAdjacentHTML("afterbegin", `
            <img class="detailes-product-img-main___img" src="https://furniro-6x7f.onrender.com${images[0].path}" alt="main-product">`);

        images.forEach((img, index) => {
            let imgPath = img.path ? `https://furniro-6x7f.onrender.com${img.path}` : '';

            wrapperSecoundImg.insertAdjacentHTML("beforeend", `
            <div class="detailes-product-img-secound__box ${index === 0 ? 'detailes-product-img-secound__box--active' : ''}">
                  <img class="detailes-product-img-secound__img" src="${imgPath}" alt="main-product" data-path="${img.path ? img.path : ''}" loading="lazy">
            </div>`);
        });
        handleSecondaryImageClick(wrapperSecoundImg, wrapperMainImage)
    });
};

const handleSecondaryImageClick = (wrapperSecoundImg, wrapperMainImage) => {
    wrapperSecoundImg.addEventListener("click", (event) => {
        const target = event.target.closest(".detailes-product-img-secound__img");

        if (target) {
            const newPath = target.getAttribute("data-path");
            const mainImage = wrapperMainImage.querySelector(".detailes-product-img-main___img");

            if (mainImage) {
                mainImage.src = `https://furniro-6x7f.onrender.com${newPath}`;
            }

            const parentBox = target.closest('.detailes-product-img-secound__box');
            document.querySelectorAll('.detailes-product-img-secound__box').forEach(box => {
                box.classList.remove('detailes-product-img-secound__box--active');
            });

            if (parentBox) {
                parentBox.classList.add('detailes-product-img-secound__box--active');
            }
        }
    });
};

addingAllProductPhotos()

const addingProductSpecifications = () => {
    const wrapperProductSpecifications = $.querySelector(".Supplementary-specifications__value-box");
    fetchProductsDetails().then((ProductsDetails) => {

        wrapperProductSpecifications.insertAdjacentHTML("afterbegin",
            `<span class="Supplementary-specifications__value">SS-${urlParamsSlug} </span><span class="Supplementary-specifications__value">${ProductsDetails.data.product[0].categoryId.title}  </span >
                <div class="Supplementary-specifications__box-icon">
                  <div class="box-Icon-social"><i class="fa-brands fa-facebook-f Icon-social"></i></div>
                  <div class="box-Icon-social box-Icon-social--linkdin"><i class="fa-brands fa-linkedin-in Icon-social"></i></div>
                  <div class="box-Icon-social"><i class="fa-brands fa-twitter Icon-social"></i></div>
                </div >`)

    })
}
addingProductSpecifications()

const addingRelatedProduct = () => {
    fetchProductsDetails().then((productsDetails) => {
        let reletedProducts = productsDetails.data.reletedProducts
        let productsWrapper = document.querySelector(".row-container")

        addingProductsTemplate(reletedProducts, "row", productsWrapper)
    })

}
addingRelatedProduct()
// const addingDetailesProduct = () => {
//     if (productSelectionByUser) {
//         const wrapperDetailesProducts = $.querySelector(".wrapper-Detailes-Products")


const addingProductInformationTemplate = () => {
    let informationContent = document.querySelector(".information-content")
    let productImgSection = document.querySelector(".product-img-section")

    console.log(informationContent);
    fetchProductsDetails().then((productDetails) => {
        let images = productDetails.data.product[0].images;
        let productInfomation = productDetails.data.product[0]

        informationContent.insertAdjacentHTML("beforeend", ` 
            <div class="content content--active  product-description-box" id="description">
                        <p class="product-description">
                        ${productInfomation.description}
                       </p>
                    </div>

                    <div class="content product-description-box  additional-information" id="Information">
                        <table class="additional-information__table">
                            <thead class="additional-information__head">
                                <tr class="column-head">
                                    <th class="column-head__content">Feature</th>
                                    <th class="column-head__content">value</th>
                                </tr>
                            </thead>
                            <tbody class="additional-information__body">
                                <tr class="column-body">
                                    <td class="column-body__content">Base Material</td>
                                    <td class="column-body__content">Engineered Wood </td>
                                </tr>
                                <tr class="column-body">
                                    <td class="column-body__content">Brande</td>
                                    <td class="column-body__content">${productInfomation.attributes.Brand}</td>
                                </tr>
                                <tr class="column-body">
                                    <td class="column-body__content">Style</td>
                                    <td class="column-body__content"> ${productInfomation.attributes.Style}</td>
                                </tr>
                        </table>
                    </div>`)


        productImgSection.insertAdjacentHTML("beforeend", `
                     <div class="product-img-box box-shadow">
                        <img class="product-img" src="https://furniro-6x7f.onrender.com${images[0].path}" alt="product-img">
                    </div>
                    <div class="product-img-box box-shadow">
                        <img class="product-img" src="https://furniro-6x7f.onrender.com${images[1].path}" alt="product-img">
                    </div>`)

    })
}

addingProductInformationTemplate()
//         // addingAllProductPhotos()
//         // addingPagePathDom()
//         // addingProductSpecifications()
//     }
//     const iconsStar = document.querySelectorAll(".btn-icon")
//     const scoreStatus = document.querySelector(".detailes-produc-Specifications__status")

//     const productsSizeButtons = document.querySelectorAll(".detailes-product__size-btn-box")

//     const ProductsColorButton = document.querySelectorAll(".detailes-product__Color-btn-box ")

//     const btnAddProductCount = document.querySelector(".detailes-product-input__quantity__plus")
//     const btnReduceNumberProduct = document.querySelector(".detailes-product-input__quantity__minus")
//     const productCountInput = document.querySelector(".detailes-product-input__quantity")
//     const imgProductMain = document.querySelector(".detailes-product-img-main___img")

//     const btnAddToCart = document.querySelector(".detailes-product-btn__box-cart")

//     productsScoreing(iconsStar, scoreStatus)
//     selctingProductsSizing(productsSizeButtons)
//     selctingProductsColor(ProductsColorButton, imgProductMain)
//     // selectingcountproductByUser(btnAddProductCount, btnReduceNumberProduct, productCountInput)
//     // addingProductToCart(btnAddToCart, productCountInput)
// }

const renderProductDetails = () => {
    fetchProductsDetails().then((ProductDetails) => {
        addingDetailesProduct(ProductDetails.data.product[0])
        addingPagePathDom()

    })
}
renderProductDetails()

let iconCountProducts = document.querySelector(".nav-bar__count-Product")

// const countIconCart = () => {
//     iconCountProducts.classList.add("nav-bar__count-Product--active")
//     iconCountProducts.innerHTML = productsCart.length
//     saveToLocalStorage("countProductToCart", productsCart.length)
// }

// const addingProductToCart = (btnAddToCart, productCountInput) => {
//     btnAddToCart.addEventListener("click", () => {
//         logicAddingProductToCart(productSelectionByUser.id, productCountInput)
//     })
// }

// const logicAddingProductToCart = (urlParamsId, productCountInput) => {
//     let product = productsCart.find(cartproduct => { return cartproduct.id === urlParamsId })

//     if (product) {
//         product.count === productCountInput.value ? productCountInput.value++ : productCountInput.value
//         product.count = productCountInput.value

//         saveToLocalStorage("selectedCountProduct", product.count)
//         saveToLocalStorage("cartShopProducts", productsCart)
//         addingProductTemplateToCart(productsCart)
//         calculationTotalCart(productsCart)
//     }
//     else {
//         productsCart.push(productSelectionByUser)
//         productCountInput.value ? productCountInput.value = 1 : productCountInput.value
//         productSelectionByUser.count = productCountInput.value

//         saveToLocalStorage("selectedCountProduct", productSelectionByUser.count)
//         saveToLocalStorage("cartShopProducts", productsCart)
//         addingProductTemplateToCart(productsCart)
//         countIconCart()
//         calculationTotalCart(productsCart)
//     }
//     if (window.innerWidth > 992) {
//         window.scrollTo({
//             top: 0,
//             behavior: "smooth"
//         })
//     }
// }

// const getingproductsCartByUser = () => {
//     let getproductsCart = getFromLocalStorage("cartShopProducts")

//     if (getproductsCart) {
//         productsCart = getproductsCart
//     } else {
//         productsCart = []
//     }
//     addingProductTemplateToCart(productsCart)
// }

window.addEventListener("load", () => {
    // addingDetailesProduct()
    // getCountProductsCart()
    // getingproductsCartByUser()
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





// const selectingcountproductByUser = (btnAddProductCount, btnReduceNumberProduct, productCountInput) => {
//     btnAddProductCount.addEventListener("click", () => {
//         +productCountInput.value++

//         if (+productCountInput.value === 11) {
//             productCountInput.value = 10
//             alert("اگر بیشتر از 10 محصول نیاز دارید  به شماره مورد نظر تماس بگیرید :09308064108")
//         }
//         saveToLocalStorage("selectedCountProduct", productCountInput.value)
//     })

//     btnReduceNumberProduct.addEventListener("click", () => {
//         +productCountInput.value--

//         +productCountInput.value ? productCountInput.value = 1 : +productCountInput.value

//         saveToLocalStorage("selectedCountProduct", productCountInput.value)
//     })
//     getProductCountByUser(productCountInput)
// }

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






//     <div class="detailes-product__size-box">
//         <span class="detailes-product__size__name">Size</span>
//       <div class= "detailes-product__size-btn-container">
//         <div class="detailes-product__size-btn-box  detailes-product__size-btn-box--active"><butuon class="detailes-product__size-btn  detailes-product__size-btn--active">L</butuon></div>
//         <div class="detailes-product__size-btn-box"><butuon class="detailes-product__size-btn">XL</butuon></div>
//         <div class="detailes-product__size-btn-box"><butuon class="detailes-product__size-btn">XS</butuon></div>
//       </div> 
//     </div>

//  <div class="detailes-product__color-box">
//      <span class="detailes-product__Color__name">Color</span><div class="detailes-product__Color-btn-container"> <div data-color="${productSelectionByUser.color1}" class="detailes-product__Color-btn-box  detailes-product__size-btn--${productSelectionByUser.color1} detailes-product__Color-btn-box--active"> </div> <div data-color="${productSelectionByUser.color2}"  class="detailes-product__Color-btn-box detailes-product__size-btn--${productSelectionByUser.color2}"> </div><div data-color="${productSelectionByUser.color3}" class="detailes-product__Color-btn-box  detailes-product__size-btn--${productSelectionByUser.color3}"></div><div data-color="${productSelectionByUser.color4}"<div class="detailes-product__Color-btn-box  detailes-product__size-btn--${productSelectionByUser.color4}"></div></div>   
//  </div> 



window.removeProductByUserByUser = removeProductByUserByUser;