import {
  JSON_KEYS,
  TASK_STORAGE_KEY,
  categories,
  dashboardTxt,
} from '../constants/index';
import { TTask } from '../types/index';

export default class TaskCrud {
  constructor() {
    this.exportDB = this.exportDB.bind(this);
    this.importDB = this.importDB.bind(this);

    const exportBtn = document.querySelector('.export-task');
    const importBtn = document.getElementById('importJson');

    if (exportBtn) {
      exportBtn.addEventListener('click', this.exportDB);
    }

    if (importBtn) {
      importBtn.addEventListener('submit', this.importDB);
    }
  }

  getTasksDB() {
    return localStorage.getItem(TASK_STORAGE_KEY);
  }

  saveTaskDB(tasks: TTask[]) {
    localStorage.setItem(TASK_STORAGE_KEY, JSON.stringify(tasks));
  }

  saveFormTaskToDb(task: TTask) {
    const tasksDB = this.getTasksDB();

    if (tasksDB && tasksDB.length > 0) {
      const taskData = JSON.parse(tasksDB) as TTask[];
      taskData.push({
        id: task.title.replaceAll(' ', '-'),
        userId: task.userId,
        title: task.title,
        deadline: task.deadline,
        description: task.description,
        category: categories.todo,
      });
      this.saveTaskDB(taskData);
    } else {
      this.saveTaskDB([
        {
          id: task.title.replaceAll(' ', '-'),
          userId: task.userId,
          title: task.title,
          deadline: task.deadline,
          description: task.description,
          category: categories.todo,
        },
      ]);
    }
  }

  updateTaskToDB(taskId: string, task: TTask) {
    const tasksDB = this.getTasksDB();

    if (tasksDB && tasksDB.length > 0) {
      const taskData = JSON.parse(tasksDB) as TTask[];
      const updatedTask = taskData.filter((value) => {
        if (value.id === taskId) {
          value.id = task.title.replaceAll(' ', '-');
          value.title = task.title;
          value.deadline = task.deadline;
          value.description = task.description;
        }
        return value;
      });
      this.saveTaskDB(updatedTask);
    }
  }

  deleteTaskToDB(taskId: string) {
    const tasksDB = this.getTasksDB();
    if (tasksDB && tasksDB.length > 0) {
      const taskData = JSON.parse(tasksDB) as TTask[];
      const updatedDeleteTasks = taskData.filter(
        (value) => value.id !== taskId
      );
      this.saveTaskDB(updatedDeleteTasks);
    }
  }

  private exportDB(e: Event) {
    e.preventDefault();
    const filename = 'tasks.json';
    const tasks = this.getTasksDB();

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
  }

  private importDB(e: Event) {
    e.preventDefault();
    e.stopPropagation();

    const reader = new FileReader();
    reader.onload = this.onReaderLoad.bind(this);
    const addTaskElements = document.forms.namedItem('importJson');
    if (addTaskElements) {
      const addTaskFormData = new FormData(addTaskElements);
      const filJson = addTaskFormData.get('file-json');
      reader.readAsText(filJson as Blob);
    }
  }

  private onReaderLoad(event: Event) {
    const reader = event.target as FileReader;
    const imported = JSON.parse(reader.result as string);
    if (imported && imported.length > 0) {
      this.validateJSON(imported);
    }
  }

  private validateJSON(taskImported: TTask[]) {
    const errorMessage = document.querySelector('.error-import');
    const taskDB = this.getTasksDB();
    const checkJsonFormat = JSON_KEYS.every((key) =>
      taskImported.every((item) => {
        if (typeof item === 'string') {
          const obj = JSON.parse(item);
          return obj && typeof obj === 'object' && obj.hasOwnProperty(key);
        }
      })
    );

    if (taskDB && errorMessage) {
      if (!checkJsonFormat) {
        errorMessage.textContent = dashboardTxt.errorFile;
      }
      const taskData = JSON.parse(taskDB);
      const mergeTasks = taskData.concat(
        taskImported.filter(
          (imported) =>
            !taskData.some((actual: TTask) => actual.id === imported.id)
        )
      );
      this.saveTaskDB(mergeTasks);
      errorMessage.textContent = '';
      location.reload();
    }
  }
}
