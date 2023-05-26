var express = require('express');
var router = express.Router();
const { getRecentPosts } = require("../middleware/post");

/* GET home page. */
router.get('/', getRecentPosts,  async function(req, res, next) {
  console.log(res.locals.posts);
  return res.render("index");
});

router.get("/login", function(req,res){
  res.render("login");
})

router.get("/registration", function(req,res){
  res.render("registration");
})

// router.get("/postvideo", function(req,res){
//   res.render("postvideo");
// })

// router.get("/profile/:id(\\d+)", function(req,res){
//   res.render("profile");
// })

// router.get("/viewpost/:id(\\d+)", function(req,res){
//   res.render("viewpost");
// })

module.exports = router;
