const headerEl = document.querySelector(".header");
const menuBtn = document.querySelector(".menu__btn");

menuBtn.addEventListener("click", function () {
  headerEl.classList.toggle("show");
});
