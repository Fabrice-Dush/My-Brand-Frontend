'use strict';

//? DOM Elements
const btnverify = document.querySelector('.btn--verify');
const verifyForm = document.querySelector('.form--verify');
const successEl = document.querySelector('.success');
const errorEl = document.querySelector('.error-container');

verifyForm.addEventListener('submit', async function (event) {
  try {
    event.preventDefault();

    btnverify.insertAdjacentHTML(
      'beforeend',
      `
  <div class="spinnerLogin"></div>
  `
    );

    //? Get values
    const otp = this.otp.value;

    const res = await fetch(
      'https://my-brand-backend-n8rt.onrender.com/api/verify',
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', otp },
      }
    );

    const data = await res.json();
    if (!res.ok) throw new Error(data.errors);

    const { data: user } = data;
    const page = user.role === 'admin' ? 'admin/dashboard.html' : 'blogs.html';
    const goToPage = localStorage.getItem('comingfrom');

    if (user.isVerified) {
      successEl.classList.remove('hidden');
      successEl.textContent = 'Your account is now verified';
    }

    this.querySelector('.spinnerLogin').remove();

    setTimeout(() => {
      successEl.classList.add('hidden');
      if (!goToPage) location.assign(page);
      else location.assign(goToPage);
    }, 1500);
  } catch (err) {
    this.querySelector('.spinnerLogin').remove();
    errorEl.classList.remove('hidden');
    errorEl.textContent = 'Your account verification failed';
    setTimeout(() => {
      errorEl.classList.add('hidden');
    }, 1500);
    console.log(err);
  }
});
