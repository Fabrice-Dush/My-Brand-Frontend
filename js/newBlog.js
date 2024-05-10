import { localUrl, renderSpinner } from './utils.js';

const successEl = document.querySelector('.success');
const errorEl = document.querySelector('.error-container');
const form = document.querySelector('.form__new-blog');

form.addEventListener('submit', async function (event) {
  try {
    event.preventDefault();

    const token = localStorage.getItem('jwt');
    if (!token) return location.assign('login.html');

    const image = this.image.files[0];
    const title = this.title.value;
    const description = this.description.value;
    const longDescription = this.longDescription.value;

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('longDescription', longDescription);
    formData.append('image', image);

    //? render spinner
    renderSpinner(this);

    const res = await fetch(`${url}api/blogs`, {
      method: 'POST',
      headers: { authorization: `Bearer ${token}` },
      body: formData,
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.errors);

    successEl.classList.remove('hidden');
    successEl.textContent = 'Successfully created a new blog post 😎😎😎';

    setTimeout(() => {
      location.assign('blogs.html');
    }, 1500);
  } catch (err) {
    console.error('Error creating new blog: ', err);
    errorEl.classList.remove('hidden');
    errorEl.textContent =
      'There is an error creating a new blog. Try again later :)';
  }
});
