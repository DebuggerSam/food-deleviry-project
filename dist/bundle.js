/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((module) => {

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

module.exports = calc;

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((module) => {

function cards(){
    // Создаем карточки через классы

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
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
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

module.exports = cards;


// ---- Старая версия кода написанного выше
        /*new MenuCard(
          "img/tabs/vegy.jpg",
          "vegy",
          'Меню "Фитнес"',
          'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
          9,
          '.menu .container',
        ).render();

        new MenuCard(
          "img/tabs/elite.jpg",
          "elite",
          'Меню “Премиум”',
          'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
          21,
          '.menu .container',
        ).render();

        new MenuCard(
          "img/tabs/post.jpg",
          "post",
          'Меню "Постное"',
          'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
          16,
          '.menu .container',
        ).render();

 */

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((module) => {

function forms(){
    // Forms

    const forms = document.querySelectorAll('form');
    const message = {
        loading: 'img/loading/spinner.svg',
        succes: 'Спасибо! В ближайшее время мы вам перезвоним',
        failure: 'Что - то пошло не так(',

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


            // Отправляем данные на сервер

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
}

module.exports = forms;

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((module) => {

function modals(){
    // Modal window

    const modalTrigger = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal');

    modalTrigger.forEach(item => {
        item.addEventListener('click', openModal);
    })


    function openModal(){
        modal.classList.add('show');
        modal.classList.remove('hide')
        document.body.style.overflow = 'hidden'
        clearInterval(modalTmerId);
    }

    function closeModalWindow(){
        modal.classList.add('hide');
        modal.classList.remove('show')
        document.body.style.overflow = ''
    }


    modal.addEventListener('click', (event) => {
        // event.preventDefault();
        if(event.target === modal || event.target.getAttribute('data-close') === ''){
            closeModalWindow();
        }
    });

    document.addEventListener('keydown', (e) => {
        // e.preventDefault();
        if(e.code === 'Escape' && modal.classList.contains('show')){
            closeModalWindow();
        }
    });

    const modalTmerId = setTimeout(openModal, 600000);

    function showScrollModaWindow(){
        if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
            openModal();
            window.removeEventListener('scroll', showScrollModaWindow)
        }
    }

    window.addEventListener('scroll', showScrollModaWindow);




    function showThanksModal(message){
        const previousModalDialog = document.querySelector('.modal__dialog');
        previousModalDialog.classList.add('hide');
        openModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
      <div class="modal__content">
      <div class="modal__close">×</div>
      <div class="modal__title">${message}</div>
      </div>
    `
        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            previousModalDialog.classList.add('show');
            previousModalDialog.classList.remove('hide');
            closeModalWindow();

        }, 4000);
    }

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

module.exports = modals;

/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((module) => {

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

module.exports = slider;

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((module) => {

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

module.exports = tabs;

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((module) => {

function timer(){
    // This is us timer

    const deadline = '2022-01-30';

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

module.exports = timer();

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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*******************!*\
  !*** ./js/app.js ***!
  \*******************/
document.addEventListener('DOMContentLoaded', () => {
    const tabs = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js"),
          timer = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js"),
          slider = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js"),
          forms = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js"),
          modal = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js"),
          cards = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js"),
          calc = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");

    tabs();
    timer();
    slider();
    forms();
    modal();
    cards();
    calc();
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map