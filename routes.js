const express = require('express');
const passport = require('passport');
const requireLogin = require('./app')

const HomeController = require('./controllers/HomeController');
const UserController = require('./controllers/UserController');

module.exports = function(app){
  const homeRouter = express.Router();
  const userRouter = express.Router();

  homeRouter.get('/', HomeController.index);

  userRouter.get('/login', UserController.login);
  userRouter.post('/login', passport.authenticate('local-login', {
    successRedirect: '/secret',
    failureRedirect: '/'
}));

  app.use('/', homeRouter);

  app.use('/', userRouter);
};
