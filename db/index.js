
const connection = require("./connection");


class DB {

    constructor(connection){
        this.connection = connection;
    }

    findAllEmployees(){
        return this.connection.promise().query(
            "SELECT employee.id, employee.first_name, employee.last_name, roles.title, department.name AS department, roles.salary, concat(m.first_name, ' ' ,  m.last_name) AS manager FROM employee employee LEFT JOIN employee m ON employee.manager_id = m.id INNER JOIN roles ON employee.role_id = roles.id INNER JOIN department ON roles.department_id = department.id ORDER BY ID ASC;"
        )
    }

      findAllDepartments(){
          return this.connection.promise().query(
          "select id as dept_id, name as department from department;"
          )
      }

    findAllroles(){
        return this.connection.promise().query(
        "SELECT roles.id, roles.title, department.name AS department FROM roles INNER JOIN department ON roles.department_id = department.id;"
            ) 
    }

    findvroles(){
        return this.connection.promise().query(  "SELECT title FROM roles;"
        )
    }
    
    totalbudgets(){
        return this.connection.promise().query( "SELECT SUM(salary) AS budget FROM  roles  INNER JOIN department ON roles.department_id = department.id;" )

    }
    
}



module.exports = new DB(connection);