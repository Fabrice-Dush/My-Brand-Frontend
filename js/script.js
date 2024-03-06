"use strict";

//? DOM Elements
const headerEl = document.querySelector(".header");
const menuBtn = document.querySelector(".menu__btn");
const yearEl = document.querySelector(".year");

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
