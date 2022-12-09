const express = require('express');
const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs');
const mysql = require('mysql2');

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to staff database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: 'noble6mc117',
      database: 'staff_db'
    },
    console.log(`Connected to the staff database.`)
);

//Seeds database with tests
var seed = function() {
    db.query('INSERT INTO departments(name) VALUES ("Teaching),("Management"");', function (err, results) {
        console.log('Seeded!');
    });
}

//Adds department and asks another prompt
var addDepartment = function() {
    inquirer
    .prompt([
        {
            type: 'input',
            name: 'newDep',
            message: 'What do you want to call the new department?'
        }
    ])
    .then((answer) => {
        db.query('INSERT INTO departments(name) VALUES ("' + answer.newDep + '")', function (err, results) {
            console.log('Added!');
            askForAction();
          });
    });
}

//Adds role and asks another prompt
var addRole = function() {
    inquirer
    .prompt([
        {
            type: 'input',
            name: 'newRole',
            message: 'What do you want to call the new role?'
        },
        {
            type: 'input',
            name: 'roleDep',
            message: 'What department is the role in?'
        },
        {
            type: 'input',
            name: 'newSal',
            message: 'How much does this role make a year?'
        }
    ])
    .then((answer) => {
        db.query('INSERT INTO roles(name,department,salery) VALUES ("' + answer.newRole + '","' + answer.roleDep + '","' + answer.newSal + '")', function (err, results) {
            console.log('Added!');
            askForAction();
          });
    });
}

//Adds employee and asks another prompt
var addEmployee = function() {
    inquirer
    .prompt([
        {
            type: 'input',
            name: 'firstName',
            message: 'What is their first name?'
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'What is their last name?'
        },
        {
            type: 'input',
            name: 'role',
            message: 'What role do they have?'
        },
        {
            type: 'input',
            name: 'department',
            message: 'What department do they work in?'
        },
        {
            type: 'input',
            name: 'salery',
            message: 'How much do they make a year?'
        },
        {
            type: 'input',
            name: 'manager',
            message: 'Who is their manager?'
        }
    ])
    .then((answer) => {
        db.query('INSERT INTO employees(firstName,lastName,name,department,salery,manager) VALUES ("' + answer.firstName + '","' + answer.lastName + '","' + answer.role + ',' + answer.department + ',' + answer.salery + ',' + answer.manager + '")', function (err, results) {
            console.log('Added!');
            askForAction();
          });
    });
}

//Provides promts and asks for an action
var askForAction = function() {
    inquirer
    .prompt([
        {
            type: 'list',
            name: 'actions',
            message: 'What action would you like to do?',
            choices: ['View all departments','View all roles','View all employees','Add department','Add role','Add Emplyee','Update employee role','exit']
        }
    ])
    .then((answer) => {
        console.log(answer.actions);
        //View departments
        if(answer.actions === 'View all departments'){
            db.query('SELECT * FROM departments', function (err, results) {
            console.log(results);
            askForAction();
            });
        }
        //View roles
        if(answer.actions === 'View all roles'){
            db.query('SELECT * FROM roles', function (err, results) {
            console.log(results);
            askForAction();
            });
        }
        //View employees
        if(answer.actions === 'View all employees'){
            db.query('SELECT * FROM employees', function (err, results) {
            console.log(results);
            askForAction();
            });
        }
        //Add department
        if(answer.actions === 'Add department'){
            addDepartment();
        }
        //Add role
        if(answer.actions === 'Add role'){
            addRole();
        }
        //Add employee
        if(answer.actions === 'Add Emplyee'){
            addEmployee();
        }
        //Ends application
        if(answer.actions === 'exit'){console.log('done!')}
    });
}

//Opening Prompt
seed();
console.log('-----------------');
console.log('EMPLOYEE MANAGER:');
console.log('-----------------');
//Inquirer to start operations
askForAction();