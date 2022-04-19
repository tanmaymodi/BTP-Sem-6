var Blog = require('../models/blog');
var Users = require('../models/user');
var createDom = require("dompurify");
var { JSDOM } = require("jsdom");
var domPurify = createDom(new JSDOM().window);
var marked = require('marked');

var blogCtrl = {
    add: async(req, res) => {
        console.log(req.body);
        try{
            // console.log("blog add -- ", req.body, req.user);
            var shtml = domPurify.sanitize(marked.parse(req.body.body));
            console.log(shtml);
            var blog = new Blog({
                title: req.body.title,
                username: req.user.username,
                description: req.body.description,
                body: req.body.body,
                price: req.body.price,
                images: req.body.images,
                doc: req.body.doc,
                mid: req.user.username + "-" + (parseInt(Date.now() / 60000).toString()),
                sanitizedHtml: shtml,
                did: parseInt(Date.now() / 60000)
            });
            console.log("new blog -- ", blog);
            await blog.save();
            return res.send({success: true});
        } catch (err){
            console.log("post add blog err -- ", err);
            return res.send({success: false, err: err});
        }
    },

    edit: async(req, res) => {
        try{
            if(!req.user){
                return res.redirect('/auth/login');
            }
            console.log(req.body);
            console.log("edit blog post -- ", req.params.id);
            var blog = await Blog.findOne({mid: req.params.id});
            // if(req.user.username === blog.username){
            //     return res.json({success: false, msg: "Can't buy own property"});
            // }
            //var shtml = domPurify.sanitize(marked.parse(req.body.body));
            var deal = false;
            if(req.body.status){
                await Blog.updateOne({mid: req.params.id},{$set: {message:"No new messages"}} );
            }
            if(req.body.step1 && req.body.status){
                req.body.step2=true;
                req.body.step3=true;
                console.log("step 2 _____> deal price: ", req.body.dealprice);
                var prop_price = parseInt(req.body.dealprice);
                console.log(prop_price);
                var buyerbalance = await Users.findOne({username: req.user.username }, );
        
                console.log(buyerbalance.balance);
                //var sellerbalance = await Users.find({username: req.body.username});
                var nbb = buyerbalance.balance - prop_price;
                if(nbb < 0){
                    req.body.step1 = false;
                    req.body.step2 = false;
                    req.body.step3 = false;
                    req.body.step4 = false;
                    req.body.status = false;
                   // req.body.message = "Buyer has insufficient balance";
                    await Blog.updateOne({mid: req.params.id},{$set: {message:"Buyer has insufficient balance"}} );
                    //console.log(req.body.message);
                }
            }

            if(req.body.step4 && req.body.step1 && req.body.step2 && req.body.step3 && req.body.status) {
                deal = true;
                console.log("step 4 = ", req.body.step4, deal);
                var prop_price = parseInt(req.body.dealprice);
                var buyerbalance = await Users.findOne({username:req.user.username });
                var sellerbalance = await Users.findOne({username: blog.username});
                var nbb = buyerbalance.balance - prop_price;
                var nsb = sellerbalance.balance + prop_price;
                console.log(nbb,nsb);
                await Users.updateOne({username: req.user.username},{$set: {balance: nbb}});
                await Users.updateOne({username: blog.username},{$set: {balance: nsb}});
            }
            var buyer = blog.buyer;
            console.log("user is: ", req.user.username,blog.username);
            //console.log(req.user.username, buyer,req.body.status, req.body.step1)
            if(blog.buyer === "None" && blog.username !== req.user.username){
                // console.log("-_-_-_->_P__)__)_)_)");
                buyer = req.user.username;
            }
            
           // console.log(req.body.buyer, buyer,req.body.status, req.body.step1)
            await Blog.updateOne({mid: req.params.id}, {$set: {buyer:buyer, dealprice: req.body.dealprice, status:req.body.status,step1: req.body.step1, step2: req.body.step2,step3: req.body.step3,step4: req.body.step4, deal: deal}});
            console.log("Blog updated");
            return res.redirect('/blog/expand/' + req.params.id + '/');
        } catch (err) {
            console.log("edit blog post err -- ", req.params.id, err);
            return res.send(err);
        }
    },

    remove: async(req, res) => {
        try{
            if(!req.user){
                return res.redirect('/auth/login');
            }
            var blog = await Blog.findOne({mid: req.params.id});
            if(req.user.username !== blog.username){
                return res.json({success: false, msg: "Access Denied"});
            }
            console.log("remove blog post -- ", req.params.id);
            await Blog.findOneAndDelete({mid: req.params.id});
            console.log("deleted blog post");
            res.send({success: true});
        } catch (err) {
            console.log("remove blog post err -- ", req.params.id, err);
            return res.send({success: false, err: err});
        }
    }
}


module.exports = blogCtrl;