const { response, request } = require('express');
const Usuario=require('../Models/Usuario');
const encripta=require('bcryptjs');
const { validationResult } = require('express-validator');
//OBTENER
const usuariosGet = async  (req = request, res = response) => {

    const { limite=5,desde=0 } = req.query;


    const [total,usuarios]= await Promise.all([
        Usuario.countDocuments({estado:true}),
        Usuario.find({estado:true})
    .skip(Number(desde))
    .limit(Number(limite))

    ]);

    res.json({
        total,
        usuarios
    });


}
//CREAR
const usuariosPost = async (req, res = response) => {

    try {
        //RECIBIENDO LOS DATOS
        const {nombre,correo,password,rol}=req.body;
        //INSTANCIANDO EL USUARIO
        const usuario=new Usuario({nombre,correo,password,rol});
        //EN DADO CASO DE EXISTIR 
        if (await Usuario.findOne({correo})) return res.status(400).json({msg:"el corrreo ya esta registrado"});
        //ENCRIPTANDO EL PASSWORD
        const salt=encripta.genSaltSync();
        
        usuario.password=encripta.hashSync(password,salt);
        //GUARDANDO EL USUARIO
        await usuario.save();
        //RESPNDIENDO LA PETICION COMO EXITOSA
        res.status(203).json({
            msg: 'post API - usuariosPost',
            usuario
        }).end();

    } catch (error) {

        res.status(500).json("Ocurrio un error en el servidor"+error.message).end();

    }
    

}
//ACTUALIZAR
const usuariosPut = async (req, res = response) => {

    const { id } = req.params;

    const {password,google,correo,_id,...resto}=req.body;
    //TODO VALIDAD CONTRA BASE DE DATOS
    if (password) {
        //ENCRIPTANDO EL PASSWORD
        const salt=encripta.genSaltSync();
        resto.password=encripta.hashSync(password,salt);
    }

    const usuario=await Usuario.findByIdAndUpdate(id,resto);

    res.json({
        usuario
    });
}

const usuariosPatch = async(req, res = response) => {
    res.json({
        msg: 'patch API - usuariosPatch'
    });
}
//ELIMINAR
const usuariosDelete = async (req, res = response) => {
    
    const {id}=req.params;
    const {uid}=req.uid;

    const eliminar= await Usuario.findByIdAndUpdate(id,{estado:false});


    res.json({eliminar,uid});
}




module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete,
}