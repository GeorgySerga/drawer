const passport = require('passport');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const pool = require('../db/pool');

const initializePassport = (passport) => {
  passport.serializeUser((user, done) => done(null, user));

  passport.deserializeUser(({ id }, done) => {
    pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
      if (error) {
        return done(error);
      }

      if (!results.rows.length) {
        return done(new Error('No results for the user'));
      }

      const [user] = results.rows;
      return done(null, user);
    });
  });

  passport.use(
    new LocalStrategy(function (username, password, done) {
      pool.query(
        'SELECT * FROM users WHERE username = $1',
        [username],
        (error, results) => {
          if (error) {
            done(error);
          }

          if (!results || !results.rows.length) {
            return done(null, false);
          }

          const [user] = results.rows;
          bcrypt.compare(password, user.password, function (err, result) {
            if (err) {
              return done(new Error('Bcrypt compare error'));
            }
            if (result) {
              return done(null, {
                id: user.id,
                username: user.username,
              });
            }
            return done(null, false);
          });
        }
      );
    })
  );
};

module.exports = initializePassport;
