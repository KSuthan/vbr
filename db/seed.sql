USE inventory_db;

INSERT INTO department 
    (name) 
VALUES
  ("Help Desk"),
    ("HR"),
    ("Web Developer"),
    ("Sales"),
    ("CSR");

    INSERT INTO roles 
    (title, salary, department_id) 
VALUES
    ("System Admin", 80000, 1),
    ("HR manager", 50000, 2),
    ("Developer", 45000, 3),
    ("Sales Lead", 50000, 4),
    ("Technician", 60000, 1),
    ("Service Rep", 30000, 5),
    ("HR assistant", 30000, 2),
    ("Sales Rep", 40000, 4);

INSERT INTO employee
    (first_name, last_name, role_id,manager_id)
VALUES
("Suthan", "kathir", 1,NULL),
("David", "Billa",2,NULL),
("Maran", "Thiru",5,1 ),
("Vinoth", "Suresh", 7,2),
("Fabi", "Ola", 3,1),
("Carol", "Hoa", 4, NULL),
("Ali", "Bai",8,6),
("Tim", "Chow", 6, 1),
("Vimal", "Mahan", 5, 1),
("Rod", "Ford", 8, 6),
("Rod11", "Ford", 8, 6);

