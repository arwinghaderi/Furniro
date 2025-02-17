import {
  showSwal,
  saveToLocalStorage,
  getFromLocalStorage,
} from './func/utils.js'
const productSelect = document.getElementById('product-select')

const swiper = new Swiper('.mySwiper', {
  slidesPerView: 4,
  spaceBetween: 30,
  freeMode: true,
  loop: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  breakpoints: {
    320: {
      slidesPerView: 2,
    },
    480: {
      slidesPerView: 3,
    },
    1200: {
      slidesPerView: 4,
      height: '64rem',
    },
  },
})

const fetchingCompareProducts = async (id) => {
  const response = await fetch(
    `https://furniro-6x7f.onrender.com/compare/products-by-category?categoryId=${id}`
  )
  const datas = await response.json()
  const products = datas.data.products

  return products
}

const initializeProductSelector = async () => {
  let catgoryId = getFromLocalStorage('catgoryId')
  productSelect.innerHTML = `
    <div class="empty-products box-shadow">
      <h2>No Products Available</h2>
      <p>There are no products available in the selected category. Please choose a different product.</p>
    </div>
  `
  if (!catgoryId) {
    return false
  }

  let products = await fetchingCompareProducts(catgoryId)
  const customOptions = document.querySelector('.custom-options')
  const options = customOptions.querySelectorAll('.option')

  refreshActiveOptions(options, products)
  selectProducForComparison(options, products)
}

initializeProductSelector()

let selectedProducts = []

const activateCategory = async (element, id) => {
  saveToLocalStorage('catgoryId', id)

  const catgoryBoxs = document.querySelectorAll('.catgory-box')
  catgoryBoxs.forEach((catgoryBox) => {
    catgoryBox.classList.remove('active')
  })

  if (element) {
    element.classList.add('active')
  }

  let products = await fetchingCompareProducts(id)

  products.forEach((product) => {
    product.selected = false
  })

  productSelect.innerHTML = ''

  if (products.length) {
    products.forEach((product, index) => {
      const option = document.createElement('div')
      option.classList.add('option')
      option.dataset.index = index
      option.innerHTML = `
        <img src="https://furniro-6x7f.onrender.com${
          product.images[0].path
        }" alt="${product.title}">
        <div>${product.title.slice(0, 8)}...</div>
      `
      productSelect.appendChild(option)
    })
  } else {
    productSelect.innerHTML = `
      <div class="empty-products box-shadow">
        <h2>No Products Available</h2>
        <p>There are no products available in the selected category. Please choose a different product.</p>
      </div>
    `
  }

  const customOptions = document.querySelector('.custom-options')
  const options = customOptions.querySelectorAll('.option')

  // Refresh options to set active class to already selected products
  refreshActiveOptions(options, products)
  selectProducForComparison(options, products)
}

const refreshActiveOptions = (options, products) => {
  options.forEach((option) => {
    const index = option.dataset.index
    const product = products[index]

    if (
      selectedProducts.some(
        (selectedProduct) => selectedProduct._id === product._id
      )
    ) {
      option.classList.add('option--active')
    } else {
      option.classList.remove('option--active')
    }
  })
}

const selectProducForComparison = (options, products) => {
  options.forEach((option) => {
    option.addEventListener('click', () => {
      const index = option.dataset.index
      const selectedProduct = products[index]

      if (
        selectedProducts.some((product) => product._id === selectedProduct._id)
      ) {
        showSwal(
          'You have already selected this product!',
          'warning',
          'OK',
          '#'
        )
        return
      }

      const maxSelection = 2

      if (selectedProducts.length >= maxSelection) {
        showSwal(
          `You can only select up to ${maxSelection} products!`,
          'warning',
          'OK',
          '#'
        )
        return
      }

      selectedProducts.push(selectedProduct)

      const productWrapperSection = document.querySelector(
        '.product-wrapper-section'
      )

      const productTemplate = `
      <div class="product-wrapper" data-product-id="${selectedProduct._id}">
    <span class="product-remove-icon" onclick='productRemove("${
      selectedProduct._id
    }", ${JSON.stringify(products)})'>x</span>
      <div class="Product-Img-Box--com">
            <img class="product-img--com" src="https://furniro-6x7f.onrender.com${
              selectedProduct.images[0].path
            }" alt="${selectedProduct.title}">
          </div>
          <div class="product-details">
            <span class="product-details__title">${selectedProduct.title.slice(
              0,
              12
            )}...</span>
            <span class="Prodct-price">Rs. ${selectedProduct.price.toLocaleString()}</span>
          </div>
        </div>
      `

      productWrapperSection.innerHTML += productTemplate

      option.classList.add('option--active')

      if (selectedProducts.length === 2) {
        const productSelectContainer =
          document.querySelector('.product-selection')
        productSelectContainer.style.display = 'none'
      }

      activateCategory(null, getFromLocalStorage('catgoryId'))
    })
  })
}

const fetchCategories = async () => {
  const loader = document.getElementById('loader')
  loader.style.display = 'flex'

  try {
    const response = await fetch('https://furniro-6x7f.onrender.com/category/')
    const datas = await response.json()
    const categories = datas.data.categories

    if (!response.ok) {
      let message = 'An unexpected error occurred. Refresh the page.'
      throw new Error(message)
    }

    categories
      .filter(
        (category) =>
          category.title !== 'All' &&
          category.title !== 'Discount' &&
          category.title !== 'New'
      )
      .forEach((category) => {
        swiper.appendSlide(`
          <div class="col-4 catgory-box box-shadow swiper-slide" onclick="activateCategory(this,'${category._id}')">
            <h2>${category.title}</h2>
            ${category.icon}
          </div>
        `)
      })

    loader.style.display = 'none'
  } catch (error) {
    loader.style.display = 'none'
    showSwal(
      `${error.message}`,
      'error',
      'Refresh the page.',
      '../Pages/Comparison.html'
    )
  }
}

const productRemove = (productId, products) => {
  console.log(products)
  selectedProducts = selectedProducts.filter(
    (product) => product._id !== productId
  )

  const productWrapperSection = document.querySelector(
    '.product-wrapper-section'
  )
  const productElement = productWrapperSection.querySelector(
    `.product-wrapper[data-product-id="${productId}"]`
  )
  productElement.remove()

  if (selectedProducts.length < 2) {
    const productSelectContainer = document.querySelector('.product-selection')
    productSelectContainer.style.display = 'block'
  }

  // Remove the active class from the corresponding option
  const customOptions = document.querySelector('.custom-options')
  const options = customOptions.querySelectorAll('.option')
  options.forEach((option) => {
    const index = option.dataset.index
    const product = products[index]

    if (product._id === productId) {
      option.classList.remove('option--active')
    }
  })
}

document.addEventListener('DOMContentLoaded', fetchCategories)
window.activateCategory = activateCategory
window.productRemove = productRemove
