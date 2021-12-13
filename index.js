require('dotenv').config()

const mysql = require('mysql2');
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
                if (err) console.error(err);
                console.table(data);
                promptUser();
            }
        )
    })
}

function addRole() {
    return inquirer.prompt(question.addRole)
        .then(data => {
            db.query(`INSERT INTO role (title, salary, department_id) VALUES (?,?,?)`, [data.title, data.salary, data.departmentID], (err, res) => {
                if (err) console.error(err);
                console.table(data);
                promptUser();
            });
        });
};

function addDepartment() {
    return inquirer.prompt(question.addDepartment)
        .then(data => {
            db.query(`INSERT INTO department (name) VALUES (?)`, [data.name], (err, res) => {
                if (err) console.error(err);
                promptUser();
            });
        });
};


const queryDatabase = (sql) => {
    db.query(sql, (err, res) => {
        if (err) console.error(err);
        console.table(res)
        promptUser()
    });
};



function updateRole() {
    db.query(`SELECT * FROM employee ORDER BY last_name`, (err, res) => {
        if (err) console.error(err);
        const employee = res.map(({
            id,
            first_name,
            last_name
        }) => ({
            value: id,
            name: `${first_name} ${last_name}`,
        }));

        return inquirer.prompt([{
                type: 'list',
                name: 'employeeSelect',
                message: "Which employee's role do you want to update?",
                choices: employee
            }])
            .then((employee) => {
                db.query(`SELECT * FROM role`, (err, res) => {
                    if (err) console.error(err);
                    const role = res.map(({
                        id,
                        title,
                        salary
                    }) => ({
                        value: id,
                        title: `${title}`,
                        salary: `${salary}`,
                        name: `${title}`,
                    }));

                    return inquirer.prompt([{
                            type: 'list',
                            name: 'roleSelect',
                            message: "Which role?",
                            choices: role,
                        }])
                        .then(role => {
                            console.log(role)
                            db.query(`UPDATE employee SET role_id = ? WHERE id = ?`, [role.role, employee.title], (err, res) => {
                                if (err) console.error(err);
                                promptUser();
                            });
                        });
                });
            });
    });
};


function deleteDepartment() {
    db.query(`SELECT * FROM department`, (err, res) => {
        if (err) console.error(err);
        const department = res.map(({
            id,
            name
        }) => ({
            value: id,
            name: `${name}`,
        }));
        return inquirer.prompt([{
            type: 'list',
            name: 'department',
            message: 'Which department to delete?',
            choices: department
        }]).then(data => {
            db.query(`DELETE FROM department WHERE id = ?`, [data.department], (err, res) => {
                if (err) console.error(err);
                promptUser();
            });
        });
    });
};

function deleteRole() {
    db.query(`SELECT * FROM role`, (err, res) => {
        if (err) console.error(err);
        const role = res.map(({ id, title, salary }) => ({
            value: id,
            title: `${title}`,
            salary: `${salary}`,
            name: `${title}`,
        }));
        return inquirer.prompt([{
            type: 'list',
            name: 'role',
            message: 'Which role to delete?',
            choices: role
        }]).then(data => {
            db.query(`DELETE FROM role WHERE id = ?`, [data.role], (err, res) => {
                if (err) console.error(err);
                promptUser();
            });
        });
    });
};

function deleteEmployee(){
    db.query(`SELECT * FROM employee`, (err, res) => {
        if (err) console.error(err);
        const employee = res.map(({ id, first_name, last_name }) => ({
            value: id,
            name: `${first_name} ${last_name}`,
        }));
        return inquirer.prompt([
            {
            type: 'list',
            name: 'name',
            message: 'select employee to delete',
            choices: employee,
            }
        ]).then(employee =>{
                db.query(`DELETE FROM employee WHERE id = ?`, [employee.name], (err, res) => {
                    if (err) console.error(err);
                    promptUser();
                });
        });
    });
};

const promptUser = () => {
    inquirer.prompt(question.toDo)
        .then((data) => {
            if (data.toDo == 'Add Department') addDepartment();
            if (data.toDo == 'Add Role') addRole();
            if (data.toDo == 'Add Employee') addEmployee();
            if (data.toDo == 'View all employees') queryDatabase(`SELECT * FROM employee`);
            if (data.toDo == 'View all Department') queryDatabase(`SELECT * FROM department`);
            if (data.toDo == 'View all roles') queryDatabase(`SELECT * FROM role`);
            if (data.toDo == 'View all Managers') queryDatabase(`SELECT * FROM employee ORDER BY manager_id`);
            if (data.toDo == 'View Budget') queryDatabase(`SELECT department.id, department.name, SUM(role.salary) AS budget FROM employee
                                                            LEFT JOIN role ON employee.role_id = role.id
                                                            LEFT JOIN department ON role.department_id = department.id
                                                            GROUP BY department.id, department.name`);
            if (data.toDo == 'Update Employee Role') updateRole();
            if (data.toDo == 'Delete Department') deleteDepartment();
            if (data.toDo == 'Delete Role') deleteRole();
            if (data.toDo == 'Delete Employee') deleteEmployee();
            if (data.toDo == "Quit") db.end();
        })
}

db.connect(function (err) {
    if (err) {
        console.log(err);
        throw err;
    };
    promptUser();
});