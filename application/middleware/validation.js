var db = require('../conf/database');
module.exports = {
    // usernameCheck: function (req, res, next) {
    //     var { username } = req.body;
    //     username = username.trim();
    //     if (username.length < 3) {
    //         req.flash("error", "Your username needs to be 3 or more characters");

    //     }

    //     if (!/[a-zA-Z]/.test(username.charAt(0))) {
    //         req.flash("error", "Your username needs to be begin with a character");

    //     }

    //     if (req.session.flash.error) {
    //         res.redirect('/register');
    //     } else {
    //         next();
    //     }
    // },
    // passwordCheck: function (req, res, next) { },
    // emailCheck: function (req, res, next) { },
    // tosCheck: function (req, res, next) { },
    // ageCheck: function (req, res, next) { },
    isUsernameUnique: async function (req, res, next) {
        var { username } = req.body;
        try {
            var [rows, fields] = await db.execute('select id from users where username =?;', [username]);
            if (rows && rows.length > 0) {
                req.flash("error", 'Registration failed: This username already exist');
                return req.session.save(function (err) {
                    return res.redirect("/registration");
                })
            } else {
                next();
            }

        } catch (error) {
            next(error);
        }
    },
    isEmailUnique: async function (req, res, next) {
        var { email } = req.body;
        try {
            var [rows, fields] = await db.execute('select id from users where email =?;', [email]);
            if (rows && rows.length > 0) {
                req.flash("error", 'Registration failed: This email already exist');
                return req.session.save(function (err) {
                    return res.redirect("/registration");
                })
            }

        } catch (error) {
            next(error);
        }
    },

}