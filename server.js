const inquirer = require("inquirer");
// const { connection } = require("./db");
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
            choices: [ "View Employees", "view by role", "budget by department" ]
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
                case "budget by department":
                    totalbudget();
                    break;

                case "view by role":
                    viewByrole()
                   break;       
                 }
                })
            }

            function viewEmployees() {
                console.log("hit view employees function")
                db.findAllEmployees()
                    .then(([rows]) => {
                        let employees1 = rows;
                        console.table(employees1)
                    })
                    .then(() => mainMenu())
            }
            








            function totalbudget() {
                console.log("hit")
                db.totalbudgets()
                .then(([rows]) => {
                    let budget = rows;
                    console.table(budget)
                })
                .then(() => mainMenu())
              
              }
















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


function   viewByrole() {
    var sql = "SELECT first_name FROM roles";
    let newArr = []
    connections.query(sql, function(err, results){
        if (err){
          throw err;
        }
        newArr = results.map(data=>data.title)
    }).then(function(roles){
        for (i=0; i < roles.length; i++){
           newArr.push(roles[i].title);
        }

        inquirer.prompt({
                      name: "roles",
                      type: "list",
                      message: "Which role would you like to search?",
                      choices: newArr
      
                 }).then((answer) => {
      
                                  const query = `SELECT e.id AS ID, e.first_name AS firstname, e.last_name AS LastName, roles.title AS Title, department.name AS Department, roles.salary AS Salary, concat(m.first_name, ' ' ,  m.last_name) AS Manager 
                                  FROM employee e LEFT JOIN employee m ON e.manager_id = m.id 
                                  INNER JOIN roles ON e.role_id = roles.id 
                                  INNER JOIN department ON roles.department_id = department.id WHERE roles.title = '${answer.roles}';`
                                  connections.query(query, (err, res) => {
                                    if(err) return err;
                                  
                          console.table(res);
                          mainMenu();
                 })
                })
            })                 
    }