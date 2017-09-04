const models = require('../models');


const HomeController = {
  index: function(req, res){
    models.Entry.findAll().then(function(post){
      res.render('homepage', {user: req.user, post: post});
    })
  },
  add: function(req, res){
    res.render('edits/add');
  },
  addpost: function(req, res){
    models.Entry.create({
    title: req.body.title,
    body: req.body.body,
    author: req.user.username
    }).then(function(newpost){
      res.redirect('/');
  })
  }
};



module.exports = HomeController;
