

const validarArchivoSubir=(req,res,next)=>{

    if (!req.files || Object.keys(req.files || !req.files.archivo).length === 0) return res.status(400).json({msg:'No hay archivos que subir'});
    
    next();

}



module.exports={validarArchivoSubir};