const { response } = require("express");
const {ObjectId}=require("mongoose").Types;
const {Usuario,Categoria,Producto}=require("../Models");

const coleccionesPermitidas=[

    'usuario',
    'categorias',
    'productos',
    'roles'


];

const buscarUsuario=async(termino='',res=response)=>{

    const esMOngoID= ObjectId.isValid(termino);

    if (esMOngoID){
        
        const usuario= await Usuario.findById(termino);

       return res.json({results:(usuario) ? [usuario] : []});

    } 

    const regex = new RegExp(termino,'i');

    const usuarios=await Usuario.find({
    $or:[{nombre:regex},{correo:regex}],
    $and:[{estado:true}]
    
    });

    return res.json({results:usuarios});

}

const buscarCategoria= async (termino='',res=response) =>{

    const esMOngoID=ObjectId.isValid(termino);

    if (esMOngoID){
        
        const categoria= await Categoria.findById(termino);

       return res.json({results:(categoria) ? [categoria] : []});

    } 
    
    const regex = new RegExp(termino,'i');

    const users=await Categoria.find({nombre:regex,estado:true})
    .populate("usuario","nombre");

    res.json(users).end();

}

const buscarProducto= async (termino='',res=response) =>{

    const esMOngoID=ObjectId.isValid(termino);

    if (esMOngoID){
        
        const producto= await Producto.findById(termino);

       return res.json({results:(producto) ? [producto] : []});

    } 

    const regex = new RegExp(termino,'i');

    const producto=await Producto.find({nombre:regex,estado:true})
    .populate("categoria","nombre").populate("usuario","nombre");
   
    res.json(producto).end();

}

const buscar=async(req,res=response)=>{

    const {coleccion,termino}=req.params;

    if (!coleccionesPermitidas.includes(coleccion)) return res.status(400).json(`La coleccion ${coleccion} no esta dentro de las colecciones permitidas`).end();  

    switch (coleccion) {
        
        case "usuario":
           await buscarUsuario(termino,res);

            break;
    
        case "categorias":
            
            await buscarCategoria(termino,res);

            break;
        
        case "productos":
            await buscarProducto(termino,res);
        break;
           
        case "roles":
            
        break;

        default:

            res.status(500).json({msg:"Se me olvido hacer esta busqueda"}).end;

        break;
    }



  //  res.json({coleccion,termino});



}



module.exports={
    buscar

}