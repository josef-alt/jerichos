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
        db.execSync('CREATE TABLE IF NOT EXISTS favorites (id INTEGER PRIMARY KEY NOT NULL, recipe_id INTEGER NOT NULL, FOREIGN KEY (recipe_id) REFERENCES recipe (id));');
    });
};

// get name and category for each recipe for main display
const getAll = () => {
    db.withTransactionSync((task) => {
        let all = db.getAllSync(
            'SELECT recipe.name as recipeName, category.name as categoryName FROM recipe JOIN category ON recipe.category_id = category.id;'
        );
        return all;
    });
    return [];
};

// prepared statements used for recipe creation
const insertCategory = db.prepareSync('INSERT INTO category (name) VALUES (?);');
const insertRecipe = db.prepareSync('INSERT INTO recipe (category_id, name) VALUES (?, ?);');
const insertIngredient = db.prepareSync('INSERT INTO ingredients (recipe_id, name) VALUES (?, ?)');
const insertStep = db.prepareSync('INSERT INTO steps (recipe_id, step_number, description) VALUES (?, ?, ?)');

// insert single new recipe
const insert = (recipe) => {
    console.log('\ninserting\n', recipe.name, '\n', recipe.category, '\n', recipe.ingredients, '\n', recipe.steps);
    db.withTransactionSync((task) => {
        // check for existing category
        const found = db.getFirstSync(
            'SELECT id FROM category WHERE name = ?;',
            [recipe.category]
        );

        // insert new category if needed and determine id
        let cat_id = null;
        if(found) {
            cat_id = found.id;
        } else {
            cat_id = insertCategory.executeSync(recipe.category).lastInsertRowId;
        }

        // create recipe and get id
        const recipeId = insertRecipe.executeSync(cat_id, recipe.name).lastInsertRowId;

        // add steps and ingredients using recipe id
        for(const ingredient of recipe.ingredients) {
            console.log(insertIngredient.executeSync(recipeId, ingredient));
        }

        for(let step = 1, stepCount = recipe.steps.length; step <= stepCount; ++step) {
            console.log(insertStep.executeSync(recipeId, step, recipe.steps[step - 1]));
        }
    });
};

export { init, getAll, insert };