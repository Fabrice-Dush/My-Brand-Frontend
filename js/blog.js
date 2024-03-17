"use strict";

const sectionBlogs = document.querySelector(".section__blogs");
const subscriptionEl = document.querySelector(".subscription");
const btnSubscribe = document.querySelector(".subscribe__btn");
const subscribeForm = document.querySelector(".subscribe__form");
const subscribeField = document.querySelector(".subscribe__field");
const blogsEl = document.querySelector(".blogs");
const observedEl = document.querySelector(".observed");

//? globals
let subscribeData = [];

animateSection(sectionBlogs);

btnSubscribe.addEventListener("click", function () {
  subscriptionEl.classList.toggle("open");
});

//? subscribe form validation
subscribeForm.addEventListener("submit", function (event) {
  //? 1. prevent page from reloading
  event.preventDefault();

  //? 1.5. Getting data from localStorage
  if (localStorage.getItem("subscribeData"))
    subscribeData = JSON.parse(localStorage.getItem("subscribeData"));

  //? 2. Get input values
  const email = subscribeField.value;

  //? 3. Validate email
  const emailTest = email.match(emailPattern);
  if (!emailTest) {
    printError(
      subscribeField.parentElement,
      "Please provide a valid email address"
    );
  } else removeEl(subscribeField.parentElement);

  if (emailTest && !subscribeData.some((user) => user.email === email)) {
    printMessage("Great decision, you've successfully subscribed!", "correct");

    //? Persisting data to localStorage
    subscribeData.push({ email });
    localStorage.setItem("subscribeData", JSON.stringify(subscribeData));

    //? Hide the form
    subscriptionEl.classList.toggle("open");

    //? clear input field
    subscribeField.value = "";
  } else if (emailTest && subscribeData.some((user) => user.email === email)) {
    printMessage("Hang in there! You already subscribed...", "correct");
  }
});

//? Using intersectionObserver API
const observedElObserverCallback = function ([entry], observer) {
  if (entry.isIntersecting) {
    subscriptionEl.classList.remove("hidden");
    observer.unobserve(entry.target);
  }
};

const observedElObserverOptions = {
  root: null,
  threshold: 1,
};

const observedElObserver = new IntersectionObserver(
  observedElObserverCallback,
  observedElObserverOptions
);
observedElObserver.observe(observedEl);
