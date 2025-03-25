//@ts-nocheck

import { categories, JSON_KEYS, dashboardTxt } from '../constants/index';
import { closeAddModal } from './modal';
import { encodeHTML } from './security';
import {
  saveFormTaskToDb,
  saveTaskDB,
  updateTaskToDB,
  getTasksDB,
} from '../features/task-crud';

// Move Functionality
const moveTaskListener = () => {
  const taskMoveSelects = document.querySelectorAll(`.move`);
  taskMoveSelects.forEach((select) => {
    select.addEventListener('change', handleMoveTask);
  });
};

const handleMoveTask = (e) => {
  e.preventDefault();
  const taskId = e.currentTarget.dataset.taskId;
  const taskMove = e.currentTarget.options[e.currentTarget.selectedIndex].value;
  const tasks = JSON.parse(getTasksDB());

  const updatedTask = tasks.filter((value) => {
    if (value.id === taskId) {
      value.category = taskMove;
    }
    return value;
  });
  saveTaskDB(updatedTask);
  location.reload();
};
// Move Functionality

// Create Functionality
const taskAddOrEditListener = () =>
  document
    .getElementById('addOrEditTask')
    .addEventListener('submit', handleFormSubmit);

const getAllTask = () => {
  const tasks = getTasksDB();
  if (tasks && tasks.length > 0) {
    createTaskCards(JSON.parse(tasks));
  }
};

const createTaskCards = (taskData) => {
  let fragmentTodo = new DocumentFragment();
  let fragmentInProgress = new DocumentFragment();
  let fragmentInReview = new DocumentFragment();
  let fragmentClosed = new DocumentFragment();

  const taskTodo = taskData.filter(
    (value) => value.category === categories.todo
  );
  const taskInProgress = taskData.filter(
    (value) => value.category === categories.inProgress
  );
  const taskInReview = taskData.filter(
    (value) => value.category === categories.inReview
  );
  const taskClosed = taskData.filter(
    (value) => value.category === categories.closed
  );

  for (const todo of taskTodo) {
    fragmentTodo.append(crateCard(todo));
  }

  for (const todo of taskInProgress) {
    fragmentInProgress.append(crateCard(todo));
  }

  for (const todo of taskInReview) {
    fragmentInReview.append(crateCard(todo));
  }

  for (const todo of taskClosed) {
    fragmentClosed.append(crateCard(todo));
  }

  if (taskTodo && taskTodo.length > 0) {
    insertCards(categories.todo, fragmentTodo);
  }

  if (taskInProgress && taskInProgress.length > 0) {
    insertCards(categories.inProgress, fragmentInProgress);
  }

  if (taskInReview && taskInReview.length > 0) {
    insertCards(categories.inReview, fragmentInReview);
  }

  if (taskClosed && taskClosed.length > 0) {
    insertCards(categories.closed, fragmentClosed);
  }

  moveTaskListener();
  editTaskListener();
  deleteTaskListener();
};

const insertCards = (taskContainer, data) => {
  document.querySelector(`.${taskContainer}-wrapper`).append(...data.children);
};

const handleFormSubmit = (e) => {
  e.preventDefault();
  e.stopPropagation();

  const typeFormSubmitted = e.target.dataset.type;
  const taskUpdateId = e.target.dataset.taskId;
  const addTaskElements = document.forms.addOrEditTask;
  const addTaskFormData = new FormData(addTaskElements);
  const title = encodeHTML(addTaskFormData.get('title'));
  const deadline = encodeHTML(addTaskFormData.get('deadline'));
  const description = encodeHTML(addTaskFormData.get('description'));

  e.submitter.innerText = 'Saving...';
  e.submitter.disabled = true;

  saveOrUpdateTask(
    e.submitter,
    { title, deadline, description },
    typeFormSubmitted,
    taskUpdateId
  );
};

