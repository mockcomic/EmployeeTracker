INSERT INTO department(name)
VALUES("Service"),
      ("Sales"),
      ("Engineering"),
      ("Finance"),
      ("Legal");


INSERT INTO role(title,salary,department_id)
VALUES
      ('Salesperson','80000',2),
      ('Lead Engineer','150000',3),
      ('Accountant','100000',4),
      ('Customer Service','50000',1),
      ('Lawyer','150000',5),
      ('Legal assistant','75000',5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
      ('James', 'Fraser',1,Null),
      ('Jack', 'London',3,Null),
      ('Robert', 'Bruce',5,Null),
      ('Peter', 'Greenaway',1,Null),
      ('Derek', 'Jarman',1,4),
      ('Paolo', 'Pasolini',2,2),
      ('Heathcote', 'Williams',3,3),
      ('Sandy', 'Powell',1,3),
      ('Emil', 'Zola',4,Null),
      ('Sissy', 'Coalpits',4,2),
      ('Antoinette', 'Capet',1,2),
      ('Samuel', 'Delany',2,Null);
