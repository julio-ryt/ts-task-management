import Security from '../utils/security';
import { REGEX, USERS_STORAGE_KEY } from '../constants/index';
import { TRegisterForm, TUser } from '../types/index';

document.addEventListener('DOMContentLoaded', () => {
  new Register();
});

class Register extends Security {
  constructor() {
    super();
    this.togglePassword();

    const registerForm = document.getElementById('registerForm');
    const backBtn = document.getElementById('btn-back');

    if (backBtn instanceof HTMLButtonElement) {
      backBtn.addEventListener('click', () => (location.href = './index.html'));
    }

    if (registerForm instanceof HTMLElement) {
      this.handleRegister = this.handleRegister.bind(this);
      registerForm.addEventListener('submit', this.handleRegister);
    }

    this.inputUsernameListener();
    this.inputPasswordListener();
  }

  private handleRegister(e: Event) {
    e.preventDefault();
    e.stopPropagation();

    const loginElements = document.forms.namedItem('registerForm');

    if (loginElements) {
      const loginForm = new FormData(loginElements);
      const username = this.encodeHTML(loginForm.get('username') as string);
      const password = this.encodeHTML(loginForm.get('password') as string);
      const confirmPassword = this.encodeHTML(
        loginForm.get('confirm-password') as string
      );
      this.handleValidation({ username, password, confirmPassword });
    }
  }

  private handleValidation({
    username,
    password,
    confirmPassword,
  }: TRegisterForm) {
    if (
      REGEX.atLeast2Letter2Numbers.test(username) &&
      REGEX.atLeast1Uppercase1LowerWithNumbersAndSpecial.test(password) &&
      REGEX.atLeast1Uppercase1LowerWithNumbersAndSpecial.test(
        confirmPassword
      ) &&
      password === confirmPassword
    ) {
      const users = localStorage.getItem(USERS_STORAGE_KEY);
      if (users && users.length > 0) {
        const data = JSON.parse(users) as TUser[];
        data.push({
          id: new Date().getTime(),
          username,
          password,
          isAuth: false,
        });
        localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(data));
      } else {
        localStorage.setItem(
          USERS_STORAGE_KEY,
          JSON.stringify([
            { id: new Date().getTime(), username, password, isAuth: false },
          ])
        );
      }
      location.href = 'index.html';
    }
  }

  private inputUsernameListener() {
    const userNameInput = document.getElementById('username');
    const usernameError = document.querySelector(
      '.error-container p:nth-child(1)'
    ) as HTMLParagraphElement;

    if (userNameInput instanceof HTMLInputElement) {
      userNameInput.addEventListener('keyup', (e: Event) => {
        if (e.currentTarget instanceof HTMLInputElement) {
          REGEX.atLeast2Letter2Numbers.test(e.currentTarget.value as string)
            ? usernameError.classList.add('success')
            : usernameError.classList.remove('success');
        }
      });
    }
  }

  private inputPasswordListener() {
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const passwordError = document.querySelector(
      '.error-container p:nth-child(2)'
    ) as HTMLParagraphElement;
    const confirmPasswordError = document.querySelector(
      '.error-container p:nth-child(3)'
    ) as HTMLParagraphElement;

    if (
      passwordInput instanceof HTMLInputElement &&
      confirmPasswordInput instanceof HTMLInputElement
    ) {
      passwordInput.addEventListener('keyup', (e: Event) => {
        if (e.currentTarget instanceof HTMLInputElement) {
          REGEX.atLeast1Uppercase1LowerWithNumbersAndSpecial.test(
            e.currentTarget.value
          )
            ? passwordError.classList.add('success')
            : passwordError.classList.remove('success');
        }
        this.checkPasswordSameError();
      });

      confirmPasswordInput.addEventListener('keyup', (e: Event) => {
        if (e.currentTarget instanceof HTMLInputElement) {
          REGEX.atLeast1Uppercase1LowerWithNumbersAndSpecial.test(
            e.currentTarget.value
          )
            ? confirmPasswordError.classList.add('success')
            : confirmPasswordError.classList.remove('success');
        }
        this.checkPasswordSameError();
      });
    }
  }

  private checkPasswordSameError() {
    const samePasswordError = document.querySelector(
      '.error-container p:nth-child(4)'
    );
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirm-password');
    if (
      samePasswordError instanceof HTMLParagraphElement &&
      password instanceof HTMLInputElement &&
      confirmPassword instanceof HTMLInputElement
    ) {
      password.value === confirmPassword.value
        ? samePasswordError.classList.add('success')
        : samePasswordError.classList.remove('success');
    }
  }
}
