const toDo = {
    type: 'list',
    name: 'toDo',
    message: 'What would you like to do?',
    choices: [
        'Add Department',
        'View all employees',
        'View all roles',
        'Add Role',
        'Add Employee',
        'Update Employee Role',
        'Delete Department',
        'Delete Role',
        'Delete Employee',
        'View all Managers',
        'View all Department',
        'View Budget',
        "View Employee's Manager",
        "Update Manager",
        "Quit"
    ]
};

//console.log(`Added ${department} to the database)
const addDepartment = (array) => {
    return [{
        type: 'list',
        name: 'toDo',
        message: 'What is the name of the department?',
        choices: array
    }]
}

//console.log(`Added ${role} to the database1)
const addRole = [{
        type: 'list',
        name: 'toDo',
        message: 'What is the name of the role?',
        choices: ['Customer Service', ]
    },
    {
        type: 'input',
        name: 'salary',
        message: 'What is the salary of the role?'
    },
    {
        type: 'input',
        name: 'roleDepartment',
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
        type: 'list',
        name: 'employeeRole',
        message: "What is the employee's role?",
        choices: ['Customer Service', ]
    },
    {
        type: 'list',
        name: 'employeeManager',
        message: "Who is the employee's manager?",
        choices: ['Ashley Rodriquez', ]
    }
];

const updateEmployeeRole = (arrayEmployee, arrayRole) => {
  return [{
            type: 'list',
            name: 'employeeSelect',
            message: "Which employee's role do you want to update?",
            choices: arrayEmployee
        },
        {
            type: 'list',
            name: 'employeeSelect',
            message: "Which role?",
            choices: arrayRole
        }
    ];
};

module.exports = {
    toDo,
    addDepartment,
    addRole,
    addEmployee,
    updateEmployeeRole
}