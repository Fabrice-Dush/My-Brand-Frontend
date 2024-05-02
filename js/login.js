'use strict';

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
    //? 1. prevent page from reloading
    event.preventDefault();

    //? 2. Get input values
    const email = loginFormEmail.value;
    const password = loginFormPassword.value;

    //? 3. Validate email
    // const emailTest = email.match(emailPattern);
    // if (!emailTest) {
    //   printError(
    //     loginFormEmail.parentElement,
    //     'Please provide a valid email address'
    //   );
    // } else removeEl(loginFormEmail.parentElement);

    // //? 4. Validate password
    // const passwordTest = password.length >= 6;
    // if (!passwordTest) {
    //   printError(
    //     loginFormPassword.parentElement,
    //     'Password must be at least 6 characters long'
    //   );
    // } else removeEl(loginFormPassword.parentElement);

    // const passwordTest2 = password.match(passwordPattern);
    // if (!passwordTest2) {
    //   printError(
    //     loginFormPassword.parentElement,
    //     `Password must include at least one lowercase letter,\nuppercase letter, special character and number`
    //   );
    // } else removeEl(loginFormPassword.parentElement);

    // if (emailTest && passwordTest && passwordTest2) {
    const res = await fetch(
      //` https://my-brand-backend-n8rt.onrender.com/api/login`,
      `http://localhost:8000/api/login`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      }
    );
    const data = await res.json();
    if (!res.ok) throw new Error(data.errors);

    //? store token in localstorage
    const { data: user, token } = data;
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
    // }
  } catch (err) {
    errorEl.classList.remove('hidden');
    errorEl.textContent = 'Wrong Email or Password';
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
