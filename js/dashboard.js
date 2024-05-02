import { renderSpinner } from './utils.js';

const aside = document.querySelector('.aside');
const usersContainer = document.querySelector('.tbody__users');
const blogsContainer = document.querySelector('.tbody__blogs');
const messagesContainer = document.querySelector('.tbody__messages');
const subscribersContainer = document.querySelector('.tbody__subscribers');
const asideContainers = [...document.querySelectorAll('.aside__container')];
const mainContainerEls = [...document.querySelectorAll('.main__container')];
const messagesSideContainer = document.querySelector(
  '.aside__container-messages'
);

const messagesEl = document.querySelector('.messages');
const asideContainerMessages = document.querySelector(
  '.aside__container-messages'
);

const removeClass = function () {
  mainContainerEls.forEach((el, i) => {
    const asideContainer = asideContainers[i];
    el.classList.add('hidden');
    asideContainer.classList.remove('active');
  });
};
removeClass();

const init = async function () {
  try {
    const token = localStorage.getItem('jwt');
    if (!token) return location.assign('login.html');

    const res = await fetch(
      // 'https://my-brand-backend-n8rt.onrender.com/api/contact',
      'http://localhost:8000/api/contact',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();
    if (!res.ok) throw new Error(data.errors);
    const { data: messages } = data;

    messagesContainer.innerHTML = '';
    messages.forEach(message => {
      const html = generateContentMessages(message);
      messagesContainer.insertAdjacentHTML('beforeend', html);
    });

    messagesEl.classList.remove('hidden');
    asideContainerMessages.classList.add('active');
  } catch (err) {
    console.log('Error: ', err);
  }
};

const generateContentUsers = function (user) {
  const html = ` 
      <tr>
        <td>${user.fullname.split(' ').at(0)}</td>
        <td>${user.fullname.split(' ')[1]}</td>
        <td>${user.email}</td>
        <td>
          <a
            href="http://localhost:8000/api/users/${user._id}"
            class="btn btn--small btn--delete delete__user"
            >Delete</a
          >
        </td>
      </tr>
          `;
  return html;
};
// const generateContentUsers = function (user) {
//   const html = `
//       <tr>
//         <td>${user.fullname.split(' ').at(0)}</td>
//         <td>${user.fullname.split(' ')[1]}</td>
//         <td>${user.email}</td>
//         <td>
//           <a
//             href="https://my-brand-backend-n8rt.onrender.com/api/users/${
//               user._id
//             }"
//             class="btn btn--small btn--delete delete__user"
//             >Delete</a
//           >
//         </td>
//       </tr>
//           `;
//   return html;
// };

const generateContentBlogs = function (blog, idx) {
  const html = `
        <tr>
          <td>${idx + 1}</td>
          <td>${blog.title}</td>
          <td>
            <a
              href="http://localhost:8000/api/blogs/${blog.slug}"
              class="btn btn--small btn--delete delete__blog"
              >Delete</a
            >
          </td>
        </tr>
      `;
  return html;
};
// const generateContentBlogs = function (blog, idx) {
//   const html = `
//         <tr>
//           <td>${idx + 1}</td>
//           <td>${blog.title}</td>
//           <td>
//             <a
//               href="https://my-brand-backend-n8rt.onrender.com/api/blogs/${
//                 blog.slug
//               }"
//               class="btn btn--small btn--delete delete__blog"
//               >Delete</a
//             >
//           </td>
//         </tr>
//       `;
//   return html;
// };

const generateContentMessages = function (message) {
  const html = `
        <tr>
          <td>${message.fullname.split(' ').at(0)}</td>
          <td>${message.email}</td>
          <td>${message.subject}</td>
          <td>
            <a
              href="http://localhost:8000/api/contact/${message._id}"
              class="btn btn--small btn--delete delete__message"
              >Delete</a
            >
          </td>
        </tr>
      `;
  return html;
};
// const generateContentMessages = function (message) {
//   const html = `
//         <tr>
//           <td>${message.fullname.split(' ').at(0)}</td>
//           <td>${message.email}</td>
//           <td>${message.subject}</td>
//           <td>
//             <a
//               href="https://my-brand-backend-n8rt.onrender.com/api/contact/${
//                 message._id
//               }"
//               class="btn btn--small btn--delete delete__message"
//               >Delete</a
//             >
//           </td>
//         </tr>
//       `;
//   return html;
// };

const generateContentSubscribers = function (subscriber, idx) {
  const html = `
      <tr>
        <td>${idx + 1}</td>
        <td>${subscriber.email}</td>
        <td>
          <a
            href="http://localhost:8000/api/subscribe/${subscriber._id}"
            class="btn btn--small btn--delete delete__subscriber"
            >Delete</a
          >
        </td>
      </tr>  
    `;

  return html;
};
// const generateContentSubscribers = function (subscriber, idx) {
//   const html = `
//       <tr>
//         <td>${idx + 1}</td>
//         <td>${subscriber.email}</td>
//         <td>
//           <a
//             href="https://my-brand-backend-n8rt.onrender.com/api/subscribe/${
//               subscriber._id
//             }"
//             class="btn btn--small btn--delete delete__subscriber"
//             >Delete</a
//           >
//         </td>
//       </tr>
//     `;

//   return html;
// };

aside.addEventListener('click', async function (event) {
  try {
    event.preventDefault();

    const token = localStorage.getItem('jwt');
    if (!token) return location.assign('login.html');

    const el = event.target.closest('.users__link');
    if (!el) return;

    const url = el.getAttribute('href');
    console.log(url);

    const id = el.dataset.id;
    removeClass();
    el.parentElement.classList.add('active');
    document
      .querySelector(`.main__container--${id}`)
      .classList.remove('hidden');

    //? render spinner
    renderSpinner(usersContainer);

    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.errors);

    const { data: users } = data;

    usersContainer.innerHTML = '';
    users.forEach(user => {
      const html = generateContentUsers(user);

      usersContainer.insertAdjacentHTML('beforeend', html);
    });
  } catch (err) {
    console.error('Error getting users: ', err);
  }
});

