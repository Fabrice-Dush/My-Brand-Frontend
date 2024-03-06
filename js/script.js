"use strict";

const headerEl = document.querySelector(".header");
const menuBtn = document.querySelector(".menu__btn");

const toggleClass = function () {
  headerEl.classList.toggle("show");
};

menuBtn.addEventListener("click", toggleClass);
