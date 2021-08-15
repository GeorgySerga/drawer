const express = require('express');
const cors = require('cors');
const db = require('./db/queries');
const app = express();
const port = process.env.PORT || 3001;
app.use(cors());

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get('/', (_, response) => {
  response.json({ info: 'Backend is running' });
});

app.get('/images', db.getImages);
app.post('/images', db.createImage);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
