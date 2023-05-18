var express = require('express');
var router = express.Router();
var db = require('../conf/database');
var bcrypt = require('bcrypt');
var { isLoggedIn, isMyProfile } = require("../middleware/auth");
const { isUsernameUnique, isEmailUnique } = require('../middleware/validation');


// router.use("/registration", function(req,res,next) {

// });

//localhost:3000/users/register
router.post('/registration', isUsernameUnique, isEmailUnique, async function (req, res, next) {
  var { username, email, password } = req.body;
  try {
    // var [rows, fields] = await db.execute('select id from users where username =?;', [username]);
    // if(rows && rows.length > 0) {
    //   req.flash("error",'Registration failed: This username already exist');
    //   return req.session.save(function(err) {
    //     return res.redirect("/registration");
    //   })
    // }

    // var [rows, fields] = await db.execute('select id from users where email =?;', [email]);
    // if(rows && rows.length > 0) {
    //   req.flash("error",'Registration failed: This email already exist');
    //   return req.session.save(function(err) {
    //     return res.redirect("/registration");
    //   })
    // }

    var hashedPassword = await bcrypt.hash(password, 3);

    var [resultObject, fields] = await db.execute('INSERT INTO users(username, email, password) value (?,?,?);', [username, email, hashedPassword]);

    if (resultObject && resultObject.affectedRows == 1) {
      req.flash("success", 'Registration Suceeded: Your account has been registered');
      req.session.save(function (err) {
        res.redirect("/login");
      })
      //res.redirect("/login");
    } else {
      req.flash("error", 'Registration failed: Your account could not be created');
      req.session.save(function (err) {
        res.redirect("/registration");
      })
      //res.redirect("/registration");
    }

  } catch (error) {
    next(error);
  }

});

//localhost:3000/users/login
router.post('/login', async function (req, res, next) {
  var { username, password } = req.body;
  try {
    var [rows, fields] = await db.execute('SELECT id,username,password,email FROM csc317db.users where username = ?;', [username]);
    var user = rows[0];
    if (rows && rows.length == 1) {
      var passwordsMatch = await bcrypt.compare(password, user.password);

      if (passwordsMatch) {
        req.session.user = {
          userId: user.id,
          email: user.email,
          username: user.username

        };
        req.flash("success", 'You are now logged in')
        req.session.save(function (err) {
          res.redirect("/");
        })
      } else {
        req.flash("error", 'Log in failed: Invalid Username/Password');
        req.session.save(function (err) {
          res.redirect("/login");
        })
      }


    } else {
      req.flash("error", 'Log in failed: Invalid Username/Password');
      req.session.save(function (err) {
        res.redirect("/login");
      })

    }

  } catch (error) {
    next(error);
  }
});

router.use(function (req, res, next) {
  if (req.session.user) {
    next();
  } else {
    return res.redirect("/login");
  }
});


router.get("/profile/:id(\\d+)", isLoggedIn, isMyProfile, function (req, res) {
  res.render("profile");
})

router.get("/viewpost/:id(\\d+)", isLoggedIn, isMyProfile, function (req, res) {
  res.render("viewpost");
})

router.get("/postvideo", isLoggedIn, function (req, res) {
  res.render("postvideo");
})

router.post("/logout", function (req, res, next) {
  req.session.destroy(function (err) {
    if (err) {
      next(error);
    }
    return res.redirect('/');
  })
});

/* GET localhost:3000/users */
// router.get('/', async function(req, res, next) {
//   try {
//     let [rows, fields] = await db.query(`select * from users;`);
//     res.status(200).json({rows, fields});

//   } catch(error) {
//     next(error);

//   }
// });

module.exports = router;
