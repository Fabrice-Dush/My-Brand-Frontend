const header = document.querySelector(".header");
const aboutEl = document.querySelector(".aboutEl");

const aboutElObserver = new IntersectionObserver(
  function ([entry]) {
    console.log(entry);
  },
  {
    root: null,
    threshold: 0,
  }
);

aboutElObserver.observe(aboutEl);
