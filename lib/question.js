const toDo = {
    type: 'list',
    name: 'toDo',
    message: 'What would you like to do?',
    choices: [
        'Add Department',
        'Add Role',
        'Add Employee',
        'View all employees',
        'View all roles',
        'View all Managers',
        'View all Department',
        'View Budget',
        'Delete Department',
        'Delete Role',
        'Delete Employee',
        'Update Employee Role',
        "Quit"
    ]
};

//console.log(`Added ${department} to the database)
const addDepartment = [{
        name: 'name',
        type: 'input',
        message: 'what is the name of the department?'
    }
]

//console.log(`Added ${role} to the database1)
const addRole = [{
        type: 'input',
        name: 'title',
        message: 'What is the name of the role?',
    },
    {
        type: 'input',
        name: 'salary',
        message: 'What is the salary of the role?'
    },
    {
        type: 'input',
        name: 'departmentID',
        message: 'What department does the role belong to?'
    }
]
//console.log(Added ${employee.firstName + ' ' + employee.lastName} to the database)
const addEmployee = [{
        type: 'input',
        name: 'firstName',
        message: "What is the Employee's first name?"
    },
    {
        type: 'input',
        name: 'lastName',
        message: "What is the Employee's last name?"
    },
    {
        type: 'input',
        name: 'employeeRole',
        message: "What is the employee's role id?",
    },
    {
        type: 'input',
        name: 'employeeManager',
        message: "Who is the employee's manager id?",
    }
];

module.exports = {
    toDo,
    addDepartment,
    addRole,
    addEmployee,
}