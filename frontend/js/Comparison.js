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

const activateCategory = (element) => {
  const catgoryBoxs = document.querySelectorAll('.catgory-box')

  catgoryBoxs.forEach(function (catgoryBox) {
    catgoryBox.classList.remove('active')
  })
  element.classList.add('active')
}

const fetchCategories = async () => {
  try {
    const response = await fetch('https://furniro-6x7f.onrender.com/category/')
    const datas = await response.json()
    const categories = datas.data.categories

    categories.forEach((category) => {
      swiper.appendSlide(`
                        <div class="col-4 catgory-box box-shadow swiper-slide" onclick="activateCategory(this)">
                            <h2>${category.title}</h2>
                        </div>
                    `)
    })
  } catch (error) {
    console.error('Error fetching categories:', error)
  }
}
document.addEventListener('DOMContentLoaded', fetchCategories)
