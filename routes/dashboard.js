var router = require('express').Router();
var auth = require('../middlewares/auth');


router.route('/')
    .get(auth, async(req, res) => {
        try {
            if(!req.user){
                return res.redirect('/');
            }
            console.log("d");
            res.render('dashboard', {
                isAuthenticated: req.user ? true : false,
                user: req.user
            });
        } catch (err) {
            console.log("dashboard err -- ", err);
            return res.send({"success": false, msg: "Server error occurred"});
        }
    })

module.exports = router;