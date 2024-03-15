"use strict";

//? DOM Elements
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

contactForm.addEventListener("submit", function (event) {
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

  //? 7. Display success message  && Clear input fields
  if (messageTest && emailTest && fullNameTest && subjectTest) {
    printMessage("Your message was successfully sent", "correct");
    contactForm
      .querySelectorAll(".form__input")
      .forEach((input) => (input.value = ""));
    contactFormMessage.value = "";

    //? Peristing data to localStorage
    contactData.push({ email, fullName, subject, message });
    localStorage.setItem("contactData", JSON.stringify(contactData));
  }
});
