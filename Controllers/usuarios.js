const { response, request } = require('express');
const Usuario=require('../Models/Usuario');
const encripta=require('bcrypt');
const { validationResult } = require('express-validator');
//OBTENER
const usuariosGet = async  (req = request, res = response) => {

    const { q, nombre = 'No name', apikey, page = 1, limit } = req.query;

    res.json({
        msg: 'get API - controlador',
        q,
        nombre,
        apikey,
        page, 
        limit
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

    res.json({
        msg: 'put API - usuariosPut',
        id
    });
}

const usuariosPatch = async(req, res = response) => {
    res.json({
        msg: 'patch API - usuariosPatch'
    });
}
//ELIMINAR
const usuariosDelete = async (req, res = response) => {
    res.json({
        msg: 'delete API - usuariosDelete'
    });
}




module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete,
}