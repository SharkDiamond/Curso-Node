const Usuario=require('../Models/Usuario');
const bcryptjs=require('bcryptjs');
const generarJWT = require('../Helpers/generar-jwt.JS');


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

module.exports={
    login

}
