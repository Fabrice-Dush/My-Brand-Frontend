const blogEl = document.querySelector('.blog-container');
const user = JSON.parse(localStorage.getItem('user'));

export const renderSpinner = function (el) {
  const html = `
  <div class="spinner"></div>
  `;
  el.innerHTML = '';
  el.insertAdjacentHTML('beforeend', html);
};

export const createTemplateComments = function (blog) {
  const commentsContainer = document.querySelector('.comments');
  commentsContainer.innerHTML = '';

  const commentNumber = document.querySelector('.comments__number');
  commentNumber.remove();

  commentsContainer.insertAdjacentHTML(
    'beforebegin',
    `<h2 class="comments__number">
        ${blog.comments.length} ${
      blog.comments.length <= 1 ? 'Comment' : 'Comments'
    }
      </h2>`
  );

  blog.comments.forEach(comment => {
    const html = `
    <div class="comment">
    <div class="comment--inner">
    <div class="box-user">
    ${comment.author.fullname
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()}
              </div>
              <p class="comment__user">${comment.author.fullname}</p>
              <p class="comment__text">${comment.text}</p>
              </div>
              ${
                user?._id === comment.author._id || user?.role === 'admin'
                  ? `<a
            href="http://localhost:8000/api/blogs/${blog.slug}/comments/${comment._id}"
            class="btn btn--small btn--delete btn--delete-comment"
            >
              Delete
              </a>`
                  : ''
              }
      </div>
      `;
    commentsContainer.insertAdjacentHTML('beforeend', html);
  });
};

const createTemplateComment = function (comment, blog) {
  const html = `
    <div class="comment">
      <div class="comment--inner">
          <div class="box-user">
            ${comment.author.fullname
              .split(' ')
              .map(word => word[0])
              .join('')
              .toUpperCase()}
              </div>
              <p class="comment__user">${comment.author.fullname}</p>
          <p class="comment__text">${comment.text}</p>
        </div>
        ${
          user?._id === comment.author._id || user?.role === 'admin'
            ? `<a
              href="http://localhost:8000/api/blogs/${blog.slug}/comments/${comment._id}"
              class="btn btn--small btn--delete btn--delete-comment"
            >
              Delete
              </a>`
            : ''
        }
      </div>
  `;
  return html;
};

export const createTemplateBlog = function (blog) {
  blogEl.innerHTML = '';
  const html = `
  <div class="container-button">
  ${
    user?._id === blog.author?._id || user?.role === 'admin'
      ? `<a href="http://localhost:8000/api/blogs/${blog.slug}" class="btn btn--modify"
          >Modify</a
        >
          <a href="http://localhost:8000/api/blogs/${blog.slug}" class="btn btn--delete btn--delete-blog">Delete</a>
          `
      : ''
  }
      </div>
      <h1 class="heading-primary blog__title">
      ${blog.title}
      </h1>
      <div class="box-author">
        <div class="box-user">${blog.author.fullname
          .split(' ')
          .map(word => word[0])
          .join('')
          .toUpperCase()}</div>
        <div class="blog__read__data-box">
          <p class="blog__author">By ${blog.author.fullname}</p>
          <div class="blog__inner">
            <p class="blog__date">${blog.date}</p>
            <p class="blog__read">${blog.readMinutes} min read</p>
          </div>
        </div>
      </div>
      <img src="${blog.image}" alt="${blog.title}" class="blog__img" />
      <p class="blog__description">
       ${blog.longDescription}
      </p>
      <div class="like-container">
        <form action="http://localhost:8000/api/blogs/${
          blog.slug
        }/likes" method="POST" class="form__like">
          <button class="btn-like like">
          ${
            blog.likes.some(like => like.owner?._id === user?._id)
              ? `<ion-icon name="heart"></ion-icon>`
              : `<ion-icon name="heart-outline"></ion-icon>`
          }
          </button>
        </form>
        <p class="like__number">${blog.likes.length}</p>
      </div>
      <form
        action="http://localhost:8000/api/blogs/${blog.slug}/comments"
        method="POST"
        class="form form__comment"
      >
        <div class="form__group">
          <label for="comment" class="form__label">Leave a comment</label>
          <textarea
            name="comment"
            id="comment"
            cols="30"
            rows="3"
            class="form__textarea"
            required
          ></textarea>
        </div>
        <button class="btn btn--comment">Comment</button>
        <button type="reset" class="btn btn--reset">Cancel</button>
      </form>
         <h2 class="comments__number"> ${blog.comments.length} ${
    blog.comments.length <= 1 ? 'Comment' : 'Comments'
  }</h2>
      <div class="comments">
    ${blog.comments.map(comment => createTemplateComment(comment, blog))}
      </div>
    `;
  return html;
};

export const createTemplateLike = function (blog) {
  const likeContainer = document.querySelector('.like-container');

  const html = `
  <form action="http://localhost:8000/api/blogs/${
    blog.slug
  }/likes" method="POST" class="form__like">
  <button class="btn-like like">
  ${
    blog.likes.some(like => like.owner?._id === user?._id)
      ? `<ion-icon name="heart"></ion-icon>`
      : `<ion-icon name="heart-outline"></ion-icon>`
  }
  </button>
  </form>
  <p class="like__number">${blog.likes.length}</p>
  `;

  likeContainer.innerHTML = '';
  likeContainer.insertAdjacentHTML('afterbegin', html);
};

export const createTemplateBlogs = function (blog) {
  const html = `
      <article class="blog">
    <img src="${blog.image}" alt="${blog?.title}" class="blog__img" />
    <div class="blog__content">
      <div class="blog__header">
        <p class="blog__date">${blog?.date}</p>
        <span class="dot"></span>
        <p class="blog__read">${blog.readMinutes} min read</p>
      </div>
      <p class="blog__title">
        <a href="http://localhost:8000/api/blogs/${
          blog.slug
        }" class="blog__link">
          ${blog.title}
        </a>
      </p>
      <p class="blog__text">
        ${blog.description}
      </p>
      <div class="blog__owner">
        <div class="box-user">
            ${
              blog.author?.fullname
                .split(' ')
                .map(word => word[0])
                .join('')
                .toUpperCase() || 'DF'
            }
        </div>
        <p class="blog__owner-name">${
          blog.author?.fullname || 'Dushimimana Fabrice'
        }</p>
        </div>
        <p class="blog__tag">${blog.tags}</p>
        </div>
      </article>
    `;
  return html;
};
