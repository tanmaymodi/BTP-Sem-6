var Bids = require('../models/bids');
var createDom = require("dompurify");
var { JSDOM } = require("jsdom");
var domPurify = createDom(new JSDOM().window);
var marked = require('marked');

var bidsCtrl = {
    add: async(req, res) => {
        console.log(req.body);
        try{
            // console.log("blog add -- ", req.body, req.user);
            //var shtml = domPurify.sanitize(marked.parse(req.body.body));
            //console.log(shtml);
            var blog = new Bids({
                buyer: req.body.buyer,
                seller: req.user.seller,
                price: req.body.price,
                status: req.body.status,
                step1: req.body.step1,
                step2: req.body.step2,
                step3: req.body.step3,
                step4: req.body.step4,
                mid: req.user.username + "-" + (parseInt(Date.now() / 60000).toString()),
                did: parseInt(Date.now() / 60000)
            });
            console.log("new bid -- ", blog);
            await blog.save();
            return res.send({success: true});
        } catch (err){
            console.log("post add bid err -- ", err);
            return res.send({success: false, err: err});
        }
    },

    edit: async(req, res) => {
        try{
            if(!req.user){
                return res.redirect('/auth/login');
            }
            console.log("edit bids post -- ", req.params.id);
            var blog = await Bids.findOne({mid: req.params.id});
            if(req.user.username !== blog.buyer || req.user.username !== blog.seller ){
                return res.json({success: false, msg: "Access Denied"});
            }
           // var shtml = domPurify.sanitize(marked.parse(req.body.body));
            await Bids.updateOne({mid: req.params.id}, {$set: {status:req.body.status,step1: req.body.step1, step2: req.body.step2,step3: req.body.step3,step4: req.body.step4}});
            console.log("Bids updated");
            return res.redirect('/blog');
        } catch (err) {
            console.log("edit bids post err -- ", req.params.id, err);
            return res.send(err);
        }
    },

    //remove: async(req, res) => {
    //     try{
    //         if(!req.user){
    //             return res.redirect('/auth/login');
    //         }
    //         var blog = await Bids.findOne({mid: req.params.id});
    //         if(req.user.username !== blog.username){
    //             return res.json({success: false, msg: "Access Denied"});
    //         }
    //         console.log("remove bids post -- ", req.params.id);
    //         await Bids.findOneAndDelete({mid: req.params.id});
    //         console.log("deleted blog post");
    //         res.send({success: true});
    //     } catch (err) {
    //         console.log("remove blog post err -- ", req.params.id, err);
    //         return res.send({success: false, err: err});
    //     }
    // }
}


module.exports = bidsCtrl;