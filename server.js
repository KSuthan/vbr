const inquirer = require("inquirer");
const { connection } = require("./db");
const db = require("./db")

const connections = require("./db/connection");

    


init();

function init() {
    console.log("*********************")
    console.log(" ❤ ❤ ❤   Welcome to Employee Manager!  ❤ ❤")
    mainMenu()
}

function mainMenu() {
    inquirer.prompt([
        {
            type: "list",
            name: "choice",
            message: "What would you like to do?",
            choices: [ "View Employees", "view Roles","View Departments", "add department", "add role" ,"add employee", "view by role", "view by manager", "view by department", "Update employee role", "Delete employee", " Delete Roles", "Delete Department",
            "total budget" , "budget by department", " Exit Employee Tracker" ],
            pageSize: 15

        },
    ])

    .then(response => {
        console.log(response)
        let userChoice = response.choice;
        console.log(userChoice)
        switch( userChoice ) {
            case "View Employees":
                viewEmployees();
                break;

                case "view Roles":
               viewRoles();
                break;

                case "View Departments":
                viewDepartments();
                break;

                case "add employee":
                addEmployee();
                 break;

                case "view by role":
                 viewByrole()
                break;

                case "view by manager":
                 viewBymanager()
                break;

                case "view by department":
                    viewBydept()
                   break;
          


                case "add department":
                addDeapartment();
                 break;

                case "add role":
                addRole();
                 break;

                 case "Update employee role":
                updateEmpRole();
                break;

                case "Delete employee":
                 deleteEmp();
                    break;

                    case  " Delete Roles":
                        deleteRole();
                           break;
                
                    case   "Delete Department":
                        deleteDept();
                           break;

                case "total budget":
               totalbudget();
                break;

                case "budget by department":
                budgetbydept();
                  break;

                case 'Exit Employee Tracker':
                  connection.end();
                break;    
                 }
                })
            }

     // -----------view all employees----------

function viewEmployees() {
    console.log("hit view employees function")
    db.findAllEmployees()
        .then(([rows]) => {
            let employees1 = rows;
            console.table(employees1)
        })
        .then(() => mainMenu())
}


// ----------view all roles-----------

function viewRoles() {
    console.log("hit view employees function")
    db.findAllroles()
        .then(([rows]) => {
            let employees = rows;
            console.table(employees)
        })
        .then(() => mainMenu())
}


// ---------------viel all departments ----------

function viewDepartments() {
    console.log("hit")
    db.findAllDepartments()
    .then(([rows]) => {
        let employees = rows;
        console.table(employees)
    })
    .then(() => mainMenu())

}



//-------add an employee---------
function addEmployee() {
    inquirer
      .prompt([
        {
          type: "input",
          message: "Enter the employee's first name",
          name: "firstName"
        },
        {
          type: "input",
          message: "Enter the employee's last name",
          name: "lastName"
        },
        {
          type: "input",
          message: "Enter the employee's role ID",
          name: "roleID",
          validate: roleid => {
            let valid = /^\d+(\.\d{0,2})?$/.test(roleid);
            if (valid) {
                return true;
            } else {
                console.log(`. Please enter in a valid number`)
                return false;
        
           } }    
           },
        {
          type: "input",
          message: "Enter the employee's manager ID",
          name: "ManagerID"
        }
      ])
      .then( (answer) =>{
        const newemployee = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${answer.firstName}", "${answer.lastName}", "${answer.roleID}", "${answer.ManagerID}")`
        connection.promise().query( newemployee )
        console.log(`\n EMPLOYEE ${answer.firstName} ${answer.lastName} ADDED \n`)

        })
        .then(() => mainMenu())
    }



 //------ add a department----------
 function addDeapartment() {
    inquirer
    .prompt([
      {
        type: "input",
        message: "Enter the department name",
        name: "departmentname"
      },
    ])
    .then ((answer) => {
        const newDept = `INSERT INTO department (name) VALUES ("${answer.departmentname}")`
        // const newdept = "INSERT INTO department (name) VALUES ("${answer.deprtmentname}")"
        connection.promise().query (newDept)
        console.log(`\n DEPPARTMENT ${answer.departmentname} ADDED \n`)
    
        })
    .then(() => mainMenu())

 }

