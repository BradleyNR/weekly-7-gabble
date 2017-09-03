const models = require('./models');
const routes = require('./routes');
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');

const app = express();

// login middleware
const requireLogin = (req, res, next) => {
  if (req.user !== null) {
    next()
  } else {
    res.redirect('/login');
  }
};

passport.use('local-login', new LocalStrategy((username, password, done) => {
  //find user with sequelize whos username matches and then do the passport stuff!
  models.Userlogin.findOne({
    where: {
      username: username
    }
  }).then((user) => {
    //no user, end
    if (!user) {
      done(null, false);
    //user and pass work
    } else if (user && checkPassword(user, password)) {
      done(null, user)
    //else, end
    } else {
      done(null, false)
    }
  });
}));

//storing user id on session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

//gimme the user from the database
passport.deserializeUser((id, done) =>{
  models.Userlogin.findById(id).then((user) => {
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


app.use(bodyParser.urlencoded({extended: false}));

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

routes(app);

app.listen(3000);


module.exports = requireLogin;
