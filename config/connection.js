const inquirer = require('inquirer');
const mysql = require('mysql');
const consoleTable = require('console.table');

let connection = mysql.createConnection(
{
  host: "localhost",

  port: 3306,

  user: "root",

  password: "KOOkoo@101",

  database: "employee_tracker_db"
  }
);

connection.connect(function(err) {
  if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
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

function viewDepartments() {
  connection.query("SELECT id, dept_name FROM department ", function(err,res) {
    if(err) throw err;
    console.table('Departments', res);
    searching()
  })
};

function viewEmployees() {
  let query = "SELECT employee.id, employee.first_name, employee.last_name, department.dept_name, roles.salary, roles.title, manager.id "
query +="FROM employee ";
query += "INNER JOIN department ON employee.dept = department.dept_name "; 
query += "INNER JOIN roles ON department.id = roles.department_id ";
query += "LEFT JOIN manager ON employee.manager_id = manager.id ";

connection.query(query, function (err, res) {
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
  
connection.query(query, function (err, res) {
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

  connection.query(query, function (err, res) {
    if(err) throw err;
    console.table('Employees By Manager', res);
    searching();
    })
};

function addEmployee() {
  inquirer
  .prompt([      
    {
      name: "newEmployeeFN",
      type: "input",
      message: "Please enter the new employee's first name."
    },
    {
      name: "newEmployeeLN",
      type: "input",
      message: "Please enter the new employee's last name."
    },
    {
      name: "newEmployeeDept",
      type: "list",
      message: "Please enter the new employee's department.",
      choices: ['Therapy & HR', 'Debt Collection', 'Chiropractic & Firearms', 'Cafeteria and Catering', 'Credit and Lending']
    },
    {
      name: "newEmployeeSalary",
      type: "input",
      message: "Please enter the new employee's salary."
    },
    {
      name: "newEmployeeManager",
      type: "list",
      message: "Please enter the new employee's manager.",
      choices: ["Anthony Soprano", "Christopher Moltisanti", "Furio Giunta", "Nobody/Fuggedaboutit"],
    },
    {
      name: "newEmployeeRole",
      type: "list",
      message: "Please enter the new employee's role.",
      choices: ['Therapist', 'Collections Agent', 'Negotiator', 'Chef', 'Loan Broker']
    }
  ])

  .then(function(answer) {
    var newEmpsMgr = " "

    if (answer.newEmployeeManager === "Anthony Soprano") {
      newEmpsMgr = 1;
    }
 
    if (answer.newEmployeeManager === "Christopher Moltisanti") {
      newEmpsMgr = 3;
    }
    
    if (answer.newEmployeeManager === "Furio Giunta") {
      newEmpsMgr = 6;
    }
    
    if (answer.newEmployeeManager === "Nobody/Fuggedaboutit") {
      newEmpsMgr = null;
    }
    
    var newEmpsRole = " ";
    
    if (answer.newEmployeeRole === 'Therapist') {
      newEmpsRole = 2
    }
    if (answer.newEmployeeRole === 'Collections Agent') {
      newEmpsRole = 3
    }
    if (answer.newEmployeeRole === 'Negotiator') {
      newEmpsRole = 4
    }
    if (answer.newEmployeeRole === 'Chef') {
      newEmpsRole = 5
    }
    if (answer.newEmployeeRole === 'Loan Broker') {
      newEmpsRole = 6
    }

    var query = connection.query(
      "INSERT INTO employee SET ? ",
      {
        first_name: answer.newEmployeeFN,
        last_name: answer.newEmployeeLN,
        dept: answer.newEmployeeDept,
        salary: answer.newEmployeeSalary,
        roles_id: newEmpsRole,
        manager_id: newEmpsMgr
       },
  
      function (err, res) {
        if (err) throw err;
        console.log(res.affectedRows + " employee added!\n");
        searching();
      }
    )
  })
};



