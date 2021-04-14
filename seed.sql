



USE employee_trackerDB;
INSERT INTO department (name)VALUES("sales"),("logistis"),("administration")
INSERT INTO role (title,salary,department_id)VALUES("salesrep",50000,1),("delivery",42000,2),("manager",80000,3)
INSERT INTO employee (first_name,last_name,role_id,manager_id)VALUES("samuel","mcswain",8,7),("maria","mcswain",9,5)