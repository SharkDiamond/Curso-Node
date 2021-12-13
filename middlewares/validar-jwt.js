const jwt=require('jsonwebtoken');

const validarJWT=(req,res,next)=>{

    const token=req.header('x-token');

    if (!token) res.status(401).json({msg:'No hay token en la peticion'}).end();

    console.log(token);

    try {

     const {uid}=   jwt.verify(token,process.env.SECRETORPRIVATEKEY);
        req.uid=uid;

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

