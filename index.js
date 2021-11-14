var inquirer = require('inquirer');
const db = require('./db');

const firstQuestion = [{
    name: "initial",
    type: "list",
    message: "What would you like to do?",
    choices: ["View All Employees", "Add Employee", "Update Employee Role", "View All Roles", 
    "Add Role", "View All Departments", "Add Department",new inquirer.Separator(), "Quit",new inquirer.Separator()],
  }];

inquirer.prompt(firstQuestion).then(res =>{
    switch(res.initial){
        case 'View All Employees': console.log("View All Employees");
            break;
        case 'Add Employee': console.log("add employee");
            break;
        case 'Update Employee Role': console.log("update employee role");
            break;
        case 'View All Roles': console.log("VIew all roles");
            break;
        case 'Add Role': console.log('add role');
            break;
        case 'View All Departments': console.log('view all departments');
            break;
        case 'add department': console.log('add department');
            break;
        case 'Quit': console.log('bye');
            break;
    }
});