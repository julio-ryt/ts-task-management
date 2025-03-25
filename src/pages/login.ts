import Security from '../utils/security';

const security = new Security();

document.addEventListener('DOMContentLoaded', () => {
  // formListener();
  registerListener();
  security.togglePassword();
});

class Login {
  registerListener() {
    const btnRegister = document.querySelector('.register');
    btnRegister?.addEventListener(
      'click',
      () => (location.href = './register.html')
    );
  }

  formListener() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
      loginForm.addEventListener('submit', this.handleLogin);
    }
  }

  handleLogin(e: Event) {
    e.preventDefault();
    e.stopPropagation();

    const loginElements = document.forms;

    // if (loginElements) {
    //   loginElements.namedItem('loginForm');
    //   const loginForm = new FormData(loginElements);
    //   const username = security.encodeHTML(loginForm.get('username'));
    //   const password = security.encodeHTML(loginForm.get('password'));
    //   const users = localStorage.getItem(USERS_STORAGE_KEY);
    // }

    // if (users && users.length > 0) {
    //   const data = JSON.parse(users);
    //   const isUser = data.findIndex(
    //     (value) => value.username === username && value.password === password
    //   );
    //   if (isUser == -1) {
    //     document.querySelector('.login-error').style.display = 'initial';
    //   } else {
    //     data[isUser].isAuth = true;
    //     localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(data));
    //     location.href = '/dashboard.html';
    //   }
    // } else {
    //   document.querySelector('.login-error').style.display = 'initial';
    // }
  }
}

// const formListener = () => {
//   const loginForm = document.getElementById('loginForm');
//   if (loginForm) {
//     loginForm.addEventListener('submit', handleLogin);
//   }
// };

// const registerListener = () => {
//   const btnRegister = document.querySelector('.register');
//   btnRegister?.addEventListener(
//     'click',
//     () => (location.href = './register.html')
//   );
// };

// const handleLogin = (e: Event) => {
//   e.preventDefault();
//   e.stopPropagation();

//   const loginElements = document.forms.loginForm;
//   const loginForm = new FormData(loginElements);
//   const username = encodeHTML(loginForm.get('username'));
//   const password = encodeHTML(loginForm.get('password'));
//   const users = localStorage.getItem(USERS_STORAGE_KEY);

//   if (users && users.length > 0) {
//     const data = JSON.parse(users);
//     const isUser = data.findIndex(
//       (value) => value.username === username && value.password === password
//     );
//     if (isUser == -1) {
//       document.querySelector('.login-error').style.display = 'initial';
//     } else {
//       data[isUser].isAuth = true;
//       localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(data));
//       location.href = '/dashboard.html';
//     }
//   } else {
//     document.querySelector('.login-error').style.display = 'initial';
//   }
// };
