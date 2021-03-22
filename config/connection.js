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
  sequelize.query("SELECT id, dept_name FROM department ", function(err,res) {
    if(err) throw err;
    console.table('Departments', res);
    searching()
  })
};

function viewEmployees() {
  let query = "SELECT employee.id, employee.first_name, employee.last_name, department.dept_name, role.salary, role.title, manager.id "
query +="FROM employee ";
query += "INNER JOIN department ON employee.dept = department.dept_name "; 
query += "INNER JOIN role ON department.id = role.department_id ";
query += "LEFT JOIN manager ON employee.manager_id = manager.id ";

sequelize.query(query, function (err, res) {
  if(err) throw err;
  console.table('Employees', res);
  searching();
  })
};

function employeesByDept() {
  let query = "SELECT department.dept_name, employee.id, employee.first_name, employee.last_name ";
query += "FROM department ";
query += "INNER JOIN employee ON employee.dept = department.dept_name ";
query += "ORDER BY department.dept_name ";
  
sequelize.query(query, function (err, res) {
  if(err) throw err;
  console.table('Employees By Department', res);
  searching();
  })
};

function byManager() {
  console.log("View Employees By Manager");
  let query = "SELECT manager.id, manager.manager_name, employee.first_name, employee.last_name ";
  query += "FROM manager ";
  query += "INNER JOIN employee ON manager.id = employee.manager_id ";
  query += "ORDER BY manager.manager_name ";

  sequelize.query(query, function (err, res) {
    if(err) throw err;
    console.table('Employees By Manager', res);
    searching();
    })
};



module.exports = sequelize;