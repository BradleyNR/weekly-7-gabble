const models = require('../models');


const HomeController = {
  index: function(req, res){
    models.Entry.findAll({order: [['updatedAt', 'DESC']]}).then(function(post){
      res.render('homepage', {user: req.user, post: post, error: req.session.error});
      req.session.error = undefined;
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
  })},
  delete: function(req, res){
    let thisPost = req.params.id;
    models.Entry.findOne({
      where: {id: thisPost}
    }).then(function(post){
      if (post.author == req.user.username) {
        res.render('edits/delete', {post: post});
      } else {
        req.session.error = 'You may only delete your own whispers';
        res.redirect('/');
      }
    })
  },
  deletePost: function(req, res){
    let thisPost = req.params.id;
    models.Entry.destroy({
      where: {id: thisPost}
    }).then(function(){
      res.redirect('/');
    })
  },
  specificUserPosts: function(req, res){
    models.Entry.findAll({
      where: {author: req.user.username}
    }).then(function(post){
      res.render('homepage', {user: req.user, post: post, error: req.session.error});
    })
  }
};


module.exports = HomeController;
