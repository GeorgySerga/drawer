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
  if (!request.isAuthenticated()) {
    return response
      .status(401)
      .send('Not allowed to upload images unauthorized');
  }

  const { image, private, user } = request.body;

  return pool.query(
    `INSERT INTO drawings (image, private, username) VALUES ($1, $2, $3)`,
    [image, private, user],
    (error, results) => {
      if (error) {
        throw error;
      }
      return response
        .status(201)
        .send(`Image added with ID: ${results.insertId}`);
    }
  );
};

const deleteImage = (request, response) => {
  if (!request.isAuthenticated()) {
    return response.status(401).send('Not allowed if unauthorized');
  }

  const { user, id } = request.body;

  return pool.query(
    `DELETE FROM drawings WHERE username = $1 AND id = $2`,
    [user, id],
    (error) => {
      if (error) {
        throw error;
      }
      return response.status(201).send(`Image deleted`);
    }
  );
};

module.exports = {
  getImages,
  createImage,
  deleteImage,
};
