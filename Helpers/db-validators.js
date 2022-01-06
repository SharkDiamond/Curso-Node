
const {Usuario,Role,Categoria,Producto} = require("../Models");

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

const existeUsuarioPorID=async (id)=>{
    //EN DADO CASO DE NO EXISTIR
    if (!await Usuario.findById(id)) throw new Error(`El id no existe ${id}`);
}

const existeCategoriaPorId=async (id)=>{

    const exits=await Categoria.findById(id);

    if(!exits) throw new Error("No existe una categoria con ese id"); 

}

const existeProducto=async(nombre)=>{
    //BUSCANDO UN PRODUCTO CON ESE NOMBRE
    const exits= await Producto.findOne({nombre});
    //EN DANDO CASO QUE EXISTA
    if (!exits) throw new Error(`El producto ${nombre} ya existe!`);

}

const existeProductoId=async(id)=>{
    //BUSCANDO UN PRODUCTO CON ESE NOMBRE
    const exits= await Producto.findById(id);
    //EN DANDO CASO QUE EXISTA
    if (!exits) throw new Error(`No existe un producto con ese id ${id}`);

}



module.exports={esRoleValido,esEmailValido,existeUsuarioPorID,existeCategoriaPorId,existeProducto,existeProductoId};