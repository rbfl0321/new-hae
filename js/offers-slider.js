const offerSliderElement = document.querySelector(
    ".offers-section .offer-list-wrap.swiper"
);

if (offerSliderElement && typeof Swiper !== "undefined") {
    /*
     * 카드 양옆의 투명 클릭 버튼
     */
    const offerEdgePrevButton = offerSliderElement.querySelector(
        ".offer-edge-button--prev"
    );

    const offerEdgeNextButton = offerSliderElement.querySelector(
        ".offer-edge-button--next"
    );

    /*
     * 하단에 보이는 이전·다음 버튼
     */
    const offerControlPrevButton = document.querySelector(
        ".offers-section .offer-control-button--prev"
    );

    const offerControlNextButton = document.querySelector(
        ".offers-section .offer-control-button--next"
    );

    /*
     * 페이지 번호
     */
    const offerCurrentPage = document.querySelector(
        ".offers-section .offer-page-current"
    );

    const offerTotalPage = document.querySelector(
        ".offers-section .offer-page-total"
    );

    /*
     * 프로그래스바
     */
    const offerProgress = document.querySelector(
        ".offers-section .offer-progress"
    );

    const offerProgressFill = document.querySelector(
        ".offers-section .offer-progress-fill"
    );

    /* 페이지 번호, 프로그래스바, 버튼 상태 갱신 */
    function updateOfferControls(swiper) {
        const totalSlides =
            offerSliderElement.querySelectorAll(".swiper-slide").length;

        const slidesPerGroup =
            Number(swiper.params.slidesPerGroup) || 1;

        const totalPages = Math.max(
            Math.ceil(totalSlides / slidesPerGroup),
            1
        );

        const currentPage = Math.min(
            Math.floor(swiper.realIndex / slidesPerGroup) + 1,
            totalPages
        );
        const progressPercentage =
            (currentPage / totalPages) * 100;

        /*
         * 현재 페이지 / 전체 페이지
         */
        if (offerCurrentPage) {
            offerCurrentPage.textContent = currentPage;
        }

        if (offerTotalPage) {
            offerTotalPage.textContent = totalPages;
        }

        /*
         * 프로그래스바 너비
         */
        if (offerProgressFill) {
            offerProgressFill.style.width =
                `${progressPercentage}%`;
        }

        /*
         * 프로그래스바 접근성 정보
         */
        if (offerProgress) {
            offerProgress.setAttribute(
                "aria-valuemax",
                totalPages
            );

            offerProgress.setAttribute(
                "aria-valuenow",
                currentPage
            );

            offerProgress.setAttribute(
                "aria-valuetext",
                `${currentPage} / ${totalPages} 페이지`
            );
        }


        const navigationDisabled = swiper.isLocked;

        [
            offerEdgePrevButton,
            offerEdgeNextButton,
            offerControlPrevButton,
            offerControlNextButton,
        ].forEach(function (button) {
            if (button) {
                button.disabled = navigationDisabled;
            }
        });
    }

    /*
     * Swiper 생성
     */
    const offerSlider = new Swiper(offerSliderElement, {
        direction: "horizontal",

        speed: 600,
        loop: true,
        rewind: false,
        watchOverflow: true,
        grabCursor: true,

        /*
         * 360px 이하: 카드 1장
         */
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 16,

        breakpoints: {
            /*
             * 361~767px: 카드 2장
             */
            361: {
                slidesPerView: 2,
                slidesPerGroup: 2,
                spaceBetween: 16
            },

            /*
             * 768~1279px: 카드 3장
             */
            768: {
                slidesPerView: 3,
                slidesPerGroup: 3,
                spaceBetween: 20
            },

            /*
             * 1280px 이상: 카드 3장
             */
            1280: {
                slidesPerView: 3,
                slidesPerGroup: 3,
                spaceBetween: 24
            }
        },

        /*
         * 하단에 보이는 쉐브론 버튼 연결
         */
        navigation: {
            prevEl: offerControlPrevButton,
            nextEl: offerControlNextButton
        },

        keyboard: {
            enabled: true,
            onlyInViewport: true
        },

        a11y: {
            enabled: true,
            prevSlideMessage: "이전 오퍼 보기",
            nextSlideMessage: "다음 오퍼 보기",
            firstSlideMessage: "첫 번째 오퍼입니다",
            lastSlideMessage: "마지막 오퍼입니다",
            slideLabelMessage:
                "{{index}} / {{slidesLength}}번째 오퍼"
        },

        /*
         * 슬라이드 상태가 바뀔 때마다
         * 하단 컨트롤 갱신
         */
        on: {
            init(swiper) {
                updateOfferControls(swiper);
            },

            slideChange(swiper) {
                updateOfferControls(swiper);
            },

            breakpoint(swiper) {
                requestAnimationFrame(() => {
                    updateOfferControls(swiper);
                });
            },

            resize(swiper) {
                requestAnimationFrame(() => {
                    updateOfferControls(swiper);
                });
            }
        }
    });

    /*
     * 기존 카드 양옆 투명 버튼 연결
     */
    if (offerEdgePrevButton) {
        offerEdgePrevButton.addEventListener(
            "click",
            () => {
                offerSlider.slidePrev();
            }
        );
    }

    if (offerEdgeNextButton) {
        offerEdgeNextButton.addEventListener(
            "click",
            () => {
                offerSlider.slideNext();
            }
        );
    }
}
