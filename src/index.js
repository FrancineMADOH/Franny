const path = require('path');
const express = require('express');
const bodyParser = require("body-parser")
const port =  process.env.PORT || 3000
require('./mongoose');
const app = express();


app.set('view engine', 'ejs')
app.set('views', path.join(__dirname,'../views'))
app.use(express.static(path.join(__dirname, '../public')))
app.use(express.static(path.join(__dirname, '../illustrations')))
app.use(express.static(path.join(__dirname, '../avatars')))


//function that execute when a route is called
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

//imports routes
const adminRoute = require('../routes/user_api');
const postRoute = require('../routes/post_api');
app.use('/admin', adminRoute);
app.use('/posts',postRoute);

app.get('/',function(req,res){
    res.render('index')
})

app.listen( port, ()=>{
    console.log('Listening on port ' + port);
});