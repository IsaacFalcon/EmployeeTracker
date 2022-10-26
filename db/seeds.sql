INSERT INTO department (name)
VALUES ('Distribution'),
       ('Sales'),
       ('Legal'),
       ('Security'),
       ('Accounting');

INSERT INTO role (id, title, salary, department_id)
VALUES (11, 'Lead Distributor', 400000),
       (12, 'Sales Lead', 500000),
       (13, 'Legal Advisor', 1000000),
       (14, 'Security Specialist', 250000),
       (15, 'Business Analyst', 300000);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Walter', 'White', NULL),
       ('Jesse', 'Pinkman', 1),
       ('Saul', 'Goodman', 1),
       ('Mike', 'Ehrmantraut', 1),
       ('Lydia', 'Rodarte', 1);