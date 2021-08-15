const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'password',
  port: 5432,
});

const getImages = (request, response) => {
  pool.query(
    'SELECT * FROM drawings ORDER BY id DESC LIMIT 100',
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const createImage = (request, response) => {
  const { image, private, user } = request.body;

  pool.query(
    `INSERT INTO drawings (image, private, username) VALUES ($1, $2, $3)`,
    [image, private, user],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`Image added with ID: ${results.insertId}`);
    }
  );
};

module.exports = {
  getImages,
  createImage,
};
