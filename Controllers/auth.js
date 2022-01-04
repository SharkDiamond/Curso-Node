const Usuario=require('../Models/Usuario');
const bcryptjs=require('bcryptjs');
const generarJWT = require('../Helpers/generar-jwt.JS');
const { googleVerify } = require('../Helpers/google-verify');


const login = async(req,res) => {

    const {correo,password}=req.body;

    try {
        const usuario=await Usuario.findOne({correo});
        
        //VERIFICAR SI EL EMAIL EXISTE
        if(!usuario) return res.status(400).json({msg:"El usuario no existe"}).end();
        // SI EL USUARIO ESTA ACTIVO
        if(!usuario.estado) return res.json({msg:"Estado False"}).end();
        //VERIFICAR EL PASSWORD
        const validPassword = bcryptjs.compareSync(password,usuario.password);
        //EN DADO CASO DE SER INCORRECTO
        if (!validPassword) return res.status(400).json({msg:"El password no es correcto"}).end();
        //GENERAR EL JWT
        const token=await generarJWT(usuario.id);
        res.json({
            usuario,
            token,
        msg:"Login ok"
        }).end();


    } catch (error) {

        return res.status(500).json({msg:'Hable con el administrador'}).end();

    }


}


const googleSignIn = async (req,res)=>{

    const {id_token}=req.body;
    try {

        const {nombre,img,correo}= await googleVerify(id_token);

        let usuario=await Usuario.findOne({correo});

        if (!usuario) {
            //TENGO QUE CREARLO
            const data={
                nombre,
                correo,
                password:':P',
                img,
                google:true
            };

            usuario=new Usuario(data);
            await usuario.save();
        }
        
        //SI el usuario en DB
        if (!usuario.estado) return res.status(401).json({msg:'Hable con el administrador, usuario bloqueado'});
        const token=await generarJWT(usuario.id);
        res.json({msg:"Todo Fine!",usuario,token});
    
    } catch (error) {
        
    }

}


module.exports={
    login,
    googleSignIn

}
