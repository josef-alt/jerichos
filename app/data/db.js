import * as SQLite from 'expo-sqlite';

// create database
const db = SQLite.openDatabaseSync('jerichos.db');

// database initialization
const init = () => {
    db.withTransactionSync((task) => {
        // create any missing tables
        db.execSync('CREATE TABLE IF NOT EXISTS category (id INTEGER PRIMARY KEY NOT NULL, name TEXT);');
        db.execSync('CREATE TABLE IF NOT EXISTS recipe (id INTEGER PRIMARY KEY NOT NULL, category_id INTEGER, name TEXT, FOREIGN KEY (category_id) REFERENCES category (id));');
        db.execSync('CREATE TABLE IF NOT EXISTS ingredients (id INTEGER PRIMARY KEY NOT NULL, recipe_id INTEGER, name TEXT, FOREIGN KEY (recipe_id) REFERENCES recipe (id));');
        db.execSync('CREATE TABLE IF NOT EXISTS steps (id INTEGER PRIMARY KEY NOT NULL, recipe_id INTEGER, step_number INTEGER NOT NULL, description TEXT, FOREIGN KEY (recipe_id) REFERENCES recipe (id));');
        db.execSync('CREATE TABLE IS NOT EXISTS favorites (id INTEGER PRIMARY KEY NOT NULL, recipe_id INTEGER NOT NULL, FOREIGN KEY (recipe_id) REFERENCES recipe (id));');
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