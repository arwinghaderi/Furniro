import { addingProductsTemplate } from "./func/shared.js"
import { getToken } from "./func/utils.js"

const fetchGetProducts = async () => {
    let productsHomeContainer = document.querySelector(".products-home-container")
    let token = getToken();
    try {
        const url = new URL(`https://furniro-6x7f.onrender.com/`);

        const headers = {
            'Content-Type': 'application/json',
        };
        if (token) {
            headers['authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(url, {
            method: "GET",
            headers: headers
        });

        if (!response.ok) {
            let message = "An unexpected error occurred. Refresh the page.";
            throw new Error(message);
        }
        const dataProducts = await response.json();
        const lastFourProducts = dataProducts.data.products.slice(0, 4)
        addingProductsTemplate(lastFourProducts, "row", productsHomeContainer)
    } catch (error) {
        showSwal(`${error.message}`, "error", "Refresh the page.", "../Pages/shop.html");
    }
}

const fetchGetProductsSlider = async () => {
    let token = getToken();
    try {
        const url = new URL(`https://furniro-6x7f.onrender.com/slider/`);

        const headers = {
            'Content-Type': 'application/json',
        };
        if (token) {
            headers['authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(url, {
            method: "GET",
            headers: headers
        });

        if (!response.ok) {
            let message = "An unexpected error occurred. Refresh the page.";
            throw new Error(message);
        }
        const dataSlider = await response.json();
        return dataSlider
    } catch (error) {
        showSwal(`${error.message}`, "error", "Refresh the page.", "../Pages/shop.html");
    }
};

window.addEventListener("load", async () => {
    await fetchGetProducts()
    const datas = await fetchGetProductsSlider()
    const productsSlaider = datas.data.sliders

    productsSlaider.forEach(product => {
        swiper.appendSlide(`
        <div class="swiper-slide">
            <div class="box-contant-img-slaider">
                <p class="box-contant-img-slaider__introduction">${product.title}</p>
                <h5 class="box-contant-img-slaider__title">${product.caption.slice(0, 10)}...</h5>
            </div>
            <img id="active" loading="lazy" class="slaider-img" src="https://furniro-6x7f.onrender.com${product.imagePath}" alt="product-img">
        </div>
    `);
    });
})