const saveOrUpdateTask = (btnInstance, task, typeAction, taskUpdateId) => {
  if (typeAction === 'add') {
    saveFormTaskToDb(task);
  } else {
    updateTaskToDB(taskUpdateId, task);
  }

  setTimeout(() => {
    btnInstance.innerText = 'Confirm';
    btnInstance.removeAttribute('disabled');
    closeAddModal();
    location.reload();
  }, 1500);
};

const crateCard = (task) => {
  const taskWrapper = document.createElement('article');
  const taskHeader = document.createElement('header');
  const taskSelect = document.createElement('select');
  const taskSelectOptionDefault = document.createElement('option');
  const taskSelectOptionTodo = document.createElement('option');
  const taskSelectOptionInprogress = document.createElement('option');
  const taskSelectOptionInReview = document.createElement('option');
  const taskSelectOptionClosed = document.createElement('option');
  const taskTitle = document.createElement('h5');
  const taskDescription = document.createElement('p');
  const taskDeadLineWrapper = document.createElement('h6');
  const taskFooter = document.createElement('footer');
  const taskEditBtn = document.createElement('button');
  const taskDeleteBtn = document.createElement('button');
  const taskCalendarIcon = document.createElement('i');
  const taskEditIcon = document.createElement('i');
  const tasksDeleteIcon = document.createElement('i');
  const taskCalendarIconSR = document.createElement('span');
  const taskEditIconSR = document.createElement('span');
  const taskDeleteIconSR = document.createElement('span');

  taskTitle.textContent = task.title;
  taskSelect.className = 'move';
  taskSelect.name = 'categories';
  taskSelect.dataset.taskId = task.id;
  taskSelectOptionTodo.value = categories.todo;
  taskSelectOptionInprogress.value = categories.inProgress;
  taskSelectOptionInReview.value = categories.inReview;
  taskSelectOptionClosed.value = categories.closed;
  taskSelectOptionDefault.textContent = 'Move To';
  taskSelectOptionTodo.textContent = 'To Do';
  taskSelectOptionInprogress.textContent = 'In Progress';
  taskSelectOptionInReview.textContent = 'In Review';
  taskSelectOptionClosed.textContent = 'Closed';
  taskSelect.options.add(taskSelectOptionDefault);
  taskSelect.options.add(taskSelectOptionTodo);
  taskSelect.options.add(taskSelectOptionInprogress);
  taskSelect.options.add(taskSelectOptionInReview);
  taskSelect.options.add(taskSelectOptionClosed);
  taskDescription.textContent = task.description;
  taskCalendarIcon.className = 'fa-regular fa-calendar';
  taskEditIcon.className = 'fa-solid fa-pencil';
  taskEditIcon.ariaHidden = true;
  taskEditIcon.title = 'Edit Task';
  tasksDeleteIcon.className = 'fa-solid fa-trash';
  tasksDeleteIcon.ariaHidden = true;
  tasksDeleteIcon.title = 'Delete Task';
  taskCalendarIconSR.className = 'fa-sr-only';
  taskCalendarIconSR.textContent = 'The Font Awesome Calendar Icon';
  taskDeleteIconSR.className = 'sr-only';
  taskDeleteIconSR.textContent = 'Delete Task';
  taskEditIconSR.className = 'sr-only';
  taskEditIconSR.textContent = 'Edit Task';
  taskEditBtn.className = 'btn edit';
  taskDeleteBtn.className = 'btn delete';

  taskHeader.appendChild(taskTitle);
  taskHeader.appendChild(taskSelect);
  taskDeadLineWrapper.appendChild(taskCalendarIcon);
  taskDeadLineWrapper.appendChild(taskCalendarIconSR);
  taskEditBtn.appendChild(taskEditIcon);
  taskEditBtn.appendChild(taskEditIconSR);
  taskDeleteBtn.appendChild(tasksDeleteIcon);
  taskDeleteBtn.appendChild(taskDeleteIconSR);
  taskCalendarIconSR.insertAdjacentHTML(
    'afterend',
    ` DeadLine: ${task.deadline}`
  );
  taskEditBtn.insertAdjacentText('beforeend', 'Edit');
  taskDeleteBtn.insertAdjacentText('beforeend', 'Delete');
  taskEditBtn.setAttribute('data-edit', task.id);
  taskDeleteBtn.setAttribute('data-delete', task.id);
  taskFooter.appendChild(taskEditBtn);
  taskFooter.appendChild(taskDeleteBtn);
  taskWrapper.appendChild(taskHeader);
  taskWrapper.appendChild(taskDescription);
  taskWrapper.appendChild(taskDeadLineWrapper);
  taskWrapper.appendChild(taskFooter);

  return taskWrapper;
};
// Create Functionality

