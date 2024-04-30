setTimeout(() => {
  const btnModify = document.querySelector('.btn--modify');
  console.log(btnModify);

  btnModify?.addEventListener('click', async function (event) {
    try {
      event.preventDefault();

      const url = this.getAttribute('href');
      console.log(url);
      const token = localStorage.getItem('jwt');
      if (!token) return location.assign('login.html');
      const res = await fetch(url);
      const blog = await res.json();
      if (!res.ok) throw new Error(blog.errors);

      const { data } = blog;
      localStorage.setItem('blog', JSON.stringify(data));
      location.assign('editBlogForm.html');
    } catch (err) {
      console.error('Error trying to edit a blog: ', err);
    }
  });
}, 2500);
