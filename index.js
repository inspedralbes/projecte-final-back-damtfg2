const express = require('express');
const http = require('http');
const sessionMiddleware = require('./src/middlewares/session.middleware.js');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require("cors");
require('dotenv').config();
const app = express();
const usersRouter = require('./src/routes/users.route');
const corsOptions = require('./src/middlewares/cors.middleware.js');


app.use(sessionMiddleware);
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(cors(corsOptions));

const port = process.env.PORT || 3666;

const server = http.createServer(app);


app.get('/', (req, res) => {
  res.json({'message': 'ok'});
})

app.use('/users', usersRouter);

/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({'message': err.message});
  
  return;
});


app.post('/login', (req, res) => {
  var response = {};
  if (req.body.username === 'Juan' && req.body.password === '1234') {
    req.session.user = req.body.username;
    response.msg = 'Login Success';
    res.json(response);
  } else {
    response.msg = 'Login Failed';
    res.json(response);
  }
});

server.listen(port,'0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
});