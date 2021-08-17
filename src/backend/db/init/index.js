const { Client } = require('pg');

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'password',
  port: 5432,
});

const execute = async (queries) => {
  try {
    await client.connect();
    for (query of queries) {
      await client.query(query);
    }
    return true;
  } catch (error) {
    console.error(error.stack);
    return false;
  } finally {
    await client.end();
  }
};

const drawings = `
    CREATE TABLE IF NOT EXISTS "drawings" (
	    "id" SERIAL,
      "private" BOOLEAN NOT NULL,
	    "image" VARCHAR NOT NULL,
	    "username" VARCHAR(255) NOT NULL,
	    PRIMARY KEY ("id")
    );`;

const users = `
    CREATE TABLE IF NOT EXISTS "users" (
	    "id" SERIAL,
	    "username" VARCHAR(255) UNIQUE NOT NULL,
	    "password" VARCHAR(255) NOT NULL,
	    PRIMARY KEY ("id")
    );`;

execute([drawings, users]).then((result) => {
  if (result) {
    console.log('Tables created');
  }
});
