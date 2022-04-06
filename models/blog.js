const mongoose = require('mongoose');
const dompurify = require('dompurify');
const {JSDOM} = require('jsdom');
const marked = require('marked');

const dompurifier = dompurify(new JSDOM().wndow)

const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    //address
    body: {
        type: String,
        required: true
    },
    price:{
        type: String,
        required:true
    },
    images:{
        type:String
    },
    doc:{
        type:String
    },
    
    sanitizedHtml: String,
    buyer: String,
    dealprice: String,
    status: {
        type: Boolean,
        default: false
    },
    step1:{
        type: Boolean,
        default: false
    },
    step2:{
        type: Boolean,
        default: false
    },
    step3:{
        type: Boolean,
        default: false
    },
    step4:{
        type: Boolean,
        default: false
    },
    deal: {
        type: Boolean,
        default: false
    },
    mid: String,
    did: Number,
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;