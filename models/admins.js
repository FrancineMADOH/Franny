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
    avatar:{
        data:Buffer,
        contentType: String,
       // required:true,
    },
    date:{
        type:Date,
        default:Date.now()
    },
})

module.exports = Admin