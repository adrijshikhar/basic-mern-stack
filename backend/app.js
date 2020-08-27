const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const config = require('./config/config');
const Database = require('./config/db');
const mongoConfig = config.mongo;

const app = express();
const users = require('./routes/user');

const startServer = async () => {
  const opts = {
    user       : mongoConfig.user,
    pass       : mongoConfig.pass,
    authSource : mongoConfig.authdb,
  };
  try {
    await  Database._connect(
      config.mongo.port,
      config.mongo.host,
      config.mongo.name,
      opts
    );
  } catch (error) {
    console.info(error)
  }

}
startServer();

require('./passport')(passport);
app.use(passport.initialize());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/users', users);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.APP_PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
