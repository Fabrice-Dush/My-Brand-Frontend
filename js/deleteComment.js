import { createTemplateComments } from './utils.js';
const blogEl = document.querySelector('.blog');

setTimeout(() => {
  const commentContainer = document.querySelector('.comments');
  commentContainer?.addEventListener('click', async function (event) {
    try {
      event.preventDefault();
      const token = localStorage.getItem('jwt');
      if (!token) return location.assign('login.html');
      const el = event.target.closest('.btn--delete-comment');
      if (!el) return;
      const url = el.getAttribute('href');

      const res = await fetch(url, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', token },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.errors);

      //? Create html
      const { data: blog } = data;
      createTemplateComments(blog);
    } catch (err) {
      console.error('Error deleting a comment: ', err);
    }
  });
}, 1000);
