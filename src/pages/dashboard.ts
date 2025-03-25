//@ts-nocheck

import {
  getAllTask,
  taskAddOrEditListener,
  taskImportListener,
  taskExportListener,
} from '../utils/task';
import { checkAuth, logOut } from '../utils/auth';
import {
  showAddModalListener,
  closeAddModalListener,
  closeImportModalListener,
  showImportModalListener,
} from '../utils/modal';

document.addEventListener('DOMContentLoaded', () => {
  checkAuth();
  logOut();
  showAddModalListener();
  showImportModalListener();
  closeAddModalListener();
  closeImportModalListener();
  taskAddOrEditListener();
  taskExportListener();
  taskImportListener();
  getAllTask();
});
