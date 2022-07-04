const express = require('express')
const mongoose = require('mongoose');
const verify = require('../middlewares/verify_token');
const Post = require('../models/posts');
const {addarticleValidation,postillustrationValidation,commentValidation} = require('../middlewares/validation')

const router = express.Router();

//created un article
router.post('/add', async(req,res)=>{

});

//update article
router.patch('/update',(req,res)=>{});

//delete article
router.delete('/update',(req,res)=>{});

//get all the articles admin
router.get('/all', verify, (req,res)=>{
    res.send('this is all about private routes');
    User.findByOne({_id:req.user})
});

//get all the articles users
router.get('/allposts', verify, (req,res)=>{
    res.send('this is all about private routes');
    User.findByOne({_id:req.user})
});


module.exports =  router;