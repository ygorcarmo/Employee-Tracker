const connection  = require("./connection");

class DB {
    constructor(connection){
        this.connection = connection;
    }

    findAllDepartments(){
        return this.connection.promise().query(
            "SELECT * FROM department"
        );
    }

    findAllEmployee(){
        return this.connection.promise().query(
            `SELECT e.id, e.first_name, e.last_name, role.title, 
            department.name AS department, role.salary, IFNULL(CONCAT(m.first_name , " " ,  m.last_name), "No Manager") 
            manager FROM employee e LEFT JOIN role ON e.role_id = role.id 
            INNER JOIN department ON role.department_id = department.id 
            LEFT JOIN employee m ON m.id = e.manager_id;`
            
        );
    }
    findAllEmployeebyDepartment(departmentID){
        return this.connection.promise().query(
            `SELECT e.id, e.first_name, e.last_name, role.title, role.salary, IFNULL(CONCAT(m.first_name , " " ,  m.last_name), "No Manager") 
            manager FROM employee e LEFT JOIN role ON e.role_id = role.id 
            INNER JOIN department ON role.department_id = department.id 
            LEFT JOIN employee m ON m.id = e.manager_id
            WHERE department.id = ${departmentID};`
            
        );
    }
    async findAllEmployeebyManager(managerID){
        return await this.connection.promise().query(
            `SELECT e.id, e.first_name, e.last_name, role.title, 
            department.name AS department, role.salary
            FROM employee e LEFT JOIN role ON e.role_id = role.id 
            INNER JOIN department ON role.department_id = department.id
            WHERE manager_id = ${managerID};`
        );
    }
    async findAllEmployeeName(){
        const [names] = await connection.promise().query(
            "SELECT first_name, last_name FROM employee"
        );
        return names;
    }
    async updateEmployeeRole(roleID, employeeID){
        return await this.connection.promise().query(
            `UPDATE employee SET role_id = "${roleID}" WHERE employee.id="${employeeID}"`
        );
    }
    async updateEmployeeManager(managerID, employeeID){
        return await this.connection.promise().query(
            `UPDATE employee SET manager_id = ${managerID} WHERE employee.id="${employeeID}"`
        );
    }
    async findAllRoles(){
        return await this.connection.promise().query(
            "SELECT role.id, role.title, role.salary, department.name AS department FROM role INNER JOIN department ON role.department_id = department.id"
        );
    }

    async findAllEmployeeID(employeeFirstName, employeeLastName){
        const [id] = await this.connection.promise().query(`SELECT id FROM employee WHERE first_name = "${employeeFirstName}" and last_name= "${employeeLastName}"`);
        return id;
    }
    async findRoleforEmployee(){
        const [roles] = await connection.promise().query(
            "SELECT role.id, role.title FROM role"
        );
        return roles;
    }
    async deleteEmployees(employeeID){
        return await this.connection.promise().query(`DELETE FROM employee WHERE id="${employeeID}"`);
    }

    async findManagerforEmployee(){
        const [managers] = await connection.promise().query("SELECT id, first_name, last_name FROM employee WHERE manager_id IS NULL");
        return managers;
    }
    async createEmployee(firstNameInput, lastNameInput, roleInput, managerInput){
        return await this.connection.promise().query(`INSERT INTO employee(first_name, last_name, role_id, manager_id)
         VALUES ("${firstNameInput}", "${lastNameInput}", "${roleInput}", ${managerInput})`);
    }
    async managerID(managerFirstName, managerLastName){
        const [id] = await this.connection.promise().query(`SELECT id FROM employee WHERE first_name = "${managerFirstName}" and last_name= "${managerLastName}"`);
        return id;

    }
    async roleID(roleInput){
        const [role] =await this.connection.promise().query(`SELECT id FROM role WHERE title= "${roleInput}"`);
        return role;
    }
    async findDepartmentforRole(){
        const [department] = await this.connection.promise().query("SELECT * FROM department");
        return department;

    }
    async findDepartmentID(roleDepartment){
        const [id] = await this.connection.promise().query(`SELECT id FROM department WHERE name = "${roleDepartment}"`);
        return id;
    }
    async createRole(roleName, roleSalary, roleDepartment){
        return await this.connection.promise().query(`INSERT INTO role(title, salary, department_id)
        VALUES ("${roleName}", "${roleSalary}", "${roleDepartment}")`);
    }
    async createDepartment(departmentName){
        return await this.connection.promise().query(`INSERT INTO department(name)
        VALUES ("${departmentName}")`);
    }


};
module.exports = new DB(connection);