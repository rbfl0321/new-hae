/*예약바 팝업*/
//호텔/리조트 선택 팝업창
let selectHotelBtn = document.querySelector(".select-hotel a");//클릭할 영역
let selectDateBtn = document.querySelector(".select-date a");   // 체크인/체크아웃 클릭 영역

let roomPopup = document.querySelector('.room-popup');//객실/성인/어린이 열릴 팝업
let hotelPop = document.querySelector(".hotel-popup");//호텔/리조트 열릴 팝업
let datePop = document.querySelector(".date-popup");//날짜 선택 열릴 팝업

const addRoomBtn = document.querySelector('.add-room-btn');
const roomList = document.querySelector('.select-room-list');
const roomTemplate = roomList?.querySelector('.addRoom')?.cloneNode(true); // 객실1 원본을 깨끗한 상태로 미리 복제해서 보관
const roomCountDisplay = document.querySelector('.re-data.select-room span'); // 예약바에 표시되는 객실 수 (1 → 2)
const adultTotalDisplay = document.querySelector('.re-data.select-adult span'); // 예약바에 표시되는 성인 총 인원수
const childTotalDisplay = document.querySelector('.re-data.select-child span'); // 예약바에 표시되는 어린이 총 인원수
const bookBtn = document.querySelector('.reservation-wrap .re-right button'); // 예약바의 '예약하기' 버튼 (헤더/모바일메뉴의 동명 버튼과 구분)
const promoInput = document.querySelector('#promo-code'); // 프로모션 코드 입력 input
let roomCount = roomList ? roomList.querySelectorAll('.addRoom').length : 1;

// 객실, 성인, 어린이 타겟 영역 (각 영역 전체 클릭 또는 .re-data 클릭)
let roomTrigger = document.querySelector('.select-room')?.closest('div');
let adultTrigger = document.querySelector('.select-adult')?.closest('div');
let childTrigger = document.querySelector('.select-child')?.closest('div');

let closehotelBtn = hotelPop?.querySelector(".close-btn"); // 닫기 버튼
let closedateBtn = datePop?.querySelector(".close-btn"); // 닫기 버튼
let closeroomBtn = roomPopup?.querySelector('.close-btn');
// 팝업 내부 버튼

const selectBtn = roomPopup?.querySelector('.select-btn');
const dateSelectBtn = datePop?.querySelector(".select-btn"); // 날짜 팝업 선택완료 버튼
const hotelBtns = document.querySelectorAll(".hotel-popup .btn-list:first-of-type .popup-btn");
const selectCompleteBtn = hotelPop?.querySelector(".select-btn"); // 선택완료 버튼

const targetP = document.querySelector(".re-data.select-hotel");  // value 속성이 변경될 p 태그
const targetA = targetP?.querySelector("a");                       // 화면 텍스트가 변경될 a 태그

// 모든 팝업을 열기 전에 다른 팝업들을 닫아주는 통합 함수
const closeAllPopups = () => {
    if (hotelPop) hotelPop.style.display = "none";
    if (datePop) datePop.style.display = "none";
    if (roomPopup) roomPopup.style.display = "none";
};

// 외부 영역 클릭 시 팝업 닫기 이벤트 추가
document.addEventListener("click", (e) => {
    // 클릭된 요소가 팝업 자체 내부인지 확인
    const isInsideHotelPop = hotelPop?.contains(e.target);
    const isInsideDatePop = datePop?.contains(e.target);
    const isInsideRoomPop = roomPopup?.contains(e.target);

    // 클릭된 요소가 팝업을 열어주는 버튼(트리거)들 내부인지 확인
    const isHotelBtn = selectHotelBtn?.contains(e.target);
    const isDateBtn = selectDateBtn?.contains(e.target);
    const isRoomTrigger = roomTrigger?.contains(e.target) || 
                          adultTrigger?.contains(e.target) || 
                          childTrigger?.contains(e.target);

    // 팝업 내부도 아니고, 팝업을 여는 버튼도 아닌 '바깥 영역'을 클릭했을 때만 팝업 닫기
    if (!isInsideHotelPop && !isInsideDatePop && !isInsideRoomPop &&
        !isHotelBtn && !isDateBtn && !isRoomTrigger) {
        closeAllPopups();
    }
});

// 프로모션코드 입력 영역 포커스/클릭 시 모든 팝업 닫기
promoInput?.addEventListener("focus", closeAllPopups);
promoInput?.addEventListener("click", closeAllPopups);

promoInput?.addEventListener("input", () => {
    const wrap = promoInput.closest('.re-data');
    if (promoInput.value.trim() !== '') {
        wrap?.classList.add('is-selected');
    } else {
        wrap?.classList.remove('is-selected');
    }
});

// 1. 호텔/리조트 선택 팝업창 열기
selectHotelBtn?.addEventListener("click", (e) => {
    e.preventDefault(); // a 태그의 기본 스크롤 이동 동작 방지
    closeAllPopups();   // 다른 팝업 닫기
    if (hotelPop) hotelPop.style.display = "flex";
});