//--------------add a role------------
function addRole() {
    inquirer
    .prompt([
        {
          type: "input",
          message: "Enter the Title",
          name: "title"
        },
        {
          type: "input",
          message: "Enter the employee's salary",
          name: "salary"
        },
        {
          type: "input",
          message: "department ID",
          name: "deptid"
        }
      ])
      .then ((answer) => {
          const newRole = `INSERT INTO roles (title, salary, department_id) VALUES ("${answer.title}" , ${answer.salary}, ${answer.deptid})`
          connection.promise().query (newRole)
          console.log(`\n Title ${answer.title} ADDED \n`)
          mainMenu();
        })
    
    }


///----------view by role ----------
    function   viewByrole() {
        var sql = "SELECT title FROM roles";
        let newArr = []
        connections.query(sql, function(err, results){
            if (err){
              throw err;
            }
            newArr = results.map(data=>data.title)
            inquirer.prompt({
                          name: "role",
                          type: "list",
                          message: "Which role would you like to search?",
                          choices: newArr,
                          pageSize: 15
          
                     }).then((answer) => {
          
                                      const query = `SELECT e.id AS ID, e.first_name AS firstname, e.last_name AS LastName, roles.title AS Title, department.name AS Department, roles.salary AS Salary, concat(m.first_name, ' ' ,  m.last_name) AS Manager 
                                      FROM employee e LEFT JOIN employee m ON e.manager_id = m.id 
                                      INNER JOIN roles ON e.role_id = roles.id 
                                      INNER JOIN department ON roles.department_id = department.id WHERE roles.title = '${answer.role}';`
                                      connections.query(query, (err, res) => {
                                        if(err) return err;
                                      
                              console.table(res);
                              mainMenu();
                     })
                    })
                })                 
        }




///----------view by manager ----------

function    viewBymanager() {
    var sql = "select first_name from employee where manager_id  IS NULL";
    let manArr = []
    connections.query(sql, function(err, results){
        if (err){
          throw err;
        }
        manArr = results.map(data=>data.first_name)
        inquirer.prompt({
                      name: "manager",
                      type: "list",
                      message: "Which manager would you like to search?",
                      choices: manArr,
                
      
                 }).then((answer) => {
      
                                  const query = `SELECT e.id AS ID, e.first_name AS firstname, e.last_name AS LastName, roles.title AS Title, department.name AS Department, roles.salary AS Salary, concat(m.first_name, ' ' ,  m.last_name) AS Manager 
                                  FROM employee e LEFT JOIN employee m ON e.manager_id = m.id 
                                  INNER JOIN roles ON e.role_id = roles.id 
                                  INNER JOIN department ON roles.department_id = department.id
                                  where  m.first_name = '${answer.manager}';`
                                  connections.query(query, (err, res) => {
                                    if(err) return err;
                                  
                          console.table(res);
                          mainMenu();
                 })
                })
            })                 
    }



    // --------------view by department -------

    
    function   viewBydept() {
        var sql = "select name from department";
        let deptArr = []
        connections.query(sql, function(err, results){
            if (err){
              throw err;
            }
            deptArr = results.map(data=>data.name)
            inquirer.prompt({
                          name: "department",
                          type: "list",
                          message: "Which department would you like to search?",
                          choices: deptArr,
                    
          
                     }).then((answer) => {
          
                                      const query = `SELECT employee.id, employee.first_name, employee.last_name, department.name AS department FROM employee employee 
                                      INNER JOIN roles ON employee.role_id = roles.id 
                                      INNER JOIN department ON roles.department_id = department.id
                                      where department.name= '${answer.department}';`
                                      connections.query(query, (err, res) => {
                                        if(err) return err;
                                      
                              console.table(res);
                              mainMenu();
                     })
                    })
                })                 
        }
    








/// ------- update an employee role-----------

// function  updateEmpRole(){
//     var sql = "SELECT title FROM roles";
//         let newArr = []
//         connections.query(sql, function(err, results){
//             if (err){
//               throw err;
//             }
//             newArr = results.map(data=>data.title)
//             inquirer.prompt({
//                           name: "role",
//                           type: "list",
//                           message: "what is the new role you like to assign?",
//                           choices: newArr,
//                           pageSize: 15

