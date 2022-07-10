const express = require('express')
const mongoose = require('mongoose');
const slugify = require('slugify')
const { marked } = require('marked')
const createDomPurify =  require('dompurify')
const {JSDOM} = require('jsdom')
const dompurify =  createDomPurify(new JSDOM().window)
const verify = require('../middlewares/verify_token');
const Admin = require('../models/admins'); 
const Post = require('../models/posts');
const {addarticleValidation,uploadillustration} = require('../middlewares/validation')

const router = express.Router();
router

//created un ae
router.post('/', async(req,res,next)=>{
    req.post =  new Post()
    next()
    
} , saveAndRedirect('new'));
//get the page for new article
router.get('/new', (req,res)=>{
    res.render('posts/new', { post:new Post() }
    )
})

//editing article
router.get('/edit/:id', async (req,res)=>{
    const post = await Post.findById(req.params.id)
    res.render('posts/edit', { post:post  }
    )
})

//get all the articles users
router.get('/', async (req,res)=>{
   const posts =  await Post.find().sort({
    createdAt: 'desc'
   })
   if(posts == null) res.send('no post to display')
   
    res.render('posts/index', {posts:posts})

});


//view single article
router.get('/:slug', async(req,res)=>{
    const post = await Post.findOne({slug :req.params.slug});
    if(post == null) res.redirect('/posts') 
    res.render('posts/view', { post:post })
})

//editing new article with put 
router.put('/:id', async(req,res,next)=>{
    req.post =  Post.findById(req.params.id)
    next()
    
} , saveAndRedirect('edit'));

//delete article
router.delete('/:id',async(req,res)=>{
    await Post.findByIdAndDelete(req.params.id)
    res.redirect('/posts/index')
});

//save article and redirect 

function saveAndRedirect(path){
    return async(req,res)=>{
    const {error} = addarticleValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message);
    // let img = req.file.path;
    // let encode_img = img.toString('base64');
        
        // const illustration  = {
        //     data: Buffer.from(encode_img,'base64'), 
        //     contentType: req.file.mimetype
        // }
    
   //let author = await Admin.findById(req.admin._id)
   let slug = await slugify(req.body.title, {lower:true, strict:true})
   let sanitizedHtml = await dompurify.sanitize(marked(req.body.content))
   console.log(req.body.title)
   
    let post = req.post
    
    post.title =  req.body.title
    post.description =  req.body.description
    post.content = req.body.content
    post.slug    = slug
    post.sanitizedHtml = sanitizedHtml
        //illustration: req.illustration,
       // author:author,
    try{
        //saving admin to the database
        await post.save();
        console.log('new post created!');
        res.redirect(`/posts/${post.slug}`)

    }catch(err){
        console.log(err)
        res.render(`posts/${path}`, {post:post})
    }
    }
}





module.exports =  router;