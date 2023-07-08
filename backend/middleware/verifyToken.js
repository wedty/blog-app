const jwt =require("jsonwebtoken");

const verifyToken = (req,res,next)=>{
    console.log(req.headers);

    if(!req.headers.authorization){
        return res.status(403).json({
            msg:"Unauthorized access. No token"
        });
    }

    const token =req.headers.authorization.split(" ")[1];

    jwt.verify(token,process.env.JWT_SECRET_KEY,(err,data)=>{
        if(err) return res.status(403).json({msg:"Wrong or expired token"});
        else{
            req.user = data;
            next();
        }
    })
}
module.exports = verifyToken;