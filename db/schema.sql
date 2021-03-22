DROP DATABASE IF EXISTS employee_tracker_db;
CREATE DATABASE employee_tracker_db;

USE employee_tracker_db;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    dept_name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
    );

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL,
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES department (id),
    PRIMARY KEY (id)
);

CREATE TABLE employee (
   id INT NOT NULL AUTO_INCREMENT,
   first_name VARCHAR(30) NOT NULL,
   last_name VARCHAR(30) NOT NULL,
   dept VARCHAR(30) NOT NULL,
   salary DECIMAL NOT NULL,
   role_id INT NOT NULL,
   manager_id INT,
   FOREIGN KEY (manager_id) REFERENCES employee(id),
   FOREIGN KEY (role_id) REFERENCES role (id),
   PRIMARY KEY (id)
);

CREATE TABLE manager (
    id INT NOT NULL,
    manager_name VARCHAR(30) NOT NULL
);