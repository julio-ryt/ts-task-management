//@ts-nocheck

import { TASK_STORAGE_KEY, categories } from '../constants/index';

const getTasksDB = () => localStorage.getItem(TASK_STORAGE_KEY);

const saveTaskDB = (tasks) =>
  localStorage.setItem(TASK_STORAGE_KEY, JSON.stringify(tasks));

const saveFormTaskToDb = (task) => {
  const tasksDB = getTasksDB();
  if (tasksDB && tasksDB.length > 0) {
    const taskData = JSON.parse(tasksDB);
    taskData.push({
      id: task.title.replaceAll(' ', '-'),
      title: task.title,
      deadline: task.deadline,
      description: task.description,
      category: categories.todo,
    });
    saveTaskDB(taskData);
  } else {
    saveTaskDB([
      {
        id: task.title.replaceAll(' ', '-'),
        title: task.title,
        deadline: task.deadline,
        description: task.description,
        category: categories.todo,
      },
    ]);
  }
};

const updateTaskToDB = (taskId, task) => {
  const tasksDB = getTasksDB();
  const taskData = JSON.parse(tasksDB);
  const updatedTask = taskData.filter((value) => {
    if (value.id === taskId) {
      value.id = task.title.replaceAll(' ', '-');
      value.title = task.title;
      value.deadline = task.deadline;
      value.description = task.description;
    }
    return value;
  });
  saveTaskDB(updatedTask);
};

export { saveFormTaskToDb, saveTaskDB, updateTaskToDB, getTasksDB };
