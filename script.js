const headerEl = document.querySelector(".header");
const heroEl = document.querySelector(".hero");
const menuBtn = document.querySelector(".menu__btn");
const sectionHero = document.querySelector(".section__hero");

menuBtn.addEventListener("click", function () {
  headerEl.classList.toggle("show");
});

document.body.addEventListener("click", function (event) {
  event.preventDefault();
  const id = event.target.getAttribute("href");
  if (!id || id.length <= 1) return;
  headerEl.classList.remove("show");
  document.querySelector(id).scrollIntoView({ behavior: "smooth" });
});

const heroObserver = new IntersectionObserver(
  function ([entry]) {
    if (!entry.isIntersecting) {
      sectionHero.classList.add("sticky");
    } else sectionHero.classList.remove("sticky");
  },
  {
    root: null,
    threshold: 0,
    rootMargin: "-100px",
  }
);

heroObserver.observe(heroEl);
