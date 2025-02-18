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

import {
  showSwal,
  saveToLocalStorage,
  getFromLocalStorage,
} from './func/utils.js'
const tableBody = document.querySelector('.verticalTable tbody')
const productWrapperSection = document.querySelector(
  '.product-wrapper-section-products'
)
const productSelectContainer = document.getElementById(
  'product-select-container'
)

let selectedProducts = []

const fetchingCompareProducts = async (id) => {
  const response = await fetch(
    `https://furniro-6x7f.onrender.com/compare/products-by-category?categoryId=${id}`
  )
  const datas = await response.json()
  const products = datas.data.products

  console.log(products)
  return products
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
    option.addEventListener('click', async () => {
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
        '.product-wrapper-section-products'
      )
      console.log(productWrapperSection)
      const productTemplate = `
        <div class="product-wrapper" data-product-id="${selectedProduct._id}">
          <span class="product-remove-icon" onclick='productRemove("${
            selectedProduct._id
          }", "${encodeURIComponent(JSON.stringify(products))
        .replace(/'/g, '&#39;')
        .replace(/"/g, '&quot;')}")'>x</span>
          <div class="Product-Img-Box--com">
            <img class="product-img--com" src="https://furniro-6x7f.onrender.com${
              selectedProduct.images[0].path
            }" alt="${selectedProduct.title}">
          </div>
          <div class="product-details">
            <span class="product-details__title">${selectedProduct.name.slice(
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
        document.querySelector('.product-selection').style.display = 'none'
      }

      activateCategory(null, getFromLocalStorage('catgoryId'))

      if (selectedProducts.length === 2) {
        await AddingProductDetailsTable(
          selectedProducts[0]._id,
          selectedProducts[1]._id
        )
      }
    })
  })
}

const addingSelectBox = (products) => {
  productSelectContainer.innerHTML = `
  <div class="select-container">
  <div class="custom-options custom-options--active" id="product-select">
  </div>
  <span class="arrow-down">
  <i class="fas fa-chevron-down"></i>
  </span>
  </div>
  `
  const productSelect = document.getElementById('product-select')

  products.forEach((product) => {
    product.selected = false
  })

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
          <img src="../images/images.png" alt="No products available" />
      </div>
    `
  }
  const options = productSelect.querySelectorAll('.option')

  refreshActiveOptions(options, products)
  selectProducForComparison(options, products)
}

const activateCategory = async (element, id) => {
  localStorage.setItem('catgoryId', id ? id : null)

  const catgoryBoxs = document.querySelectorAll('.catgory-box')
  catgoryBoxs.forEach((catgoryBox) => {
    catgoryBox.classList.remove('active')
  })

  if (element) {
    element.classList.add('active')
  }

  let products = await fetchingCompareProducts(id)

  const productWrapperSection = document.querySelector(
    '.product-wrapper-section-products'
  )
  productWrapperSection.innerHTML = ''
  tableBody.innerHTML = `
    <div class="empty-products box-shadow">
       <h2>No Products Available</h2>
       <p>There are no products available in the selected category. Please choose a different product.</p>
       <img src="../images/images.png" alt="No products available" />
    </div>`

  addingSelectBox(products)
}

