/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc(){
    const calculator_result = document.querySelector('.calculating__result span');
    const res = document.querySelector('.calculating__result');

    let gender, height, weight, age, ratio;

    if(localStorage.getItem('gender')){
        gender = localStorage.getItem('gender')
    }else{
        gender = 'female';
        localStorage.setItem('gender', 'female');
    }

    if(localStorage.getItem('ratio')){
        ratio = localStorage.getItem('ratio')
    }else{
        ratio = 1.375;
        localStorage.setItem('ratio', `${1.375}`);
    }


    function initLocalSettings(selector, activeClass){
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.classList.remove(activeClass);
            if(elem.getAttribute('id') === localStorage.getItem('gender')){
                elem.classList.add(activeClass);
            }

            if(elem.getAttribute('data-ratio') === localStorage.getItem('ratio')){
                elem.classList.add(activeClass);
            }
        })
    }

    initLocalSettings('#gender div', 'calculating__choose-item_active');
    initLocalSettings('.calculating__choose_big div','calculating__choose-item_active');

    function calcTotal(){
        if(!gender || !height || !weight || !age || !ratio){
            calculator_result.textContent = '___';
            return;
        }
        if(gender === 'female'){
            calculator_result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        }else{
            calculator_result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }


    function getStaticInformation(selector, activeClass){
        const elements = document.querySelectorAll(selector);

        elements.forEach(item => {
            item.addEventListener('click', e => {
                if(e.target.getAttribute('data-ratio')){
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
                }else{
                    gender = e.target.getAttribute('id');
                    localStorage.setItem('gender', e.target.getAttribute('id'));
                }

                elements.forEach(element => {
                    element.classList.remove(activeClass)
                })

                e.target.classList.add(activeClass);
                calcTotal();
            })
        })
    }
    getStaticInformation('#gender div', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big div','calculating__choose-item_active')

    function getDinamycInformation(selector){
        const input = document.querySelector(selector);


        input.addEventListener('input', () => {

            if(input.value.match(/\D/g)){
                input.style.border = '1px solid red';
            }else{
                input.style.border = 'none';
            }

            switch (input.getAttribute('id')) {
                case 'height':
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
            }
            calcTotal();
        })
    }

    getDinamycInformation('#height');
    getDinamycInformation('#weight');
    getDinamycInformation('#age');
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function cards(){
    // ?????????????? ???????????????? ?????????? ????????????

    class MenuCard{

        constructor(src, alt, title, descr, price, parentSelector){
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 75;
            this.changeToRub();
        }

        changeToRub(){
            this.price = +(this.price * this.transfer);
        }

        render(){
            const el = document.createElement('div');
            el.innerHTML = `<div class="menu__item">
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">????????:</div>
                        <div class="menu__item-total"><span>${this.price}</span> ??????/????????</div>
                    </div>
                </div>`;
            this.parent.append(el);
        }
    }

    const getResurses = async (url) => {
        const result = await fetch(url)

        if(!result.ok){
            throw new Error(`Could not fetch ${url}, status ${result.status}`);
        }

        return await result.json();
    };

    getResurses('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({img, altimg, title, descr, price}) => {
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
            });
        })
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);


// ---- ???????????? ???????????? ???????? ?????????????????????? ????????
        /*new MenuCard(
          "img/tabs/vegy.jpg",
          "vegy",
          '???????? "????????????"',
          '???????? "????????????" - ?????? ?????????? ???????????? ?? ?????????????????????????? ????????: ???????????? ???????????? ???????????? ?? ??????????????. ?????????????? ???????????????? ?? ???????????????? ??????????. ?????? ?????????????????? ?????????? ?????????????? ?? ?????????????????????? ?????????? ?? ?????????????? ??????????????????!',
          9,
          '.menu .container',
        ).render();

        new MenuCard(
          "img/tabs/elite.jpg",
          "elite",
          '???????? ????????????????????',
          '?? ???????? ???????????????????? ???? ???????????????????? ???? ???????????? ???????????????? ???????????? ????????????????, ???? ?? ???????????????????????? ???????????????????? ????????. ?????????????? ????????, ????????????????????????, ???????????? - ?????????????????????? ???????? ?????? ???????????? ?? ????????????????!',
          21,
          '.menu .container',
        ).render();

        new MenuCard(
          "img/tabs/post.jpg",
          "post",
          '???????? "??????????????"',
          '???????? ???????????????????? - ?????? ???????????????????? ???????????? ????????????????????????: ???????????? ???????????????????? ?????????????????? ?????????????????? ??????????????????????????, ???????????? ???? ??????????????, ????????, ???????????? ?????? ????????????, ???????????????????? ???????????????????? ???????????? ???? ???????? ???????? ?? ?????????????????? ???????????????????????????? ??????????????.',
          16,
          '.menu .container',
        ).render();

 */

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");


