require('dotenv').config()

const mysql = require('mysql2');
const PORT = process.env.PORT || 3001;
const inquirer = require('inquirer');
const {} = require('./lib/question');
process.env.db_Pass




const db = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: 'inventory_db'
    },
    console.log(`Connected to the inventory_db database.`)
);


function showAll(table) {
    console.log(table);
    db.query((`SELECT * FROM ${table}`), (err, res) => {
        if (err) {
            console.log(err);
        }
        console.table(res);
    });
    init();
}

const deleteEntry = (table, number) => {
    db.query(`DELETE FROM ${table} WHERE id = ${number}`, (err, result) => {
        if (err) {
            console.log(err);
        }
        console.log(result);
    });

}

const singleEntry = (table, id) => {
    db.query(`SELECT * FROM ${table} WHERE id = ${id}`, (err, row) => {
        if (err) {
            console.log(err);
        }
        console.log(row);
    });
}

const addEntry = (table, id) => {
    const createEntry = () => {
        const sql = `INSERT INTO ${table} (${id}, first_name, last_name, industry_connected) 
              VALUES (?,?,?,?)`;
        const params = [1, 'Ronald', 'Firbank', 1];

        db.query(sql, params, (err, result) => {
            if (err) {
                console.log(err);
            }
            console.log(result);
        });
    }
}

const init = () => {

    inquirer.prompt(questions).then((data) => {
        console.log(data)
    });
}

init();