// dependencies
const mysql = require('mysql');
const inquirer = require('inquirer');

require('dotenv').config();

const connection = mysql.createConnection({
    host: 'localhost',

    port: 3306,

    user: process.env.DB_USER,

    // create environment variable
    password: process.env.DB_PASSWORD, 

    database: process.env.DB_NAME
});
connection.connect(function(err){
    if (err) throw err;
    mainPrompt();
});

console.log(`
--------------------------------------------------
|  -------------------------------------------   |
|  |                                          |  |
|  |        **WELCOME  TO**                   |  |                
|  |                                          |  |
|  |             **EMPLOYEE**                 |  |               
|  |                                          |  |
|  |                    **MANAGER!**          |  |                  
|  --------------------------------------------  |
--------------------------------------------------`);

function mainPrompt() {
    inquirer.prompt({
      type: 'list',
      name: 'task',
      message: 'What would you like to do?',
      choices: [
        'View All Departments',
        'View All Roles',
        'View All Employees',
        'Add a department',
        'Add a Role',
        'Add an Employee',
        'Update an Employee Role',
        'Delete Employee',
        'DONE']
    }).then(function(response){
        if(response.task === 'View All Departments') {
            viewDep();
        } else if(response.task === 'View All Roles') {
            viewRoles();
        } else if(response.task === 'View All Employees') {
            viewEmpl();
        } else if(response.task === 'Add a department') {
            addDep();
        } else if(response.task === 'Add a Role') {
            addRole();
        } else if(response.task === 'Add an Employee') {
            addEmpl();
        } else if(response.task === 'Update an Employee Role') {
            updateRole();
        } else if(response.task === 'Delete Employee') {
            deleteEmpl();
        } else if(response.task === 'DONE') {
            console.log('Goodbye');
            connection.end();
        }
    });
};

function viewDep() {
   console.log('viewing all departments');
   connection.query('SELECT * FROM department', (err, res) => {
    if(err) throw err;
    console.table(res);
    mainPrompt();
   })
};

function viewRoles() {
    console.log('viewing all roles');
    connection.query('SELECT * FROM role', (err, res) => {
    if(err) throw err;
    console.table(res);
    mainPrompt();
    })
};

function viewEmpl() {
    console.log('viewing all employees');
    connection.query('SELECT * FROM employee', (err, res) => {
    if(err) throw err;
    console.table(res);
    mainPrompt();
    })
};

function addDep() {
    console.log('adding department');
    connection.query('SELECT * FROM department', (err, res) => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'depName',
            message: 'What is the new departments name?'
        }
    ]).then(data => {
        let depName = res.find(department => department.name === data.depName)
        connection.query('insert into department set ?', {
           name: data.depName 
        });
        mainPrompt();
    })
})};

function addRole() {
    console.log('adding role');
    connection.query('SELECT * FROM department', (err, res) => {
        inquirer.prompt([
            {
                type: 'input',
                name: 'roleName',
                message: 'What is the name of the role?'
            },
            {
                type: 'input',
                name: 'salary',
                message: 'What is the salary of the new role?'
            },
            {
                type: 'list',
                name: 'depName',
                message: 'What department does the role belong to?',
                choices: res.map(department => department.name)
            }
        ]).then(data => {
            let depName = res.find(department => department.name === data.depName)
            connection.query('insert into role set ?', {
             title: data.roleName,
             salary: data.salary,
             department_id: depName.id
           });
           mainPrompt();
        })
    })
};

function addEmpl() {
    console.log('adding employee');
    connection.query('SELECT * FROM role', (err, res) => {
        inquirer.prompt([
            {
                type: 'input',
                name: 'firstName',
                message: 'What is the new employees first name?'
            },
            {
                type: 'input',
                name: 'lastName',
                message: 'What is the new employees last name?'
            },
            {
                type: 'list',
                name: 'roleTitle',
                message: 'Please Select a role for the new employee',
                choices: res.map(role => role.title)
            }
        ]).then(data => {
           let roleTitle = res.find(role => role.title === data.roleTitle)
           connection.query('insert into employee set ?', {
            first_name: data.firstName,
            last_name: data.lastName,
            role_id: roleTitle.id,
            manager_id: 1
           });
           mainPrompt();
        })
    }); 
    
};

function updateRole() {
    console.log('updating employee role');
    connection.query('SELECT DISTINCT * FROM employee', (err, res) => {
        if(err) throw err
        inquirer.prompt([
            {
                type: 'list',
                name: 'employeeSelect',
                message: 'Which employees role do you want to update?',
                choices: res.map(employee => employee.first_name + " " + employee.last_name)
            },
           
        ]).then(data => {
            const chosenEmployee = res.find(employee => employee.first_name + " " + employee.last_name === data.employeeSelect)
            connection.query('SELECT * FROM role', (err, res) => {
                inquirer.prompt([
                    {
                        type: 'list',
                        name: 'newRole',
                        message: 'Which role do you want to assign to the selected employee?',
                        choices: res.map(role => role.title)
                    }
                ]).then(data => {
                    const chosenRole = res.find(role => role.title === data.newRole)
                    connection.query('update employee set role_id = ? where id = ?', [chosenRole.id, chosenEmployee.id])
                    mainPrompt();
                })
            })
        })
    });
};


function deleteEmpl() {
    console.log('deleting employee');
    connection.query('SELECT * FROM role', (err, res) => {
        inquirer.prompt([
            {
                type: 'input',
                name: 'firstName',
                message: 'What is the employees first name?'
            },
            {
                type: 'input',
                name: 'lastName',
                message: 'What is the employees last name?'
            }
        ]).then(function(data) {
        connection.query('DELETE FROM employee WHERE first_name = ? and last_name = ?', [
            data.firstName,
            data.lastName,
            ],
             function (err) {
                if (err) throw err;
            console.log(`\n ${data.firstName} ${data.lastName} has been deleted from the database... \n`)
            })
            mainPrompt();
        })
    })
};