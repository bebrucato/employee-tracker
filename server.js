const mysql = require('mysql');
const inquirer = require('inquirer');

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "KOOkoo@101",
  database: "employee_tracker_db",
});

connection.connect(function (err) {
  if (err) throw err;

  searching();
});

function searching() {

  inquirer
  .prompt({
    name:"initChoice",
    type:"list",
    message:"Please select how you would like to proceed.",
    choices: ["View Departments", "View Employees", "View Employees By Department", "View Employees By Manager", "Add Employee", "Remove Employee", "Update Employee", "End Session"]
  })
  .then(function(answer) {
    switch (answer.initChoice) {
      case "View Departments":;
        viewDepartments();
        break;

        case "View Employees":
          viewEmployees();
          break;
        
        case "View Employees By Department":
          employeesByDept();
          break;

        case "View Employees By Manager":
          byManager();
          break;

        case "Add Employee":
          addEmployee();
          break;

        case "Remove Employee":
        removeEmployee();
        break;

        case "Update Employee":
          updateEmployee();
          break;

        case "End Session":
        endSession();
        break;
    }
  })
};







