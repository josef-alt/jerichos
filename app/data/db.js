import * as SQLite from 'expo-sqlite';

// create database
const db = SQLite.openDatabaseSync('jerichos.db');

// database initialization
const init = () => {
    db.withTransactionSync((task) => {
        db.execSync(
            'CREATE TABLE IF NOT EXISTS dummy (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL);'
        );
    });
};

// get all
const getAll = () => {
    db.withTransactionSync((task) => {
        let all = db.getAllSync(
            'SELECT * FROM dummy;'
        );
        console.log(all);
    });
};

// insert single
const insert = (entry) => {
    console.log("inserting ", entry);
    db.withTransactionSync((task) => {
        db.runSync(
            'INSERT INTO dummy (title) VALUES (?);', entry
        );
    });
};

export { init, getAll, insert };