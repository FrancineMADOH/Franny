const jwt = require('jsonwebtoken');

async function verify_token(req,res,next){
    const token = req.header('auth_token');
    if(!token) return res.status(401).send('Acces denied');

    try {
        const verToken = jwt.verify(token, process.env.SECRET_TOKEN);
        req.admin = verToken;
        next();
    }
    catch(err){
           console.log('invalid token !');
            res.send(err);
    }
    
    //everything ok
}
module.exports = verify_token;

//https://dev.to/pawel/how-to-secure-your-api-s-routes-with-jwt-token-4bd1