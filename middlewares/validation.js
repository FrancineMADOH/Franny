const joi = require('@hapi/joi');
const { description } = require('@hapi/joi/lib/base');
const multer =  require('multer');

//signup validation
const signupValidation = (data)=>{
    const schema =  joi.object({
        username: joi.string().min(6).required(),
        email: joi.string().min(6).required().email(),
        password: joi.string().min(8).required(),
        social1:joi.string().min(6).required(),
        social2:joi.string().min(6).required(),
    });
    return schema.validate(data);
}

const signinValidation = (data)=>{
    const schema =  joi.object({
        email: joi.string().min(6).required().email(),
        password: joi.string().min(8).required(),
    });
    return schema.validate(data);
}

const resetPasswordValidation  = (data)=>{
    const schema =  joi.object({
        email: joi.string().min(6).required().email(),
        password: joi.string().min(8).required(),
    });
    return schema.validate(data);
}

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../avatars')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    },
    limits:{fileSize:2000000}
})
var upload = multer({ storage: storage }); 

//validate posts
const addarticleValidation = (data)=>{
    const schema = joi.object({
        title: joi.string().max(50).required(),
        description:joi.string().max(120).required(),
        content:joi.string().max(6000).required()
    });
    
    return schema.validate(data);
}
const illustrations = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../illustrations')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }, 
    limits:{fileSize:5000000}
})

const postillustrationValidation = multer({illustrations:illustrations});

const commentValidation = (data)=>{
    const schema = joi.object({
    auteur: joi.string().min(6).required(),
    email: joi.string().min(6).required().email(),
    comment: joi.string().max(120).required(),

});

return schema.validate(data);
}


module.exports.signupValidation = signupValidation;
module.exports.signinValidation = signinValidation;
module.exports.resetPasswordValidation = resetPasswordValidation;
module.exports.upload = upload;
module.exports.addarticleValidation = addarticleValidation;
module.exports.postillustrationValidation = postillustrationValidation;
module.exports.commentValidation  =commentValidation;

