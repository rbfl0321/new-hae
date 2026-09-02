/* ==========================================================
   tab.js

   1. ROOMS
      Hotel / Resort

   2. FACILITY
      Spa & Fitness / Convenience / Kids / Gallery

   3. CONCIERGE
      Service / Contacts
   ========================================================== */


document.addEventListener('DOMContentLoaded', function () {

    /* ======================================================
       ROOMS
       Hotel / Resort
       ====================================================== */

    initRoomTab();


    /* ======================================================
       FACILITY
       Spa & Fitness / Convenience / Kids / Gallery
       ====================================================== */

    initTabMenu(
        '.facility-wrap .tab-menu',
        '.facility-list-wrap',
        'active'
    );


    /* ======================================================
       CONCIERGE
       Service / Contacts
       ====================================================== */

    initTabMenu(
        '.concierge-wrap .tab-menu',
        '.concierge-list-wrap',
        'on'
    );

});



/* ==========================================================
   ROOMS TAB
   Hotel / Resort
   ========================================================== */

function initRoomTab() {

    const tabMenu = document.querySelector('.room-tab-menu');
    const contentWrap = document.querySelector('.room-type-wrap');

    if (!tabMenu || !contentWrap) return;


    const tabItems = tabMenu.querySelectorAll('li');
    const contents = contentWrap.querySelectorAll(':scope > div');


    /* ------------------------------------------------------
       처음 상태
       Hotel 활성화
       ------------------------------------------------------ */

    tabItems.forEach(function (item) {
        item.classList.remove('active');
    });

    contents.forEach(function (content) {
        content.classList.remove('on');
    });


    if (tabItems[0]) {
        tabItems[0].classList.add('active');
    }

    if (contents[0]) {
        contents[0].classList.add('on');
    }


    /* ------------------------------------------------------
       탭 클릭
       ------------------------------------------------------ */

    tabItems.forEach(function (tabItem, index) {

        const link = tabItem.querySelector('a');

        if (!link) return;


        link.addEventListener('click', function (e) {

            /*
             * href="#"일 때만 기본 이동 방지
             *
             * 실제 외부 링크가 들어오면
             * 링크 이동은 막지 않음
             */
            if (
                link.getAttribute('href') === '#' ||
                link.getAttribute('href') === ''
            ) {
                e.preventDefault();
            }


            /* 탭 active 변경 */

            tabItems.forEach(function (item) {
                item.classList.remove('active');
            });

            tabItem.classList.add('active');


            /* 콘텐츠 on 변경 */

            contents.forEach(function (content) {
                content.classList.remove('on');
            });


            if (contents[index]) {
                contents[index].classList.add('on');
            }

        });

    });

}



/* ==========================================================
   FACILITY / CONCIERGE 공통 TAB
   ========================================================== */

function initTabMenu(
    tabMenuSelector,
    contentWrapSelector,
    activeClass
) {

    const tabMenu = document.querySelector(tabMenuSelector);
    const contentWrap = document.querySelector(contentWrapSelector);

    if (!tabMenu || !contentWrap) return;


    const tabItems = tabMenu.querySelectorAll('li');
    const contentItems = contentWrap.querySelectorAll(':scope > div');


    /* ------------------------------------------------------
       탭 클릭
       ------------------------------------------------------ */

    tabItems.forEach(function (tabItem, index) {

        const link = tabItem.querySelector('a');

        if (!link) return;


        link.addEventListener('click', function (e) {

            /*
             * # 또는 빈 링크만 기본 이동 방지
             * 외부 링크는 정상 작동
             */
            if (
                link.getAttribute('href') === '#' ||
                link.getAttribute('href') === ''
            ) {
                e.preventDefault();
            }


            /* 탭 active 변경 */

            tabItems.forEach(function (item) {
                item.classList.remove('active');
            });

            tabItem.classList.add('active');


            /* 콘텐츠 active / on 변경 */

            contentItems.forEach(function (content) {
                content.classList.remove(activeClass);
            });


            if (contentItems[index]) {
                contentItems[index].classList.add(activeClass);
            }

        });

    });

}