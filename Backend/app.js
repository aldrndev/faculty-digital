const express = require('express');
const PORT = 3000;
const app = express();
const cors = require('cors');
const router = require('./routes');
const errorHandler = require('./middlewares/errorHandler');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use(router);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`The server is working on port ${PORT}`);
});
