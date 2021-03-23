DROP DATABASE IF EXISTS employee_tracker_db;

CREATE database employee_tracker_db;

USE employee_tracker_db;

CREATE TABLE department (
id INTEGER AUTO_INCREMENT NOT NULL PRIMARY KEY,
dept_name VARCHAR(30) NOT NULL 
);

CREATE TABLE roles (
id INTEGER AUTO_INCREMENT NOT NULL PRIMARY KEY,
title VARCHAR(30) NOT NULL,
salary DECIMAL NOT NULL,
department_id INT NOT NULL,
FOREIGN KEY (department_id) REFERENCES department (id)
);

CREATE TABLE employee (
id INTEGER AUTO_INCREMENT NOT NULL PRIMARY KEY,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
roles_id INTEGER NOT NULL,
FOREIGN KEY (roles_id) REFERENCES roles (id),
manager_id INTEGER NULL,
FOREIGN KEY (manager_id) REFERENCES employee (id)
);