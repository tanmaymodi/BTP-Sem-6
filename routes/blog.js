var router = require('express').Router();
var auth = require('../middlewares/auth');
var blog = require('../controllers/blogCtrl');
var Blog = require('../models/blog');

router.route('/')
.get(auth, async(req, res) => {
    try{
        
        if(!req.user){
            return res.redirect('/');
        }
        var page = req.query.page;
        if(!page){
            page = 1;
        }
        var bop = 3;
        
        var time = parseInt(Date.now() / 60000);
        var blogs = await Blog.find({});
        blogs.reverse();
        var total = blogs.length;
        var last = Math.floor(total/bop) + 1 - ((total%bop == 0) ? 1 : 0);
        page = Math.min(last, page);
        page = Math.max(1, page);
        page--;
        blogs = blogs.slice(page*bop, Math.min(total, (page+1)*bop));
        return res.render('blog', {blogs: blogs, time: time, cuser: req.user.username, page: page+1, last: last, isAuthenticated: req.user ? true : false});
    } catch (err) {
        console.log("blog home error", err);
        return res.send(err);
    }
});


router.route('/add')
.get(auth, async(req, res) => {
    try{
        if(!req.user){
            return res.redirect('/');
        }
        return res.render('addblog', {
            isAuthenticated: req.user ? true : false
        });
    } catch (err) {
        console.log("blog add error", err);
        return res.send(err);
    }
})
.post(auth, blog.add);

router.route('/expand/:id')
.get(auth, async(req, res) => {
    try{
        console.log("blog expand", req.params.id);
        var time = parseInt(Date.now() / 60000);
        
        var blog = await Blog.findOne({ mid: req.params.id });
        res.render("expand", { name: req.user.username, blog: blog, time: time, isAuthenticated: req.user ? true : false });
    } catch (err){
        console.log("blog expand error");
        return res.send(err);
    }
        
});

router.route("/edit/:id")
.get(auth, async(req, res) => {
    try{
        console.log("edit blog get ", req.params.id);
        var y = req.params.id;
        var blog = await Blog.findOne({ mid: req.params.id });
        if (req.user) {
            res.render("edit", { blog: blog, x: y, isAuthenticated: req.user ? true : false });
        } else {
            res.redirect("/auth/login");
        }
    } catch (err) {
        console.log("edit blog err -- ", req.params.id, err);
        return res.send(err);
    }
})
.post(auth, blog.edit);

router.route('/remove/:id')
.get(auth, blog.remove)


module.exports = router;