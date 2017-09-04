const models = require('./models');
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  session = require('express-session');
  // flash = require('express-flash-messages');

const routes = require('./routes');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));

const checkPassword = function(user, password){
  return user.password === password;
};

passport.use('local-login', new LocalStrategy(function(username, password, done){
  models.Userlogin.findOne({
    where: {
      username: username
    }
  }).then(function(user){
    if(user === null) {
      done(null, false);
    } else if (user && checkPassword(user, password)) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
}));

passport.serializeUser(function(user, done){
  done(null, user.id);
});

passport.deserializeUser(function(id, done){
  models.Userlogin.findById(id).then(function(user){
    done(null, user);
  });
});

app.use(session({
  secret: 'Take me to the laughable house',
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());


app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

routes(app);

app.listen(3000);


module.exports = app;
