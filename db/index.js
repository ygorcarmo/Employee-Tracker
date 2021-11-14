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
            department.name AS department, role.salary, CONCAT(m.first_name , " " ,  m.last_name) 
            manager FROM employee e LEFT JOIN role ON e.role_id = role.id 
            INNER JOIN department ON role.department_id = department.id 
            LEFT JOIN employee m ON m.id = e.manager_id;`
            
        );
    }
    findAllRoles(){
        return this.connection.promise().query(
            "SELECT role.id, role.title, role.salary, department.name AS department FROM role INNER JOIN department ON role.department_id = department.id"
        );
    }
    async findRoleforEmployee(){

        const [roles] = await connection.promise().query(
            "SELECT role.id, role.title FROM role"
        );
        return roles;
        // return this.connection.promise().query(
        //     "SELECT role.id, role.title FROM role"
        // );
    }

};
module.exports = new DB(connection);