import * as SQLite from 'expo-sqlite';

// create database
const db = SQLite.openDatabaseSync('jerichos.db');

// track whether database is ready for use or not
let isReady = false;

// database initialization
const init = () => {
    db.withTransactionSync((task) => {
        // create any missing tables
        db.execSync('CREATE TABLE IF NOT EXISTS category (id INTEGER PRIMARY KEY NOT NULL, name TEXT);');
        db.execSync('CREATE TABLE IF NOT EXISTS recipe (id INTEGER PRIMARY KEY NOT NULL, category_id INTEGER, name TEXT, favorite INTEGER, FOREIGN KEY (category_id) REFERENCES category (id));');
        db.execSync('CREATE TABLE IF NOT EXISTS ingredients (id INTEGER PRIMARY KEY NOT NULL, recipe_id INTEGER, name TEXT, FOREIGN KEY (recipe_id) REFERENCES recipe (id));');
        db.execSync('CREATE TABLE IF NOT EXISTS steps (id INTEGER PRIMARY KEY NOT NULL, recipe_id INTEGER, step_number INTEGER NOT NULL, description TEXT, FOREIGN KEY (recipe_id) REFERENCES recipe (id));');
        isReady = true;

        // prepared statements used for recipe creation
        global.insertCategory = db.prepareSync('INSERT INTO category (name) VALUES (?);');
        global.insertRecipe = db.prepareSync('INSERT INTO recipe (category_id, name, favorite) VALUES (?, ?, ?);');
        global.insertIngredient = db.prepareSync('INSERT INTO ingredients (recipe_id, name) VALUES (?, ?)');
        global.insertStep = db.prepareSync('INSERT INTO steps (recipe_id, step_number, description) VALUES (?, ?, ?)');
        global.updateFavorite = db.prepareSync('UPDATE recipe SET favorite = ? WHERE id = ?;')
    });
};

// get name and category for each recipe for main display
const getAll = () => {
    while(!isReady) {}
    return db.getAllSync(
        'SELECT recipe.name as recipeName, category.name as categoryName, favorite as isFavorite FROM recipe JOIN category ON recipe.category_id = category.id;'
    );
};

// get list of favorites
const getFavorites = () => {
    while(!isReady()) {}
    return db.getAllSync(
        'SELECT recipe.name as recipeName, category.name as categoryName FROM recipe JOIN category ON recipe.category_id = category.id WHERE favorite = 1;'
    );
};

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
        const recipeId = insertRecipe.executeSync(cat_id, recipe.name, 0).lastInsertRowId;

        // add steps and ingredients using recipe id
        for(const ingredient of recipe.ingredients) {
            console.log(insertIngredient.executeSync(recipeId, ingredient));
        }

        for(let step = 1, stepCount = recipe.steps.length; step <= stepCount; ++step) {
            console.log(insertStep.executeSync(recipeId, step, recipe.steps[step - 1]));
        }
    });
};

// set or unset a recipe's favorite flag
const toggleFavorite = (recipeId, favorite) => {
    db.withTransactionSync((task) => {
        console.log(updateFavorite.executeSync(favorite ? 1 : 0, recipeId));
    });
};

export { init, getAll, insert, toggleFavorite, getFavorites };