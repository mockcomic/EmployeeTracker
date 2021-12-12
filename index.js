require('dotenv').config()

const mysql = require('mysql2');
const PORT = process.env.PORT || 3001;
const inquirer = require('inquirer');
const question = require('./lib/question');


const db = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: 'employees_db'
    },
    console.log(`Connected to the inventory_db database.`)
);


const addEmployee = () => {
    inquirer.prompt(question.addEmployee).then(data => {
        db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`,
            [data.firstName, data.lastName, data.employeeRole, data.employeeManager], (err, res) => {
                if (err) console.log(err);
                console.table(answers);
                promptUser();
            }
        )
    })
}

const queryDatabase = (sql) => {
    db.query(sql, (err, res) => {
        if (err) console.log(err);
        console.table(res)
        promptUser()
    });
};

function addRole() {
    return inquirer.prompt(question.addRole)
        .then(data => {
            db.query(`INSERT INTO role (title, salary, department_id) VALUES (?,?,?)`, [data.title, data.salary, data.department_id], (err, res) => {
                if (err) {
                    console.log(err);
                }
                console.table(data);
                promptUser();
            });
        });
};

function updateRole() {
    const employee;
    const role;
    db.query(`SELECT * FROM employee ORDER BY last_name`, (err, res) => {
        if (err) console.log(err);
        employee = res.map(({id,first_name,last_name}) => ({
            value: id,
            name: `${first_name} ${last_name}`,
        }));
        });

    db.query(`SELECT * FROM role`, (err, res) => {
         if (err) console.log(err);
         role = res.map(({id,title,salary}) => ({
            value: id,
             title: `${title}`,
             salary: `${salary}`,
             name: `${title}`,
        }));
        });
        
        inquirer.prompt(question.updateEmployeeRole(employee,role)).then(data => {
            db.query(`UPDATE employee SET role_id = ? WHERE id = ?`, [data.role, data.title], (err, res) => {
                if (err) console.log(err);
                promptUser();
            });
        });

};


const promptUser = (questions) => {
    inquirer.prompt(questions)
        .then((data) => {
            if (data.toDo == 'Add Department') addDepartment();
            if (data.toDo == 'View all employees') queryDatabase(`SELECT * FROM employee`);
            if (data.toDo == 'View all Departments') queryDatabase(`SELECT * FROM department`);
            if (data.toDo == 'View all roles') queryDatabase(`SELECT * FROM role`);
            if (data.toDo == 'View all Managers') queryDatabase(`SELECT * FROM employee ORDER BY manager_id`);
            if (data.toDo == 'View all Department') viewAllDepartments();
            if (data.toDo == 'Add Role') addRole();
            if (data.toDo == 'Add Employee') addEmployee();
            if (data.toDo == 'Update Employee Role') updateRole();
            // if (data.toDo == 'Delete Department') deleteDepartment();
            // if (data.toDo == 'Delete Role') deleteRole();
            // if (data.toDo == 'Delete Employee') deleteEmployee();
            if (data.toDo == 'View Budget') viewBudget();
            if (data.toDo == "View Employee's Manager") employeeManager();
            if (data.toDo == "Update Manager") updateManager();
            if (data.toDo == "Quit") db.end();
        })
}

db.connect(function (err) {
    if (err) {
        console.log(err);
        throw err;
    };
    promptUser(question.toDo);
});