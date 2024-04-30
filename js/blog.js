import { createTemplateBlog, renderSpinner } from './utils.js';

//? DOM elements
const observedEl = document.querySelector('.observed');
const blogEl = document.querySelector('.blog-container');

const fetchBlog = async function () {
  try {
    //? render spinner
    renderSpinner(blogEl);

    const url = localStorage.getItem('href');
    console.log(url);
    const res = await fetch(url);
    const data = await res.json();
    if (!res.ok) throw new Error(data.errors);
    const { data: blog } = data;
    const html = createTemplateBlog(blog);
    blogEl.insertAdjacentHTML('afterbegin', html);
  } catch (err) {
    console.error('Error getting blog: ', err.stack);
  }
};
fetchBlog();
