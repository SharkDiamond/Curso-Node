const {Producto}=require('../Models');

//CREAR UN PRODUCTO 
const createProduct =async (req,res)=>{

    try {
        //CREATE UN PRODUCTO
        const create=new Producto(req.body);
        //PASANDO EL ID DE USUARIO
        create.usuario=req.usuario._id;
        //CAPITALIZANDO EL NOMBRE
        create.nombre=create.nombre.toUpperCase();
        //GUARDANDO EN LA BASE DE DATOS
        await create.save();
        //RESPONDIENDO LA PETICION
        res.status(203).json(`Producto ${create.nombre} creado!`).end();

    } catch (error) {
        res.status(500).json(error.json).end();
    }


}
//ELIMINAR PRODUCTO
const deleteProduct =async (req,res)=>{

    try {
        //ELIMINANDO PRODUCTO
        const Delete=await Producto.findByIdAndUpdate(req.params.id,{estado:false},{new:true});
        //RESPONDIENDO LA PETICION
        res.status(200).json(`Producto ${Delete.nombre} eliminado!`).end();

    } catch (error) {
        res.status(500).json(error.message).end();
    }


}
//OBTENER PRODUCTO
const getProducto   =async (req,res)=>{

    try {
        //FIND THE PRODUCT
        const Product=await Producto.findById(req.params.id).populate("usuario","nombre").populate("categoria","nombre");
        //RESPONSE THE PETITION
        res.status(200).json(Product).end();

    } catch (error) {
        res.status(500).json(error.message).end();
    }


}
//OBTENER PRODUCTOS PAGINADOS
const getProductos  =async (req,res)=>{

    try {
        //SACANDO LOS LIMITES DESDE LOS PARAMETROS
        const {desde,hasta}=req.query;
        //BUSCANDO LOS PRODUCTOS
        const datos= await Producto.find({disponible:true}).skip(Number(desde)).limit(Number(hasta)).populate('usuario','nombre').populate('categoria','nombre');
        
        res.status(200).json(datos).end();

    } catch (error) {


        res.status(500).json(error.message).end();
    }



}
const updateProducto=async (req,res)=>{

    try {
        //OBTENIENDO LOS DATOS DEL BODY
        const {usuario,estado,...data}=req.body;
        //CONVIRTIENDO EL NOMBRE A MAYUSCULAS SI VIENE
        data.nombre=data.nombre.toUpperCase();
        //DANDO LE COMO VALOR AL USUARIO EN ID
        data.usuario=req.usuario._id;
        const Update=await Producto.findByIdAndUpdate(req.params.id,data,{new:true});
           
        res.status(200).json(Update).end();

    } catch (error) {
        res.status(500).json(error.message).end();
    }


}


module.exports={createProduct,deleteProduct,getProducto,getProductos,updateProducto};
