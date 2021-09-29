require("colors");
const { saveData, readData } = require("./helpers/crudDB");
const {
  inquirerMenu,
  pause,
  readInput,
  listTasksForDeletion,
  confirmDelete,
  completeTasks,
} = require("./helpers/inquirer");
const Tasks = require("./models/tasks");

const main = async () => {
  let opt = "";
  const tasks = new Tasks();
  const readDB = readData();

  if (readDB) {
    tasks.loadTasksfromDB(readDB);
  }

  do {
    opt = await inquirerMenu();

    switch (opt) {
      case "1":
        //create task
        const description = await readInput("description:");
        tasks.createTask(description);

        break;

      case "2":
        // list task
        tasks.completeList();

        break;
      case "3":
        // list complete task
        tasks.listTasksByStatus();

        break;

      case "4":
        // list pending task
        tasks.listTasksByStatus(false);

        break;

      case "5":
        //complete task(s)
        const ids = await completeTasks(tasks.getListTasksArray);
        tasks.toggleComplete(ids);
        break;

      case "6":
        //delete task
        const id = await listTasksForDeletion(tasks.getListTasksArray);
        if (id) {
          const confirm = await confirmDelete(
            "Are you sure to delete the selected task ?"
          );
          if (confirm) {
            tasks.deleteTask(id);
            console.log("Task successfully deleted!!".green);
          }
        }

        break;
    }
    saveData(tasks.getListTasksArray);
    if (opt !== "0") {
      await pause();
    }
  } while (opt !== "0");
};

main();
