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

export default  modals;
export {openModal, closeModalWindow};