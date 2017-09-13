const models = require('../models');
const moment = require('moment');


// {order: [['updatedAt', 'DESC']]}   -- add to find all to order correctly


//show posts newest first
const HomeController = {
  index: function(req, res){
    models.Entry.findAll({
      include: [{
        model: models.Like
      }],
      order: [['updatedAt', 'DESC']]
    }).then(function(post){
      //formats date per post from current time (ie; yesterday at 4pm)
      post.forEach((post) => {
        postDate = moment(post.createdAt, moment.ISO_8601).calendar();
        post.postedTime = postDate;
      });
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
    author: req.user.username,
    userId: req.user.id
  }).then(function(newpost){
      res.redirect('/');
    })
  },
  delete: function(req, res){
    let thisPost = req.params.id;
    models.Entry.findOne({
      where: {id: thisPost}
    }).then(function(post){
      if (post.userId == req.user.id) {
        res.render('edits/delete', {post: post});
      } else {
        req.session.error = 'You may only delete your own whispers';
        res.redirect('/');
      }
    })
  },
  deletePost: function(req, res){
    let thisPost = req.params.id;
    models.Like.destroy({
     where: {
       post: thisPost
     }
   }).then(function(){
     models.Entry.destroy({
       where: {id: thisPost}
     }).then(function(){
       res.redirect('/');
     })
   });
  },
  specificUserPosts: function(req, res){
    models.Entry.findAll({
      where: {userId: req.user.id},
      include: [{
        model: models.Like
      }]
    }).then(function(post){
      post.forEach((post) => {
        postDate = moment(post.createdAt, moment.ISO_8601).calendar();
        post.postedTime = postDate;
      });
      res.render('homepage', {user: req.user, post: post, error: req.session.error});
    })
  },
  // TODO: DO NOT LET LIKES BE ADDED TO THE TABLE MORE THAN ONCE, doesn't work?
  likePost: function(req, res){
    let thisPost = req.params.id;
    let thisUsername = req.user.username;

    function isUniqueLike (id) {
        return models.Like.count({ where: { post: id, user: thisUsername } })
          .then(count => {
            if (count != 0) {
              return false;
            }
            return true;
        });
    }
    //check to see if like is in database, if so don't allow it to go in again
    isUniqueLike(thisPost).then((isUnique) => {
      if (isUnique) {
        models.Like.create({
          post: thisPost,
          user: req.user.username
        })
        res.redirect('/');
      } else {
        res.redirect('/');
      }
    })
  },
  likedBy: function(req, res){
    let thisPost = req.params.id;
    models.Entry.findOne({
      where: {id: thisPost},
      include: [{
        model: models.Like
      }]
    }).then(function(post){
      res.render('liked', {post: post, likesArray: post.Likes});
    });
  }
};


//
// likePost: function(req, res){
//     let thisPost = req.params.id;
//     models.Like.create({
//     post: thisPost,
//     user: req.user.username
//   }).then(function(thislike){
//     res.redirect('/');
//   })
// }


module.exports = HomeController;
