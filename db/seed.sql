 INSERT INTO department (dept_name) 
 VALUES ('History of Magic'), 
        ('Defence Against the Dark Arts'), 
        ('Potions'), 
        ('Astronomy');

INSERT INTO roles (title, salary, department_id)
VALUES ("Dark Arts Professor",100000,2),
        ("Potions Professor", 100000,3),
        ("History of Magic Professor",160000,1),
        ("Astronomy Professor",100000,4);

INSERT INTO employee (first_name, last_name, roles_id) 
VALUES ("Severus", "Snape", 1),
        ("Horace", "Slughorn", 2),
        ("Rubeus", "Hagrid", 4),
        ("Minerva", "McGonagall", 3);