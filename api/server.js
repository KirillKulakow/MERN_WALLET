const path = require('path');
require('dotenv').config({
  path: path.join(__dirname, '.env'),
});
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { PORT, DB_URI } = process.env;
const { authRouter } = require('./auth/auth.router');
const { transactionRouter } = require('./DBData/route');
const { userRouter } = require('./user/user.router');

exports.AuthServer = class {
  constructor() {
    this.app = null;
  }
  async start() {
    this.initApp();
    this.portNumber = process.env.PORT || 3000;
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
    await mongoose.connect("mongodb+srv://WalletUser:vIfwv0ECwXW9mgnn@cluster0.nccvr.mongodb.net/Wallet?retryWrites=true&w=majority", {
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
          'https://wallet-fp-28.netlify.app',
          'https://wallet-fp-28.netlify.app/auth/login',
          'https://wallet-fp-28.netlify.app/auth/register',
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
    this.app.listen(this.portNumber)
  }
};
