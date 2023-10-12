INSERT INTO department (dept_name)
VALUES ("Legal"), ("Administrative"), ("Programming");

INSERT INTO roles (title, salary, department_id)
VALUES ("Corporate Lawyer", 200000.00, 1), ("Office Manager", 120000.00, 2), ("Software Engineer", 100000.00, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Smith", 1, 1), ("Rebecca", "Jones", 2, 1), ("Ben", "Williams", 3, 2);