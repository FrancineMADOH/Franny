const mongoose = require('mongoose');

const Post = mongoose.model('Post', {
    title:{
        type:String,
    },
    description:{
        type:String,
        trim:true
    },
    content:{
        type:String,
        required:true
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Admin',
        username:String
       
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    illustration:{
        data:Buffer,
        contentType:String 
    },
    comments:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Comment'
    }],
    applause:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Applause'
    }],
    //get the virtual url
});

module.exports = Post

//https://stackoverflow.com/questions/65931572/node-js-mongoose-create-a-blog-post-commenting-system