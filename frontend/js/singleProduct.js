import { getUrlParam, showSwal, getToken, showDeleteConfirmation, showAuthenticationRequiredAlert } from "../js/func/utils.js"
import { addingProductsTemplate, } from "./func/shared.js"
import { checkingLoginStatus } from "./auth/utils.js"
import { getCountProductsCart, fetchGetCartProducts } from "./Features/cartQuantityDisplay.js"

const $ = document
const urlParamsSlug = getUrlParam("slug")
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

const fetchProductsDetails = async () => {
    const token = getToken()

    try {
        const headers = {
            'Content-Type': 'application/json',
        };

        if (token) {
            headers['authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(`https://furniro-6x7f.onrender.com/product/${urlParamsSlug}`, {
            method: "GET",
            headers: headers
        })

        if (!response.ok) {
            const message = "Product not found" || "An unexpected error occurred."
            throw new Error(message)
        }

        const detailsProductData = await response.json()
        return detailsProductData
    } catch (error) {
        showSwal(`${error.message}`, "error", "Back to Shop", "../Pages/shop.html")
    }

}

const createStarRating = (averageRating) => {
    const filledStars = `<i class="fas fa-star detailes-product-Specifications__star" ></i>`.repeat(Math.ceil(averageRating));
    const emptyStars = `<i class="far fa-star detailes-product-Specifications__star" ></i>`.repeat(5 - Math.ceil(averageRating));
    return filledStars + emptyStars;
};

const createSizeButtons = (sizes) => sizes.map((size, index) => `
    <div class="detailes-product__size-btn-box ${index === 0 ? 'detailes-product__size-btn-box--active' : ''}"> 
        <button class="detailes-product__size-btn ${index === 0 ? 'detailes-product__size-btn--active' : ''}">${size}</button>
    </div>`).join('');

const createColorButtons = (colors) => colors.map((color, index) => `
<div style="background-color:${color.hexColorCode}; width: 3rem; height: 3rem; border-radius: 100%; cursor: pointer; transition: all 0.8s ease-in-out; ${index === 0 ? 'transform: scale(1.4);' : ''}" class="detailes-product__color-btn-box" data-color="${color.hexColorCode}"></div>`).join('');

const handleActiveClass = (elements, activeClass, targetClass) => {
    elements.forEach(element => {
        element.classList.remove(activeClass);
        element.querySelector(targetClass).classList.remove(activeClass);
    });
};

const updateCartCount = (input, increment, maxCount = 5) => {
    let currentCount = +input.value;
    currentCount = increment ? currentCount + 1 : currentCount - 1;

    if (currentCount > maxCount) {
        showSwal(`If you want more than ten pieces, call this number 09308064108`, "warning", "ok", "#");
        currentCount = maxCount;
    } else if (currentCount < 1) {
        currentCount = 1;
    }

    input.value = currentCount;
};

const selectingCountProductByUser = (btnAddProductCount, btnReduceNumberProduct, productCountInput) => {
    btnAddProductCount.addEventListener("click", () => {
        updateCartCount(productCountInput, true);
    });

    btnReduceNumberProduct.addEventListener("click", () => {
        updateCartCount(productCountInput, false);
    });
};

