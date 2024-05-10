import { createTemplateBlogs, localUrl, renderSpinner, url } from './utils.js';

//? DOM Elements
const btnNewBlog = document.querySelector('.blogs__new');

const blogsEl = document.querySelector('.blogs');

const fetchBlogs = async function () {
  try {
    //? render a spinner
    renderSpinner(blogsEl);

    const res = await fetch(`${url}api/blogs`);

    const data = await res.json();

    const { data: blogs } = data;

    blogsEl.innerHTML = '';
    blogs.forEach(blog => {
      const html = createTemplateBlogs(blog);
      blogsEl.insertAdjacentHTML('beforeend', html);
    });
  } catch (err) {
    console.error('Error fetching blogs: '.err);
  }
};
fetchBlogs();

blogsEl.addEventListener('click', function (event) {
  event.preventDefault();
  const blogEl = event.target.closest('.blog');
  if (!blogEl) return;

  const slug = blogEl.dataset.slug;
  location.href = `https://fabrice-dush.github.io/My-Brand-Frontend/blog.html#${slug}`;
});

btnNewBlog?.addEventListener('click', function (event) {
  event.preventDefault();

  const token = localStorage.getItem('jwt');
  if (!token) return location.assign('login.html');
  location.assign('newBlog.html');
});
