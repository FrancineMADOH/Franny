const mongoose = require('mongoose')

const Admin = mongoose.model('Admin',{
    username:{
        required:true,
        type:String,
        trim:true
    }, 
    social1:{
        required:true,
        type:String,
        trim:true
    }, 
    social2:{
        required:true,
        type:String,
        trim:true
    }, 
    email:{
        required:true,
        type:String,
        trim:true,
        lowerCase:true,
    },
    password:{
        required:true,
        type: String,
        trim:true,
    },
    authtoken:{
        type:String,
        default:"",
        required:false
    },
    avatar:{
        data:Buffer,
        contentType: String,
       // required:true,
    },
    date:{
        type:Date,
        default:Date.now()
    },
    superUser:{
        type:Boolean,
        default:false
    }
});

module.exports = Admin