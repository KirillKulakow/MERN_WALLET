const path = require('path');
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { authRouter } = require('./auth/auth.router');
const { transactionRouter } = require('./DBData/route');
const { userRouter } = require('./user/user.router');

exports.AuthServer = class {
  constructor() {
    this.app = null;
    this.portNumber = process.env.PORT || 3000;
  }
  async start() {
    this.initApp();
    await this.initDbConnection();
    this.initMiddleware();
    this.initRoutes();
    this.initErrorHandler();
    this.startListener();
  }
  initApp() {
    this.app = express();
  }

  async initDbConnection() {
    await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database connection successful');
  }

  initMiddleware() {
    this.app.use(express.json());
    this.app.use(
      cors({
        origin: [
          'http://localhost:3000/',
          'http://localhost:3000/login',
          'http://localhost:3000/register',
          'https://wallet-app.netlify.app',
          'https://wallet-app.netlify.app/login',
          'https://wallet-app.netlify.app/register',
        ],
      }),
    );
  }

  initRoutes() {
    this.app.use('/user', userRouter);
    this.app.use('/auth', authRouter);
    this.app.use('/trans', transactionRouter);
  }

  initErrorHandler() {
    this.app.use((err, req, res, next) => {
      try{
        const statusCode = err.status || 500;
        return res.send(statusCode).send(err.message);
      } catch (error) {
        return res.send(500).send(error)
      }
    });
  }

  startListener() {
    this.app.listen(this.portNumber, console.log(`Server is runing on ${this.portNumber}`))
  }
};