const AddingProductDetailsTable = async (productId1, productId2) => {
  const tableBody = document.querySelector('.verticalTable tbody')
  tableBody.innerHTML = ''
  const loader = document.getElementById('loader-table')
  loader.style.display = 'flex'

  try {
    const response1 = await fetch(
      `https://furniro-6x7f.onrender.com/compare/${productId1}`,
      { method: 'POST' }
    )
    const response2 = await fetch(
      `https://furniro-6x7f.onrender.com/compare/${productId2}`,
      { method: 'POST' }
    )

    if (!response1.ok || !response2.ok) {
      throw new Error('Failed to fetch product details')
    }

    const data1 = await response1.json()
    const data2 = await response2.json()
    console.log(data2)

    const attributes1 = data1.data.product1.attributes
    const attributes2 = data2.data.product1.attributes
    const dimensions1 = data1.data.product1.dimensions
    const dimensions2 = data2.data.product1.dimensions
    const productSlug1 = data1.data.product1.slug
    const productSlug2 = data2.data.product1.slug
    const productName1 = data1.data.product1.name
    const productName2 = data2.data.product1.name

    tableBody.innerHTML = ''

    // Add product names
    tableBody.innerHTML += `
        <td colspan="4">
          <div class="title-table">Name</div>
        </td>
        <tr>
        <td class="sub-Title"></td>
        <td class="sub-Title">${productName1.slice(0, 12)}..</td>
        <td class="sub-Title">${productName2.slice(0, 12)}..</td>
      </tr>
    `

    tableBody.innerHTML += `
      <tr>
        <td colspan="4">
          <div class="title-table">General</div>
        </td>
      </tr>
    `
    const generalKeys = new Set([
      ...Object.keys(attributes1),
      ...Object.keys(attributes2),
    ])
    generalKeys.forEach((key) => {
      const newRow = document.createElement('tr')
      newRow.innerHTML = `
        <td>
          <div class="sub-Title">${
            key.charAt(0).toUpperCase() + key.slice(1)
          }</div>
        </td>
        <td class="sub-Title">${attributes1[key] || '-'}</td>
        <td class="sub-Title">${attributes2[key] || '-'}</td>
        <td class="sub-Title"></td>
      `
      tableBody.appendChild(newRow)
    })

    tableBody.innerHTML += `
      <tr>
        <td colspan="4">
          <div class="title-table">Dimensions</div>
        </td>
      </tr>
    `
    const dimensionKeys = new Set([
      ...Object.keys(dimensions1),
      ...Object.keys(dimensions2),
    ])
    dimensionKeys.forEach((key) => {
      const newRow = document.createElement('tr')
      newRow.innerHTML = `
        <td>
          <div class="sub-Title">${
            key.charAt(0).toUpperCase() + key.slice(1)
          }</div>
        </td>
        <td class="sub-Title">${dimensions1[key] || '-'}</td>
        <td class="sub-Title">${dimensions2[key] || '-'}</td>
        <td class="sub-Title"></td>
      `
      tableBody.appendChild(newRow)
      loader.style.display = 'none'
    })

    const newRow = document.createElement('tr')
    newRow.innerHTML = `
      <td class="sub-Title"></td>
      <td class="sub-Title">
        <button class="btn-comparison" onclick="window.location.href='../Pages/product.html?slug=${productSlug1}'">Add to cart</button>
      </td>
      <td class="sub-Title">
        <button class="btn-comparison" onclick="window.location.href='../Pages/product.html?slug=${productSlug2}'">Add to cart</button>
      </td>
    `
    tableBody.appendChild(newRow)
  } catch (error) {
    console.error('Error fetching product details:', error)
    tableBody.innerHTML = 'Failed to load product details'
  }
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
          <div class="col-4 catgory-box box-shadow swiper-slide" data-category-id="${category._id}" onclick="activateCategory(this, '${category._id}')">
            <h2>${category.title}</h2>
            ${category.icon}
          </div>
        `)
      })

    loader.style.display = 'none'

    // فراخوانی initializeProductSelector بعد از بارگذاری دسته‌بندی‌ها
    initializeProductSelector()
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

const productRemove = (productId, productsJson) => {
  const products = JSON.parse(decodeURIComponent(productsJson))
  console.log('Product ID to remove:', productId)
  console.log('Products:', products)
  selectedProducts = selectedProducts.filter(
    (product) => product._id !== productId
  )

  const productWrapperSection = document.querySelector(
    '.product-wrapper-section-products'
  )
  const productElement = productWrapperSection.querySelector(
    `.product-wrapper[data-product-id="${productId}"]`
  )
  console.log('Product element to remove:', productElement)
  if (productElement) {
    productElement.remove()
  }

  if (selectedProducts.length < 2) {
    const productSelectContainer = document.querySelector('.product-selection')
    productSelectContainer.style.display = 'block'
    tableBody.innerHTML = `
      <div class="container">
        <div class="empty-products empty-products--table-section box-shadow">
          <h2>No Products Available</h2>
          <p>There are no products available in the selected category. Please choose a different product.</p>
          <img src="../images/images.png" alt="No products available" />
        </div>
      </div>`
  }

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

const initializeProductSelector = async () => {
  let catgoryId = localStorage.getItem('catgoryId')
  let products

  if (!catgoryId) {
    products = []
    addingSelectBox(products)
    return
  }

  const activeCategoryBox = document.querySelector(
    `.catgory-box[data-category-id="${catgoryId}"]`
  )

  console.log('activeCategoryBox =>', activeCategoryBox)

  if (activeCategoryBox) {
    activateCategory(activeCategoryBox, catgoryId)
  } else {
    products = await fetchingCompareProducts(catgoryId)
    addingSelectBox(products)
  }

  tableBody.innerHTML = `
    <div class="container">
      <div class="empty-products empty-products--table-section box-shadow">
        <h2>No Products Available</h2>
        <p>There are no products available in the selected category. Please choose a different product.</p>
        <img src="../images/images.png" alt="No products available" />
      </div>
    </div>
  `
}

initializeProductSelector()

document.addEventListener('DOMContentLoaded', fetchCategories)
window.activateCategory = activateCategory
window.productRemove = productRemove