// Delete Action
const deleteTaskListener = () => {
  const taskBtnDelete = document.querySelectorAll('.delete');
  taskBtnDelete.forEach((btnDelete) => {
    btnDelete.addEventListener('click', handleDeleteTask);
  });
};

const handleDeleteTask = (e) => {
  e.preventDefault();
  const taskId = e.currentTarget.dataset.delete;
  const tasks = JSON.parse(getTasksDB());
  const updatedDeleteTasks = tasks.filter((value) => value.id !== taskId);
  saveTaskDB(updatedDeleteTasks);
  location.reload();
};
// Delete Action

// Edit Action
const editTaskListener = () => {
  const taskBtnEdit = document.querySelectorAll('.edit');
  taskBtnEdit.forEach((btnEdit) =>
    btnEdit.addEventListener('click', handleEditTask)
  );
};

const handleEditTask = (e) => {
  e.preventDefault();
  const taskId = e.currentTarget.dataset.edit;
  const tasks = JSON.parse(getTasksDB());
  const task = tasks.find((value) => value.id === taskId);
  const modal = document.getElementById('modal-add-or-edit');

  modal.querySelector('form').dataset.type = 'edit';
  modal.querySelector('form').dataset.taskId = taskId;
  modal.querySelector('legend').textContent = 'Edit Task';
  modal.querySelector('input#title').value = task.title;
  modal.querySelector('input#deadline').value = task.deadline;
  modal.querySelector('textarea#description').value = task.description;

  modal.showModal();
};
// Edit Action

// Export Action
const taskExportListener = () =>
  document.querySelector('.export-task').addEventListener('click', exportDB);

const exportDB = (e) => {
  e.preventDefault();
  const filename = 'tasks.json';
  const tasks = getTasksDB();
  if (tasks && tasks.length > 0) {
    let element = document.createElement('a');
    element.setAttribute(
      'href',
      'data:text/plain;charset=utf-8,' + encodeURIComponent(tasks)
    );
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }
};
// Export Action

// Import Action
const taskImportListener = () => {
  document
    .getElementById('importJson')
    .addEventListener('submit', handleImportSubmit);
};

const handleImportSubmit = (e) => {
  e.preventDefault();
  e.stopPropagation();
  const reader = new FileReader();
  reader.onload = onReaderLoad;
  const addTaskElements = document.forms.importJson;
  const addTaskFormData = new FormData(addTaskElements);
  const filJson = addTaskFormData.get('file-json');
  reader.readAsText(filJson);
};

const onReaderLoad = (event) => {
  const imported = JSON.parse(event.target.result);
  if (imported && imported.length > 0) {
    validateJSON(imported);
  }
};

const validateJSON = (taskImported) => {
  const errorMessage = document.querySelector('.error-import');
  const checkJsonFormat = JSON_KEYS.every((key) =>
    taskImported.every((value) => value.hasOwnProperty(key))
  );
  if (checkJsonFormat) {
    const taskDB = getTasksDB();
    const taskData = JSON.parse(taskDB);
    const mergeTasks = taskData.concat(
      taskImported.filter(
        (imported) => !taskData.some((actual) => actual.id === imported.id)
      )
    );
    saveTaskDB(mergeTasks);
    errorMessage.textContent = '';
    location.reload();
  } else {
    errorMessage.textContent = dashboardTxt.errorFile;
  }
};
// Import Action

export {
  getAllTask,
  taskAddOrEditListener,
  taskExportListener,
  taskImportListener,
  handleDeleteTask,
  moveTaskListener,
};
