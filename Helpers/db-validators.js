const Role=require("../Models/Role");
const Usuario = require("../Models/Usuario");


 const esRoleValido =async (rol='')=>{
    //RESCATANDO EL VALOR DEVUELTO POR LA BUSQUEDA EN LA VARIABLE EXISTE ROL
    const existeRol=await Role.findOne({rol});
    //EN DADO CASO DE QUE EL ROL NO EXISTA
    if(!existeRol) throw new Error(`El rol ${rol} no esta registrado en la base de datos`);

}


const esEmailValido=async (correo='')=>{

    //EN DADO CASO DE EXISTIR 
    if (await Usuario.findOne({correo})) throw new Error(`El correo ${correo} ya esta registrado`);

}


module.exports={esRoleValido,esEmailValido};