aside.addEventListener('click', async function (event) {
  try {
    event.preventDefault();

    const token = localStorage.getItem('jwt');
    if (!token) return location.assign('login.html');

    const el = event.target.closest('.blogs__link');
    if (!el) return;

    const url = el.getAttribute('href');

    removeClass();
    el.parentElement.classList.add('active');
    const id = el.dataset.id;
    document
      .querySelector(`.main__container--${id}`)
      .classList.remove('hidden');

    //? render spinner
    renderSpinner(blogsContainer);

    const res = await fetch(url, {
      method: 'GET',
      headers: { authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.errors);
    const { data: blogs } = data;

    blogsContainer.innerHTML = '';
    blogs.forEach((blog, idx) => {
      const html = generateContentBlogs(blog, idx);
      blogsContainer.insertAdjacentHTML('beforeend', html);
    });
  } catch (err) {
    console.error('Error getting blogs: ', err);
  }
});

aside.addEventListener('click', async function (event) {
  try {
    event.preventDefault();

    const token = localStorage.getItem('jwt');
    if (!token) return location.assign('login.html');

    const el = event.target.closest('.messages__link');
    if (!el) return;

    const url = el.getAttribute('href');

    removeClass();
    el.parentElement.classList.add('active');
    const id = el.dataset.id;
    document
      .querySelector(`.main__container--${id}`)
      .classList.remove('hidden');

    //? render spinner
    renderSpinner(messagesContainer);

    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.errors);
    const { data: messages } = data;

    setTimeout(() => {
      messagesContainer.innerHTML = '';
      messages.forEach(message => {
        const html = generateContentMessages(message);
        messagesContainer.insertAdjacentHTML('beforeend', html);
      });
    }, 200);
  } catch (err) {
    console.error('Error messages: ', err);
  }
});

aside.addEventListener('click', async function (event) {
  try {
    event.preventDefault();

    const token = localStorage.getItem('jwt');
    if (!token) return location.assign('login.html');

    const el = event.target.closest('.subscribers__link');
    if (!el) return;

    const url = el.getAttribute('href');

    removeClass();
    el.parentElement.classList.add('active');
    const id = el.dataset.id;
    document
      .querySelector(`.main__container--${id}`)
      .classList.remove('hidden');

    //? render spinner
    renderSpinner(subscribersContainer);

    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.errors);
    const { data: subscribers } = data;

    subscribersContainer.innerHTML = '';
    subscribers.forEach((subscriber, idx) => {
      const html = generateContentSubscribers(subscriber, idx);
      subscribersContainer.insertAdjacentHTML('beforeend', html);
    });
  } catch (err) {
    console.error('Error messages: ', err);
  }
});

usersContainer.addEventListener('click', async function (event) {
  try {
    event.preventDefault();

    const token = localStorage.getItem('jwt');
    if (!token) return location.assign('login.html');

    const el = event.target.closest('.delete__user');
    if (!el) return;
    const url = el.getAttribute('href');

    const res = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.errors);
    const { data: users } = data;

    usersContainer.innerHTML = '';
    users.forEach(user => {
      const html = generateContentUsers(user);

      usersContainer.insertAdjacentHTML('beforeend', html);
    });
  } catch (err) {
    console.error('Error: ', err);
  }
});

blogsContainer.addEventListener('click', async function (event) {
  try {
    event.preventDefault();
    const token = localStorage.getItem('jwt');
    if (!token) return location.assign('login.html');
    const el = event.target.closest('.delete__blog');
    if (!el) return;
    const url = el.getAttribute('href');

    const res = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.errors);
    const { data: blogs } = data;

    blogsContainer.innerHTML = '';
    blogs.forEach((blog, idx) => {
      const html = generateContentBlogs(blog, idx);
      blogsContainer.insertAdjacentHTML('beforeend', html);
    });
  } catch (err) {
    console.error('Error: ', err);
  }
});

const displayMessages = async function (url) {
  try {
    let token = localStorage.getItem('jwt');
    if (!token) return location.assign('login.html');

    const res = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.errors);
    const { data: messages } = data;

    messagesContainer.innerHTML = '';
    messages.forEach(message => {
      const html = generateContentMessages(message);
      messagesContainer.insertAdjacentHTML('beforeend', html);
    });
  } catch (err) {
    throw err;
  }
};

messagesContainer.addEventListener('click', async function (event) {
  try {
    event.preventDefault();
    const el = event.target.closest('.delete__message');
    if (!el) return;
    const url = el.getAttribute('href');
    displayMessages(url);
  } catch (err) {
    console.error('Error: ', err);
  }
});

subscribersContainer.addEventListener('click', async function (event) {
  try {
    event.preventDefault();
    const token = localStorage.getItem('jwt');
    if (!token) return location.assign('login.html');
    const el = event.target.closest('.delete__subscriber');
    if (!el) return;
    const url = el.getAttribute('href');

    //? render spinner
    renderSpinner(subscribersContainer);

    const res = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.errors);
    const { data: subscribers } = data;

    subscribersContainer.innerHTML = '';
    subscribers.forEach((subscriber, idx) => {
      const html = generateContentSubscribers(subscriber, idx);
      subscribersContainer.insertAdjacentHTML('beforeend', html);
    });
  } catch (err) {
    console.error('Error: ', err);
  }
});

init();
