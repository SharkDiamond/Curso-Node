const {Categoria}=require('../Models');

//obtener categorias - paginado - total - populate
const getCategorias=async(req,res)=>{

    try {
        //RESCATANDO LOS LIMITES QUE VIENEN DEL QUERY
        const {desde=0,hasta=5}=req.query;
        //EJECUTANDO LAS DOS CONSULTAS EN PARALELO
       const [total, categorias]= await Promise.all([

            Categoria.countDocuments({estado:true}),
            Categoria.find({estado:true}).skip(Number(desde)).limit(Number(hasta)).populate("usuario","nombre"),


        ]);

        res.status(200).json({total,categorias}).end();

    } catch (error) {
            console.log(error.message);
    }



}
//obtener categoria   - populate {}
const getCategoria=async(req,res)=>{

    try {
        //EXTRAYENDO SOLO LOS DATOS NECESARIO
       const {nombre,usuario}= await Categoria.findById(req.params.id).populate("usuario","nombre");
        //RESPONDIENDO
        res.status(200).json({
            'NombreCategoria':nombre,
            'UsuarioCreador':usuario.nombre,
            'EmailUsuarioCreador':usuario.correo
        }).end();

    } catch (error) {
        
    }



}
//actualizar categoria
const updateCategoria=async(req,res)=>{

    try {
        //SACANDO LOS DATOS QUE SE QUIEREN ACTUALIZAR
        const {usuario,estado,...data} = req.body;
        //CONVIRTIENDO EL NOMBRE QUE VIENE A MAYUSCULAS
        data.nombre=data.nombre.toUpperCase();
        //DANDO LE COMO VALOR AL USUARIO EN ID
        data.usuario=req.usuario._id;
        //ACTUALIZANDO EL NOMBRE DE LA CATEGORIA
        const category= await Categoria.findByIdAndUpdate(req.params.id,data,{new:true});
       //RESPONDIENDO QUE LA CATEGORIA FUE ACTUALIZADA
       res.status(200).json(category).end();

    } catch (error) {
        res.status(500).json(error.message).end();
    }


}
//borrar categoria - estado:false
const deleteCategoria=async(req,res)=>{

    try {
        //SACANDO EL NOMBRE DEL UPDATE 
        const {nombre} = await Categoria.findByIdAndUpdate(req.params.id,{estado:false},{new:true});
        //DEVOLVIENDO QUE LA CATEGORIA FUE ELIMINADA EXITOSAMENTE
        res.status(200).json(`Categoria ${nombre} eliminada exitosamente`).end();
    } catch (error) {
       console.log(error.message); 
    }

}
//crear una nueva categoria
const createCategoria=async(req,res)=>{

    const nombre=req.body.nombre.toUpperCase();

    try {
    
        const categoriaDB= await Categoria.findOne({nombre});

        //VALIDANDO SI LA CATEGORIA EXISTE
        console.log(categoriaDB);

        if (categoriaDB) return res.status(400).json({msg:`La categoria ${nombre} ya existe!`}).end(); 

        //GENERAR LA DATA A GUARDAR

        const data={

            nombre,
            usuario:req.usuario._id

        }

        const Save= new Categoria(data);

        await Save.save();

        res.status(201).json(Save).end();

    } catch (error) {
        console.log(error.message);
    }


}

module.exports={createCategoria,getCategoria,deleteCategoria,updateCategoria,getCategorias}