const addingproductsDetailes = (productsDetailes) => {
    const wrapper = document.querySelector(".wrapper-Detailes-Products");
    const starRating = createStarRating(productsDetailes.averageRating);
    const sizeButtons = createSizeButtons(productsDetailes.size);
    const colorButtons = createColorButtons(productsDetailes.colors);
    const productId = productsDetailes._id

    const discountHTML = productsDetailes.discountPercent
        ? `<h3 class="detailes-produc-Specifications__title section-title">${productsDetailes.title.slice(0, 15)}..</h3>
           <h5 class="detailes-produc-Specifications__price-discount section-title">Rp ${productsDetailes.price.toLocaleString("en")}</h5>
           <h5 class="detailes-produc-Specifications__price section-title">Rp ${productsDetailes.priceAfterDiscount.toLocaleString("en")}</h5>`
        : `<h3 class="detailes-produc-Specifications__title section-title">${productsDetailes.title.slice(0, 15)}...</h3>
           <h5 class="detailes-produc-Specifications__price section-title">Rp ${productsDetailes.price.toLocaleString("en")}</h5>`;

    wrapper.insertAdjacentHTML('afterbegin', `
        ${discountHTML}
        <div class="detailes-produc-Specifications__customer-review-box">
            <div class="detailes-produc-Specifications__score">${starRating}</div>
            <div class="detailes-produc-Specifications__line line"></div>
            <p class="detailes-produc-Specifications__status">${productsDetailes.averageRating} Total product score</p>  
        </div>
        <div class="detailes-product__description-box">
            <p class="detailes-product__description">${productsDetailes.description.slice(0, 400)}...</p>
        </div>
        <div class="detailes-product__size-box">
            <span class="detailes-product__size__name">Size</span>
            <div class="detailes-product__size-btn-container">${sizeButtons}</div> 
        </div>
        <div class="detailes-product__color-box">
            <span class="detailes-product__Color__name">Color</span>
            <div class="detailes-product__Color-btn-container">${colorButtons}</div>
        </div>

      ${productsDetailes.quantity ? `
         <div class="detailes-product-btn">
            <div class="detailes-product-input__box-quantity">
                <div class="detailes-product-input__quantity-Container-input">
                    <span class="detailes-product-input__quantity__minus">-</span>
                    <input class="detailes-product-input__quantity" type="number" min="1" max="10" value="1" placeholder="1">
                    <span class="detailes-product-input__quantity__plus">+</span>
                </div>
            </div>
            <div class="detailes-product-btn__box-cart">
                <button class="detailes-product-btn__cart detailes-product-btn__cart--add-to-cart">Add To Cart</button>
            </div>
            <div class="detailes-product-btn__box-Compare">
                <button class="detailes-product-btn__Compare">+Compare</button>
            </div>
        </div>`: `<div class="detailes-product-btn"><span class='no-stock section-title'>This product is not available.</span></div>`}  
     `);

    document.querySelectorAll('.detailes-product__size-btn-box').forEach(button => {
        button.addEventListener('click', () => {
            handleActiveClass(document.querySelectorAll('.detailes-product__size-btn-box'), 'detailes-product__size-btn-box--active', '.detailes-product__size-btn');
            button.classList.add('detailes-product__size-btn-box--active');
            button.querySelector('.detailes-product__size-btn').classList.add('detailes-product__size-btn--active');
        });
    });

    document.querySelectorAll('.detailes-product__color-btn-box').forEach(button => {
        button.addEventListener('click', () => {
            document.querySelectorAll('.detailes-product__color-btn-box').forEach(btn => btn.style.transform = 'scale(1)');
            button.style.transform = 'scale(1.4)';

            const selectedColor = button.getAttribute('data-color');
            const selectedImage = productsDetailes.images.find(img => img.hexColorCode === selectedColor);
            if (selectedImage) {
                document.querySelector('.detailes-product-img-main___img').src = `https://furniro-6x7f.onrender.com${selectedImage.path}`;
            }
        });
    });

    const btnAddProductCount = document.querySelector(".detailes-product-input__quantity__plus");
    const btnReduceNumberProduct = document.querySelector(".detailes-product-input__quantity__minus");
    const productCountInput = document.querySelector(".detailes-product-input__quantity");
    const btnAddToCart = document.querySelector(".detailes-product-btn__box-cart")

    if (btnAddProductCount && btnReduceNumberProduct && productCountInput) {
        selectingCountProductByUser(btnAddProductCount, btnReduceNumberProduct, productCountInput);
    }
    if (btnAddToCart) {
        addProductToCart(btnAddToCart, productId);
    }
};

const getProductDetails = (productId) => {
    const quantity = +document.querySelector('.detailes-product-input__quantity').value;
    const color = document.querySelector('.detailes-product__color-btn-box[style*="scale(1.4)"]').dataset.color;
    const size = document.querySelector('.detailes-product__size-btn-box--active .detailes-product__size-btn').textContent;

    return {
        productId,
        quantity,
        color,
        size
    };
}

const handleResponseError = (status) => {
    switch (status) {
        case 400:
            return "Your selection is limited.";
        case 401:
        case 403:
        case 404:
            return null;
        default:
            return "An unexpected error occurred.";
    }
};

