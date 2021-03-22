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

function searching() {
  inquirer
  .prompt({
    name:"initChoice",
    type:"list",
    message:"Please select how you would like to proceed.",
    choices: ["View Departments", "View Employees", "View Employees By Department", "View Employees By Manager", "Add Employee", "Remove Employee", "Update Employee"]
  })
}

module.exports = sequelize;