module.exports  = async () => {
    const questions = [{
            type: 'input',
            name: 'name',
            message: "Enter employee's name ",
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    return false;
                }
            }
        },
        {
            type: 'confirm',
            name: 'addEmployee',
            message: 'Would you like to add more employees?'
        }
    ]







    
}