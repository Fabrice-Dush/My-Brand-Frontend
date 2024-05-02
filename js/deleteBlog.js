setTimeout(() => {
  const btnDelete = document.querySelector('.btn--delete-blog');
  btnDelete?.addEventListener('click', async function (event) {
    try {
      event.preventDefault();
      const url = this.getAttribute('href');

      const token = localStorage.getItem('jwt');
      if (!token) return location.assign('login.html');
      const res = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message: 'Delete a blog' }),
      });
      const data = await res.json();
      location.assign('blogs.html');
    } catch (err) {
      console.error('Error trying to delete blog: ', err);
    }
  });
}, 2500);