//                         }).then((answer) => {
// }





// --------delete employee -----------

function  deleteEmp(){
    var sql = "select first_name from employee";
    let delEmptArr = []
    connections.query(sql, function(err, results){
        if (err){
          throw err;
        }
        delEmptArr = results.map(data=>data.first_name)
                 inquirer.prompt({
                    name: "Employee",
                    type: "list",
                    message: "Which employee would you like to delete?",
                    choices: delEmptArr
              
    
               }).then((answer) => {
    
                                const query = `delete from employee where first_name = '${answer.Employee}';`
                                connections.query(query, (err, res) => {
                                  if(err) return err;
                                
                                  console.log(`\n Employee ${answer.Employee}  deleted \n`)
                        mainMenu();
               })
              })
    })              
  }
           
  
  /// -------- delete role------
  
  function  deleteRole(){
    var sql = "select title from roles";
    let delroletArr = []
    connections.query(sql, function(err, results){
        if (err){
          throw err;
        }
        delroletArr = results.map(data=>data.title)
                 inquirer.prompt({
                    name: "Role",
                    type: "list",
                    message: "*** WARNING *** Deleting role will delete all employees associated with the role?",
                    choices: delroletArr
              
    
               }).then((answer) => {
    
                                const query = `delete from roles where title = '${answer.Role}';`
                                connections.query(query, (err, res) => {
                                  if(err) return err;
                                
                                  console.log(`\n Employee ${answer.Role}  deleted \n`)
                        mainMenu();
               })
              })
    })              
  }
    

//--- delete department -----

