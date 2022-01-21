const path=require('path');
const {v4:uuidv4}=require('uuid');


const cargarArchivo=(req,res)=>{

  
    if (!req.files || Object.keys(req.files || !req.files.archivo).length === 0) return res.status(400).json({msg:'No hay archivos que subir'});
  
    // The name of the input field (i.e. "archivo") is used to retrieve the uploaded file
   const  {archivo} = req.files;

    const nombreCortado=archivo.name.split('.');
    //EXTENSION DEL ARCHIVO 
    const extension=nombreCortado[nombreCortado.length-1];
    //EXTENCIONES PERMITIDAS
    const permitExtension=['png','yml','txt'];
    //VALIDAR EXTENSIONES
    if (!permitExtension.includes(extension)) return res.status(400).json({msg:`La extension ${extension} no es permitida, ${permitExtension}`}).end();
    //GENERANDO NOMBRE UNICO
    const nameTemp=`${archivo.name}-${uuidv4()}.${extension}`;

   const uploadPath =path.join( __dirname, '../uploads/', nameTemp);
  
    // MOVIENDO EL ARCHIVO
    archivo.mv(uploadPath, function(err) {
        //EN DADO CASO DE QUE HAYA UN ERRIR
        if (err) return res.status(500).send({err});
  
        res.json({msg:'File uploaded!'}).end();

    });
   
}


module.exports={

    cargarArchivo
}