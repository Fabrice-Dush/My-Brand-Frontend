const formContainer = document.querySelector('.form-container');
console.log(formContainer);

const createTemplateForm = function () {
  const blog = JSON.parse(localStorage.getItem('blog'));
  console.log(blog);
  const html = `
     <form
          action="http://localhost:8000/blogs/${blog.slug}"
          method="POST"
          class="form 
          form__edit-blog"
        >
          <div class="form__group">
            <label for="image" class="form__label">Image Url</label>
            <input
              type="text"
              name="image"
              id="image"
              value="${blog.image}"
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
    const title = this.title.value;
    const description = this.description.value;
    const longDescription = this.longDescription.value;
    const image = this.image.value;
    const url = this.getAttribute('action');
    const token = localStorage.getItem('jwt');
    if (!token) return location.assign('login.html');
    const res = await fetch(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', token },
      body: JSON.stringify({
        image,
        title,
        description,
        longDescription,
      }),
    });
    const data = await res.json();
    console.log(data);
    localStorage.setItem('href', data.url);
    location.assign('blog.html');
    // setTimeout(() => {
    // }, 1500);
    if (!res.ok) throw new Error(data.errors);
  } catch (err) {
    console.error('Error in editing blog: ', err);
  }
});
