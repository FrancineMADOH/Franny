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

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/avatars')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    },
    limits:{fileSize:2000000}
})
let upload = multer({ storage: storage }); 

let illustration = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    },
    limits:{fileSize:2000000}
})
let uploadillustration = multer({ storage: illustration }); 

//validate posts
const addarticleValidation = (data)=>{
    const schema = joi.object({
        title: joi.string().min(5).required(),
        description:joi.string().min(5).required(),
        content:joi.string().min(6).required()
    });
    
    return schema.validate(data);
}


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
module.exports.commentValidation  =commentValidation;
module.exports.uploadillustration = uploadillustration;

