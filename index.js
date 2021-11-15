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
    choices: ["View All Employees", "View Employees by Manager", "View Employees by Department", "Add Employee", "Update Employee Role", "Update Employee Manager","Delete Employee", "View All Roles", 
    "Add Role", "Delete Role","View All Departments", "View the total utilized budget of a department", "Delete Department", "Add Department",new inquirer.Separator(), "Quit",new inquirer.Separator()],
}];



function getItGoing(){
    inquirer.prompt(firstQuestion).then(res =>{
        switch(res.initial){
            case 'View All Employees': findAllEmployee();
            break;
            case 'View Employees by Manager': findAllEmployeebyManager();
            break;
            case 'View Employees by Department': findAllEmployeebyDepartment();
            break;
            case 'Add Employee': addEmployee();
            break;
            case 'Update Employee Role': updateEmployee();
            break;
            case 'Update Employee Manager': updateEmployeeManager();
            break;
            case 'Delete Employee': deleteEmployee();
            break;
            case 'View All Roles': findAllRoles();
            break;
            case 'Add Role': addRole();
            break;
            case 'Delete Role': deleteRole();
            break;
            case 'View All Departments': findAllDepartments();
            break;
            case 'View the total utilized budget of a department': sumofDepartment();
            break;
            case 'Add Department': addDepartment();
            break;
            case 'Delete Department': deleteDepartment();
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
async function findAllEmployeebyManager(){
    await inquirer.prompt(employeeByManager).then((res) =>{
        managerInput = res.employeeManager;
    })
    let fullName = managerInput.split(" ");
    let managerFirstName = fullName[0];
    let managerLastName = fullName[1];            
    newManager = await db.managerID(managerFirstName,managerLastName);
    db.findAllEmployeebyManager(newManager[0].id).then(([data]) => { console.table(data); getItGoing(); })  
}
async function findAllEmployeebyDepartment(){
    await inquirer.prompt(employeebyDepartment).then((res) =>{
        roleDepartment = res.roleDepartment;
    })
    departmentID = await db.findDepartmentID(roleDepartment); 
    db.findAllEmployeebyDepartment(departmentID[0].id).then(([data]) => { console.table(data); getItGoing(); })

}
async function deleteDepartment(){
    await inquirer.prompt(choiceDeleteDepartment).then((res) =>{
        roleDepartment = res.roleDepartment;
    })
    departmentID = await db.findDepartmentID(roleDepartment);
    db.deleteDepartment(departmentID[0].id);
    getItGoing(); 
};
async function sumofDepartment(){
    await inquirer.prompt(choiceDeleteDepartment).then((res) =>{
        roleDepartment = res.roleDepartment;
    })
    departmentID = await db.findDepartmentID(roleDepartment);
    db.findSumofDepartmet(departmentID[0].id).then(([data]) => { console.table(data); getItGoing(); });
    
};
async function deleteRole(){
    await inquirer.prompt(choiceDeleteRole).then((res) =>{
        roleInput =  res.employeeRole;
    })

    let roleChosen = await db.roleID(roleInput);
    db.deleteRole(roleChosen[0].id);
    getItGoing();
};

init();
const choiceDeleteRole = [
    {
        name:"employeeRole",
        message:"Which role do you want to assing the selected employee?",
        type:"list",
        choices: async () => {
            let roles = [];
            let dbContent = await db.findRoleforEmployee();
            for( i = 0; i < dbContent.length; i++ ){
                roles[i] = dbContent[i].title;
            }
            return roles;
        }
    }    
];
const choiceDeleteDepartment = [
    {
        name:"roleDepartment",
        message:"Choose a Department!",
        type:"list",
        choices: async () => {
            let department = [];
            let dbContent = await db.findDepartmentforRole();
            for( i = 0; i < dbContent.length; i++ ){
                department[i] = dbContent[i].name;
            }
            return department;}
    }
];
const employeebyDepartment = [
    {
        name:"roleDepartment",
        message:"Choose a Department!",
        type:"list",
        choices: async () => {
            let department = [];
            let dbContent = await db.findDepartmentforRole();
            for( i = 0; i < dbContent.length; i++ ){
                department[i] = dbContent[i].name;
            }
            return department;}
    }
];
const employeeByManager= [
    {
        name:"employeeManager",
        message:"Choose a manager!",
        type:"list",
        choices:async() => {
            let managers = [];
            let dbContent = await db.findManagerforEmployee();
            for( i = 0; i < dbContent.length; i++ ){
                managers[i] = dbContent[i].first_name+" "+dbContent[i].last_name;
            }
            return managers;
        } 
    }

];
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
        message:"What is the employee's manager?",
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

const updateEmployeeQuestion = [
    {
        name:"employeeName",
        message:"Which employee's role do you want to update?",
        type:"list",
        choices: async () => {
            let roles = [];
            let dbContent = await db.findAllEmployeeName();
            for( i = 0; i < dbContent.length; i++ ){
                roles[i] = dbContent[i].first_name+" "+dbContent[i].last_name;
            }
            return roles;
        }
    },
    {
        name:"employeeNewRole",
        message:"Which role do you want to assing the selected employee?",
        type:"list",
        choices: async () => {
            let roles = [];
            let dbContent = await db.findRoleforEmployee();
            for( i = 0; i < dbContent.length; i++ ){
                roles[i] = dbContent[i].title;
            }
            return roles;
        }
    }    
]; 

const deleteEmployeeQuestion = [
    {
        name:"employeeName",
        message:"Which employee do you want to delete?",
        type:"list",
        choices: async () => {
            let roles = [];
            let dbContent = await db.findAllEmployeeName();
            for( i = 0; i < dbContent.length; i++ ){
                roles[i] = dbContent[i].first_name+" "+dbContent[i].last_name;
            }
            return roles;
        }
    }
];
const newEmployeeManager = [
    {
        name:"employeeName",
        message:"Which employee's manager do you want to update?",
        type:"list",
        choices: async () => {
            let roles = [];
            let dbContent = await db.findAllEmployeeName();
            for( i = 0; i < dbContent.length; i++ ){
                roles[i] = dbContent[i].first_name+" "+dbContent[i].last_name;
            }
            return roles;
        }
    },
    {
        name:"employeeManager",
        message:"What is the employee's manager?",
        type:"list",
        choices:async() => {
            let managers = ["None"];
            let dbContent = await db.findManagerforEmployee();
            for( i = 0; i < dbContent.length; i++ ){
                managers[i+1] = dbContent[i].first_name+" "+dbContent[i].last_name;
            }
            return managers;
        } 
    }
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

async function updateEmployee(){
    await inquirer.prompt(updateEmployeeQuestion).then((res) =>{
        fullName = res.employeeName.split(" ");
        employeeFirstName = fullName[0];
        employeeLastName = fullName[1];    
        newRole =  res.employeeNewRole;
    });
    let roleChosen = await db.roleID(newRole);
    employee = await db.findAllEmployeeID(employeeFirstName,employeeLastName);
    db.updateEmployeeRole(roleChosen[0].id,employee[0].id);
    getItGoing();

};

async function deleteEmployee(){
    await inquirer.prompt(deleteEmployeeQuestion).then((res) => {
        fullName = res.employeeName.split(" ");
        employeeFirstName = fullName[0];
        employeeLastName = fullName[1];
    })
    employee = await db.findAllEmployeeID(employeeFirstName,employeeLastName);
    db.deleteEmployees(employee[0].id);
    getItGoing();
};

async function updateEmployeeManager(){
    await inquirer.prompt(newEmployeeManager).then((res) => {
            fullName = res.employeeName.split(" ");
            employeeFirstName = fullName[0];
            employeeLastName = fullName[1];
            managerInput = res.employeeManager;        
    })
    if(managerInput === "None"){
        newManager = null;
    }else{
            let fullName = managerInput.split(" ");
            let managerFirstName = fullName[0];
            let managerLastName = fullName[1];            
            newManager = await db.managerID(managerFirstName,managerLastName);         
    }
    employee = await db.findAllEmployeeID(employeeFirstName,employeeLastName);
    
    if(newManager === null){
        db.updateEmployeeManager(newManager, employee[0].id);
    }else{
        db.updateEmployeeManager(newManager[0].id, employee[0].id);
    }
    getItGoing();
};