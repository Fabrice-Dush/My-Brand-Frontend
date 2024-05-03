import { createTemplateBlogs, renderSpinner } from './utils.js';

//? DOM Elements
const btnNewBlog = document.querySelector('.blogs__new');

const blogsEl = document.querySelector('.blogs');

const fetchBlogs = async function () {
  try {
    //? render a spinner
    renderSpinner(blogsEl);

    const res = await fetch(
      `https://my-brand-backend-n8rt.onrender.com/api/blogs`
    );

    const data = await res.json();

    const { data: blogs } = data;
    console.log();

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

  const link = blogEl.querySelector('.blog__link').getAttribute('href');
  location.href = `http://127.0.0.1:5500/blog.html#${link.slice(53)}`;
  // location.href = `https://fabrice-dush.github.io/My-Brand-Frontend/blog.html#${link.slice(
  //   53
  // )}`;
});

console.log(btnNewBlog);
btnNewBlog?.addEventListener('click', function (event) {
  event.preventDefault();

  const token = localStorage.getItem('jwt');
  if (!token) return location.assign('login.html');
  location.assign('newBlog.html');
});
