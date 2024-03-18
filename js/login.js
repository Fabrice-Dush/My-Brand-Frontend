"use strict";

const loginForm = document.querySelector(".form__login");
const loginFormEmail = document.querySelector(".form__login .form__email");
const loginFormPassword = document.querySelector(
  ".form__login .form__password"
);

//? Login form validation
loginForm.addEventListener("submit", function (event) {
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

  //? 5. Display success message
  if (emailTest && passwordTest && passwordTest2) {
    //? Get data from localstorage
    const signupData = JSON.parse(localStorage.getItem("signupData"));

    //? Authentication
    if (
      signupData?.length === 0 ||
      !signupData?.some((user) => user.email === email)
    ) {
      return printMessage("You don't have an account yet", "incorrect");
    }

    //prettier-ignore
    if (!signupData?.some((user) => user.email === email && user.password === password)) {
      return printMessage("Wrong email or password", "incorrect");
    } else printMessage("You're logged in. You will soon be redirected", "correct");

    //? Clear input fields
    loginForm
      .querySelectorAll(".form__input")
      .forEach((input) => (input.value = ""));
  }
});

//? Show password
let shown = false;
const showPassword = function (event) {
  const el = event.target.closest(".show-container");
  if (!el || !el.previousElementSibling?.value?.trim()) return;
  if (!shown) {
    el.previousElementSibling.setAttribute("type", "text");
    el.classList.remove("visible");
  } else {
    el.previousElementSibling.setAttribute("type", "password");
    el.classList.add("visible");
  }
  shown = !shown;
};
loginForm.addEventListener("click", showPassword);
