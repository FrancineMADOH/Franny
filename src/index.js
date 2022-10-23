const path = require('path');
const express = require('express');
const bodyParser = require("body-parser")
const methodOverride = require('method-override')
const port =  process.env.PORT || 3000
require('./mongoose');
const app = express();


app.set('view engine', 'ejs')
app.set('views', path.join(__dirname,'../views'))
app.use(express.static(path.join(__dirname, '../public')))


//function that execute when a route is called
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride('_method'))


//imports routes
const adminRoute = require('../routes/admin_api');
const postRoute = require('../routes/post_api');
app.use('/admin', adminRoute);
app.use('/posts',postRoute);
app.get('/', (req,res)=>{
    res.render('posts/documentation')
})


app.listen( port, ()=>{
    console.log('Listening on port ' + port);
});