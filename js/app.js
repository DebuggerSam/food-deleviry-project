import tabs from './modules/tabs';
import timer from './modules/timer';
import slider from './modules/slider';
import forms from './modules/forms';
import modal from './modules/modal';
import cards from './modules/cards';
import calc from './modules/calc';
import openModal from './modules/modal';

document.addEventListener('DOMContentLoaded', () => {
    const modalTmerId = setTimeout(() => openModal('.modal', modalTmerId), 600000);


    tabs();
    timer('.timer', '2022-03-30');
    slider();
    forms(modalTmerId);
    modal('[data-modal]', '.modal', modalTmerId);
    cards();
    calc();
});
