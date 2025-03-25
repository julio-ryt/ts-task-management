//@ts-nocheck

import { USERS_STORAGE_KEY } from '../constants/index';

const checkAuth = () => {
  const users = localStorage.getItem(USERS_STORAGE_KEY);
  if (users == null) {
    location.href = 'index.html';
  }
  const data = JSON.parse(users);
  const user = data.find((value) => value.isAuth);

  if (data.find((value) => value.isAuth)) {
    const auth = document.createElement('input');
    auth.type = 'hidden';
    auth.id = 'auth-user';
    auth.value = user.id;
    document.body.appendChild(auth);
  } else {
    location.href = 'index.html';
  }
};

const logOut = () => {
  document.querySelector('.btn-log-out').addEventListener('click', () => {
    const auth = document.getElementById('auth-user');
    const users = localStorage.getItem(USERS_STORAGE_KEY);
    const data = JSON.parse(users);

    const updated = data.filter((value) => {
      if (value.username === auth.value) {
        value.isAuth = false;
      }
      return value;
    });
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updated));
    location.reload();
  });
};

export { checkAuth, logOut };
