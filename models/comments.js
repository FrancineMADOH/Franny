const mongoose = require('mongoose');


const Comment = mongoose.model("Comment",{
    auteur:{
        type:String,
        required:true,
        trim:true,
        default: 'Anonyme'
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    comment:{
        type:String,
        required:true,
        trim:true
    },
    date:{
        required:true,
        type:Date,
        default:Date.now
    },
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Post'
    }

});

module.exports = Comment;