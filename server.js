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

function viewDepartments(){
  connection.query(
    "SELECT department.dept_name FROM employee_tracker_db.department ",
    function (err, res) {
      if (err) throw err;

      inquirer
      .prompt([
        {
          name: "choice",
          type: "list",
          choices: function () {
            var choiceArray = [];
            for (var i = 0; i < res.length; i++) {
              choiceArray.push(res[i].dept_name);
            }
            return choiceArray;
          },
          message: "Please select a department.",
        },
      ])
      .then(function (answer) {
        console.log(answer);
        console.log(answer.choice);

        connection.query(
          `SELECT employee.first_name, employee.last_name, roles.salary, roles.title, department.dept_name as "Department Name"
    FROM employee_tracker_db.employee
    INNER JOIN role ON employee.roles_id = roles.id
    INNER JOIN department ON roles.department_id = department.id
    WHERE department.dept_name LIKE "${answer.choice}"`,
          function (err, res) {
            if (err) throw err;

            console.table(res);
            questions();
          }
        );
      });
  }
);
};

function viewEmployees() {
  connection.query(
    `SELECT employee.first_name, employee.last_name, roles.salary, roles.title, department.dept_name as "Department Name"
    FROM employee_tracker_db.employee
    INNER JOIN role ON employee.role_id = role.id
    INNER JOIN department ON role.department_id = department.id`,

    function (err, res) {
      if (err) throw err;

      console.table(res);
      questions();
    }
  );
}






