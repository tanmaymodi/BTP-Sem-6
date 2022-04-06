var router = require('express').Router();
const authCtrl = require('../controllers/authCtrl');
var auth = require('../middlewares/auth');

router.route('/login')
    .post(auth, authCtrl.login);

router.route('/login')
    .get(auth, async(req, res) => {
        if(req.user){
            return res.redirect('/dashboard');
        }
        return res.render('index', {
            isAuthenticated: req.user ? true : false
        });
    });

router.route('/register')
    .post(auth, authCtrl.register);

router.route('/register')
    .get(auth, async(req, res) => {
        if(req.user){
            return res.redirect('/dashboard');
        }
        return res.render('register', {
            isAuthenticated: req.user ? true : false
        });
    });

router.route('/logout')
    .post(auth, authCtrl.logout);


module.exports = router;