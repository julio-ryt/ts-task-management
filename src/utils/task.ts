import { categories } from '../constants/index';
import TaskCrud from '../features/task-crud';
import { TTask } from '../types/index';
import Modal from './modal';
import Security from './security';

export default class Task extends Security {
  taskCrud = new TaskCrud();
  modal = new Modal();

  constructor() {
    super();
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleEditTask = this.handleEditTask.bind(this);
    this.handleDeleteTask = this.handleDeleteTask.bind(this);

    const taskAddOrEditListener = document.getElementById('addOrEditTask');

    if (taskAddOrEditListener instanceof HTMLFormElement) {
      taskAddOrEditListener.addEventListener('submit', this.handleFormSubmit);
    }
    this.getAllTask();
  }

  private handleFormSubmit(e: SubmitEvent) {
    e.preventDefault();
    e.stopPropagation();

    const addTaskElements = document.forms.namedItem('addOrEditTask');

    if (e.target instanceof EventTarget && addTaskElements) {
      const typeFormSubmitted = (e.target as HTMLElement).dataset.type;
      const taskUpdateId = (e.target as HTMLElement).dataset.taskId;
      const addTaskFormData = new FormData(addTaskElements);
      const title = this.encodeHTML(addTaskFormData.get('title') as string);
      const deadline = this.encodeHTML(
        addTaskFormData.get('deadline') as string
      );
      const description = this.encodeHTML(
        addTaskFormData.get('description') as string
      );

      if (e.submitter instanceof HTMLButtonElement) {
        (e.submitter as HTMLButtonElement).innerText = 'Saving...';
        (e.submitter as HTMLButtonElement).disabled = true;
      }

      this.saveOrUpdateTask(
        e.submitter as HTMLButtonElement,
        title,
        deadline,
        description,
        typeFormSubmitted as string,
        taskUpdateId as string
      );
    }
  }

  private saveOrUpdateTask(
    btnInstance: HTMLButtonElement,
    title: string,
    deadline: string,
    description: string,
    typeAction: string,
    taskUpdateId: string
  ) {
    const task: TTask = {
      id: title.replaceAll(' ', '-'),
      userId: Number(
        (document.getElementById('auth-user') as HTMLInputElement).value
      ),
      deadline,
      title,
      description,
      category: categories.todo,
    };
    if (typeAction === 'add') {
      this.taskCrud.saveFormTaskToDb(task);
    } else {
      this.taskCrud.updateTaskToDB(taskUpdateId, task);
    }

    setTimeout(() => {
      btnInstance.innerText = 'Confirm';
      btnInstance.removeAttribute('disabled');
      this.modal.closeAddOrEditModal();
      location.reload();
    }, 1500);
  }

  private getAllTask() {
    const tasks = this.taskCrud.getTasksDB();
    if (tasks && tasks.length > 0) {
      this.createTaskCards(JSON.parse(tasks));
    }
  }

  private taskFilter(tasks: TTask[], authId: number) {
    return {
      todo() {
        return tasks.filter(
          (value) =>
            value.category === categories.todo && value.userId === authId
        );
      },
      inProgress() {
        return tasks.filter(
          (value) =>
            value.category === categories.inProgress && value.userId === authId
        );
      },
      inReview() {
        return tasks.filter(
          (value) =>
            value.category === categories.inReview && value.userId === authId
        );
      },
      closed() {
        return tasks.filter(
          (value) =>
            value.category === categories.closed && value.userId === authId
        );
      },
    };
  }

  private createTaskCards(taskData: TTask[]) {
    let fragmentTodo = new DocumentFragment();
    let fragmentInProgress = new DocumentFragment();
    let fragmentInReview = new DocumentFragment();
    let fragmentClosed = new DocumentFragment();

    const filter = this.taskFilter(
      taskData,
      Number((document.getElementById('auth-user') as HTMLInputElement).value)
    );
    const taskTodo = filter.todo();
    const taskInProgress = filter.inProgress();
    const taskInReview = filter.inReview();
    const taskClosed = filter.closed();

    for (const todo of taskTodo) {
      fragmentTodo.append(this.crateCard(todo));
    }

    for (const todo of taskInProgress) {
      fragmentInProgress.append(this.crateCard(todo));
    }

    for (const todo of taskInReview) {
      fragmentInReview.append(this.crateCard(todo));
    }

    for (const todo of taskClosed) {
      fragmentClosed.append(this.crateCard(todo));
    }

    if (taskTodo && taskTodo.length > 0) {
      this.insertCards(categories.todo, fragmentTodo);
    }

    if (taskInProgress && taskInProgress.length > 0) {
      this.insertCards(categories.inProgress, fragmentInProgress);
    }

    if (taskInReview && taskInReview.length > 0) {
      this.insertCards(categories.inReview, fragmentInReview);
    }

    if (taskClosed && taskClosed.length > 0) {
      this.insertCards(categories.closed, fragmentClosed);
    }

    this.moveTaskListener();
    this.editTaskListener();
    this.deleteTaskListener();
  }

