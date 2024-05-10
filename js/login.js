'use strict';

import { localUrl, url } from './utils.js';

const loginBtn = document.querySelector('.btn--login');
const loginForm = document.querySelector('.form__login');
const loginFormEmail = document.querySelector('.form__login .form__email');
const loginFormPassword = document.querySelector(
  '.form__login .form__password'
);
const successEl = document.querySelector('.success');
const errorEl = document.querySelector('.error-container');

//? Login form validation
loginForm.addEventListener('submit', async function (event) {
  try {
    loginBtn.insertAdjacentHTML(
      'beforeend',
      `<div class="spinnerLogin"></div>`
    );
    //? 1. prevent page from reloading
    event.preventDefault();

    //? 2. Get input values
    const email = loginFormEmail.value;
    const password = loginFormPassword.value;
    const res = await fetch(` ${url}api/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.errors);

    this.querySelector('.spinnerLogin').remove();

    //? store token in localstorage
    const { data: user, token } = data;

    if (!user.isVerified) {
      errorEl.classList.remove('hidden');
      errorEl.textContent =
        'You need to verify your account before attempting to login';
      localStorage.setItem('comingfrom', 'login.html');
      setTimeout(() => {
        errorEl.classList.add('hidden');
        location.assign('verifyAccount.html');
      }, 1500);
      return;
    }

    localStorage.setItem('jwt', token);
    localStorage.setItem('user', JSON.stringify(user));

    //? Clear input fields
    loginForm
      .querySelectorAll('.form__input')
      .forEach(input => (input.value = ''));

    successEl.classList.remove('hidden');
    successEl.textContent = "You're now logged in. You will soon be redirected";

    setTimeout(() => {
      if (user?.role === 'admin') return location.assign('dashboard.html');
      location.assign('blogs.html');
    }, 1500);
  } catch (err) {
    errorEl.classList.remove('hidden');
    errorEl.textContent = 'Wrong Email or Password';
    this.querySelector('.spinnerLogin').remove();
    setTimeout(() => {
      errorEl.classList.add('hidden');
    }, 1500);
  }
});

//? Show password
let shown = false;
const showPassword = function (event) {
  const el = event.target.closest('.show-container');
  if (!el || !el.previousElementSibling?.value?.trim()) return;
  if (!shown) {
    el.previousElementSibling.setAttribute('type', 'text');
    el.classList.remove('visible');
  } else {
    el.previousElementSibling.setAttribute('type', 'password');
    el.classList.add('visible');
  }
  shown = !shown;
};
loginForm.addEventListener('click', showPassword);
