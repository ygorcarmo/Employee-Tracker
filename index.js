var inquirer = require('inquirer');
const db = require('./db');
require("console.table");

// let [choices] = db.findAllRoles();
async function roles(){

    // console.log( await db.findRoleforEmployee());
    // await db.findRoleforEmployee().then(([data]) => { return data}) 
    let dbContent = await db.findRoleforEmployee();
    console.log(dbContent[i])
    
}

// roles();
function init(){
    getItGoing();
}

const firstQuestion = [{
    name: "initial",
    type: "list",
    message: "What would you like to do?",
    choices: ["View All Employees", "Add Employee", "Update Employee Role", "View All Roles", 
    "Add Role", "View All Departments", "Add Department",new inquirer.Separator(), "Quit",new inquirer.Separator()],
}];



function getItGoing(){
    inquirer.prompt(firstQuestion).then(res =>{
        switch(res.initial){
            case 'View All Employees': findAllEmployee();
            break;
            case 'Add Employee': inquirer.prompt(employeeQuestion);
            break;
            case 'Update Employee Role': console.log("update employee role");
            break;
            case 'View All Roles': findAllRoles();
            break;
            case 'Add Role': console.log('add role');
            break;
            case 'View All Departments': findAllDepartments();
            break;
            case 'Add department': console.log('add department');
            break;
            case 'Quit': console.log('bye');
            process.exit();
            break;
        }
    });
    
}


function findAllDepartments(){
    db.findAllDepartments().then(([data]) => { console.table(data); getItGoing(); }) 
}
function findAllEmployee(){
    db.findAllEmployee().then(([data]) => { console.table(data); getItGoing(); }) 
}
function findAllRoles(){
    db.findAllRoles().then(([data]) => { console.table(data); getItGoing(); }) 
}

init();
const employeeQuestion = [
    {
        name:"employeeFirstName",
        message:"What is the employee's first name?",
        type:"input"
    },
    {
        name:"employeeLastName",
        message:"What is the employee's last name?",
        type:"input"
    },
    {
        name:"employeeRole",
        message:"What is the employee's role?",
        type:"list",
        choices: async () => {
            let roles = [];
            let dbContent = await db.findRoleforEmployee();
            for( i = 0; i < dbContent.length; i++ ){
                roles[i] = dbContent[i].title;
            }
            return roles;}
    },
    {
        name:"employeeManager",
        message:"What is the employee's role?",
        type:"list",
        // choices:['None',findAllEmployee()]
    },
    
];