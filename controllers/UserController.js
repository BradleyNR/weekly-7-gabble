
const UserController = {
  login: function(req, res){
    res.render('login');
  },
  loginuser: function(req, res){
    res.redirect('/');
  }
};



module.exports = UserController;
