const changeHeader = function () {
  const logoutBtn = document.querySelector('.logout');
  const loginBtn = document.querySelector('.login');
  const signupBtn = document.querySelector('.signup');
  const navList = document.querySelector('.nav__list');
  const dashboardBtn = document.querySelector(
    ".nav__link[href='admin/dashboard.html']"
  );

  const token = localStorage.getItem('jwt');
  const user = JSON.parse(localStorage.getItem('user'));

  if (!token) {
    logoutBtn?.parentElement.classList.add('hidden');
    loginBtn?.parentElement.classList.remove('hidden');
    signupBtn?.parentElement.classList.remove('hidden');
  } else {
    loginBtn?.parentElement.classList.add('hidden');
    signupBtn?.parentElement.classList.add('hidden');
    logoutBtn?.parentElement.classList.remove('hidden');

    const html = `
     <div class="box-user">${user.fullname
       .split(' ')
       .map(word => word[0])
       .join('')
       .toUpperCase()}</div>
    `;
    navList.insertAdjacentHTML('beforeend', html);
  }

  if (user?.role === 'admin')
    dashboardBtn?.parentElement.classList.remove('hidden');
  else dashboardBtn?.parentElement.classList.add('hidden');
};
changeHeader();
