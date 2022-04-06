const mongoose = require('mongoose');
const dompurify = require('dompurify');
const {JSDOM} = require('jsdom');
const marked = require('marked');

const dompurifier = dompurify(new JSDOM().wndow)

const Schema = mongoose.Schema;

const bids = new Schema({
    buyer:{
        type: String,
        default: "None",
    },
    seller: String,
    price: String,
    mid: String,
    status: String,
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
    mid: String,
    did: Number,
});

const Bids = mongoose.model('Bids', bids);

module.exports = Bids;