const addProductToCart = (btnAddToCart, productId) => {
    const token = getToken();

    const handleClick = async () => {
        if (!checkingLoginStatus()) {
            showAuthenticationRequiredAlert()
            return;
        }

        btnAddToCart.innerHTML = "Loading...";

        const productData = getProductDetails(productId);

        try {
            const response = await fetch('https://furniro-6x7f.onrender.com/cart/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${token}`
                },
                body: JSON.stringify(productData)
            });

            if (!response.ok) {
                const message = handleResponseError(response.status);
                if (message === null) {
                    showAuthenticationRequiredAlert(); return;
                }
                throw new Error(message);
            }

            showProductAddedToCartAlert();
            getCountProductsCart()
        } catch (error) {
            if (error.message === "Your selection is limited.") {
                showSwal(error.message, "warning", "OK", "#");
            }
            else {
                showSwal(error.message, "error", "Try Again", '#')
            }
        } finally {
            btnAddToCart.classList.add("detailes-product-btn__cart--add-to-cart")
            btnAddToCart.innerHTML = `<button class="detailes-product-btn__cart detailes-product-btn__cart--add-to-cart">Add To Cart</button>`;
        }
    };

    btnAddToCart.addEventListener('click', handleClick);
};

const showProductAddedToCartAlert = () => {
    Swal.fire({
        title: "Product Added",
        text: "Your product has been added to the cart.",
        icon: "success",
        customClass: {
            popup: 'custom-swal2'
        },
        showCancelButton: true,
        confirmButtonText: 'Go to Cart',
        cancelButtonText: 'Continue Shopping',
        confirmButtonColor: "#B88E2F",
        cancelButtonColor: "#28a745",
    }).then((result) => {
        if (result.isConfirmed) {
            if (window.innerWidth >= 1024) {
                setTimeout(() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }, 500);
            }
        }
    });
};

const addingPagePathDom = (productsDetails) => {
    const routeProduct = document.querySelector(".route-product");
    const previousPaths = JSON.parse(localStorage.getItem('previousPaths')) || [];
    routeProduct.innerHTML = `<div class="loader" style="display: inline-grid; color: #000000;" ></div>`

    let extractedPart = previousPaths.map(path => {
        let part = path.split('/').pop().split('.')[0];
        return part === "index" ? "home" : part;
    })


    setTimeout(() => {
        routeProduct.innerHTML = ` <div class="container "> <div class="route-product__wrapper "> <a href="${previousPaths[1] || "https://furniroo-store.vercel.app/index.html"}" class="route-product__path-name">${extractedPart[1] || "Direct Entry"}</a> <i class="fa-solid fa-angle-right fa-xs"></i> <a href="${previousPaths[0] || "https://furniroo-store.vercel.app/index.html"}" class="route-product__path-name">${extractedPart[0] || "home"}</a> <i class="fa-solid fa-angle-right fa-xs"></i> <div class="route-product__line-col line"></div> <span class="route-product__product-name">${productsDetails.name.slice(0, 10)}</span> </div> </div> `
    }, 5000)

};

