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
            case 'Add Employee': addEmployee();
            break;
            case 'Update Employee Role': console.log("update employee role");
            break;
            case 'View All Roles': findAllRoles();
            break;
            case 'Add Role': addRole();
            break;
            case 'View All Departments': findAllDepartments();
            break;
            case 'Add Department': addDepartment();
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
        choices:async() => {
            let managers = ["None"];
            let dbContent = await db.findManagerforEmployee();
            for( i = 0; i < dbContent.length; i++ ){
                managers[i+1] = dbContent[i].first_name+" "+dbContent[i].last_name;
            }
            return managers;
        } 
    },
    
];
const departmentQuestion = [
    {
        name:"departmentName",
        message:"What is the department's name?",
        type:"input"
    }
    
];
const roleQuestion = [
    {
        name:"roleName",
        message:"What is the role's name ?",
        type:"input"
    },
    {
        name:"roleSalary",
        message:"What is the role's salary ?",
        type:"input"
    },
    {
        name:"roleDepartment",
        message:"What is the role's department ?",
        type:"list",
        choices: async () => {
            let department = [];
            let dbContent = await db.findDepartmentforRole();
            for( i = 0; i < dbContent.length; i++ ){
                department[i] = dbContent[i].name;
            }
            return department;}
    },


];

async function addEmployee(){
    let newManager;

    await inquirer.prompt(employeeQuestion).then((res) => {
        firstNameInput = res.employeeFirstName.trim();
        lastNameInput = res.employeeLastName.trim();
        roleInput =  res.employeeRole;
        managerInput = res.employeeManager;
    });
    if(managerInput === "None"){
        newManager = null;
    }else{
            let fullName = managerInput.split(" ");
            let managerFirstName = fullName[0];
            let managerLastName = fullName[1];            
            newManager = await db.managerID(managerFirstName,managerLastName);         
    }

    let roleChosen = await db.roleID(roleInput);
    if(newManager === null){
        db.createEmployee(firstNameInput, lastNameInput, roleChosen[0].id, newManager);
    }else{
        db.createEmployee(firstNameInput, lastNameInput, roleChosen[0].id, newManager[0].id);
    }
    getItGoing();    
}


async function addDepartment(){
    await inquirer.prompt(departmentQuestion).then((res) =>{
        departmentName = res.departmentName;
    })
    db.createDepartment(departmentName);
    getItGoing();
};
async function addRole(){
    await inquirer.prompt(roleQuestion).then((res) => {
        roleName = res.roleName;
        roleSalary = res.roleSalary;
        roleDepartment = res.roleDepartment;
    })
    departmentID = await db.findDepartmentID(roleDepartment);    
    db.createRole(roleName, roleSalary, departmentID[0].id);

    getItGoing(); 

};
