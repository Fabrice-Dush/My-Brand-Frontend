import { createTemplateLike } from './utils.js';

const blogEl = document.querySelector('.blog-container');

blogEl?.addEventListener('submit', async function (event) {
  try {
    event.preventDefault();

    const token = localStorage.getItem('jwt');
    if (!token) return location.assign('login.html');

    const el = event.target.closest('.form__like');
    if (!el) return;

    const url = el.getAttribute('action');
    console.log(url);
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', token },
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.errors);

    const { data: blog } = data;
    createTemplateLike(blog);
  } catch (err) {
    console.error('Error liking: ', err);
  }
});
