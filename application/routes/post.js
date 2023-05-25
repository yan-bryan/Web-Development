var express = require('express');
var router = express.Router();
var multer = require('multer');
var db = require('../conf/database');
const { isMyProfile } = require("../middleware/auth");
const { getPostById, getCommentsForPostById } = require("../middleware/post");

const { makeThumbnail } = require('../middleware/post');
const { isLoggedIn } = require('../middleware/auth');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/videos/uploads");
    },
    filename: function (req, file, cb) {
        var fileExt = file.mimetype.split("/")[1];
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9)
        cb(null, `${file.fieldname}-${uniqueSuffix}.${fileExt}`);
    },
});

const upload = multer({ storage: storage });

router.post("/create", isLoggedIn, upload.single("uploadVideo"), makeThumbnail, async function (req, res, next) {
    var { title, description } = req.body;
    var { path, thumbnail } = req.file;
    var { userId } = req.session.user;

    try {
        var [insertResult, _] = await db.execute(
            `INSERT INTO posts (title, description, video, thumbnail, fk_userId) VALUE(?,?,?,?,?);`, [title, description, path, thumbnail, userId]

        );
        if (insertResult && insertResult.affectedRows) {
            req.flash("success", "Your post was created.");
            return req.session.save(function (error) {
                if (error) next(error);
                return res.redirect('/');
            })

        } else {
            next(new Error('Post could not be created'));
        }

    } catch (error) {
        next(error);

    }

});

router.get("/:id(\\d+)", getPostById, getCommentsForPostById, function (req, res) {
    //console.log(req.params);
    //console.log(res.locals);
    return res.render('viewpost');
    //return res.render("viewpost");
})

router.get("/search", async function (req, res, next) {
    var { searchValue } = req.query;
    try {
        var [rows, _] = await db.execute(`select id,title,thumbnail, concat_ws(' ', title, description) as haystack from posts having haystack like ?;`, [`%${searchValue}%`]);
        if (rows && rows.length == 0) {
            return res.redirect('');
        } else {
            res.locals.posts = rows;
            console.log(res.locals);
            return res.render('index');
        }

    } catch (error) {
        next(error);
    }

});

router.post("/delete/:id(\\d+)", async function (req, res, next) {
    
    try {
        var [deleteCommentResult, _] = await db.execute('delete from csc317db.comments where fk_postId=?;', [req.params.id]);
        console.log(deleteCommentResult);
        var [deletePostResult, _] = await db.execute('delete from csc317db.posts where id=?;', [req.params.id]);
        console.log(deletePostResult);
        return res.redirect('/users/profile/'+ [req.session.user.userId]);


    } catch (error) {
        next(error);
    }
});


module.exports = router;