// 2. 호텔/리조트 선택 팝업창 닫기
closehotelBtn?.addEventListener("click", () => {
    if (hotelPop) hotelPop.style.display = "none";
});

// 3. 호텔/리조트 선택 버튼 클릭 이벤트 (.on 클래스 토글 & 값 임시 저장)
hotelBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        // 1) 모든 버튼에서 .on 클래스 제거 후 클릭된 버튼에 추가
        hotelBtns.forEach(item => item.classList.remove("on"));
        btn.classList.add("on");

        // 2) 클릭된 버튼의 value와 텍스트 가져오기
        const selectedValue = btn.getAttribute("value"); // "resort" 또는 "hotel"
        const selectedText = btn.textContent;             // "해비치 리조트 제주" 등

        // 3) p태그 value 속성과 a태그 화면 텍스트를 즉시 동시에 업데이트
        if (targetP) targetP.setAttribute("value", selectedValue);
        if (targetA) targetA.textContent = selectedText;
    });
});

// 4. 날짜 선택 열릴 팝업 팝업창 열기
selectDateBtn?.addEventListener("click", (e) => {
    e.preventDefault(); // a 태그의 기본 스크롤 이동 동작 방지
    closeAllPopups();   // 다른 팝업 닫기
    if (datePop) {
        datePop.style.left = "300px"; // 날짜 팝업 left 위치 지정
        datePop.style.display = "flex";
    }
});

// 5. 날짜 선택 열릴 팝업 팝업창 닫기
closedateBtn?.addEventListener("click", () => {
    if (datePop) datePop.style.display = "none";
});

// 5. 객실/성인/어린이 팝업 닫기
closeroomBtn?.addEventListener("click", () => {
    if (roomPopup) roomPopup.style.display = "none";
});

// 5-1. 객실/인원 팝업 선택완료 버튼 클릭 이벤트 (팝업 닫기)
selectBtn?.addEventListener("click", () => {
    if (roomPopup) roomPopup.style.display = "none";
});
selectBtn?.addEventListener("click", () => {
    if (roomPopup) roomPopup.style.display = "none";
    // ← 아래 3줄 추가
    document.querySelector('.re-data.select-room')?.classList.add('is-selected');
    document.querySelector('.re-data.select-adult')?.classList.add('is-selected');
    document.querySelector('.re-data.select-child')?.classList.add('is-selected');
});

// 6. 객실/성인/어린이 팝업 열기 함수
const openRoomPopup = () => {
    if (roomPopup) {
        closeAllPopups(); // 다른 팝업 닫기
       
        roomPopup.style.display = 'block';
    }
};

// 6-1. 모든 객실의 성인/어린이 인원수를 합산해서 예약바에 반영하는 함수
const updateTotalGuestCounts = () => {
    let adultTotal = 0;
    let childTotal = 0;

    roomList?.querySelectorAll('.addRoom').forEach(room => {
        room.querySelectorAll('.item-list > div').forEach(group => {
            const isChild = group.querySelector('strong')?.textContent.trim() === '어린이';
            const count = parseInt(group.querySelector('.count-wrap span')?.textContent, 10) || 0;
            if (isChild) {
                childTotal += count;
            } else {
                adultTotal += count;
            }
        });
    });

    if (adultTotalDisplay) adultTotalDisplay.textContent = adultTotal;
    if (childTotalDisplay) childTotalDisplay.textContent = childTotal;
};

updateTotalGuestCounts(); // 페이지 로드 시 초기값 기준으로 한 번 계산

// 6-2. -버튼이 최소값(성인 1, 어린이 0)일 때 색상을 Neutral-200으로 변경하는 함수
const updateMinusButtonColor = (countWrap) => {
    const minusBtn = countWrap.querySelector('button:first-of-type'); // - 버튼
    const count = parseInt(countWrap.querySelector('span')?.textContent, 10) || 0;
    const isChild = countWrap.parentElement.querySelector('strong')?.textContent.trim() === '어린이';
    const minCount = isChild ? 0 : 1; // 어린이 최소 0명 / 성인 최소 1명

    if (minusBtn) minusBtn.style.color = count <= minCount ? 'var(--Neutral-200)' : ''; // 최소값이면 회색, 아니면 기본색 복원
};

// 6-4. +버튼이 최대값(성인/어린이 모두 2명)일 때 색상을 Neutral-200으로 변경하는 함수
const updatePlusButtonColor = (countWrap) => {
    const plusBtn = countWrap.querySelector('button:last-of-type'); // + 버튼
    const count = parseInt(countWrap.querySelector('span')?.textContent, 10) || 0;
    const maxCount = 2; // 성인/어린이 모두 최대 2명

    if (plusBtn) plusBtn.style.color = count >= maxCount ? 'var(--Neutral-200)' : ''; // 최대값이면 회색, 아니면 기본색 복원
};

// 6-5. 특정 객실 카드 안의 성인/어린이 -버튼/+버튼 상태를 모두 갱신하는 함수
const updateCounterButtonsInRoom = (room) => {
    room?.querySelectorAll('.count-wrap').forEach(countWrap => {
        updateMinusButtonColor(countWrap);
        updatePlusButtonColor(countWrap);
    });
};

