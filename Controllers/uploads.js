const { subirArchivo } = require("../Helpers");
const {Usuario,Producto}=require('../Models');
const cloudinary = require('cloudinary').v2
const path=require('path');
const fs=require('fs');

cloudinary.config(process.env.CLOUDINARY_URL);


const cargarArchivo=async(req,res)=>{
    
  try {


    const nombre=await  subirArchivo(req.files,['yml','md'],`Docker`);

    res.json({nombre}).end();

  } catch (error) {
     
    res.status(500).json(error).end();

  }
   
}

const actualizarImagen=async(req,res)=>{
    
    try {
 
      const{id,coleccion}=req.params;

      let modelo;

      switch (coleccion) {

          case 'usuarios':
          
           // modelo=  await validateExistValue(coleccion,id,res);


            modelo= await Usuario.findById(id);

            if (!modelo) return res.status(400).json({msg:"No existe un usuario con ese id"}).end();


              break;

           case 'productos':
              
                modelo= await Producto.findById(id);
    
                if (!modelo) return res.status(400).json({msg:"No existe un producto con ese id"}).end();
    
                  break;

          default:
              return res.status(500).json({msg:'Se me olvido validar esto'}).end();
      }


      const directionFile= coleccion=='usuarios' ? `${coleccion}/${req.usuario.correo}/imagenes/` : `${coleccion}/imagenes/`;


      //LIMPIAR IMAGENES PREVIAS
      if (modelo.img) {
        
        const pathImagen=path.join(__dirname,'../uploads',directionFile,modelo.img);

        if (fs.existsSync(pathImagen)) fs.unlinkSync(pathImagen);


      }

      modelo.img=await subirArchivo(req.files,['yml','js'],directionFile);
  
      await modelo.save();

      res.json({modelo}).end();
  
    } catch (error) {
       
      res.status(500).json(error).end();
  
  
    }
     
}
 
const mostrarImage=async(req,res)=>{
 
  try {
 
    const{id,coleccion}=req.params;

    let modelo;

    switch (coleccion) {

        case 'usuarios':
        
         // modelo=  await validateExistValue(coleccion,id,res);


          modelo= await Usuario.findById(id);

          if (!modelo) return res.status(400).json({msg:"No existe un usuario con ese id"}).end();


            break;

         case 'productos':
            
              modelo= await Producto.findById(id);
  
              if (!modelo) return res.status(400).json({msg:"No existe un producto con ese id"}).end();
  
                break;

        default:
            return res.status(500).json({msg:'Se me olvido validar esto'}).end();
    }

    
    const directionFile= coleccion=='usuarios' ? `${coleccion}/${req.usuario.correo}/imagenes/` : `${coleccion}/imagenes/`;

    //LIMPIAR IMAGENES PREVIAS
    if (modelo.img) {
      
      const pathImagen=path.join(__dirname,'../uploads',directionFile,modelo.img);

      if (fs.existsSync(pathImagen)){

        return res.sendFile(pathImagen);

      } 

    }

    const imageFailroute=path.join(__dirname,'../assets/no-image.jpg');
    
    res.sendFile(imageFailroute);
 

  } catch (error) {
     
    res.status(500).json(error).end();


  }

}

const actualizarImagenCloudDinary=async(req,res)=>{
    
  try {

    const{id,coleccion}=req.params;

    let modelo;

    switch (coleccion) {

        case 'usuarios':
        
         // modelo=  await validateExistValue(coleccion,id,res);


          modelo= await Usuario.findById(id);

          if (!modelo) return res.status(400).json({msg:"No existe un usuario con ese id"}).end();


            break;

         case 'productos':
            
              modelo= await Producto.findById(id);
  
              if (!modelo) return res.status(400).json({msg:"No existe un producto con ese id"}).end();
  
                break;

        default:
            return res.status(500).json({msg:'Se me olvido validar esto'}).end();
    }

    //LIMPIAR IMAGENES PREVIAS
    if (modelo.img) {
      
      const nombreArr=modelo.img.split("/");

      const nombre=nombreArr[nombreArr.length-1];

      [public_id]=nombre.split('.');

      await cloudinary.uploader.destroy(public_id);

    }

    const {tempFilePath}=req.files.archivo;

    const {secure_url}=await cloudinary.uploader.upload(tempFilePath);

   modelo.img=secure_url;

   await modelo.save();

    res.json({modelo}).end();

  } catch (error) {
     
    res.status(500).json(error).end();


  }
   
}


module.exports={
    cargarArchivo,
    actualizarImagen,
    mostrarImage,
    actualizarImagenCloudDinary
}