module.exports = async () => {

    const toDo = [{
        type: 'list',
        name: 'toDo',
        message: 'What would you like to do?',
        choices: ['Add Department', 'Add Role', 'Add Employee', 'Update Employee Role']
    }]
    //console.log(`Added ${department} to the database)
    const addDepartment = [{
        type: 'list',
        name: 'toDo',
        message: 'What is the name of the department?',
        choices: ['Service', ]
    }]

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
    ]

    const updatEmployee = [{
        type: 'list',
        name: 'employeeSelect',
        message: "Which employee's role do you want to update?",
        choices: ['Malia Brown', 'Sarah Lourd', 'Tom Allen', 'Sam Kash', 'John Doe', 'Mike Chan', 'Ashley Rodriquez']
    },
    {
        type: 'list',
        name: 'employeeSelect',
        message: "Which role?",
        choices: ['Customer Service']
    },
 ]
}