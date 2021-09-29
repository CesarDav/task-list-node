require("colors");

const Task = require("./task");

class Tasks {
  _list = {};
  constructor() {
    this._list = {};
  }

  get getListTasksArray() {
    const list = [];
    Object.keys(this._list).forEach((keys) => list.push(this._list[keys]));
    return list;
  }

  loadTasksfromDB(tasks = []) {
    tasks.forEach((keys) => (this._list[keys.id] = keys));
  }

  createTask(des = "") {
    const task = new Task(des);
    this._list[task.id] = task;
  }

  completeList() {
    console.log("\n");
    this.getListTasksArray.forEach((task, index) => {
      const indexColor = `${index + 1}.`.blue;
      const { description, completed } = task;
      const state = completed ? "Completed".green : "Pending".red;

      console.log(`${indexColor} ${description} :: ${state} `);
    });
    return null;
  }

  listTasksByStatus(isCompleted = true) {
    console.log("\n");

    const filterList = this.getListTasksArray.filter((task) => {
      if (isCompleted) {
        return !!task.completed;
      }
      return task.completed === null;
    });

    filterList.forEach((task, index) => {
      const indexColor = `${index + 1}.`.blue;
      const { description, completed } = task;
      const state = completed ? `${completed}`.green : "Pending".red;

      console.log(`${indexColor} ${description} :: ${state} `);
    });
  }

  deleteTask(id = "") {
    if (this._list[id]) {
      delete this._list[id];
    }
  }

  toggleComplete(ids = []) {
    ids.forEach((id) => {
      const task = this._list[id];
      if (!task.completed) {
        task.completed = new Date().toDateString();
      }
    });
    this.getListTasksArray.forEach((task) => {
      if (!ids.includes(task.id)) {
        task.completed = null;
      }
    });
  }
}

module.exports = Tasks;
