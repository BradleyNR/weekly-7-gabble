const express = require('express');
const passport = require('passport');

const HomeController = require('./controllers/HomeController');
const UserController = require('./controllers/UserController');

const requireLogin = function(req, res, next) {
  console.log('require login firing');
  if (req.user) {
    next();
  } else {
    res.redirect('login');
  }
};

module.exports = function(app){
  const homeRouter = express.Router();
  const userRouter = express.Router();

  homeRouter.use(requireLogin);
  homeRouter.get('/', HomeController.index);

  userRouter.get('/login', UserController.login);
  userRouter.get('/signup', UserController.signup);
  userRouter.get('/logout', UserController.logout);
  userRouter.post('/login', passport.authenticate('local-login', {
    successRedirect: '/',
    failureRedirect: '/login',
  }));
  userRouter.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/login',
    failureRedirect: '/signup'
  }));



  app.use('/', userRouter);
  app.use('/', homeRouter);
};
