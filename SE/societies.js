function swiperAnimation() {
    const swiper = new Swiper(".mySwiper", {
        slidesPerView: 3, // Set the number of slides to show
        spaceBetween: 30, // Space between slides
        loop: true, // Enable looping of slides
        centeredSlides: true,
        breakpoints: {
            640: {
                slidesPerView: 1, // Show 1 slide on small screens
            },
            768: {
                slidesPerView: 2, // Show 2 slides on medium screens
            },
            1024: {
                slidesPerView: 3, // Show 3 slides on larger screens
            },
        },
    });
}
document.addEventListener('DOMContentLoaded', swiperAnimation);
