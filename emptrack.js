


const consoleTable = require("console.table")
const inquirer = require("inquirer")
const mysql = require("mysql")

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1MassEffect",
  database: "employee_trackerDB"
});



const start = () => {
  inquirer
    .prompt({
      name: 'emp_start',
      type: 'list',
      message: 'what would you like to do?',
      choices: ['add_employee', 'delete_employee', 'update_employee', 'add_role', 'add_department'],
    })
    .then((answer) => {
      if (answer.emp_start === 'add_employee') {
        add_employee();
      } else if (answer.delete_employee === 'delete_employee') {
        delete_employee();
      } else if (answer.update_employee === 'update_employee') {
        update_employee();
      } else if (answer.add_role === 'add_role') {
        add_role();
      } else if (answer.add_department === 'add_department') {
        add_department();


      } else {
        connection.end();
      }
    });
};

const add_employee = () => {
  // make request for all employees that have manager role_id (3)
  // map managers to a list of their names
  // use that for the array in question 3

  inquirer
    .prompt([
      {
        name: 'add_emp',
        type: 'input',
        message: 'What is the first name of the employee?',
      },
      {
        name: 'add_emplast',
        type: 'input',
        message: 'What is the employees last name?'
      },

      {
        name: 'manager',
        type: 'list',
        message: 'Who is the employees manager?',
        choices: ["Maria", "Ben", "Sam", "null"]
      },
    ])
    .then((answer) => {
      // find the manager that was selected from array of managers above
      // use that managers id within the query``
      connection.query(
        'INSERT INTO employee SET ?',
        {
          first_name: answer.add_emp,
          last_name: answer.add_emplast,
          manager_id: answer.manager,
        },
        (err) => {
          if (err) throw err;
          console.log('Employee has been added');
          start();
        }
      );
    });
};

const update_employee = () => {
  inquirer
    .prompt([
      {
        name: 'emp_title',
        type: 'input',
        message: 'What is the title of the employee?',
      },
      {
        name: 'emp_salary',
        type: 'input',
        message: 'What is the employees salary?'
      },
    ])
    .then((answer) => {
      connection.query(
        'INSERT INTO role SET ?',
        {
          title: answer.emp_title,
          salary: answer.emp_salary,
          department_id: answer.emp_id,
        },
        (err) => {
          if (err) throw err;
          console.log('Employee has been updated');
          start();
        }
      );
    });
};

const add_role = () => {
  inquirer
    .prompt([
      {
        name: 'change_role',
        type: 'input',
        message: 'What is the new role of the employee?',
        choices: ["engineer", "human resources", "janitor", "teacher", "null"]
      },
      {
        name: 'manager_role',
        type: 'input',
        message: 'What is the role of the manager?'
      },

      {
        name: 'man_emp',
        type: 'list',
        message: 'Who is the employees  manager?',
        choices: ["Maria", "Ben", "Sam", "null"]
      },
    ])
    .then((answer) => {
      connection.query(
        'INSERT INTO employee SET ?',
        {
          role_id: answer.change_role,
          manager_id: manager_role,
        },
        (err) => {
          if (err) throw err;
          console.log('Employee role has been updated');
          start();
        }
      );
    });
};

const add_department = () => {
  inquirer
    .prompt([
      {
        name: 'add_department',
        type: 'input',
        message: 'What is the new department',
      },
    ])
    .then((answer) => {
      connection.query(
        'INSERT INTO department SET ?',
        {
          first_name: answer.add_emp,
          last_name: answer.add_emplast,
          manager_id: answer.man_emp,
        },
        (err) => {
          if (err) throw err;
          console.log('department has been updated');
          start();
        }
      );
    });
};

connection.connect((err) => {
  if (err) throw err;
  start();
});