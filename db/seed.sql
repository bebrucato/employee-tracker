INSERT INTO department (dept_name)
VALUES ('Administration'),
       ('Therapy & HR'),
       ('Debt Collection'),
       ('Chiropractic & Firearms'),
       ('Cafeteria & Catering'),
       ('Credit & Lending');

INSERT INTO role (title, salary, department_id)
VALUES ('Boss of Bosses', 1000000, 1),
       ('Therapist', 75000, 2),
       ('Collections Agent', 100000, 3),
       ('Negotiator', 150000, 4),
       ('Chef', 50000, 5),
       ('Loan Broker', 200000, 6);