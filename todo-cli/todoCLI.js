let readline = require("readline");

const fs = require("fs");
var rl = readline.createInterface(process.stdin, process.stdout);
const WELCOME = "Welcome to Todo CLI!\n";
const SEPARATOR = "-----------------------\n";
const MENU =
  "(v) View • ( n ) New • (cX) Complete • (dX) Delete • (s) Save • (q) Quit \n";
const PROMPT = WELCOME + SEPARATOR + MENU;
let allTodos = [];

function IfApplicableLoadJSON() {
  if (
    process.argv.length === 3 &&
    process.argv[2].split(".")[1].toLocaleLowerCase() === "json"
  ) {
    let fileName = process.argv[2];
    fs.readFile(fileName, "utf-8", (err, data) => {
      let todos = JSON.parse(data);
      for (let todo of todos) {
        allTodos.push(todo);
      }
    });
  }
}

IfApplicableLoadJSON();

rl.setPrompt(PROMPT);
rl.prompt();
rl.on("line", function (line) {
  let inputArr = line.split("");
  let index;
  menuOption = inputArr[0];
  if (inputArr.length > 0) {
    index = inputArr[1];
  }

  switch (menuOption) {
    case "c":
      completeOneTodo(index);
      break;
    case "d":
      deleteOneTodo(index);
      break;
    case "n":
      getUserInput("n");
      break;
    case "q":
      rl.close();
      break;
    case "s":
      getUserInput("s");
      break;
    case "v":
      viewAllTodo();
      break;
    default:
      console.log(`Sorry,${line} is not valid.`);
  }
  rl.prompt();
}).on("close", function () {
  process.exit(0);
});

function addTodo(title) {
  let todo = {};
  todo["title"] = title;
  todo["completed"] = false;
  allTodos.push(todo);

  rl.setPrompt(PROMPT);
  rl.prompt();
}

function viewAllTodo() {
  let lines = "";
  const COMPLETED_CHAR = "\u23B7";
  for (let index in allTodos) {
    let line = "";
    let status = allTodos[index].completed ? COMPLETED_CHAR : " ";
    line = `${index} [${status}] ${allTodos[index].title} \n`;
    lines += line;
  }
  console.log(lines);
  rl.setPrompt(PROMPT);
  rl.prompt();
}

function deleteOneTodo(index) {
  let tobeDeletedItem = allTodos[index];
  allTodos.splice(index, 1);
  console.log("Deleted " + tobeDeletedItem.title);
  rl.setPrompt(PROMPT);
  rl.prompt();
}

function completeOneTodo(index) {
  allTodos[index].completed = true;
  console.log("Completed " + '"' + allTodos[index].title + '"' + "\n");
  rl.setPrompt(PROMPT);
  rl.prompt();
}

function saveToJSONFile(filePath) {
  let path = filePath || "myTodos.json";
  let data = JSON.stringify(allTodos);

  // Remove existing content before re-writing
  if (path === "myTodos.json") {
    fs.truncate(path, 0, function () {});
  }

  fs.appendFile(path, data, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    //done!
  });
  rl.setPrompt(PROMPT);
  rl.prompt();
}

function getUserInput(option) {
  var prompt = require("prompt-sync")();
  let question = "";
  if (option === "n") {
    question = "What >";
  }

  if (option === "s") {
    const DEFAULT = "myTodos.json";
    question = "Where? >";
  }

  const userInput = prompt(question);
  
  switch (option) {
    case "n":
      addTodo(userInput);
      break;
    case "s":
      saveToJSONFile(userInput);
      break;
    default:
      console.log("Invalid option");
  }
}
