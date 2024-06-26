'use strict';

//? DOM Elements
const showEl = document.querySelector('.show-container');
const headerEl = document.querySelector('.header');
const menuBtn = document.querySelector('.menu__btn');
const yearEl = document.querySelector('.year');

//? Globals
export const namePattern = /(^[a-z\s]{5,}$)/gi;
export const subjectPattern = /(^[a-z\W\s]{5,})/gi;
export const messagePattern = /(^[a-z\W\s]{10,})/gi;
export const emailPattern =
  /(^[a-z.]{3,})([a-z0-9]*)@([a-z]{3,8})\.([a-z]{2,5}$)/g;
export const passwordPattern = /([A-Z]+)([a-z]+)([@#$&?]+)([0-9]+)/g;

//? Functions
const toggleClass = function () {
  headerEl.classList.toggle('show');
};
menuBtn.addEventListener('click', toggleClass);

const calcYear = function () {
  const year = new Date().getFullYear();
  yearEl.textContent = year;
};
calcYear();

export const printError = function (el, value) {
  const html = `
    <div class="error">
    <ion-icon name="warning" class="error__icon"></ion-icon>
    <p class="error__message">
    ${value}
    </p>
    </div>
    `;
  el?.classList?.add('move', 'mistake');
  !el.querySelector('.error') && el.insertAdjacentHTML('beforeend', html);
  return;
};

export const printMessage = function (message, string) {
  const html = `
      <div class="message message__${string}">
        <p class="message__text">${message} ${
    string === 'correct' ? '😎😎😎' : '😡😡😡'
  }</p>
      </div>`;
  !document.body.querySelector('.message') &&
    document.body.insertAdjacentHTML('beforeend', html);

  setTimeout(function () {
    document.body.querySelector('.message')?.remove();
  }, 3000);
};

export const removeEl = function (el) {
  el?.classList?.remove('move', 'mistake');
  el?.querySelector('.error')?.remove();
};

//? Animating  ection
export const animateSection = function (section) {
  const sectionObserver = new IntersectionObserver(
    function ([entry], observer) {
      if (entry.isIntersecting) {
        entry.target.classList.remove('down');
        observer.unobserve(entry.target);
      }
    },
    {
      root: null,
      threshold: 0.2,
    }
  );

  sectionObserver.observe(section);
};
