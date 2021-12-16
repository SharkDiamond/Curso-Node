const jwt=require('jsonwebtoken');
const Usuario=require('../Models/Usuario');


const validarJWT= async (req,res,next)=>{

    const token=req.header('x-token');

    if (!token) res.status(401).json({msg:'No hay token en la peticion'}).end();
    
    try {

       const {uid}= jwt.verify(token,process.env.SECRETORPRIVATEKEY);
  
        const User= await Usuario.findById(uid);
        
        req.usuario=User;

        console.log(User);

        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg:"token no valido"
        }).end();
    }

    //jwt.verify();

}


module.exports={

validarJWT

}

