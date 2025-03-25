import { USERS_STORAGE_KEY } from '../constants/index';
import { TUser } from '../types/index';

export default class Auth {
  constructor() {
    this.checkAuth();
    const logOutBtn = document.querySelector('.btn-log-out');

    if (logOutBtn instanceof HTMLButtonElement) {
      logOutBtn.addEventListener('click', this.handleLogOut);
    }
  }

  private checkAuth() {
    const users = localStorage.getItem(USERS_STORAGE_KEY);
    const auth = document.createElement('input');

    if (users == null) {
      location.href = 'index.html';
      return;
    }

    const data = JSON.parse(users) as TUser[];
    const user = data.find((value) => value.isAuth);

    if (user && auth instanceof HTMLInputElement) {
      auth.type = 'hidden';
      auth.id = 'auth-user';
      auth.value = user.id.toString();
      document.body.appendChild(auth);
    } else {
      location.href = 'index.html';
    }
  }

  private handleLogOut() {
    const auth = document.getElementById('auth-user');
    const users = localStorage.getItem(USERS_STORAGE_KEY);

    if (users && auth instanceof HTMLInputElement) {
      const data = JSON.parse(users) as TUser[];
      const updated = data.filter((value) => {
        if (value.id === Number(auth.value)) {
          value.isAuth = false;
        }
        return value;
      });

      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updated));
      location.reload();
    }
  }
}
