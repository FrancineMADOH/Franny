const jwt = require('jsonwebtoken');

function verify_token(req,res,next){
    const token = req.header('auth_token');
    if(!token) return res.status(401).send('Acces denied');

    try{
        const verToken = jwt.verify(token, process.env.SECRET_TOKEN);
        req.user = verToken;
        next();
    }catch(err){
            res.status(400).send('invalid token !');
    }
    
    //everything ok
}
module.exports = verify_token;