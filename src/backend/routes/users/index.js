const passport = require('passport');
const bcrypt = require('bcrypt');
const pool = require('../../db/pool');

const login = (request, response, next) => {
  passport.authenticate('local', (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return response.status(404).send('Wrong email or password');
    }
    request.login(user, (err) => (err ? next(err) : response.json(user)));
  })(request, response, next);
};

const register = async (request, response) => {
  const { username, password } = request.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  pool.query(
    `INSERT INTO users (username, password) VALUES ($1, $2)`,
    [username, hashedPassword],
    (error, _) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`Account created`);
    }
  );
};

module.exports = { login, register };
