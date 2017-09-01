const express = require('express');
const passport = require('passport');

const HomeController = require('./controllers/HomeController');

module.exports = function(app){
  const homeRouter = express.Router();

  homeRouter.get('/', HomeController.index);

  app.use('/', homeRouter);
};
