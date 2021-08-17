const express = require('express');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const cookieParser = require('cookie-parser');

const imagesRoutes = require('./routes/images');
const usersRoutes = require('./routes/users');
const pool = require('./db/pool');
const initializePassport = require('./passport/configuration');

const app = express();
const port = process.env.PORT || 3001;

initializePassport(passport);
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);
app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 },
    store: new pgSession({ pool }),
  })
);
app.use(cookieParser('secret'));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (_, response) => {
  response.json({ info: 'Backend is running' });
});

app.get('/api/images', imagesRoutes.getImages);
app.post('/api/images', imagesRoutes.createImage);

app.post('/api/login', usersRoutes.login);
app.post('/api/register', usersRoutes.register);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