// 페이지 로드 시 기존 객실1의 -버튼/+버튼 상태도 초기화
roomList?.querySelectorAll('.addRoom').forEach(updateCounterButtonsInRoom);

[roomTrigger, adultTrigger, childTrigger].forEach(trigger => {
    if (trigger) {
        trigger.style.cursor = 'pointer'; // 마우스 커서 포인터 스타일 추가
        trigger.addEventListener('click', () => {
            openRoomPopup();
        });
    }
});

// 7. 호텔 선택완료 버튼 클릭 이벤트 (p태그 value/텍스트 반영 & 날짜 팝업 열기)
selectCompleteBtn?.addEventListener("click", () => {
    closeAllPopups();            // 모든 팝업 일단 닫기
    if (datePop) {
        datePop.style.left = "300px"; // 날짜 팝업 left 위치 지정
        datePop.style.display = "flex"; // 날짜 팝업만 열기
    }
});
selectCompleteBtn?.addEventListener("click", () => {
    closeAllPopups();
    targetP?.classList.add('is-selected'); // ← 추가
    if (datePop) {
        datePop.style.left = "300px";
        datePop.style.display = "flex";
    }
});


// 8. 날짜 선택 팝업 선택완료 버튼 클릭 이벤트 (날짜 팝업 닫기 & 객실 팝업 열기)
dateSelectBtn?.addEventListener("click", () => {
    openRoomPopup(); // openRoomPopup 함수 내부에서 closeAllPopups()를 호출해 자동 교체됨
});
dateSelectBtn?.addEventListener("click", () => {
    document.querySelector('.re-data.select-date')?.classList.add('is-selected'); // ← 추가
    openRoomPopup();
});

// 9. 객실추가/삭제 토글 버튼 (버튼 하나가 상태에 따라 '+ 객실추가' ↔ '- 객실삭제'로 전환)
addRoomBtn?.addEventListener('click', () => {
    if (roomCount === 1) {
        // ------- 객실 추가 -------
        if (!roomTemplate) return;

        roomCount++;

        const newRoom = roomTemplate.cloneNode(true);
        newRoom.querySelector('p').textContent = `객실${roomCount}`;

        const counts = newRoom.querySelectorAll('.count-wrap span');
        if (counts[0]) counts[0].textContent = '2';
        if (counts[1]) counts[1].textContent = '0';

        roomList.prepend(newRoom);
        roomPopup?.classList.add('is-expanded');

        updateCounterButtonsInRoom(newRoom);

        addRoomBtn.textContent = '객실삭제';
        addRoomBtn.classList.add('is-delete');

        if (roomCountDisplay) roomCountDisplay.textContent = roomCount;
        updateTotalGuestCounts();
    } else {
        // ------- 객실 삭제 -------
        const topRoom = roomList?.querySelector('.addRoom');
        topRoom?.remove();

        roomCount--;

        roomPopup?.classList.remove('is-expanded');

        addRoomBtn.textContent = '객실추가';
        addRoomBtn.classList.remove('is-delete');

        if (roomCountDisplay) roomCountDisplay.textContent = roomCount;
        updateTotalGuestCounts();
    }
});

// 10. 객실별 성인/어린이 인원수 +/- 버튼
roomList?.addEventListener('click', (e) => {
    const countBtn = e.target.closest('.count-wrap button');
    if (!countBtn) return;

    const countWrap = countBtn.closest('.count-wrap');
    const countSpan = countWrap.querySelector('span');
    let count = parseInt(countSpan.textContent, 10);

    const isChild = countWrap.parentElement.querySelector('strong')?.textContent.trim() === '어린이';
    const MIN_COUNT = isChild ? 0 : 1;
    const MAX_COUNT = 2;

    if (countBtn.textContent.trim() === '+') {
        if (count < MAX_COUNT) count++;
    } else {
        if (count > MIN_COUNT) count--;
    }

    countSpan.textContent = count;

    updateMinusButtonColor(countWrap);
    updatePlusButtonColor(countWrap);
    updateTotalGuestCounts();
});

// 11. 예약하기 버튼 클릭 이벤트
bookBtn?.addEventListener('click', () => {
    const rooms = [...(roomList?.querySelectorAll('.addRoom') ?? [])].map(room => {
        const groups = room.querySelectorAll('.item-list > div');
        return {
            객실: room.querySelector('p')?.textContent,
            성인: groups[0]?.querySelector('.count-wrap span')?.textContent,
            어린이: groups[1]?.querySelector('.count-wrap span')?.textContent
        };
    });

    const reservationInfo = {
        '호텔/리조트': targetA?.textContent,
        '호텔/리조트 값': targetP?.getAttribute('value'),
        '체크인/체크아웃': document.querySelector('.re-data.select-date a')?.textContent,
        '객실 수': roomCountDisplay?.textContent,
        '성인 총 인원': adultTotalDisplay?.textContent,
        '어린이 총 인원': childTotalDisplay?.textContent,
        '객실별 인원': rooms,
        '프로모션코드': promoInput?.value
    };

    console.log('예약하기 클릭 - 선택된 값:', reservationInfo);

    
});