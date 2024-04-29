import { createTemplateBlogs, renderSpinner } from './utils.js';

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
  console.log(link);
  localStorage.setItem('href', link);
  location.assign('blog.html');
});
