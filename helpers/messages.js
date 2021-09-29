require("colors");
const readline = require("readline");

const showMenu = () => {
  return new Promise((resolve) => {
    console.clear();
    console.log("********************".blue);
    console.log("  Select an Option".blue);
    console.log("********************\n".blue);

    console.log(`${"1".blue}. Create task `);
    console.log(`${"2".blue}. List tasks `);
    console.log(`${"3".blue}. List completed tasks `);
    console.log(`${"4".blue}. List pending tasks`);
    console.log(`${"5".blue}. Completing task(s) `);
    console.log(`${"6".blue}. Delete task `);
    console.log(`${"0".blue}. Exit \n `);

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question("select an option: ", (answer) => {
      rl.close();
      resolve(answer);
    });
  });
};

const pause = () => {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question(`Press ${"ENTER".blue} to continue `, (answer) => {
      rl.close();
      resolve();
    });
  });
};

module.exports = {
  showMenu,
  pause,
};
