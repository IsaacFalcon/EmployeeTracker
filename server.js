// dependencies
const mysql = require('mysql');
const inquirer = require('inquirer');


const connection = mysql.createConnection({
    host: 'localhost',

    port: 3001,

    user: '',

    // create environment variable
    password: '', 

    database: 'manager_db'
});

function mainPrompt() {
    inquirer.prompt({
      type: 'list',
      name: 'task',
      massage: 'What would you like to do?',
      choices: [
        'View All Departments',
        'View All Roles',
        'View All Employees',
        'Add a department',
        'Add a Role',
        'Add an Employee',
        'Update an Employee Role',
        'Update Employee Managers',
        'DONE']
    });
};

function viewDep() {
  console.log('viewing all departments');

};

function viewRoles() {
    console.log('viewing all roles');

};

function viewEmpl() {
    console.log('viewing all employees');

};

function addDep() {
    console.log('adding department');

};

function AddRole() {
    console.log('adding role');

};

function AddEmpl() {
    console.log('adding employee');

};

function updateRole() {
    console.log('updating role');

};

function updateManager() {
    console.log('updating manager');

};
