import { renderSpinner } from './utils.js';

const formContainer = document.querySelector('.form-container');
console.log(formContainer);

const createTemplateForm = function () {
  const blog = JSON.parse(localStorage.getItem('blog'));
  const html = `
        <form
          action="http://localhost:8000/api/blogs/${blog.slug}"
          enctype="multipart/form-data" 
          class="form form__edit-blog"
        >
          <div class="form__group">
            <label for="image" class="form__label">Image Url</label>
             <input
              type="file"
              name="image"
              id="image"
              class="form__input blog__image"
              required
            />
          </div>
          <div class="form__group">
            <label for="title" class="form__label">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              value="${blog.title}"
              class="form__input blog__title"
              required
            />
          </div>
          <div class="form__group">
            <label for="title" class="form__label">Description</label>
            <textarea
              name="description"
              id="description"
              class="form__input blog__description"
              cols="30"
              rows="3"
              required
            >
${blog.description}</textarea
            >
          </div>
          <div class="form__group">
            <label for="longDescription" class="form__label"
              >Detailed Description</label
            >
            <textarea
              name="longDescription"
              id="longDescription"
              class="form__input blog__description"
              cols="30"
              rows="5"
              required
            >
${blog.longDescription}</textarea
            >
          </div>
          <button class="btn btn--big btn--full btn--login">Update Blog</button>
        </form>
  `;

  formContainer.insertAdjacentHTML('beforeend', html);
};
createTemplateForm();
const editForm = document.querySelector('.form__edit-blog');
console.log(editForm.getAttribute('action'));

editForm?.addEventListener('submit', async function (event) {
  try {
    event.preventDefault();
    const url = this.getAttribute('action');
    if (!url) return location.assign('blogs.html');
    const token = localStorage.getItem('jwt');
    if (!token) return location.assign('login.html');

    const formData = new FormData(this);

    //? render spinner
    renderSpinner(this);

    const res = await fetch(url, {
      method: 'PUT',
      headers: { token },
      body: formData,
    });
    const data = await res.json();
    localStorage.setItem('href', data.url);
    location.assign('blog.html');
    if (!res.ok) throw new Error(data.errors);
  } catch (err) {
    console.error('Error in editing blog: ', err);
  }
});
