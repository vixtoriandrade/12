const mysql = require('mysql2');
const inquirer = require('inquirer');
const consoleTable = require("console.table");
require("dotenv").config();

const connection = mysql.createConnection(
    {
    port: '3306',
    host: 'localhost',
    user: 'root',
    password: process.env.PASSWORD,
    database: 'employees_db'
    },
    console.log('Connection Successful!')
);

connection.connect(function(err) {
    if (err) throw err;

    console.log("connected as id " + connection.threadId);

    startScreen();
   
});

function startScreen() {
    inquirer.prompt({
        name: "option",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "View departments",
            "View roles",
            "View employees",
            "Add department",
            "Add role",
            "Add employee",
            "Update employee role",
            "Close App"
        ],
    
    })
    .then(function(result) {
        console.log("You entered: " + result.option);

        switch (result.option) {
            case "View departments":
                viewDepartment();
                break;
            case "View roles":
                viewRoles();
                break;
            case "View employees":
                viewEmployees();
                break;
            case "Add department":
                addDepartment();
                break;
             case "Add role":
                addRole();
                break;
            case "Add employee":
                addEmployee();
                break;
            case "Update employee role":
                updateEmployee();
                break;
            default:
                quit();
        }
    });
}

function viewDepartment() {
    let query = "SELECT * FROM department";
    connection.query(query, function(err, res) {
        if(err) throw err;
        console.table(res);
        startScreen();
    });
}

function viewRoles() {
    let query = "SELECT * FROM roles";
    connection.query(query, function(err, res) {
        if(err) throw err;
        console.table(res);
        startScreen();
    });

}function viewEmployees() {
    let query = "SELECT * FROM employee";
    connection.query(query, function(err, res) {
        if(err) throw err;
        console.table(res);
        startScreen();
    });
}

function addDepartment() {
    inquirer.prompt({

        type:"input",
        message: "Enter a name for the department.",
        name: "deptName"

    }).then(function(answer) {

        connection.query("INSERT INTO department (dept_name) VALUES (?)", [answer.deptName], function(err, res) {
            if(err) throw err;
            console.table(res)
            startScreen()
        });

    });
}

function addRole() {
    inquirer.prompt([
        {
            type: "input",
            message: "Enter a name for the role.",
            name: "roleName"
        },
        {
            type: "input",
            message: "Enter the salary for the role.",
            name: "salaryTotal"
        },
        {
            type: "input",
            message: "What is the department id number?",
            name: "deptID"
        }
    ])

    .then(function(answer) {
        connection.query
        ("INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)", [answer.roleName, answer.salaryTotal, answer.deptID], function(err, res) {
            if(err) throw err;
            console.table(res);
            startScreen();
        });

    });
}

function addEmployee() {
    inquirer.prompt([
        {
            type: "input",
            message: "Enter the employee's first name.",
            name: "firstName"
        },
        {
            type: "input",
            message: "Enter the employee's last name.",
            name: "lastName"
        },
        {
            type: "input",
            message: "Enter the employee's role id number.",
            name: "roleID"
        },
        {
            type: "input",
            message: "Enter the employee's manager id number.",
            name: "managerID"
        }
    ])

    .then(function(answer) {

        connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [answer.firstName, answer.lastName, answer.roleID, answer.managerID], function(err, res) {
            if (err) throw err;
            console.table(res);
            startScreen();
        });
    });
}

function updateEmployee() {
    inquirer.prompt([
        {
            type: "input",
            message: "Select the employee you would like to update.",
            name: "employeeUpdate"
        },
        {
            type: "input",
            message: "Select new role for the employee.",
            name: "updateRole"
        }
        
    ])

    .then(function(answer) {

        connection.query('UPDATE employee SET role_id=? WHERE first_name=?', [answer.updateRole, answer.employeeUpdate], function(err, res) {
            if(err) throw err;
            console.table(res);
            startScreen();
        });
    });
}

function quit() {
    connection.end();
    process.exit();
}