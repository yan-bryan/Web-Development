var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'CSC 317 App', name:"Bryan Yan" });
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
