'use strict';

//? DOM Elements
const sectionContact = document.querySelector('.section-contact');
const contactForm = document.querySelector('.form__contact');
const contactFormFullName = document.querySelector(
  '.form__contact .form__fullname'
);
const contactFormEmail = document.querySelector('.form__contact .form__email');
const contactFormSubject = document.querySelector(
  '.form__contact .form__subject'
);
const contactFormMessage = document.querySelector(
  '.form__contact .form__textarea'
);

const successEl = document.querySelector('.success');

animateSection(sectionContact);

contactForm.addEventListener('submit', async function (event) {
  try {
    //? 0. preventing the page from reloading
    event.preventDefault();
    console.log('Clicked');

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
        'Please provide a valid email address'
      );
    } else removeEl(contactFormEmail.parentElement);

    //? 4. Validate fullname
    const fullNameTest = fullName.match(namePattern);
    if (!fullNameTest) {
      printError(
        contactFormFullName.parentElement,
        'Please provide a valid fullName'
      );
    } else removeEl(contactFormFullName.parentElement);

    //? 5. Validate subject
    const subjectTest = subject.match(subjectPattern);
    if (!subjectTest) {
      printError(
        contactFormSubject.parentElement,
        'Please provide a descriptive subject'
      );
    } else removeEl(contactFormSubject.parentElement);

    //? 6. Validate message
    const messageTest = message.match(messagePattern);
    if (!messageTest) {
      printError(
        contactFormMessage.parentElement,
        'Please provide a descriptive message'
      );
    } else removeEl(contactFormMessage.parentElement);

    if (messageTest && emailTest && fullNameTest && subjectTest) {
      console.log('Inside');
      const url = this.getAttribute('action');
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullname: fullName, email, subject, message }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.errors);

      //? display success message
      successEl.classList.remove('hidden');
      successEl.textContent = 'Your message was successfully sent';

      setTimeout(() => {
        successEl.classList.add('hidden');
      }, 1500);

      contactForm
        .querySelectorAll('.form__input')
        .forEach(input => (input.value = ''));
      contactFormMessage.value = '';
    }
  } catch (err) {
    console.error('Error contacting: ', err);
  }
});
