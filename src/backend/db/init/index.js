const { Client } = require('pg');
const { image1, image2, image3 } = require('./images');

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

const dropDrawings = `drop table if exists drawings;`;
const dropUsers = `drop table if exists users;`;
const dropSession = `drop table if exists session;`;

const drawings = `
    CREATE TABLE IF NOT EXISTS "drawings" (
	    "id" SERIAL,
      "private" BOOLEAN NOT NULL,
	    "image" VARCHAR NOT NULL,
	    "username" VARCHAR(255) NOT NULL,
      "date" DATE DEFAULT NOW(),
	    PRIMARY KEY ("id")
    );`;

const users = `
    CREATE TABLE IF NOT EXISTS "users" (
	    "id" SERIAL,
	    "username" VARCHAR(255) UNIQUE NOT NULL,
	    "password" VARCHAR(255) NOT NULL,
	    PRIMARY KEY ("id")
    );`;

// password is 123
const createUser1 = `INSERT INTO users (username, password) VALUES ('user1', '$2b$10$lK.2uISnM4FvySl8R0kqEu5GQ/Y4wqRF4cgRkLBimFzDqLx4eTrRO')`;

const createDrawing1 = `INSERT INTO drawings (image, private, username) VALUES ('${image1}', false, 'user1')`;
const createDrawing2 = `INSERT INTO drawings (image, private, username) VALUES ('${image2}', false, 'user1')`;
const createDrawing3 = `INSERT INTO drawings (image, private, username) VALUES ('${image3}', false, 'user1')`;

// Taken from https://github.com/voxpelli/node-connect-pg-simple/blob/HEAD/table.sql
const session = `
CREATE TABLE "session" (
  "sid" varchar NOT NULL COLLATE "default",
	"sess" json NOT NULL,
	"expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);

ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

CREATE INDEX "IDX_session_expire" ON "session" ("expire");`;

execute([
  dropDrawings,
  dropUsers,
  dropSession,
  drawings,
  users,
  session,
  createUser1,
  createDrawing1,
  createDrawing2,
  createDrawing3,
]).then((result) => {
  if (result) {
    console.log('Tables created, data is seeded');
  }
});
