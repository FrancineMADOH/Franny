const mongoose =  require('mongoose')

mongoose.model('User',{
    name:{
        type:String
    }, 
    email:{
        type:String
    },
    hasAccount:{
        type:Boolean
    }
})