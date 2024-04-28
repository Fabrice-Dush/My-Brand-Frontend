const form = document.querySelector('.form__new-blog');

form.addEventListener('submit', async function (event) {
  try {
    event.preventDefault();

    const token = localStorage.getItem('jwt');
    if (!token) return location.assign('login.html');

    const image = form.image.value;
    const title = form.title.value;
    const description = form.description.value;
    const longDescription = form.longDescription.value;

    const url = this.getAttribute('action').slice(1);
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', token },
      body: JSON.stringify({
        image,
        title,
        description,
        longDescription,
      }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.errors);
    console.log(data);
    location.assign('blogs.html');
  } catch (err) {
    console.error('Error creating new blog: ', err);
  }
});
