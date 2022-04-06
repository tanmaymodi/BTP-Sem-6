var router = require('express').Router();
const authCtrl = require('../controllers/authCtrl');
const auth = require('../middlewares/auth');

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



module.exports = router;