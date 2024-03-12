"use strict";

//? DOM Elements
const headerEl = document.querySelector(".header");
const menuBtn = document.querySelector(".menu__btn");
const yearEl = document.querySelector(".year");
const loginForm = document.querySelector(".form__login");
const signupForm = document.querySelector(".form__signup");
const signupFormEmail = document.querySelector(".form__signup .form__email");
const signupFormFullname = document.querySelector(
  ".form__signup .form__fullname"
);
const signupFormPassword = document.querySelector(
  ".form__signup .form__password"
);
const signupFormPasswordConfirm = document.querySelector(
  ".form__signup .form__password2"
);
const contactForm = document.querySelector(".form__contact");
const contactFormFullName = document.querySelector(
  ".form__contact .form__fullname"
);
const contactFormEmail = document.querySelector(".form__contact .form__email");
const contactFormSubject = document.querySelector(
  ".form__contact .form__subject"
);
const contactFormMessage = document.querySelector(
  ".form__contact .form__textarea"
);

//? Globals
const emailPattern = /\S+@\S+\.\S+/g;

//? Functions
const toggleClass = function () {
  headerEl.classList.toggle("show");
};
menuBtn.addEventListener("click", toggleClass);

const calcYear = function () {
  const year = new Date().getFullYear();
  yearEl.textContent = year;
};
calcYear();

//? Form validation
//? Contact form validation
const validateForms = function (condition, el, value) {
  if (!condition) {
    const html = `
    <div class="error">
    <ion-icon name="warning" class="error__icon"></ion-icon>
    <p class="error__message">
    ${value}
    </p>
    </div>
    `;
    !el.querySelector(".error") && el.insertAdjacentHTML("beforeend", html);
    return;
  } else el?.querySelector(".error")?.remove();
};

const isEmpty = (...values) => values.every((value) => value.trim());

contactForm?.addEventListener("submit", function (event) {
  //? preventing the page from reloading
  event.preventDefault();

  //? Get input values
  const [firstName, lastName, ...others] = contactFormFullName.value.split(" ");
  const email = contactFormEmail.value;
  const subject = contactFormSubject.value;
  const message = contactFormMessage.value;
  if (!isEmpty(email, subject, message, firstName, lastName))
    return alert("Form inputs should have value.");

  //? Validate email address
  validateForms(
    emailPattern.test(email),
    contactFormEmail.parentElement,
    "Please provide a valid email"
  );

  //? Validate email address
  validateForms(
    firstName?.length > 3 && lastName?.length > 3,
    contactFormFullName.parentElement,
    "Please provide a fullName"
  );

  //? Validate subject
  validateForms(
    subject.length > 10,
    contactFormSubject.parentElement,
    "Please provide a subject"
  );

  //? Validate message
  validateForms(
    message.length > 20,
    contactFormMessage.parentElement,
    "Please provide a descriptive message"
  );
});

//? Signup form validation
signupForm?.addEventListener("submit", function (event) {
  //? 1. Prevent the page from reloading
  event.preventDefault();

  //? 2. Get input values
  const email = signupFormEmail.value;
  const [firstName, lastName, ...others] = signupFormFullname.value.split(" ");
  const password = signupFormPassword.value;
  const passwordConfirm = signupFormPasswordConfirm.value;
  if (!isEmpty(email, password, passwordConfirm, firstName, lastName))
    return alert("Form inputs should have value.");

  //? Validate email address
  validateForms(
    emailPattern.test(email),
    signupFormEmail.parentElement,
    "Please provide a valid email"
  );

  //? Validate FullName
  validateForms(
    firstName?.length > 3 && lastName?.length > 3,
    signupFormFullname.parentElement,
    "Please provide a fullName"
  );

  //? Validate Password
  validateForms(
    password.length >= 6,
    signupFormPassword.parentElement,
    "Please provide a subject"
  );

  //? Validate Password confirmation
  validateForms(
    passwordConfirm,
    signupFormPasswordConfirm.parentElement,
    "Please confirm your password"
  );
});

//? Login form validation
const loginFormEmail = document.querySelector(".form__login .form__email");
const loginFormPassword = document.querySelector(
  ".form__login .form__password"
);
loginForm.addEventListener("submit", function (event) {
  //? 1. prevent page from reloading
  event.preventDefault();

  //? 2. Get input values
  const email = loginFormEmail.value;
  const password = loginFormPassword.value;

  if (!isEmpty(email, password)) return alert("Form inputs should have value.");

  //? Validate email address
  validateForms(
    emailPattern.test(email),
    loginFormEmail.parentElement,
    "Please provide a valid email"
  );

  //? Validate Password
  validateForms(
    password.length >= 6,
    loginFormPassword.parentElement,
    "Please enter your password"
  );
});
