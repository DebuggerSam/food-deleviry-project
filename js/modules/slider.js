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

export default  slider;