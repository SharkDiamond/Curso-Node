const jwt=require('jsonwebtoken');

const generarJWT=(uid='')=>{

    return new Promise((resolve,reject)=>{

        const payload={uid};
        //FIRMANDO EL TOKEN
        jwt.sign(payload,process.env.SECRETORPRIVATEKEY,{

                expiresIn:'4h'

        },(err,token)=>{
            //SI OCURRE UN ERROR    
            if (err) reject(`No se pudo generar el token ${err}`);
            //SI TODO SALE BIEN
            else resolve(token);

        });


    });



}


module.exports=generarJWT;
