const consoleTable = require("console.table")
const inquirer = require("inquirer")
const mysql = require("mysql")

const connection = mysql.createConnection({
    host:"localhost",
    user: "root",
    password: "1MassEffect",
    database: "employee_trackerDB"
});

connection.connect();


const start = () => {
    inquirer
      .prompt({
        name: 'emp_start',
        type: 'list',
        message: 'what would you like to do?',
        choices: ['add_employee', 'delete_employee', 'update_employee'],
      })
      .then((answer) => {
        if (answer.emp_start === 'add_employee') {
          add_employee();
        } else if (answer.postOrBid === 'BID') {
          bidAuction();
        } else {
          connection.end();
        }
      });
  };