function  deleteDept(){
    var sql = "select name from department";
    let deldeptArr = []
    connections.query(sql, function(err, results){
        if (err){
          throw err;
        }
        deldeptArr = results.map(data=>data.name)
                 inquirer.prompt({
                    name: "department",
                    type: "list",
                    message: "*** WARNING *** Deleting deaprtment will delete role & all employees associated with the department?",
                    choices: deldeptArr
              
    
               }).then((answer) => {
    
                                const query = `delete from department where name = '${answer.department}';`
                                connections.query(query, (err, res) => {
                                  if(err) return err;
                                
                                  console.log(`\n department ${answer.department}  deleted \n`)
                        mainMenu();
               })
              })
    })              
  }
    


    // ----- budget by department///

            function budgetbydept() {
                var sql = "select name from department";
    let budDepArr = []
    connections.query(sql, function(err, results){
        if (err){
          throw err;
        }
        budDepArr= results.map(data=>data.name)
                 inquirer.prompt({
                    name: "department",
                    type: "list",
                    message: "select department to view budget?",
                    choices: budDepArr
              
    
               }).then((answer) => {
    
                                const query = `SELECT  department.name AS department, SUM(salary) AS budget
                                FROM  roles  
                                INNER JOIN department ON roles.department_id = department.id 
                                inner join employee on employee.role_id = roles.id
                                where department.name = '${answer.department}';`
                                connections.query(query, (err, res) => {
                                  if(err) return err;
                                    console.table(res)
                        mainMenu();
               })
              })
    })              
  }




    
            // function totalbudget() {
            //     var sql = "SELECT title FROM roles";
            //     let newArr = []
            //     connections.query(sql, function(err, results){
            //         if (err){
            //           throw err;
            //         }
            //         newArr = results.map(data=>data.title)
            //         inquirer.prompt({
            //                       name: "role",
            //                       type: "list",
            //                       message: "Which role would you like to search?",
            //                       choices: newArr,
            //                       pageSize: 15
                  
            //                  }).then((answer) => {
                  
            //                                   const query = `SELECT roles.title AS title,
            //                                   SUM(salary) AS budget
            //                                   FROM  roles  
            //                                   inner join employee on employee.role_id = roles.id
            //                                   where roles.title = '${answer.role}';`
            //                                   connections.query(query, (err, res) => {
            //                                     if(err) return err;
                                              
            //                           console.table(res);
            //                           mainMenu();
            //                  })
            //                 })
            //             })                 
            //     }















            function totalbudget() {
                console.log("hit")
                db.totalbudgets()
                .then(([rows]) => {
                    let budget = rows;
                    console.table(budget)
                    console.log(`\n department  budget dbudjet\n`)
                
                })
                .then(() => mainMenu())
              
              }


            //   SELECT department_id AS id, 
            //   department.name AS department,
            //   SUM(salary) AS budget
            //   FROM  roles  
            //   INNER JOIN department ON roles.department_id = department.id 
            //   inner join employee on employee.role_id = roles.id
            //   where department.name = "help desk";













            // ----------view all roles-----------
            
    

            // function   viewByrole() {
            //     inquirer.prompt({
            //                   name: "role",
            //                   type: "list",
            //                   message: "Which role would you like to search?",
            //                   choices: ["Developer","Sales Lead" ]
              
            //              })
              
              
            //              .then((answer) => {
              
            //                               const query = `SELECT e.id AS ID, e.first_name AS firstname, e.last_name AS LastName, roles.title AS Title, department.name AS Department, roles.salary AS Salary, concat(m.first_name, ' ' ,  m.last_name) AS Manager 
            //                               FROM employee e LEFT JOIN employee m ON e.manager_id = m.id 
            //                               INNER JOIN roles ON e.role_id = roles.id 
            //                               INNER JOIN department ON roles.department_id = department.id WHERE roles.title = '${answer.role}';`
            //                               connections.query(query, (err, res) => {
            //                                 if(err) return err;
                                          
            //                       console.table(res);
            //                       mainMenu();
            //              })
            //             })
                                          
            //             }

             //----view by roles---


    // function  viewByrole() {

    //     function get_data(callback){
    //       var sql = "SELECT title FROM roles";
    //       db.query(sql, function(err, results){
    //             if (err){
    //               throw err;
    //             }
    //             // console.log(results);
    //             // stuff_i_want = results;  
    //             return callback(results);
    //     })
    //     }
    //     get_data(function(result){
    //       console.log(result)
       
    //        .then(() => {
    //         inquirer.prompt({
    //             name: "role",
    //             type: "list",
    //             message: "Which role would you like to search?",
    //             choices: result

    //        })
    //         .then((answer) => {

               
    //             const query = `SELECT e.id AS ID, e.first_name AS firstname, e.last_name AS LastName, roles.title AS Title, department.name AS Department, roles.salary AS Salary, concat(m.first_name, ' ' ,  m.last_name) AS Manager 
    //             FROM employee e LEFT JOIN employee m ON e.manager_id = m.id 
    //             INNER JOIN roles ON e.role_id = roles.id 
    //             INNER JOIN department ON roles.department_id = department.id WHERE roles.title = '${answer.role}';`
                
    //             connection.query(query, (err, res) => {
    //                 if(err) return err;
    
               
    //                 console.table(res);
    //                 mainMenu();
    //             });
         
    //         });
    //     })
    //   })
    //     }


//     function   viewByrole() {
//         let roleArr = [];
      
//         promisemysql.createConnection(connections)
//                 .then((conn) => {
//                    return conn.query('SELECT name FROM department');
//                 }).then(function(roles){
    
          
//             for (i=0; i < roles.length; i++){
//                 roleArr.push(roles[i].title);
//             }
//         }).then(() => {
//             inquirer.prompt({
//                 name: "role",
//                 type: "list",
//                 message: "Which role would you like to search?",
//                 choices: roleArr
//             }) 

//             const query = `SELECT e.id AS ID, e.first_name AS firstname, e.last_name AS LastName, roles.title AS Title, department.name AS Department, roles.salary AS Salary, concat(m.first_name, ' ' ,  m.last_name) AS Manager 
//               FROM employee e LEFT JOIN employee m ON e.manager_id = m.id 
//               INNER JOIN roles ON e.role_id = roles.id 
//                INNER JOIN department ON roles.department_id = department.id WHERE roles.title = '${answer.role}';`

//             connections.query(query, (err, res) => {
//                 if(err) return err;

