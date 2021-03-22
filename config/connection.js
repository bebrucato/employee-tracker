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

function viewDepartments() {
  sequelize.query("SELECT id, name FROM department ", function(err,res) {
    if(err) throw err;
    console.table('Departments', res);
    searching()
  })
};

function viewEmployees() {
  let query = "SELECT employee.id, employee.first_name, employee.last_name, department.name, role.salary, role.title, manager.id "
query +="FROM employee ";
query += "INNER JOIN department ON employee.dept = department.name "; 
query += "INNER JOIN role ON department.id = role.department_id ";
query += "LEFT JOIN manager ON employee.manager_id = manager.id ";

sequelize.query(query, function (err, res) {
  if(err) throw err;
  console.table('Employees', res);
  searching();
  })
};

function employeesByDept() {
  let query = "SELECT department.name, employee.id, employee.first_name, employee.last_name ";
  query += "FROM department ";
  query += "INNER JOIN employee ON employee.dept = department.name ";
  query += "ORDER BY department.name ";
  
  sequelize.query(query, function (err, res) {
    console.table('Employees By Department', res);
    searching();
    })
} 

module.exports = sequelize;