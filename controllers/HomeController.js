
const HomeController = {
  index: function(req, res){
    res.render('homepage', {user: req.user});
  }
};



module.exports = HomeController;
