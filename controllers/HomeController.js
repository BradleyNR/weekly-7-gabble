const models = require('../models');


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
      console.log(post.Likes);
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
    models.Entry.destroy({
      where: {id: thisPost}
    }).then(function(){
      res.redirect('/');
    })
  },
  specificUserPosts: function(req, res){
    models.Entry.findAll({
      where: {userId: req.user.id}
    }).then(function(post){
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

    isUniqueLike(thisPost).then((isUnique) => {
      if (isUnique) {
        console.log('is unique');
        models.Like.create({
          post: thisPost,
          user: req.user.username
        })
        res.redirect('/');
      } else {
        console.log('not unique');
        res.redirect('/');
      }
    })
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
