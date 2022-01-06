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


module.exports={createProduct,deleteProduct,getProducto};
