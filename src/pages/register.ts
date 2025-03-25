//@ts-nocheck

import Security from '../utils/security';
import { REGEX, USERS_STORAGE_KEY } from '../constants/index';

document.addEventListener('DOMContentLoaded', () => {
  const security = new Security();
  formRegisterListener();
  backListener();
  inputUsernameListener();
  inputPasswordListener();
  inputConfirmPasswordListener();
  security.togglePassword();
});

const formRegisterListener = () =>
  document
    .getElementById('registerForm')
    .addEventListener('submit', handleRegister);

const inputUsernameListener = () =>
  document.getElementById('username').addEventListener('keyup', (e) => {
    const inputUsername = document.querySelector(
      '.error-container p:nth-child(1)'
    );
    REGEX.atLeast2Letter2Numbers.test(e.currentTarget.value)
      ? inputUsername.classList.add('success')
      : inputUsername.classList.remove('success');
  });

const inputPasswordListener = () =>
  document.getElementById('password').addEventListener('keyup', (e) => {
    const inputPassword = document.querySelector(
      '.error-container p:nth-child(2)'
    );
    REGEX.atLeast1Uppercase1LowerWithNumbersAndSpecial.test(
      e.currentTarget.value
    )
      ? inputPassword.classList.add('success')
      : inputPassword.classList.remove('success');
    checkPasswordSameError();
  });

const inputConfirmPasswordListener = () =>
  document.getElementById('confirm-password').addEventListener('keyup', (e) => {
    const inputConfirmPassword = document.querySelector(
      '.error-container p:nth-child(3)'
    );
    REGEX.atLeast1Uppercase1LowerWithNumbersAndSpecial.test(
      e.currentTarget.value
    )
      ? inputConfirmPassword.classList.add('success')
      : inputConfirmPassword.classList.remove('success');
    checkPasswordSameError();
  });

const checkPasswordSameError = () => {
  const input = document.querySelector('.error-container p:nth-child(4)');
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirm-password').value;
  password === confirmPassword
    ? input.classList.add('success')
    : input.classList.remove('success');
};

const backListener = () =>
  document
    .getElementById('btn-back')
    .addEventListener('click', () => (location.href = './index.html'));

const handleRegister = (e) => {
  e.preventDefault();
  e.stopPropagation();

  const loginElements = document.forms.registerForm;
  const loginForm = new FormData(loginElements);
  const username = security.encodeHTML(loginForm.get('username'));
  const password = security.encodeHTML(loginForm.get('password'));
  const confirmPassword = encodeHTML(loginForm.get('confirm-password'));

  if (
    REGEX.atLeast2Letter2Numbers.test(username) &&
    REGEX.atLeast1Uppercase1LowerWithNumbersAndSpecial.test(password) &&
    REGEX.atLeast1Uppercase1LowerWithNumbersAndSpecial.test(confirmPassword) &&
    password === confirmPassword
  ) {
    const users = localStorage.getItem(USERS_STORAGE_KEY);
    if (users && users.length > 0) {
      const data = JSON.parse(users);
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
};
