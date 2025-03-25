import { TASK_STORAGE_KEY, categories } from '../constants/index';
import { TTask } from '../types/index';

export default class TaskCrud {
  constructor() {}

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
}
