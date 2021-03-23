USE employee_tracker_db;

INSERT INTO department (dept_name)
VALUES ('History of Magic'),
       ('Defence Against The Dark Arts'),
       ('Astronomy'),
       ('Potions');

INSERT INTO employee (first_name, last_name, dept, salary, manager_id, roles_id)
VALUES ('Rubeus','Hagrid', 'Potions', 100000, 1, 1),
        ('Severus', 'Snape', 'Defence Against The Dark Arts', 80000, 2, 2),
        ('Minerva', 'McGonagall', 'History of Magic', 200000, 3, 3),
        ('Horace', 'Slughorn', 'Astronomy', 120000, 4, 4);

SELECT * FROM employee;
SELECT * FROM roles;
SELECT * FROM department;
SELECT * FROM manager; 