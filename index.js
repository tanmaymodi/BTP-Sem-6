const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const expressLayouts = require('express-ejs-layouts');


dotenv.config();

const connectDB = require('./config/db');
const { urlencoded } = require('body-parser');
connectDB();



var PORT = process.env.PORT || 4000;


app.use(expressLayouts)
app.set('layout', __dirname+'/views/layout/main.ejs')
app.set("view engine", "ejs");
app.use(express.urlencoded({extended:false}));


app.use(cors());
app.use(express.json());
app.use(cookieParser());



app.use(express.static(path.join(__dirname+'/public')));

app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));
app.use('/dashboard', require('./routes/dashboard'));
app.use('/blog', require('./routes/blog'));

app.listen(PORT, () => {
    console.log("Server started at port", PORT);
});