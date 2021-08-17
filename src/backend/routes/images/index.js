const pool = require('../../db/pool');

const getImages = (request, response, next) => {
  const user = request.user;
  const query = request.isAuthenticated()
    ? 'SELECT * FROM drawings WHERE private = false OR username = $1 ORDER BY id DESC LIMIT 100'
    : 'SELECT * FROM drawings WHERE private = false ORDER BY id DESC LIMIT 100';

  return pool.query(query, [user.username], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
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
