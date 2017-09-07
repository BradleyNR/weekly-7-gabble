const models = require('./models');
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const bCrypt = require('bcryptjs');
const passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  session = require('express-session');

const routes = require('./routes');

const app = express();

//static css
app.use('/static', express.static('public'));
//bodyparser
app.use(bodyParser.urlencoded({extended: false}));

//bcrypt function to generate hashes, used in local-login and local-signup
let generateHash = function(input) {
  return bCrypt.hashSync(input, bCrypt.genSaltSync(8), null);
};

//checks password hashes using bcrypt
const checkPassword = function(userpass, password){
  return bCrypt.compareSync(password, userpass);
};

//checks login
passport.use('local-login', new LocalStrategy(function(username, password, done){
  models.Userlogin.findOne({
    where: {
      username: username
    }
  }).then(function(user){
    if(user === null) {
      done(null, false);
      //check the password using the bcrypt compareSync
    } else if (user && checkPassword(user.password, password)) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
}));

//checks signup
//Walkthrough assisted in building this localstrategy for signup
//https://code.tutsplus.com/tutorials/using-passport-with-sequelize-and-mysql--cms-27537
passport.use('local-signup', new LocalStrategy({passReqToCallback: true}, function(req, username, password, done) {
  console.log('local signup working');
  models.Userlogin.findOne({
    where: {
      username: username
    }
  }).then(function(user) {
    console.log('Then is firing');
      if (user){
          return done(null, false, {
              message: 'That username is already taken'
          });
      } else {
        var userPassword = generateHash(password);
          var data ={
              username: username,
              password: userPassword,
              };
          models.Userlogin.create(data).then(function(newUser, created) {
              if (!newUser) {
                return done(null, false);
              }
              if (newUser) {
                return done(null, newUser);
              }
          });
        }
    });
  }
));

//serialization
passport.serializeUser(function(user, done){
  console.log('serialize called');
  done(null, user.id);
});

passport.deserializeUser(function(id, done){
  console.log('deserialize called');
  models.Userlogin.findById(id).then(function(user){
    done(null, user);
  });
});

//sessions
app.use(session({
  secret: 'Take me to the laughable house',
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

//views
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

routes(app);

//setting port for local dev and heroku
app.listen(process.env.PORT || 3000);


module.exports = app;
