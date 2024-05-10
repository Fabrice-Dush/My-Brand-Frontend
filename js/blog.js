import { createTemplateBlog, localUrl, renderSpinner, url } from './utils.js';

//? DOM elements
const blogEl = document.querySelector('.blog-container');

const fetchBlog = async function () {
  try {
    //? render spinner
    renderSpinner(blogEl);

    const slug = location.hash.slice(1);
    const res = await fetch(`${url}api/blogs/${slug}`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.errors.message);
    const { data: blog } = data;
    const html = createTemplateBlog(blog);
    blogEl.insertAdjacentHTML('afterbegin', html);
  } catch (err) {
    blogEl.innerHTML = '';
    const html = `
      <div class="error-container">⛔ ${err.message}</div>
    `;
    blogEl.insertAdjacentHTML('beforeend', html);
  }
};
fetchBlog();
