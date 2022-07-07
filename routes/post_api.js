const express = require('express')
const mongoose = require('mongoose');
const verify = require('../middlewares/verify_token');
const Post = require('../models/posts');
const {addarticleValidation,postillustrationValidation,commentValidation} = require('../middlewares/validation')

const router = express.Router();

//created un article
router.post('/add', verify,postillustrationValidation.single('illustration'), async(req,res)=>{
    const {error} = addarticleValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message);
  
    var img = req.file.path;
    var encodedimage = img.toString('base64');

    const illustration ={
        data:Buffer.from(encodedimage,'base64'),
        contentType: req.file.mimetype
    }
    //get the author via the token

    //create a post
    const post = new Post({
        title: req.body.title,
        description:req.body.description,
        content:req.body.content,
       // author:
        illustration: illustration

    });

});

//update article
router.patch('/update',(req,res)=>{});

//delete article
router.delete('/update',(req,res)=>{});

//get all the articles admin
router.get('/all', verify, (req,res)=>{
    //res.send('this is all about private routes');
    res.send(req.admin);
    //User.findByOne({_id:req.user})
});

//get all the articles users
router.get('/allposts', verify, (req,res)=>{
    //User.findByOne({_id:req.user})
});


module.exports =  router;