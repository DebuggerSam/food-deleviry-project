import {openModal, closeModalWindow} from './modal';

function forms(modalTmerId){
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

    function showThanksModal(message){
        const previousModalDialog = document.querySelector('.modal__dialog');
        previousModalDialog.classList.add('hide');
        openModal('.modal', modalTmerId);

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
            closeModalWindow('.modal');

        }, 4000);
    }
}

export default  forms;