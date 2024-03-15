"use strict";

//? DOM Elements
const showEl = document.querySelector(".show-container");
const headerEl = document.querySelector(".header");
const menuBtn = document.querySelector(".menu__btn");
const yearEl = document.querySelector(".year");

//? Globals
const namePattern = /(^[a-z\s]{10,}$)/gi;
const subjectPattern = /(^[a-z\W\s]{10,})/gi;
const messagePattern = /(^[a-z\W\s]{20,})/gi;
const emailPattern = /(^[a-z]{3,})([a-z0-9]*)@([a-z]{3,8})\.([a-z]{2,5}$)/g;
const passwordPattern = /([A-Z]+)([a-z]+)([0-9]+)([@#$&?]+)/g;
let loginData = [];
let signupData = [];
let contactData = [];

//? Functions
const toggleClass = function () {
  headerEl.classList.toggle("show");
};
menuBtn.addEventListener("click", toggleClass);

const calcYear = function () {
  const year = new Date().getFullYear();
  yearEl.textContent = year;
};
calcYear();

const printError = function (el, value) {
  const html = `
    <div class="error">
    <ion-icon name="warning" class="error__icon"></ion-icon>
    <p class="error__message">
    ${value}
    </p>
    </div>
    `;
  el?.classList?.add("move");
  !el.querySelector(".error") && el.insertAdjacentHTML("beforeend", html);
  return;
};

const printMessage = function (message, string) {
  const html = `
      <div class="message message__${string}">
        <p class="message__text">${message} ${
    string === "correct" ? "😎😎😎" : "😡😡😡"
  }</p>
      </div>`;
  !document.body.querySelector(".message") &&
    document.body.insertAdjacentHTML("afterbegin", html);

  setTimeout(function () {
    document.body.querySelector(".message")?.remove();
  }, 3000);
};

const removeEl = function (el) {
  el?.classList?.remove("move");
  el?.querySelector(".error")?.remove();
};
