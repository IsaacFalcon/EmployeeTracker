// dependencies
const mysql = require('mysql');
const inquirer = require('inquirer');


const connection = mysql.createConnection({
    host: 'localhost',

    port: 3001,

    user: 'root',

    // create environment variable
    password: 'NetBex22136490', 

    database: 'manager_db'
});
