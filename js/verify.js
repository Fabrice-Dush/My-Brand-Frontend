'use strict';

//? DOM Elements
const verifyForm = document.querySelector('.form--verify');
const successEl = document.querySelector('.success');
const errorEl = document.querySelector('.error-container');

verifyForm.addEventListener('submit', async function (event) {
  try {
    event.preventDefault();

    //? Get values
    const otp = this.otp.value;
    console.log(otp);

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
    if (user.isVerified) {
      console.log(user.isVerified);
      successEl.classList.remove('hidden');
      successEl.textContent = 'Your account is now verified';
    }

    setTimeout(() => {
      successEl.classList.add('hidden');
      location.assign(page);
    }, 1500);
  } catch (err) {
    errorEl.classList.remove('hidden');
    errorEl.textContent = 'Your account verification failed';
    setTimeout(() => {
      errorEl.classList.add('hidden');
    }, 1500);
    console.log(err);
  }
});
