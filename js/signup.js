"use strict";

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

//? Signup form validation
signupForm.addEventListener("submit", function (event) {
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

  if (
    emailTest &&
    fullNameTest &&
    passwordTest &&
    passwordTest2 &&
    passwordTestFinal
  ) {
    //? Getting from localStorage data in localstorage
    const signupDataLocal = JSON.parse(localStorage.getItem("signupData"));
    if (signupDataLocal?.length > 0) signupData = [...signupDataLocal];

    //? Check if the user is attempting to enter email that is already in use
    if (
      signupData?.length > 0 &&
      signupData.some((user) => user.email === email)
    )
      return printMessage("Email already taken", "incorrect");

    //? Print success message
    printMessage("Your account was successfully created", "correct");

    //? Clear input fields
    signupForm
      .querySelectorAll(".form__input")
      .forEach((input) => (input.value = ""));

    //? Saving data into an array
    signupData.push({
      email,
      fullName,
      password,
      passwordConfirm,
    });

    //?Peristing data in localstorage
    localStorage.setItem("signupData", JSON.stringify(signupData));
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
signupForm.addEventListener("click", showPassword);
