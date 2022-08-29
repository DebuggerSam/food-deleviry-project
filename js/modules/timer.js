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

export default timer;