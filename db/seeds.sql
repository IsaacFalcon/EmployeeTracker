INSERT INTO department (name)
VALUES ('Distribution'),
       ('Sales'),
       ('Legal'),
       ('Security'),
       ('Accounting');

INSERT INTO role (title, salary, department_id)
VALUES ('Lead Distributor', 400000, 1),
       ('Sales Lead', 500000, 2),
       ('Legal Advisor', 1000000, 3),
       ('Security Specialist', 250000, 4),
       ('Business Analyst', 300000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Walter', 'White', 1, NULL),
       ('Jesse', 'Pinkman', 2, 1),
       ('Saul', 'Goodman', 3, 1),
       ('Mike', 'Ehrmantraut', 4, 1),
       ('Lydia', 'Rodarte', 5, 1);