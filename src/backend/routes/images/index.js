const pool = require('../../db/pool');

const getImages = (request, response) => {
  const cb = (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  };
  if (request.isAuthenticated()) {
    const { username } = request.user;
    return pool.query(
      'SELECT * FROM drawings WHERE private = false OR username = $1 ORDER BY id DESC LIMIT 100',
      [username],
      cb
    );
  }

  return pool.query(
    'SELECT * FROM drawings WHERE private = false ORDER BY id DESC LIMIT 100',
    cb
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
