// const encodeHTML = (s: string) => {
//   return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
// };

// const togglePassword = () => {
//   const btn = document.querySelectorAll('.btn-toggle-password');
//   btn.forEach((value) =>
//     value.addEventListener('click', (e: Event) => {
//       if (e && e.currentTarget instanceof HTMLButtonElement) {
//         const type = e.currentTarget.dataset.type;
//         const isToggle = e.currentTarget.dataset.isToggle;
//         if (type === 'password') {
//           const togglePwd = document.getElementById('password');
//           if (togglePwd instanceof HTMLInputElement) {
//             togglePwd.type = isToggle === '0' ? 'text' : 'password';
//           }
//         }
//         if (type === 'confirm') {
//           const toggleConfirmPwd = document.getElementById('confirm-password');
//           if (toggleConfirmPwd instanceof HTMLInputElement) {
//             toggleConfirmPwd.type = isToggle === '0' ? 'text' : 'password';
//           }
//         }
//         e.currentTarget.dataset.isToggle = isToggle === '0' ? '1' : '0';
//       }
//     })
//   );
// };

// export { encodeHTML, togglePassword };

export default class Security {
  encodeHTML(s: string) {
    return s
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/"/g, '&quot;');
  }

  togglePassword() {
    const btn = document.querySelectorAll('.btn-toggle-password');
    btn.forEach((value) =>
      value.addEventListener('click', (e: Event) => {
        if (e && e.currentTarget instanceof HTMLButtonElement) {
          const type = e.currentTarget.dataset.type;
          const isToggle = e.currentTarget.dataset.isToggle;
          if (type === 'password') {
            const togglePwd = document.getElementById('password');
            if (togglePwd instanceof HTMLInputElement) {
              togglePwd.type = isToggle === '0' ? 'text' : 'password';
            }
          }
          if (type === 'confirm') {
            const toggleConfirmPwd =
              document.getElementById('confirm-password');
            if (toggleConfirmPwd instanceof HTMLInputElement) {
              toggleConfirmPwd.type = isToggle === '0' ? 'text' : 'password';
            }
          }
          e.currentTarget.dataset.isToggle = isToggle === '0' ? '1' : '0';
        }
      })
    );
  }
}