  private insertCards(taskContainer: string, data: DocumentFragment) {
    const cardContainer = document.querySelector(`.${taskContainer}-wrapper`);

    if (cardContainer instanceof HTMLElement) {
      cardContainer.append(...Array.from(data.children));
    }
  }

  private crateCard(task: TTask) {
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
    taskEditIcon.ariaHidden = 'true';
    taskEditIcon.title = 'Edit Task';
    tasksDeleteIcon.className = 'fa-solid fa-trash';
    tasksDeleteIcon.ariaHidden = 'true';
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
  }

  private moveTaskListener() {
    const taskMoveSelects = document.querySelectorAll(`.move`);
    taskMoveSelects.forEach((select) => {
      select.addEventListener('change', this.handleMoveTask);
    });
  }

  private handleMoveTask = (e: Event) => {
    e.preventDefault();
    const tasks = this.taskCrud.getTasksDB();

    if (
      e.currentTarget instanceof HTMLSelectElement &&
      tasks &&
      tasks.length > 0
    ) {
      const taskId = e.currentTarget.dataset.taskId;
      const taskMove = e.currentTarget.value;
      const taskData = JSON.parse(tasks) as TTask[];
      const updatedTask = taskData.map((value) => {
        if (value.id === taskId) {
          return { ...value, category: taskMove };
        }
        return value;
      });
      this.taskCrud.saveTaskDB(updatedTask);
      location.reload();
    }
  };

  private deleteTaskListener() {
    const taskBtnDelete = document.querySelectorAll('.delete');
    taskBtnDelete.forEach((btnDelete) => {
      btnDelete.addEventListener('click', this.handleDeleteTask);
    });
  }

  private handleDeleteTask(e: Event) {
    e.preventDefault();
    const tasks = this.taskCrud.getTasksDB();

    if (
      e.currentTarget instanceof HTMLButtonElement &&
      tasks &&
      tasks.length > 0
    ) {
      const taskId = e.currentTarget.dataset.delete;
      const taskData = JSON.parse(tasks) as TTask[];
      const updatedDeleteTasks = taskData.filter(
        (value) => value.id !== taskId
      );
      this.taskCrud.saveTaskDB(updatedDeleteTasks);
      location.reload();
    }
  }

  private editTaskListener() {
    const taskBtnEdit = document.querySelectorAll('.edit');
    taskBtnEdit.forEach((btnEdit) =>
      btnEdit.addEventListener('click', this.handleEditTask)
    );
  }

  private handleEditTask(e: Event) {
    e.preventDefault();
    const modal = document.getElementById('modal-add-or-edit');
    const tasks = this.taskCrud.getTasksDB();

    if (
      tasks &&
      tasks.length > 0 &&
      e.currentTarget instanceof HTMLButtonElement &&
      modal instanceof HTMLDialogElement
    ) {
      const taskId = e.currentTarget.dataset.edit;
      const form = modal.querySelector('form');
      const titleInput = modal.querySelector<HTMLInputElement>('input#title');
      const deadlineInput =
        modal.querySelector<HTMLInputElement>('input#deadline');
      const descriptionTextarea = modal.querySelector<HTMLTextAreaElement>(
        'textarea#description'
      );
      const legend = modal.querySelector('legend');

      if (
        form &&
        legend &&
        titleInput &&
        deadlineInput &&
        descriptionTextarea
      ) {
        const taskData = JSON.parse(tasks) as TTask[];
        const task = taskData.find((value) => value.id === taskId);

        form.dataset.type = 'edit';
        form.dataset.taskId = taskId;
        legend.textContent = 'Edit Task';
        titleInput.value = task?.title ?? '';
        deadlineInput.value = task?.deadline ?? '';
        descriptionTextarea.value = task?.description ?? '';

        modal.showModal();
      }
    }
  }
}
