const mzSwiper = new Swiper('.swiper-mz-recommendation', {
    slidesPerView: 3,
    spaceBetween: 40,
    navigation: {
        nextEl: '.mz-next',
        prevEl: '.mz-prev',
    },
    on: {
        init: function () {
            toggleNavigationButtons(this, '.mz-next', '.mz-prev');
        },
        slideChange: function () {
            toggleNavigationButtons(this, '.mz-next', '.mz-prev');
        },
    },
});

const seasonalSwiper = new Swiper('.swiper-seasonal-recommendation', {
    slidesPerView: 3,
    spaceBetween: 40,
    navigation: {
        nextEl: '.seasonal-next',
        prevEl: '.seasonal-prev',
    },
    on: {
        init: function () {
            toggleNavigationButtons(this, '.seasonal-next', '.seasonal-prev');
        },
        slideChange: function () {
            toggleNavigationButtons(this, '.seasonal-next', '.seasonal-prev');
        },
    },
});

function toggleNavigationButtons(swiper, nextButtonClass, prevButtonClass) {
    const nextButton = document.querySelector(nextButtonClass);
    const prevButton = document.querySelector(prevButtonClass);

    if (swiper.isBeginning) {
        prevButton.style.display = 'none';
    } else {
        prevButton.style.display = 'block';
    }

    if (swiper.isEnd) {
        nextButton.style.display = 'none';
    } else {
        nextButton.style.display = 'block';
    }
}
