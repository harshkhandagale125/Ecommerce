const jwt = require('jsonwebtoken');
const jwtSecret = "secret";


exports.creatAuthToken = async(email,role, id)=>{   
    try{
        let payload = {email,role,id};
        const token = jwt.sign(payload,jwtSecret,{expiresIn:'1h'});
        return token
    }
    catch(err){
        return err;
    }
}

const verifyToken = async (token) => {

    let decoded = await jwt.verify(token,jwtSecret);
    return decoded;
  };

  exports.resolveJwt = async(req,res,next)=>{  // authorization created(middleware)
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
          return res.status(401).json({
            message: "Access denied",
            result: false,
          });
        }
    
        const token = authHeader.split(" ")[1];

        if(!token) {
          return res.status(400).json({
            message: "Access denied",
            result: false,
          });
        }
        const resolvedToken = await verifyToken(token);
        req.headers.token = resolvedToken;
        // return res.send("OK");
        next();
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message:"Something went wrong",
            result:false
        });
    }
}



exports.isAdmin = async(req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Access denied",
      result: false,
    });
  }
  const token = authHeader.split(" ")[1];

        if(!token) {
          return res.status(400).json({
            message: "Access denied",
            result: false,
          });
        }
        const resolvedToken = await verifyToken(token);
    if( resolvedToken.role === 'admin'){
        next();
    }
    else{
        res.status(403).send("Access denied")
    }
}