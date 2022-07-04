const mongoose =  require('mongoose');

const Applause = mongoose.model("Applause",{
    applause:{
        type:Number,
        required:true
    },

    likes:{
        type:number,
        required:true
    },
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Post'
    }
});


module.exports = Applause;