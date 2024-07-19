const jwt = require('jsonwebtoken');
require('dotenv').config()
const verifyToken = (req, res, next) => {
    const token = req.cookies.accessToken;
    if (!token) {
        return res.status(401).json({ success: false, message: "You are not authorized!" });
    }

    // if token exists then verify the token
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(401).json({ success: false, message: "Token is invalid" });
        }
        console.log("Decoded Token:", user);
        req.user = user;
        next();
    });
    
};
const verifyUser =(req,res,next)=>{
    verifyToken(req,res,next,()=>{
        if(req.user.id === req.params.id || req.user.role==="admin"){
            next()
        }else{
            res.status(401)
            .json({success:false,message:"You are not authenticated!"})
        }
    })
}

const verifyAdmin = (req,res,next)=>{
    verifyToken(req,res,next,()=>{
        if(req.user.id===req.params.id || req.user.role === "admin"){
            next()
        }else{
            res.status(401)
            .json({success:false,message:"You are not authenticated!"})
        }
});
};
module.exports = { verifyToken, verifyUser, verifyAdmin };
