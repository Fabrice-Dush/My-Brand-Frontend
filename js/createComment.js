import { createTemplateComments } from './utils.js';

setTimeout(function () {
  const commentForm = document.querySelector('.form__comment');
  commentForm?.addEventListener('submit', async function (event) {
    try {
      event.preventDefault();
      const url = this.getAttribute('action');
      const token = localStorage.getItem('jwt');
      if (!token) return location.assign('login.html');
      const comment = this.comment.value;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', token },
        body: JSON.stringify({ comment }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.errors);

      //? Create html
      const { data: blog } = data;
      createTemplateComments(blog);

      //? clear input field
      this.comment.value = '';
    } catch (err) {
      console.error('Error commenting: ', err);
    }
  });
}, 3000);