//                 // show results using console.table
//                 console.log("\n");
//                 console.table(res);
//                 mainMenu();
//             });
//         });
    //
// }


// function   viewByrole() {
//     var sql = "SELECT first_name FROM roles";
//     let newArr = []
//     connections.query(sql, function(err, results){
//         if (err){
//           throw err;
//         }
//         newArr = results.map(data=>data.title)
//     }).then(function(roles){
//         for (i=0; i < roles.length; i++){
//            newArr.push(roles[i].title);
//         }

//         inquirer.prompt({
//                       name: "roles",
//                       type: "list",
//                       message: "Which role would you like to search?",
//                       choices: newArr,
//                       pageSize: 3
      
//                  }).then((answer) => {
      
//                                   const query = `SELECT e.id AS ID, e.first_name AS firstname, e.last_name AS LastName, roles.title AS Title, department.name AS Department, roles.salary AS Salary, concat(m.first_name, ' ' ,  m.last_name) AS Manager 
//                                   FROM employee e LEFT JOIN employee m ON e.manager_id = m.id 
//                                   INNER JOIN roles ON e.role_id = roles.id 
//                                   INNER JOIN department ON roles.department_id = department.id WHERE roles.title = '${answer.roles}';`
//                                   connections.query(query, (err, res) => {
//                                     if(err) return err;
                                  
//                           console.table(res);
//                           mainMenu();
//                  })
//                 })
//             })                 
//     }


// function   viewByrole() {
//     var sql = "SELECT title FROM roles";
//     let newArr = []
//     connections.query(sql, function(err, results){
//         if (err){
//           throw err;
//         }
//         newArr = results.map(data=>data.title)
//         inquirer.prompt({
//                       name: "role",
//                       type: "list",
//                       message: "Which role would you like to search?",
//                       choices: newArr,
//                       pageSize: 15
      
//                  }).then((answer) => {
      
//                                   const query = `SELECT e.id AS ID, e.first_name AS firstname, e.last_name AS LastName, roles.title AS Title, department.name AS Department, roles.salary AS Salary, concat(m.first_name, ' ' ,  m.last_name) AS Manager 
//                                   FROM employee e LEFT JOIN employee m ON e.manager_id = m.id 
//                                   INNER JOIN roles ON e.role_id = roles.id 
//                                   INNER JOIN department ON roles.department_id = department.id WHERE roles.title = '${answer.role}';`
//                                   connections.query(query, (err, res) => {
//                                     if(err) return err;
                                  
//                           console.table(res);
//                           mainMenu();
//                  })
//                 })
//             })                 
//     }

//     function addRole() {
//         inquirer
//         .prompt([
//             {
//               type: "input",
//               message: "Enter the Title",
//               name: "title"
//             },
//             {
//               type: "input",
//               message: "Enter the employee's salary",
//               name: "salary"
//             },
//             {
//               type: "input",
//               message: "department ID",
//               name: "deptid"
//             }
//           ])
//           .then ((answer) => {
//               const newRole = `INSERT INTO roles (title, salary, department_id) VALUES ("${answer.title}" , ${answer.salary}, ${answer.deptid})`
//               connection.promise().query (newRole)
//               console.log(`\n Title ${answer.title} ADDED \n`)
//               mainMenu();
//             })
        
//         }


//         function totalbudget() {
//             var sql = "SELECT title FROM roles";
//             let newArr = []
//             connections.query(sql, function(err, results){
//                 if (err){
//                   throw err;
//                 }
//                 newArr = results.map(data=>data.title)
//                 inquirer.prompt({
//                               name: "role",
//                               type: "list",
//                               message: "Which role would you like to search?",
//                               choices: newArr,
//                               pageSize: 15
              
//                          }).then((answer) => {
              
//                                           const query = `SELECT roles.title AS title,
//                                           SUM(salary) AS budget
//                                           FROM  roles  
//                                           inner join employee on employee.role_id = roles.id
//                                           where roles.title = '${answer.role}';`
//                                           connections.query(query, (err, res) => {
//                                             if(err) return err;
                                          
//                                   console.table(res);
//                                   mainMenu();
//                          })
//                         })
//                     })                 
//             }