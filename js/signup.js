'use strict';

const signupForm = document.querySelector('.form__signup');
const signupFormEmail = document.querySelector('.form__signup .form__email');
const signupFormFullname = document.querySelector(
  '.form__signup .form__fullname'
);
const signupFormPassword = document.querySelector(
  '.form__signup .form__password'
);
const signupFormPasswordConfirm = document.querySelector(
  '.form__signup .form__password2'
);
const successEl = document.querySelector('.success');

//? Signup form validation
signupForm.addEventListener('submit', async function (event) {
  try {
    //? 1. Prevent the page from reloading
    event.preventDefault();

    //? 2. Get input values
    const email = signupFormEmail.value;
    const fullName = signupFormFullname.value;
    const password = signupFormPassword.value;
    const passwordConfirm = signupFormPasswordConfirm.value;

    //? 3. Validate email
    const emailTest = email.match(emailPattern);
    if (!emailTest) {
      printError(
        signupFormEmail.parentElement,
        'Please provide a valid email address'
      );
    } else removeEl(signupFormEmail.parentElement);

    //? 4.  Validate fullname
    const fullNameTest = fullName.match(namePattern);
    if (!fullNameTest) {
      printError(
        signupFormFullname.parentElement,
        'Please provide a valid fullName'
      );
    } else removeEl(signupFormFullname.parentElement);

    //? 5. Validate password
    const passwordTest = password.length >= 6;
    if (!passwordTest) {
      printError(
        signupFormPassword.parentElement,
        `Password must be at least 6 characters long.`
      );
    } else removeEl(signupFormPassword.parentElement);

    const passwordTest2 = password.match(passwordPattern);
    if (!passwordTest2) {
      printError(
        signupFormPassword.parentElement,
        `Password must include at least one lowercase letter,\nuppercase letter, special character and number`
      );
    } else removeEl(signupFormPassword.parentElement);

    //? Test if passwords are the same
    const passwordTestFinal = password === passwordConfirm;
    if (!passwordTestFinal) {
      printError(
        signupFormPasswordConfirm.parentElement,
        'Password and Password Confirm must match'
      );
    } else removeEl(signupFormPasswordConfirm.parentElement);

    if (
      emailTest &&
      fullNameTest &&
      passwordTest &&
      passwordTest2 &&
      passwordTestFinal
    ) {
      const res = await fetch(`http://localhost:8000/api/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.errors.email);

      //? store token in localstorage
      const { data: user, token } = data;
      localStorage.setItem('jwt', token);
      localStorage.setItem('user', JSON.stringify(user));

      //? Print success message
      successEl.classList.remove('hidden');
      successEl.textContent = 'Your account was successfully created';

      setTimeout(() => {
        location.assign('blogs.html');
      }, 1500);

      //? Clear input fields
      signupForm
        .querySelectorAll('.form__input')
        .forEach(input => (input.value = ''));
    }
  } catch (err) {
    if (err.message.includes('Email already taken')) {
      return printError(signupFormEmail.parentElement, err.message);
    }
  }
});

//? Show password
let shown = false;
const showPassword = function (event) {
  const el = event.target.closest('.show-container');
  if (!el || !el.previousElementSibling.value.trim()) return;
  if (!shown) {
    el.previousElementSibling.setAttribute('type', 'text');
    el.classList.remove('visible');
  } else {
    el.previousElementSibling.setAttribute('type', 'password');
    el.classList.add('visible');
  }
  shown = !shown;
};
signupForm.addEventListener('click', showPassword);
