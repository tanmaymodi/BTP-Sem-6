var router = require('express').Router();
const authCtrl = require('../controllers/authCtrl');
const auth = require('../middlewares/auth');
var Bids = require('../models/blog');

router.route('/')
    .get(auth, async(req, res) => {
        try {
            if(req.user){
                return res.redirect('/dashboard');
            }
            return res.render('index', {
                isAuthenticated: req.user ? true : false
            });
        } catch (err) {
            console.log("index home err -- ", err);
            return res.send({'success': false, "msg": "Server error occurred"});
        }
    });

router.route('/properties')
    .get(auth, async(req,res) => {
        try{
            if(req.user){
                const d = await Bids.find({});
                return res.render('properties',{
                    isAuthenticated: req.user ? true : false,
                    sell: d,
                    user: req.user
                })
            }
        }
        catch(err){
            console.log("prop err---> ",err);
            return res.render('/', {err:err});
        }
    });



module.exports = router;