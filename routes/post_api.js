const express = require('express')
const mongoose = require('mongoose');
const verify = require('../middlewares/verify_token');
const Admin = require('../models/admins'); 
const Post = require('../models/posts');
const {addarticleValidation,uploadillustration} = require('../middlewares/validation')

const router = express.Router();

//created un ae
router.post('/add', verify, uploadillustration.single('illustration'), async(req,res)=>{
    const {error} = addarticleValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message);
    let img = req.file.path;
    let encode_img = img.toString('base64');
        
        const illustration  = {
            data: Buffer.from(encode_img,'base64'), 
            contentType: req.file.mimetype
        }
    
    let author = await Admin.findById(req.admin._id)

    const  post = new Post({
        title: req.body.tile,
        description: req.body.description,
        content:req.body.content,
        illustration: illustration,
        author:author,
    
    });
    try{
        //saving admin to the database
        const newpost = await post.save();
        console.log('new post created!');
        res.send(newpost);

    }catch(err){
        console.log(err)
        res.status(400).send(err);
    }
});

//update article
router.patch('/update/:id',verify,(req,res)=>{});

//delete article
router.delete('/update',verify,(req,res)=>{});


//get all the articles users
router.get('/all', verify, async (req,res)=>{
    console.log('yay')
    
 

});


module.exports =  router;