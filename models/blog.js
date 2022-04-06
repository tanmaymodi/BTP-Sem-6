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
    Address: {
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
    sanitizedHtml: String,
    mid: String,
    did: Number,
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;