const addingAllProductPhotos = (product) => {
    const wrapperMainImage = document.querySelector(".detailes-product-img-main__box");
    const wrapperSecoundImg = document.querySelector(".detailes-product-img-secound");
    let images = product.images;

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

const addingProductSpecifications = (product) => {
    const wrapperProductSpecifications = $.querySelector(".Supplementary-specifications__value-box");

    wrapperProductSpecifications.insertAdjacentHTML("afterbegin",
        `<span class="Supplementary-specifications__value">SS-${urlParamsSlug} </span><span class="Supplementary-specifications__value">${product.categoryId.title}  </span >
                <div class="Supplementary-specifications__box-icon">
                  <div class="box-Icon-social"><i class="fa-brands fa-facebook-f Icon-social"></i></div>
                  <div class="box-Icon-social box-Icon-social--linkdin"><i class="fa-brands fa-linkedin-in Icon-social"></i></div>
                  <div class="box-Icon-social"><i class="fa-brands fa-twitter Icon-social"></i></div>
                </div >`)
}

const addingRelatedProduct = (reletedProducts) => {
    let productsWrapper = document.querySelector(".row-container")
    addingProductsTemplate(reletedProducts, "row", productsWrapper)
}

const addingProductInformationTemplate = (product) => {
    let productImgSection = document.querySelector(".product-img-section");
    let images = product.images;
    let informationContent = document.querySelector(".information-content");
    let productInfomation = product;

    informationContent.insertAdjacentHTML("beforeend", ` 
    <div class="content content--active product-description-box" id="description">
        <p class="product-description">
            ${productInfomation.description}
        </p>
    </div>

    <div class="content product-description-box additional-information" id="Information">
        <table class="additional-information__table">
            <thead class="additional-information__head">
                <tr class="column-head">
                    <th class="column-head__content">Feature</th>
                    <th class="column-head__content">Value</th>
                </tr>
            </thead>
            <tbody class="additional-information__body" id="productAttributesBody">
            </tbody>
        </table>
    </div>`);

    let productAttributesBody = document.querySelector("#productAttributesBody");

    const extractedAttributes = Object.entries(productInfomation.attributes).slice(0, 3);

    extractedAttributes.forEach(([key, value]) => {
        productAttributesBody.insertAdjacentHTML("beforeend", `
        <tr class="column-body">
            <td class="column-body__content">${key}</td>
            <td class="column-body__content">${value}</td>
        </tr>`);
    });

    productImgSection.insertAdjacentHTML("beforeend", `
                     <div class="product-img-box box-shadow">
                        <img class="product-img" src="https://furniro-6x7f.onrender.com${images[0].path}" alt="product-img">
                    </div>
                    <div class="product-img-box box-shadow">
                        <img class="product-img" src="https://furniro-6x7f.onrender.com${images[1].path}" alt="product-img">
                    </div>`)
}

const renderProductDetails = async () => {
    try {
        const response = await fetchProductsDetails();
        const product = response.data.product[0];
        let reletedProducts = response.data.relatedProducts
        reletedProducts ? reletedProducts : reletedProducts = []
        addingproductsDetailes(product);
        addingPagePathDom(product);
        addingAllProductPhotos(product);
        addingProductSpecifications(product);
        addingRelatedProduct(reletedProducts);
        addingProductInformationTemplate(product);
    } catch (error) {
        showSwal(`Please try again.`, "error", "Back to Shop", "../Pages/shop.html")
    }
};
renderProductDetails()

let iconCart = document.querySelector(".icon-container__link--cart")
let cartShop = document.querySelector(".cart-Shop")
let wrapperCaverScreen = document.querySelector(".wrapper")
let iconExit = document.querySelector(".cart-Shop__icon-exit-head")

iconCart.addEventListener("click", () => {
    cartShop.classList.add("cart-Shop--active")
    wrapperCaverScreen.classList.add("wrapper--active")
    addingProductTemplateToCart()

})

iconExit.addEventListener("click", () => {
    cartShop.classList.remove("cart-Shop--active")
    wrapperCaverScreen.classList.remove("wrapper--active")
    getCountProductsCart()
})

const addingProductTemplateToCart = async () => {
    const token = getToken();
    if (!token) {
        return false
    }

    let productImage, imageUrl
    const keeperCartProduct = document.querySelector(".cart-Shop__products")
    const subTotalBoxPrice = document.querySelector(".sub-total-box__price")
    subTotalBoxPrice.innerHTML = "Loading..."
    keeperCartProduct.classList.add("center")
    keeperCartProduct.innerHTML = `<div class="loader-bars loader-cart-products  section-title"></div>`

    const dataCartProduct = await fetchGetCartProducts()
    const cartProductsItems = dataCartProduct.cart.items
    const cartProductsTotal = dataCartProduct.cart.total
    keeperCartProduct.innerHTML = ""
    subTotalBoxPrice.innerHTML = ""
    keeperCartProduct.classList.remove("center")

    cartProductsItems.length ? cartProductsItems.forEach(item => {
        productImage = item.product.images.find(image => image.hexColorCode === item.color);
        imageUrl = productImage ? `https://furniro-6x7f.onrender.com${productImage.path}` : `https://furniro-6x7f.onrender.com${item.product.images[0].path}`

        keeperCartProduct.insertAdjacentHTML("afterbegin",
            `<div class="products-keeper"><div class="products-keeper__box-img"><img loading="lazy" class="products-keeper__img" src="${imageUrl}"></div><div class="products-keeper-box-profile"><h6 class="products-keeper-box-profile__title section-title">${item.product.name.slice(0, 10)}...</h6><div class="box-calculation"><span class="box-calculation__number">${item.quantity}</span>
              <span class="box-calculation__multiplication">x</span><span class="box-calculation__price">Rs ${item.product.discountPercent ? item.product.priceAfterDiscount.toLocaleString("en") : item.product.price.toLocaleString("en")} </span>
              </div>
              <div class="product-information-detailes">
                <div class="detailes-product__size-btn-box detailes-product__size-btn-box--active ">
                    <span class="detailes-product__size-btn detailes-product__size-btn--active">${item.size}</span>
                  </div>
                  <div class="box-shadow" style="background-color:${item.color}; width: 3rem; height: 3rem; border-radius: 100%;"></div>
              </div>
                  </div><button onclick="removeProductByUserByUser(this,'${item._id}', '${token}')"class="products-keeper-product-delete-btn"><div class="box-remove-product"> <i class="fas fa-times icon-close "></i></div></button></div>`
        )

        subTotalBoxPrice.innerHTML = `Rs.${cartProductsTotal.allPrice.toLocaleString("en")}`

    }) : keeperCartProduct.innerHTML = `  
        <div class="empty-products">
           <h2>Your Cart is Empty</h2>
           <p>It looks like you haven't added any products to your cart yet.</p>
           <p>Browse our products and add some amazing products to your cart.</p>
           <img src="../images/images.png" alt="No products available" />
         </div>
    `
}

const deleteProductAndUpdateCart = async (element, productId, token) => {

    element.classList.add = "icon-delete--pending"
    try {
        const response = await fetch(`https://furniro-6x7f.onrender.com/cart/${productId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`,
                'accept': 'application/json'
            },
        });

        if (!response.ok) {
            showAuthenticationRequiredAlert();
        }

        const result = await response.json();

        showSwal(result.data.message, "success", "OK", "#");
    } catch (error) {
        showSwal("You need to authenticate first.", "error", "Try Again", '#');
    } finally {
        element.classList.remove = "icon-delete--pending"
    }

    addingProductTemplateToCart();
};

