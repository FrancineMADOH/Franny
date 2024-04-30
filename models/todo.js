const { boolean } = require('@hapi/joi');
const mongoose = require('mongoose');
const Todo = mongoose.model('Post', {
    title:{
        type:String,
    },
    description:{
        type:String,
        trim:true
    },
    priority:{
        type:String,
        required:true
    },
    completed: {
        type: Boolean,
        default:false
    },
       
    createdAt:{
        type:Date,
        default:Date.now()
    },
   
});
module.exports = Todo

//https://stackoverflow.com/questions/65931572/node-js-mongoose-create-a-blog-post-commenting-system