import Auth from '../utils/auth';
import Modal from '../utils/modal';
import Task from '../utils/task';

document.addEventListener('DOMContentLoaded', () => {
  new Auth();
  new Modal();
  new Task();
});
