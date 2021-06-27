const waitPort = require('wait-port');
const fs = require('fs');
const mysql = require('mysql');
const Sentry = require("@sentry/node");

const {
    MYSQL_HOST: HOST,
    MYSQL_USER: USER,
    MYSQL_PASSWORD: PASSWORD,
    MYSQL_DB: DB,
} = process.env;

let pool;

async function init() {
    const host = HOST ? HOST : 'localhost';
    const user = USER ? USER : 'root';
    const password = PASSWORD ? PASSWORD : '123456';
    const database = DB ? DB: 'tareas';

    const transaction = Sentry.startTransaction({
        op: "Conexion",
        name: "Conexion BD",
    });

    try {
        pool = mysql.createPool({
            connectionLimit: 5,
            host,
            user,
            password,
            database,
        });

        if(await waitPort({ host, port : 3306, timeout: 10000 })){
            return new Promise((acc, rej) => {
                pool.query(
                    'CREATE TABLE IF NOT EXISTS todo_items (id varchar(36), name varchar(255), completed boolean)',
                    err => {
                        if (err) return rej(err);

                        console.log(`Connected to mysql db at host ${host}`);
                        Sentry.captureMessage(`Connected to mysql db at host ${host}`);
                        acc();
                    },
                );
            });
        }else{
            throw "Error en conexion a la bd";
        }
    } catch (e) {
        Sentry.captureException(e);
    } finally {
        transaction.finish();
    }

}

async function teardown() {
    return new Promise((acc, rej) => {
        pool.end(err => {
            if (err) rej(err);
            else acc();
        });
    });
}

async function getItems() {
    return new Promise((acc, rej) => {
        pool.query('SELECT * FROM todo_items', (err, rows) => {
            
            if (err){
                return rej(err);
            } 
            acc(
                rows.map(item =>
                    Object.assign({}, item, {
                        completed: item.completed === 1,
                    }),
                ),
            );
        });
    });
}

async function getItem(id) {
    return new Promise((acc, rej) => {
        pool.query('SELECT * FROM todo_items WHERE id=?', [id], (err, rows) => {
            
            if (err) return rej(err);
            acc(
                rows.map(item =>
                    Object.assign({}, item, {
                        completed: item.completed === 1,
                    }),
                )[0],
            );
        });
    });
}

async function storeItem(item) {
    return new Promise((acc, rej) => {
        pool.query(
            'INSERT INTO todo_items (id, name, completed) VALUES (?, ?, ?)',
            [item.id, item.name, item.completed ? 1 : 0],
            err => {
                if (err) return rej(err);
                acc();
            },
        );
    });
}

async function updateItem(id, item) {
    return new Promise((acc, rej) => {
        pool.query(
            'UPDATE todo_items SET name=?, completed=? WHERE id=?',
            [item.name, item.completed ? 1 : 0, id],
            err => {
                if (err) return rej(err);
                acc();
            },
        );
    });
}

async function removeItem(id) {
    return new Promise((acc, rej) => {
        pool.query('DELETE FROM todo_items WHERE id = ?', [id], err => {
            if (err) return rej(err);
            Sentry.captureMessage(`remove item: ${id}`);
            acc();
        });
    });
}

module.exports = {
    init,
    teardown,
    getItems,
    getItem,
    storeItem,
    updateItem,
    removeItem,
};
