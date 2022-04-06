const mongoose = require('mongoose');
const dompurify = require('dompurify');
const {JSDOM} = require('jsdom');
const marked = require('marked');

const dompurifier = dompurify(new JSDOM().wndow)

const Schema = mongoose.Schema;

const transfer = new Schema({
    mid: {
        type: String,
        required: true
    },
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    date: {
        type: Date,
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

const Transfer = mongoose.model('Transfer', transfer);

module.exports = Transfer;