const mongoose =  require('mongoose')
require('dotenv/config');

 mongoose.connect(
     process.env.db_connexion,
     ).then(()=>{
     console.log('db connected')
 }).catch((e)=>{
     console.log(e);
 })

 