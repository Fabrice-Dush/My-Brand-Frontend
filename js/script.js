"use strict";

//? DOM Elements
const showEl = document.querySelector(".show-container");
const contactEl = document.querySelector(".contact");
const headerEl = document.querySelector(".header");
const menuBtn = document.querySelector(".menu__btn");
const yearEl = document.querySelector(".year");
const loginForm = document.querySelector(".form__login");
const loginFormEmail = document.querySelector(".form__login .form__email");
const loginFormPassword = document.querySelector(
  ".form__login .form__password"
);
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
const passwordPattern = /([A-Z]+)([a-z]+)([0-9]+)([@#$&?]+)/g;
const namePattern = /(^[a-z\s]{10,}$)/gi;
const subjectPattern = /(^[a-z\W\s]{10,})/gi;
const messagePattern = /(^[a-z\W\s]{20,})/gi;
const emailPattern = /(^[a-z]{3,})([a-z0-9]*)@([a-z]{3,8})\.([a-z]{2,5}$)/g;
const loginData = [];
const contactData = [];
const signupData = [];

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
const printError = function (el, value) {
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
};

const printMessage = function (message) {
  const html = `
      <div class="message">
        <p class="message__text">${message} 😎😎</p>
      </div>`;
  !document.body.querySelector(".message") &&
    document.body.insertAdjacentHTML("afterbegin", html);

  setTimeout(function () {
    document.body.querySelector(".message")?.remove();
  }, 3000);
};

const removeEl = function (el) {
  el?.querySelector(".error")?.remove();
};

contactForm?.addEventListener("submit", function (event) {
  //? 0. preventing the page from reloading
  event.preventDefault();

  //? 1. Get input values
  const fullName = contactFormFullName.value;
  const email = contactFormEmail.value;
  const subject = contactFormSubject.value;
  const message = contactFormMessage.value;

  //? 3. Validate email
  const emailTest = email.match(emailPattern);
  if (!emailTest) {
    printError(
      contactFormEmail.parentElement,
      "Please provide a valid email address"
    );
  } else removeEl(contactFormEmail.parentElement);

  //? 4. Validate fullname
  const fullNameTest = fullName.match(namePattern);
  if (!fullNameTest) {
    printError(
      contactFormFullName.parentElement,
      "Please provide a valid fullName"
    );
  } else removeEl(contactFormFullName.parentElement);

  //? 5. Validate subject
  const subjectTest = subject.match(subjectPattern);
  if (!subjectTest) {
    printError(
      contactFormSubject.parentElement,
      "Please provide a descriptive subject"
    );
  } else removeEl(contactFormSubject.parentElement);

  //? 6. Validate message
  const messageTest = message.match(messagePattern);
  if (!messageTest) {
    printError(
      contactFormMessage.parentElement,
      "Please provide a descriptive message"
    );
  } else removeEl(contactFormMessage.parentElement);

  //? 7. Display success message  && Create input fields
  if (messageTest && emailTest && fullName && subjectTest) {
    printMessage("Your message was successfully sent");
    contactForm
      .querySelectorAll(".form__input")
      .forEach((input) => (input.value = ""));
    contactFormMessage.value = "";

    //? Saving data
    contactData.push({ email, fullName, subject, message });
    localStorage.setItem("contactData", JSON.stringify(contactData));
  }
});

//? Signup form validation
signupForm?.addEventListener("submit", function (event) {
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
      "Please provide a valid email address"
    );
  } else removeEl(signupFormEmail.parentElement);

  //? 4.  Validate fullname
  const fullNameTest = fullName.match(namePattern);
  if (!fullNameTest) {
    printError(
      signupFormFullname.parentElement,
      "Please provide a valid fullName"
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

  //? 6. Validate Password confirmation
  // const passwordConfirmTest = passwordConfirm.length >= 6;
  // if (!passwordConfirmTest) {
  //   printError(
  //     signupFormPasswordConfirm.parentElement,
  //     "Password must be at least 6 characters long."
  //   );
  // } else removeEl(signupFormPasswordConfirm.parentElement);

  // const passwordConfirmTest2 = passwordConfirm.match(passwordPattern);
  // if (!passwordConfirmTest2) {
  //   printError(
  //     signupFormPasswordConfirm.parentElement,
  //     "Password Confirm must include at least one lowercase letter,\nuppercase, special character and number"
  //   );
  // } else removeEl(signupFormPasswordConfirm.parentElement);

  //? Test if passwords are the same
  const passwordTestFinal = password === passwordConfirm;
  if (!passwordTestFinal) {
    printError(
      signupFormPasswordConfirm.parentElement,
      "Password and Password Confirm must match"
    );
  } else removeEl(signupFormPasswordConfirm.parentElement);

  //? 7. Display success message  && Create input fields
  if (
    emailTest &&
    fullNameTest &&
    passwordTest &&
    passwordTest2 &&
    // passwordConfirmTest &&
    // passwordConfirmTest2 &&
    passwordTestFinal
  ) {
    printMessage("Your account was successfully created");
    signupForm
      .querySelectorAll(".form__input")
      .forEach((input) => (input.value = ""));

    //?Saving data
    signupData.push({
      email,
      fullName,
      password,
      passwordConfirm,
    });
    localStorage.setItem("signupData", JSON.stringify(signupData));
  }
});

//? Login form validation
loginForm?.addEventListener("submit", function (event) {
  //? 1. prevent page from reloading
  event.preventDefault();

  //? 2. Get input values
  const email = loginFormEmail.value;
  const password = loginFormPassword.value;

  //? 3. Validate email
  const emailTest = email.match(emailPattern);
  if (!emailTest) {
    printError(
      loginFormEmail.parentElement,
      "Please provide a valid email address"
    );
  } else removeEl(loginFormEmail.parentElement);

  //? 4. Validate password

  const passwordTest = password.length >= 6;
  if (!passwordTest) {
    printError(
      loginFormPassword.parentElement,
      "Password must be at least 6 characters long"
    );
  } else removeEl(loginFormPassword.parentElement);

  const passwordTest2 = password.match(passwordPattern);
  if (!passwordTest2) {
    printError(
      loginFormPassword.parentElement,
      `Password must include at least one lowercase letter,\nuppercase letter, special character and number`
    );
  } else removeEl(loginFormPassword.parentElement);

  //? 5. Display success message  && Create input fields
  if (emailTest && passwordTest && passwordTest2) {
    printMessage("You're logged in. You will soon be redirected");
    loginForm
      .querySelectorAll(".form__input")
      .forEach((input) => (input.value = ""));

    //? Saving data
    loginData.push({ email, password });
    localStorage.setItem("loginData", JSON.stringify(loginData));
  }
});

//? Show password
let shown = false;
const showPassword = function (event) {
  const el = event.target.closest(".show-container");
  if (!el || !el.previousElementSibling.value.trim()) return;
  if (!shown) {
    el.previousElementSibling.setAttribute("type", "text");
    el.classList.remove("visible");
  } else {
    el.previousElementSibling.setAttribute("type", "password");
    el.classList.add("visible");
  }
  shown = !shown;
};

[signupForm, loginForm].forEach((form) => {
  form?.addEventListener("click", showPassword);
});
