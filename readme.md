# Learning Checkpoint: Express + Neon Setup

This is the current project stage before pushing to GitHub.

Project path:

```text
/Users/anbschool0018/Desktop/Project/00.SCHOOL/00.SchoolProject/Repo/test
```

Date recorded:

```text
June 1, 2026
```

## Current Goal

The current learning goal is:

```text
Build the project step by step like a beginner.
Do not jump ahead.
Understand each file before creating the next one.
```

So far, only these parts are finished:

```text
1. Basic Express server in app.js
2. Neon PostgreSQL connection config in config/database.js
```

The next learning step is:

```text
Create models/Catalog.js
```

## Current Folder Structure

```text
.
├── .dist/
├── .env
├── .gitignore
├── app.js
├── config/
│   └── database.js
├── controllers/
├── models/
├── node_modules/
├── package-lock.json
├── package.json
├── readme.md
├── routes/
└── views/
```

Important:

```text
controllers/
models/
routes/
views/
```

exist, but they are still empty at this checkpoint.

## Current ERD / DBML

This is the database design we want to build later:

```text
catalog [] {
  catalog_id int pk
  catalog_name varchar
  create_at timestamp
}

unit [] {
  unit_id int pk
  unit_name varchar
  create_at timestamp
}

products [] {
  catalog_id int fk
  product_id int pk
  product_name varchar
  product_price int
  unit_id int fk
  product_quantity int
  create_at timestamp
}

catalog.catalog_id < products.catalog_id
unit.unit_id < products.unit_id
```

We have not created these models yet.

The next model to create is:

```text
models/Catalog.js
```

## Current `app.js`

File:

```text
app.js
```

Current code:

```js
import 'dotenv/config';
import express from 'express';
import sequelize from './config/database.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', function(req, res) {
  res.send('Express server is running');
});

sequelize
  .authenticate()
  .then(function() {
    app.listen(port, function() {
      console.log(`Server running on http://localhost:${port}`);
      console.log('Database connected');
    });
  })
  .catch(function(error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  });
```

Line-by-line meaning:

```js
import 'dotenv/config';
```

Loads the `.env` file.

This must come before using `process.env.DATABASE_URL`.

```js
import express from 'express';
```

Imports Express, the web server framework.

```js
import sequelize from './config/database.js';
```

Imports the Neon database connection from `config/database.js`.

```js
const app = express();
```

Creates the Express app.

```js
const port = process.env.PORT || 3000;
```

Uses `PORT` from `.env`.

If `PORT` does not exist, it uses `3000`.

```js
app.use(express.json());
```

Allows Express to read JSON request bodies.

Example body:

```json
{
  "catalog_name": "Drink"
}
```

```js
app.use(express.urlencoded({ extended: false }));
```

Allows Express to read form data.

```js
app.get('/', function(req, res) {
  res.send('Express server is running');
});
```

Creates the homepage route.

When opening:

```text
http://localhost:3000
```

The browser should show:

```text
Express server is running
```

```js
sequelize
  .authenticate()
```

Tests the Neon PostgreSQL connection.

```js
.then(function() {
```

Runs only if the database connection works.

```js
app.listen(port, function() {
```

Starts the Express server.

Important:

```text
The server starts only after Neon connects successfully.
```

```js
console.log(`Server running on http://localhost:${port}`);
console.log('Database connected');
```

Prints success messages in the terminal.

```js
.catch(function(error) {
```

Runs if the database connection fails.

```js
console.error('Unable to connect to the database:', error);
```

Prints the database error.

```js
process.exit(1);
```

Stops the app if the database cannot connect.

## Current `config/database.js`

File:

```text
config/database.js
```

Current code:

```js
import { Sequelize } from 'sequelize';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is missing from .env');
}

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

export default sequelize;
```

Line-by-line meaning:

```js
import { Sequelize } from 'sequelize';
```

Imports Sequelize.

Sequelize is the tool that lets JavaScript talk to PostgreSQL.

```js
if (!process.env.DATABASE_URL) {
```

Checks if the Neon connection link is missing.

```js
throw new Error('DATABASE_URL is missing from .env');
```

Stops the app with a clear error if `.env` is not set correctly.

```js
const sequelize = new Sequelize(process.env.DATABASE_URL, {
```

Creates the database connection using the Neon URL from `.env`.

```js
dialect: 'postgres',
```

Tells Sequelize the database type is PostgreSQL.

```js
logging: false,
```

Stops Sequelize from printing every SQL query.

```js
dialectOptions: {
  ssl: {
    require: true,
    rejectUnauthorized: false,
  },
},
```

Enables SSL.

Neon needs SSL to connect.

```js
export default sequelize;
```

Exports the database connection so other files can use it.

## Current `.env`

The `.env` file exists and contains:

```text
DATABASE_URL
PORT
```

The real values are not written here because `.env` contains secrets.

Expected shape:

```env
DATABASE_URL=postgresql://username:password@host.neon.tech/database_name?sslmode=require
PORT=3000
```

Important:

```text
.env should not be pushed to GitHub.
```

`.gitignore` already ignores `.env`.

## How To Run This Current Stage

First, make sure no old server is using port `3000`:

```bash
lsof -i :3000
```

If something is using port `3000`, kill it:

```bash
kill PID_NUMBER
```

Then start the app:

```bash
npm start
```

Expected result:

```text
Server running on http://localhost:3000
Database connected
```

Then open:

```text
http://localhost:3000
```

Expected browser text:

```text
Express server is running
```

## Common Error Already Learned

Problem:

```text
Failed to lookup view "error"
```

Meaning:

```text
An older version of the server was still running.
It was trying to render views/error.ejs.
```

Fix:

```bash
lsof -i :3000
kill PID_NUMBER
```

Then run:

```bash
npm start
```

## Next Step When Resuming

Next file to create:

```text
models/Catalog.js
```

Why:

The first table in the ERD is:

```text
catalog
```

So the first Sequelize model should be:

```text
Catalog
```

Code to create next:

```js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Catalog = sequelize.define(
  'Catalog',
  {
    catalog_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    catalog_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    create_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: 'catalog',
    timestamps: false,
  }
);

export default Catalog;
```

After creating it, check syntax:

```bash
node --check models/Catalog.js
```

If there is no output, the syntax is correct.

## Next Learning Order

Continue in this order:

```text
1. models/Catalog.js
2. models/Unit.js
3. models/Product.js
4. models/index.js
5. controllers/catalogsController.js
6. controllers/unitsController.js
7. controllers/productsController.js
8. routes/catalogs.js
9. routes/units.js
10. routes/products.js
11. connect routes in app.js
12. run and test with curl
```

Do not skip ahead.

Build one file, understand it, test it, then move to the next file.
