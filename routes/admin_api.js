const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/admins'); 
const verify = require('../middlewares/verify_token');
const { signupValidation, signinValidation,resetPasswordValidation, upload } = require('../middlewares/validation');

const router = express.Router();

router.post('/signup', upload.single('avatar'), async(req,res)=>{
    //validate the data before creating a user
    const {error} = signupValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message);

    // //validate the image file
    var img = req.file.path;
        var encode_img = img.toString('base64');
        
        const avatar  = {
            data: Buffer.from(encode_img,'base64'), 
            contentType: req.file.mimetype
        }
    // //check if the users already admin in the db
    const emailExist = await Admin.findOne({email:req.body.email});
    if(emailExist) return res.status(400).send('Email already exist!');

    //crypt the password
    const salt = await bcrypt.genSalt(10);
    const cryptedPassword = await bcrypt.hash(req.body.password, salt);

    //creating a new admin
    const admin = new Admin({
        password:cryptedPassword,
        username:req.body.username,
        social1: req.body.social1,
        social2: req.body.social2,
        email: req.body.email,
        avatar:avatar
    });
    try{
        //saving admin to the database
        await admin.save();
        console.log('new user created!');
        res.redirect('/admin/signin')

    }catch(err){
        console.log(err)
        res.status(400).send(err);
    }

});

//login route
router.patch('/signin', async(req,res)=> {
    
    //validate the data before login a user
    const {error} = signinValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    

    const admin = await Admin.findOne({email:req.body.email});
    //  //check if the password matches
    if(!admin) return res.status(400).send('Wrong Email/Password combination');
    const verifyPassword = await bcrypt.compare(req.body.password,admin.password);
    if(!verifyPassword) return res.status(400).send('invalid password!');
    

    //create a token an update the user 
    const token = jwt.sign({_id: admin._id }, process.env.SECRET_TOKEN);
    res.setHeader('auth_token', token)
    try{
        update = await Admin.findOneAndUpdate({email:admin.email},{authtoken:token}, {new:false});
        
      res.redirect('/admin/dashboard');
   }catch(e){
       console.log(e);
   } 
});
router.get('/dashboard',verify,(req,res)=>{
    res.render('admins/index')
})

//update password
router.patch('/reset', async (req,res)=>{
    //validate the data before creating a user
    const {error} = resetPasswordValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    //check if the user exist 
    const admin = await Admin.findOne({email:req.body.email});
    
    if(!admin) return res.status(400).send("No user associated to this email!");
    //compare the last password with the new one
    const salt = await bcrypt.genSalt(10);
    let  newcryptedPassword = await bcrypt.hash(req.body.password, salt);
    const verifyPassword = await bcrypt.compare(newcryptedPassword,admin.password);
    if(verifyPassword) return res.status(400).send("New password must not be equal to last password");
    try{
        update = await Admin.findOneAndUpdate({email:admin.email},{password:newcryptedPassword}, {new:false});
        res.redirect('/admin/signin')
    }catch(e){
        console.log(e);
    }
})

//signout
router.patch("/signout",verify, async(req,res)=>{
        try{
           update = await Admin.findOneAndUpdate({id:req.admin.id},{authtoken:""}, {new:false});
           res.setHeader('auth_token', "")
           res.redirect('/admin/signin')  
        }catch(e){
           console.log(e);
       } 
  
});

router.get('/signin', (req,res)=>{
    res.render('admins/signin')
})

router.get('/signup', (req,res)=>{
    res.render('admins/signup')
})

router.get('/reset',(req,res)=>{
    res.render('admins/reset')
})



module.exports = router;