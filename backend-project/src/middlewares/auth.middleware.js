const jwt= require("jsonwebtoken");

const authUser = async(req,res,next)=>{
     
     const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

      if(!token){
        return res.status(401).json({
            message:"You are not authorized"
        })
    }
    try{
        const decode = jwt.verify(token,process.env.JWT_SecretKey)
        req.user= decode
        next()
    }catch(err){
         console.log(err);
         res.status(401).json({
            message:"You are not authorised"
        })

    }
}

module.exports= {authUser}