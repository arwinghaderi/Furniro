const swiper = new Swiper(".mySwiper", {
    slidesPerView: 3,
    grabCursor: true,
    spaceBetween: 50,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    breakpoints: {
        // when window width is >= 320px
        320: {
            slidesPerView: 1,

        },
        // when window width is >= 480px
        480: {
            slidesPerView: 2,

        },
        // when window width is >= 640px
        640: {
            slidesPerView: 2,
        },
        1200: {
            slidesPerView: 3,
            height: "64rem"
        }

    },
    loop: true
});