// Swagger
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const swaggerDocument = YAML.load('./swagger/swagger.yaml');

const createError = require('http-errors');
const cors = require('cors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "client", "build")));
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

app.use(cors());
app.options("*", cors());



//mongoDB
mongoose.connect(process.env.MONGODB_URI ||'mongodb://127.0.0.1:27017/ruralis', { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', function() {
  console.log("MongoDB database connection established successfully");
});

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api/public', require('./routes/'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use((req, res, next) => {
  res.status(404).send({ error: 'Not Found' });
});

app.listen(PORT, function () {
  console.log("Server is running on Port: " + PORT);
});

module.exports = app;
