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
    choices: ["View Employees","View All Employees by Role", "Create a Department", "Create a Role", "Add Employee", "Update Employee", "End Session"]
  })
  .then(function(answer) {
    switch (answer.initChoice) {
        case "View Employees":
          viewEmployees();
          break;

        case "View All Employees by Role":
            viewAllRoles();
             break;

        case "Create a Department":
            createDepartment();
            break;

        case "Create a Role":
           createRole();
           break;

        case "Add Employee":
          addEmployee();
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


function viewEmployees() {
  connection.query(
    `SELECT employee.first_name, employee.last_name, roles.salary, roles.title, department.dept_name as "Department Name"
    FROM employee_tracker_db.employee
    INNER JOIN roles ON employee.roles_id = roles.id
    INNER JOIN department ON roles.department_id = department.id`,

    function (err, res) {
      if (err) throw err;

      console.table(res);
      searching();
    }
  );
};

function viewAllRoles() {
  connection.query("SELECT roles.title FROM employee_tracker_db.roles", function (
    err,
    res
  ) {
    if (err) throw err;

    inquirer
      .prompt([
        {
          name: "choice",
          type: "list",
          choices: function () {
            var choiceArray = [];
            for (var i = 0; i < res.length; i++) {
              choiceArray.push(res[i].title);
            }
            return choiceArray;
          },
          message: "Please select a role.",
        },
      ])
      .then(function (answer) {
        console.log(answer);
        console.log(answer.choice);

        connection.query(
          `SELECT employee.first_name, employee.last_name, roles.salary, roles.title, department.dept_name as "Department Name"
        FROM employee_tracker_db.employee
        INNER JOIN roles ON employee.roles_id = roles.id
        INNER JOIN department ON roles.department_id = department.id
        WHERE roles.title LIKE "${answer.choice}"`,
          function (err, res) {
            if (err) throw err;

            console.table(res);
            searching();
          }
        );
      });
  });
}

function createDepartment() {
  inquirer
    .prompt([
      {
        name: "name",
        type: "input",
        message: "Please enter a department name.",
      },
    ])
    .then(function (answer) {
      connection.query(
        "INSERT INTO department SET ?",
        {
          dept_name: answer.name,
        },
        function (err) {
          if (err) throw err;
          console.log(`You have created a department ${answer.name}.`)
          searching();
        }
      );
    });
}

function createRole() {
  connection.query(
    "SELECT department.dept_name, department.id FROM employee_tracker_db.department",
    function (err, res) {
      if (err) throw err;

      inquirer
        .prompt([
          {
            name: "choice",
            type: "list",
            choices: function () {
              var choiceArray = [];
              var choiceArrayID = [];
              for (var i = 0; i < res.length; i++) {
                choiceArray.push(res[i].dept_name);
                choiceArrayID.push(res[i].id);
              }
              return choiceArray;
            },
            message: "Please select a department.",
          },
          {
            name: "title",
            type: "input",
            message: "Please enter a name for the role.",
          },
          {
            name: "salary",
            type: "input",
            message: "Please enter a salary.",
          },
        ])
        .then(function (answer) {
          var department_id = answer.choice;

          for (var i = 0; i < res.length; i++) {
            if (res[i].dept_name === answer.choice) {
              department_id = res[i].id;
              console.log(department_id);
            }
          }

          connection.query(
            "INSERT INTO roles SET ?",
            {
              title: answer.title,
              salary: answer.salary,
              department_id: department_id,
            },
            function (err) {
              if (err) throw err;

              console.log(`You have created ${answer.title} with salary of ${answer.salary} in ${department_id}.`)

              searching();
            }
          );
        });
    }
  );
}











