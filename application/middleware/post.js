var pathToFFMPEG = require('ffmpeg-static');
var exec = require('child_process').exec;
var db = require('../conf/database');

module.exports = {
    makeThumbnail: function (req, res, next) {
        if (!req.file) {
            next(new Error("File upload failed"));
        } else {
            try {
                var destinationOfThumbnail = `public/images/uploads/thumbnail-${req.file.filename.split(".")[0]}.png`;
                var thumbnailCommand = `${pathToFFMPEG} -ss 00:00:01 -i ${req.file.path} -y -s 200x200 -vframes 1 -f image2 ${destinationOfThumbnail}`;
                exec(thumbnailCommand);
                req.file.thumbnail = destinationOfThumbnail;
                next();
            } catch (error) {
                next(error);
            }
        }
    },
    getPostsForUserBy: async function (req, res, next) {
       
        try{
            var[rows, _] = await db.execute('select title, thumbnail, id from csc317db.posts where fk_userId = ?;',[req.session.user.userId]);
            res.locals.post = rows;
            next();
        } catch(error) {
            next(error);
        }

    },
    getPostById: async function (req, res, next) {
        var { id } = req.params;

        try {
            var [rows, _] = await db.execute(`select u.username, p.video, p.title, p.description, p.createdAt, p.id from posts p JOIN users u ON p.fk_userID = u.id where p.id = ?;`, [id]);
            const post = rows[0];
            if (rows && rows.length == 0) {
                next(new Error('Post was not found'));
            } else {
                res.locals.currentPost = post;
                next();
            }

        } catch (error) {
            next(error);
        }
    },
    getCommentsForPostById: async function (req, res, next) {
        var { id } = req.params;

        try {
            var [rows, _] = await db.execute(`select u.username, c.text, c.createdAt from comments c JOIN users u ON c.fk_authorId = u.id where c.fk_postId = ?;`, [id]);
            res.locals.currentPost.comments = rows;
            next();


        } catch (error) {
            next(error);
        }
    },
    getRecentPosts: async function (req, res, next) {
        try{
            var [rows, _] = await db.execute('SELECT id, title, thumbnail FROM csc317db.posts ORDER BY createdAt DESC LIMIT 5;');
            res.locals.posts= rows;
            next();
        } catch (error){
            next(error);
        }

    }
};