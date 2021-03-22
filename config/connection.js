const Sequelize = require('sequelize');
require('dotenv').config();
const inquirer = require('inquirer');
const mySql = require('mysql');
const consoleTable = require('console.table')

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
  }
);

searching();

function searching() {
  inquirer
  .prompt({
    name:"initChoice",
    type:"list",
    message:"Please select how you would like to proceed.",
    choices: ["View Departments", "View Employees", "View Employees By Department", "View Employees By Manager", "Add Employee", "Remove Employee", "Update Employee"]
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
    }
  })
};

function viewDepartments() {
  sequelize.query("SELECT id, name FROM department", function(err,res) {
    if(err) throw err;
    searching();
  })
};

module.exports = sequelize;