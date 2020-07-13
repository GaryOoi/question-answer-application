const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const path = require('path');

const { DB_URI } = require('./configs');
const { allowCORS, debug } = require('./middlewares');
const routes = require('./routes');
const logger = require('./utils/logger');

const PORT = process.env.PORT || 8080;

// Instantiate the app here
const app = express();

// Initiate database connection
mongoose
  .connect(DB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .catch((error) => logger.error(error, 'mongoose.connect()'));
mongoose.connection
  .on('error', (error) => logger.error(error, 'mongoose connection'))
  .on('open', () =>
    logger.success(
      'Mongoose has successfully opened a connection to the database',
      'mongoose connection',
    ),
  )
  .on('close', () =>
    logger.success(
      'Mongoose has successfully closed a connection to the database',
      'mongoose connection',
    ),
  );

// Apply middlewares
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser());
app.use(allowCORS); // Allow CORS from React client
app.use(debug);

// Apply API routing
app.use('/api/v1', routes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('build'));
  app.get('/*', (_req, res) => {
    res.sendFile(path.join(path.resolve(''), 'build', 'index.html'));
  });
}

app.listen(PORT, () => {
  logger.log(`Server is listening on port ${PORT}`);
});