function forms(modalTmerId){
    // Forms

    const forms = document.querySelectorAll('form');
    const message = {
        loading: 'img/loading/spinner.svg',
        succes: '??????????????! ?? ?????????????????? ?????????? ???? ?????? ????????????????????',
        failure: '?????? - ???? ?????????? ???? ??????(',

    }

    forms.forEach(item => BindpostData(item));

    const postData = async (url, data) => {
        const result = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: data,
        });
        return await result.json();
    };

    function BindpostData(form){
        form.addEventListener('submit', (event) => {
            event.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
        display: block;
        margin: 0 auto; 
      `;
            form.insertAdjacentElement('afterend', statusMessage);


            // ???????????????????? ???????????? ???? ????????????

            const formData = new FormData(form);

            const obj = {};


            const json = JSON.stringify(Object.fromEntries((formData.entries())));


            postData('http://localhost:3000/requests', json)
                .then( data => {
                    console.log(data);
                    showThanksModal(message.succes);
                    form.reset();
                    statusMessage.remove();
                }).catch(() => {
                showThanksModal(message.failure);
            }).finally(() => {
                form.reset();
            })
        });
    }

    function showThanksModal(message){
        const previousModalDialog = document.querySelector('.modal__dialog');
        previousModalDialog.classList.add('hide');
        (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)('.modal', modalTmerId);

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
      <div class="modal__content">
      <div class="modal__close">??</div>
      <div class="modal__title">${message}</div>
      </div>
    `
        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            previousModalDialog.classList.add('show');
            previousModalDialog.classList.remove('hide');
            (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModalWindow)('.modal');

        }, 4000);
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "openModal": () => (/* binding */ openModal),
/* harmony export */   "closeModalWindow": () => (/* binding */ closeModalWindow)
/* harmony export */ });
function openModal(modalSelector, modalTmerId){
    const modal = document.querySelector(modalSelector);

    modal.classList.add('show');
    modal.classList.remove('hide')
    document.body.style.overflow = 'hidden'

    if(modalTmerId){
        clearInterval(modalTmerId);
    }
}

function closeModalWindow(modalSelector){
    const modal = document.querySelector(modalSelector);

    modal.classList.add('hide');
    modal.classList.remove('show')
    document.body.style.overflow = ''
}

function modals(triggerSelector, modalSelector, modalTmerId){
    // Modal window

    const modalTrigger = document.querySelectorAll(triggerSelector),
        modal = document.querySelector(modalSelector);

    modalTrigger.forEach(item => {
        item.addEventListener('click', () => openModal(modalSelector, modalTmerId));
    })



    modal.addEventListener('click', (event) => {
        // event.preventDefault();
        if(event.target === modal || event.target.getAttribute('data-close') === ''){
            closeModalWindow(modalSelector);
        }
    });

    document.addEventListener('keydown', (e) => {
        // e.preventDefault();
        if(e.code === 'Escape' && modal.classList.contains('show')){
            closeModalWindow(modalSelector);
        }
    });


    function showScrollModaWindow(){
        if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
            openModal(modalSelector, modalTmerId);
            window.removeEventListener('scroll', showScrollModaWindow)
        }
    }

    window.addEventListener('scroll', showScrollModaWindow);



    // fetch('https://jsonplaceholder.typicode.com/posts', {
    //   method: 'POST',
    //   body: JSON.stringify({name: 'John'}),
    //   headers: {
    //     'Content-type': 'application/json',
    //   }
    // })
    //     .then(responce => responce.json())
    //     .then(json => console.log(json));

    fetch('db.json').then(data => data.json()).then(responce => console.log(responce));

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modals);


