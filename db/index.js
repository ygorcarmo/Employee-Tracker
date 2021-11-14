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

    // findAllEmployee(){
    //     return this.connection.promise().query(
    //         "SELECT employee.PK_ID_EMPLOYEE, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary,"
    //     );
    // }

};