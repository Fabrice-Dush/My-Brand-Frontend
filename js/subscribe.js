'use strict';

import { animateSection } from './script.js';

const sectionBlogs = document.querySelector('.section__blogs');
const subscriptionEl = document.querySelector('.subscription');
const btnSubscribe = document.querySelector('.subscribe__btn');
const subscribeForm = document.querySelector('.subscribe__form');
const subscribeField = document.querySelector('.subscribe__field');
const blogsEl = document.querySelector('.blogs');
const blogEl = document.querySelector('.blog');
const observedEl = document.querySelector('.observed');
const successEl = document.querySelector('.success');
const errorEl = document.querySelector('.error-container');

animateSection(sectionBlogs);

btnSubscribe.addEventListener('click', function () {
  subscriptionEl.classList.toggle('open');
});

//? subscribe form validation
subscribeForm.addEventListener('submit', async function (event) {
  try {
    //? 1. prevent page from reloading
    event.preventDefault();

    //? 2. Get input values
    const email = subscribeField.value;

    //? 3. Validate email
    const emailTest = email.match(emailPattern);
    if (!emailTest) {
      printError(
        subscribeField.parentElement,
        'Please provide a valid email address'
      );
    } else removeEl(subscribeField.parentElement);

    if (emailTest) {
      const url = this.getAttribute('action');
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      console.log(data.errors);
      if (!res.ok) throw new Error(data.errors);

      const { data: subscribers } = data;
      console.log(subscribers);

      successEl.classList.remove('hidden');
      successEl.textContent = "Great decision, you've successfully subscribed!";

      setTimeout(() => {
        successEl.classList.add('hidden');
      }, 3000);

      //? clear input field
      subscribeField.value = '';
    } else if (emailTest && subscribeData.some(user => user.email === email)) {
      printMessage('Hang in there! You already subscribed...', 'correct');
    }
  } catch (err) {
    errorEl.classList.remove('hidden');
    errorEl.textContent = 'You already subscribed';
    setTimeout(() => {
      errorEl.classList.add('hidden');
    }, 1500);
    console.log(err.code);
  }
});

//? Using intersectionObserver API
const observedElObserverCallback = function ([entry], observer) {
  if (entry.isIntersecting) {
    subscriptionEl.classList.remove('hidden');
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
// observedElObserver.observe(observedEl);