/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider(){

    const slides = document.querySelectorAll('.offer__slide');
    const sliders = document.querySelector('.offer__slider')
    const prev = document.querySelector('.offer__slider-prev');
    const next = document.querySelector('.offer__slider-next');
    const total = document.querySelector('#total');
    const current = document.querySelector('#current');
    const wrapperSlider = document.querySelector('.offer__slider-wrapper');
    const innerSlider = document.querySelector('.offer_slider__inner');
    const computedWidth = window.getComputedStyle(wrapperSlider).width;
    let slidesIndex = 1;
    let offset = 0;


    if(slides.length < 10){
        total.textContent = `0${slides.length}`
        current.textContent = `0${slidesIndex}`
    }else{
        total.textContent = slides.length;
        current.textContent = slidesIndex;
    }

    innerSlider.style.width = 100 * slides.length + '%';
    innerSlider.style.display = 'flex';
    innerSlider.style.transition = '0.5s all';

    wrapperSlider.style.overflow = 'hidden';

    slides.forEach(item => {
        item.style.width = computedWidth;
    })

    sliders.style.position = 'relative';

    const dots = document.createElement('ol');
    const arrayDots = [];
    dots.classList.add('carousel_dots');
    dots.style.cssText = `
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 15;
    display: flex;
    justify-content: center;
    margin-right: 15%;
    margin-left: 15%;
    list-style: none;
  `;

    sliders.append(dots);

    for(let i = 0; i < slides.length; i++){
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = `
      box-sizing: content-box;
      flex: 0 1 auto;
      width: 30px;
      height: 6px;
      margin-right: 3px;
      margin-left: 3px;
      cursor: pointer;
      background-color: #fff;
      background-clip: padding-box;
      border-top: 10px solid transparent;
      border-bottom: 10px solid transparent;
      opacity: .5;
      transition: opacity .6s ease;
    `

        if(i === 0){
            dot.style.opacity = 1;
        }
        dots.append(dot);
        arrayDots.push(dot);
    }


    next.addEventListener('click', () => {
        if(offset === +computedWidth.slice(0, computedWidth.length - 2) * (slides.length -1) ){
            offset = 0;
        }else{
            offset += +computedWidth.slice(0, computedWidth.length - 2);
        }
        innerSlider.style.transform = `translateX(-${offset}px)`;

        if(slidesIndex === slides.length){
            slidesIndex = 1;
        }else{
            slidesIndex++
        }

        if(slides.length < 10){
            current.textContent = `0${slidesIndex}`
        }else{
            current.textContent = slidesIndex;
        }

        arrayDots.forEach(item => {
            item.style.opacity = '0.5';
        });

        arrayDots[slidesIndex - 1].style.opacity = 1;

    })


    prev.addEventListener('click', () => {
        if(offset === 0){
            offset = +computedWidth.slice(0, computedWidth.length - 2) * (slides.length -1);
        }else{
            offset -= +computedWidth.slice(0, computedWidth.length - 2);
        }
        innerSlider.style.transform = `translateX(-${offset}px)`;

        if(slidesIndex === 1){
            slidesIndex = slides.length;
        }else{
            slidesIndex--;
        }

        if(slides.length < 10){
            current.textContent = `0${slidesIndex}`
        }else{
            current.textContent = slidesIndex;
        }

        arrayDots.forEach(item => {
            item.style.opacity = '0.5';
        });

        arrayDots[slidesIndex - 1].style.opacity = 1;
    })
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs (){
    // This is switch tabs

    const tabs = document.querySelectorAll('.tabheader__item');
    const tabsContent = document.querySelectorAll('.tabcontent');
    const tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent(){
        tabsContent.forEach(tab => {
            tab.classList.add('hide')
            tab.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    };

    function showTabContent(i = 0){
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (e) => {
        e.preventDefault();
        const target = e.target;

        if(target && target.classList.contains('tabheader__item')){
            tabs.forEach((item, i) => {
                if(target === item){
                    hideTabContent();
                    showTabContent(i);
                }
            })
        }
    })
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer(id, deadline){
    // This is us timer


    function getTimeDead(endTime) {
        let time = Date.parse(endTime) - Date.parse(new Date());
        let days = Math.floor(time / (1000 * 60 * 60 * 24));
        let hours = Math.floor((time / (1000 * 60 * 60)) % 24);
        let minutes = Math.floor((time / 1000 / 60) % 60);
        let seconds = Math.floor((time / 1000) % 60);

        return {
            'total': time,
            'days' : days,
            'hours' : hours,
            'minutes' : minutes,
            'seconds' : seconds,
        }
    }

    function getZero(n){
        if(n >= 0 && n < 10){
            return `0 ${n}`;
        }else{
            return (n);
        }
        if (n <= 0){
            n.textContent = '';
        }
    }

    function setClock(selector, endTime){
        let timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timerInterval = setInterval(reloadTimer, 1000);

        reloadTimer();
        function reloadTimer(){
            let  clock = getTimeDead(endTime);

            days.textContent = getZero(clock.days);
            hours.textContent = getZero(clock.hours);
            minutes.textContent = getZero(clock.minutes);
            seconds.textContent = getZero(clock.seconds);

            if(clock.total <= 0 ){
                clearInterval(timerInterval);
            }
        }

    }

    setClock('.timer', deadline);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*******************!*\
  !*** ./js/app.js ***!
  \*******************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");









document.addEventListener('DOMContentLoaded', () => {
    const modalTmerId = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_4__["default"])('.modal', modalTmerId), 600000);


    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])();
    (0,_modules_timer__WEBPACK_IMPORTED_MODULE_1__["default"])('.timer', '2022-03-30');
    (0,_modules_slider__WEBPACK_IMPORTED_MODULE_2__["default"])();
    (0,_modules_forms__WEBPACK_IMPORTED_MODULE_3__["default"])(modalTmerId);
    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_4__["default"])('[data-modal]', '.modal', modalTmerId);
    (0,_modules_cards__WEBPACK_IMPORTED_MODULE_5__["default"])();
    (0,_modules_calc__WEBPACK_IMPORTED_MODULE_6__["default"])();
});

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map