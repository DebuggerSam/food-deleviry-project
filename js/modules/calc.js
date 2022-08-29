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

export default  calc;