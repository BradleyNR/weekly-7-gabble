
const UserController = {
  login: function(req, res){
    res.render('login');
  },
  signup: function(req, res){
    res.render('signup');
  },
  logout: function(req, res){
    req.session.destroy(function(){
      res.redirect('/login');
    });
  }
};



module.exports = UserController;
