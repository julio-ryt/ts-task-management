import { USERS_STORAGE_KEY } from '../constants/index';
import { TUser } from '../types/index';
import Security from '../utils/security';

document.addEventListener('DOMContentLoaded', () => {
  new Login();
});

class Login extends Security {
  constructor() {
    super();
    this.togglePassword();

    const loginForm = document.getElementById('loginForm');
    const btnRegister = document.querySelector('.register');

    if (btnRegister instanceof HTMLButtonElement) {
      btnRegister.addEventListener(
        'click',
        () => (location.href = './register.html')
      );
    }

    if (loginForm instanceof HTMLFormElement) {
      this.handleLogin = this.handleLogin.bind(this);
      loginForm.addEventListener('submit', this.handleLogin);
    }
  }

  private handleLogin(e: Event) {
    e.preventDefault();
    e.stopPropagation();

    const loginElements = document.forms.namedItem('loginForm');

    if (loginElements) {
      const users = localStorage.getItem(USERS_STORAGE_KEY);
      const loginForm = new FormData(loginElements);
      const usernameForm = this.encodeHTML(loginForm.get('username') as string);
      const passwordForm = this.encodeHTML(loginForm.get('password') as string);

      if (users && users.length > 0) {
        const data = JSON.parse(users) as TUser[];
        const isUser = data.findIndex(
          (value) =>
            value.username === usernameForm && value.password === passwordForm
        );
        if (isUser == -1) {
          this.displayLoginError(true);
        }
        if (data[isUser] !== undefined) {
          data[isUser].isAuth = true;
          localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(data));
          this.displayLoginError(false);
          location.href = '/dashboard.html';
        }
      } else {
        this.displayLoginError(true);
      }
    }
  }

  private displayLoginError(isShow: boolean) {
    const loginError = document.querySelector(
      '.login-error'
    ) as HTMLParagraphElement;
    if (loginError) {
      loginError.style.display = isShow ? 'initial' : 'none';
    }
  }
}
