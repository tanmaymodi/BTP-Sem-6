var router = require('express').Router();
var auth = require('../middlewares/auth');
var Bids = require('../models/blog');

router.route('/')
    .get(auth, async(req, res) => {
        try {
            if(!req.user){
                return res.redirect('/');
            }
            console.log("d");
            var buy = await Bids.find({buyer: req.user.username });
            var sell = await Bids.find({username: req.user.username});

            res.render('dashboard', {
                isAuthenticated: req.user ? true : false,
                user: req.user,
                buy: buy,
                sell: sell
            });
        } catch (err) {
            console.log("dashboard err -- ", err);
            return res.send({"success": false, msg: "Server error occurred"});
        }
    })

module.exports = router;