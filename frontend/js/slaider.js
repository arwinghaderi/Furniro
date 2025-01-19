const progressCircle = document.querySelector(".autoplay-progress svg");
const progressContent = document.querySelector(".autoplay-progress span");
const swiper = new Swiper(".mySwiper", {
    slidesPerView: 3,
    grabCursor: true,
    spaceBetween: 20,
    autoplay: {
        delay: 5000,
        slidesPerGroupAuto: true,
        disableOnInteraction: false
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    on: {
        autoplayTimeLeft(s, time, progress) {
            progressCircle.style.setProperty("--progress", 1 - progress);
            progressContent.textContent = `${Math.ceil(time / 1000)}s`;
        }
    },
    breakpoints: {
        320: {
            slidesPerView: 1,
        },
        480: {
            slidesPerView: 2,
        },
        1200: {
            slidesPerView: 3,
            height: "64rem"
        }
    },
    loop: true
});
swiper.update(); swiper.pagination.update(); swiper.navigation.update();