const removeProductByUserByUser = async (element, productId, token) => {
    if (!productId && !token) {
        return false
    }
    showDeleteConfirmation(element, productId, token, deleteProductAndUpdateCart)
}

let previousPaths = JSON.parse(localStorage.getItem('previousPaths')) || [];

const updatePreviousPaths = () => {
    const referrer = document.referrer;

    if (referrer && referrer !== window.location.href) {
        previousPaths.unshift(referrer);
        if (previousPaths.length > 2) previousPaths.pop();
        localStorage.setItem('previousPaths', JSON.stringify(previousPaths));
    }

    return previousPaths;
};

document.addEventListener("DOMContentLoaded", () => {
    updatePreviousPaths();
});
window.removeProductByUserByUser = removeProductByUserByUser;

// const userScoringLogic = (iconsStar, userScoreingNumber, scoreStatus) => {
//     iconsStar.forEach((icon, index) => {
//         if (userScoreingNumber >= index + 1) {
//             icon.firstChild.classList.add("fa-solid")
//             icon.firstChild.classList.remove("fa-regular")
//             scoreStatus.innerHTML = userScoreingNumber + "  of" + ' 5 Customer Review';
//         } else {
//             icon.firstChild.classList.add("fa-regular")
//             icon.firstChild.classList.remove("fa-solid")
//         }
//     })
// }

// const productsScoreing = (iconsStar, scoreStatus) => {
//     let userScoreingNumber
//     iconsStar.forEach((icon, index) => {
//         icon.addEventListener("click", () => {
//             userScoreingNumber = index + 1

//             userScoringLogic(iconsStar, userScoreingNumber, scoreStatus)
//         })
//     })
// }
